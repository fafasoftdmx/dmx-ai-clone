package com.dmx.RNVinScanner;

import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.*;
import android.hardware.Camera;
import android.os.Handler;
import android.os.Message;
import android.util.Base64;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;

import com.bees4honey.vinscanner.B4HScanner;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;

import java.io.ByteArrayOutputStream;
import java.lang.ref.WeakReference;
import java.util.List;
import com.dmx.R;

public class RNVinScannerView extends FrameLayout {
    private final Context _context;
    private boolean _isScanning;
    private static final String TAG = RNVinScannerView.class.getCanonicalName();
    private static final int DECODE = 2131099648;
    private static final long DECODE_DELAY_MSECS = 100;
    private Handler handler;

    public RNVinScannerView(Context context) {
        super(context);
        this._context = context;
        handler = new ScannerHandler(new WeakReference<Context>(getContext()));
        this._isScanning = false;
        initView();
    }

    private void initView() {


        View view = inflate(getContext(), R.layout.vin_layout_view, null);

        SurfaceView surfaceView = (SurfaceView) view.findViewById(R.id.camera_view);
        Camera camera = getCameraInstance();
        SurfaceCamCallback callback = new SurfaceCamCallback(camera);
        Camera.Parameters cameraParams = camera.getParameters();
        cameraParams.set("orientation", "portrait");
        camera.setParameters(cameraParams);

        surfaceView.getHolder().addCallback(callback);

        ReactContext context = (ReactContext) getContext();

        final RCTNativeAppEventEmitter emitter = context.getJSModule(RCTNativeAppEventEmitter.class);
        Button cancelButton = (Button) view.findViewById(R.id.cancel_button);
        cancelButton.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                emitter.emit("ReactVinScanner.Canceled", Arguments.createMap());
            }
        });

        Button manualVinEntryButton = (Button) view.findViewById(R.id.manual_vin_entry_button);
        manualVinEntryButton.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                emitter.emit("ReactVinScanner.RequestManualVinEntry", Arguments.createMap());
            }
        });

        addView(view);
    }

    public void setIsScanning(boolean isScanning) {
        this._isScanning = isScanning;
        Log.d("isScanning: ", "isScanning");
    }

    private Camera getCameraInstance() {
        Camera c = null;
        try {
            c = Camera.open(); // attempt to get a Camera instance
        } catch (Exception e) {
            // Camera is not available (in use or does not exist)
            Log.e(TAG, "Error opening camera: " + e.getMessage());
        }
        return c; // returns null if camera is unavailable
    }

    private static class ScannerHandler extends Handler {
        private B4HScanner scanner;
        private WeakReference<Context> contextRef;

        ScannerHandler(WeakReference<Context> contextRef) {
            super();
            try {
                scanner = new B4HScanner();
            } catch (Exception e) {
                e.printStackTrace();
            }
            this.contextRef = contextRef;
        }

        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case DECODE:
                    // message called when getting image from camera
                    ImageBuffer buffer = (ImageBuffer) msg.obj;

                    Log.d(TAG, "Buffer size: " + buffer.data.length +
                            ", buffer width: " + buffer.width + ", buffer height: " + buffer.height);
                    byte[] data = rotateCameraImage(buffer.data, buffer.width, buffer.height);
                    Context context = contextRef.get();
                    String code = scanner.parse(data, buffer.width, buffer.height, context);
                    if (code != null) {
                        WritableMap map = Arguments.createMap();
                        map.putString("vin", code);
                        final RCTNativeAppEventEmitter emitter = ((ReactContext) context).getJSModule(RCTNativeAppEventEmitter.class);
                        emitter.emit("ReactVinScanner.VinScanned", map);
                    }
                    break;
                default:
//                    do nothing
                    break;
            }
        }

        private byte[] rotateCameraImage(byte[] data, int width, int height) {
            byte[] rotatedData = new byte[data.length];
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++)
                    rotatedData[x * height + height - y - 1] = data[x + y * width];
            }
            return rotatedData;
        }
    }

    private class SurfaceCamCallback implements SurfaceHolder.Callback, Camera.PreviewCallback {
        private static final int PORTRAIT_BUFFER_ORIENTATION = 90;
        private Camera camera;
        Camera.Size previewSize;

        public SurfaceCamCallback(Camera camera) {
            this.camera = camera;
            camera.setDisplayOrientation(90);
        }

        @Override
        public void surfaceCreated(SurfaceHolder holder) {
            //do nothing
        }

        @Override
        public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
            if (camera != null && holder != null) {
                camera.setPreviewCallback(null);
                camera.stopPreview();    // stop camera preview
                try {
                    // restart camera preview
                    configureCamera(width, height);
                    camera.setPreviewDisplay(holder);
                    camera.setPreviewCallback(this);
                    camera.startPreview();
                } catch (Exception e) {
                    Log.e(TAG, "Exception raised configuring camera: " + e.getMessage());
                }
            }
        }

        private void configureCamera(int width, int height) {
            if (camera == null) {
                return;
            }

            Camera.Parameters cameraParams = camera.getParameters();
            cameraParams.set("orientation", "portrait");
            List<Camera.Size> sizes = cameraParams.getSupportedPreviewSizes();
            previewSize = getOptimalPreviewSize(sizes, Math.max(width, height), Math.min(width, height));
            cameraParams.setPreviewSize(previewSize.width, previewSize.height);
            // set YUV data format.
            cameraParams.setPreviewFormat(ImageFormat.NV21);
            cameraParams.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
            // set frequency of capture
            setAcceptableFrameRate(cameraParams);

            if (getContext().getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_AUTOFOCUS)) {
                if (cameraParams.getSupportedFocusModes().contains(Camera.Parameters.FOCUS_MODE_CONTINUOUS_PICTURE)) {
                    cameraParams.setFocusMode(Camera.Parameters.FOCUS_MODE_CONTINUOUS_PICTURE);
                } else if (cameraParams.getSupportedFocusModes().contains(Camera.Parameters.FOCUS_MODE_AUTO)) {
                    cameraParams.setFocusMode(Camera.Parameters.FOCUS_MODE_AUTO);
                }
            }

            camera.setParameters(cameraParams);
        }

        private void setAcceptableFrameRate(Camera.Parameters params) {
            List<int[]> ranges = params.getSupportedPreviewFpsRange();
            int[] frameRate = {0, 0};
            for (int[] range : ranges) {
                if (range[0] > frameRate[0]) {
                    frameRate[0] = range[0];
                    frameRate[1] = range[1];
                }
            }
            params.setPreviewFpsRange(frameRate[0], frameRate[1]);
        }

        private Camera.Size getOptimalPreviewSize(List<Camera.Size> sizes, int targetWidth, int targetHeight) {
            final double ASPECT_TOLERANCE = 0.05;
            double targetRatio = (double) targetWidth / targetHeight;
            if (sizes == null)
                return null;

            Camera.Size optimalSize = null;
            double minDiff = Double.MAX_VALUE;

            for (Camera.Size size : sizes) {
                double ratio = (double) size.width / size.height;
                if (Math.abs(ratio - targetRatio) > ASPECT_TOLERANCE)
                    continue;
                if (Math.abs(size.height - targetHeight) < minDiff) {
                    optimalSize = size;
                    minDiff = Math.abs(size.height - targetHeight);
                }
            }
            if (optimalSize == null) {
                minDiff = Double.MAX_VALUE;
                for (Camera.Size size : sizes) {
                    if (Math.abs(size.height - targetHeight) < minDiff) {
                        optimalSize = size;
                        minDiff = Math.abs(size.height - targetHeight);
                    }
                }
            }

            return optimalSize;
        }

        @Override
        public void surfaceDestroyed(SurfaceHolder holder) {
            if (camera != null) {
                camera.setPreviewCallback(null);
                camera.stopPreview();
            }
        }

        private byte[] rotateCameraImage(byte[] data, int width, int height) {
            byte[] rotatedData = new byte[data.length];
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++)
                    rotatedData[x * height + height - y - 1] = data[x + y * width];
            }
            return rotatedData;
        }

        @Override
        public void onPreviewFrame(byte[] data, Camera camera) {
            if (handler.hasMessages(DECODE) || (previewSize == null)) {
                return;
            }
            ImageBuffer imageBuffer = new ImageBuffer(data, previewSize.width, previewSize.height, ImageBuffer.ORIENTATION_PORTRAIT);

            Message msg = new Message();
            msg.what = DECODE;
            msg.obj = imageBuffer;
            handler.sendMessageDelayed(msg, DECODE_DELAY_MSECS);
        }
    }
}
