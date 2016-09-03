package com.dmx.images.resize;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

public class ImageResizeManager extends ReactContextBaseJavaModule {
    public ImageResizeManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void resizeImageInFile(String path, ReadableMap options, Promise promise) {
        Bitmap bitmap = null;
        Bitmap newBitmap = null;
        try {
            path = path.replace("file://", "");
            FileInputStream fileInputStream = new FileInputStream(path);
            InputStream inputStream = new BufferedInputStream(fileInputStream);
            bitmap = BitmapFactory.decodeStream(inputStream);
            fileInputStream.close();
            inputStream.close();
            int maxWidth = options.getInt("width");
            int maxHeight = options.getInt("height");

            float originalWidth = bitmap.getWidth();
            float originalHeight = bitmap.getHeight();

            WritableMap map = Arguments.createMap();
            if (maxWidth < originalWidth || maxHeight < originalHeight) {
                float aspectRatio = originalWidth / originalHeight;
                int newWidth = aspectRatio > 1 ? maxWidth : Math.round(maxWidth * aspectRatio);
                int newHeight = aspectRatio > 1 ? Math.round(maxHeight / aspectRatio) : maxHeight;
                newBitmap = Bitmap.createBitmap(newWidth, newHeight, Bitmap.Config.ARGB_8888);

                Canvas canvas = new Canvas(newBitmap);

                float scale = newWidth / originalWidth;
                Matrix transformation = new Matrix();
                transformation.preScale(scale, scale);
                Paint paint = new Paint();
                paint.setFilterBitmap(true);
                canvas.drawBitmap(bitmap, transformation, paint);
                FileOutputStream out = new FileOutputStream(path);
                newBitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
                out.flush();
                out.close();
                map.putDouble("width", newWidth);
                map.putDouble("height", newHeight);
            } else {
                map.putDouble("width", originalWidth);
                map.putDouble("height", originalHeight);
            }
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        } finally {
            if(bitmap != null) {
                bitmap.recycle();
            }
            if(newBitmap != null) {
                newBitmap.recycle();
            }
        }
    }

    @Override
    public String getName() {
        return "ImageResizeManager";
    }
}
