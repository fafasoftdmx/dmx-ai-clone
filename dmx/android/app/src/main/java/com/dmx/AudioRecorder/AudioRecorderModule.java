package com.dmx.AudioRecorder;

import android.content.Intent;
import android.media.MediaRecorder;
import android.net.Uri;
import android.os.Environment;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.io.File;
import java.io.IOException;

public class AudioRecorderModule extends ReactContextBaseJavaModule {
    private Callback _onProgress;
    private Callback _onFinished;
    private String _path;
    private MediaRecorder audioRecorder;
    private ReactApplicationContext reactContext;

    public AudioRecorderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AudioRecorder";
    }

    @ReactMethod
    public void prepareRecordingAtPath(String path, ReadableMap map) throws IOException {
        _path = path;
        audioRecorder = new MediaRecorder();
        audioRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        audioRecorder.setOutputFormat(map.getInt("OutputFormat"));
        audioRecorder.setAudioEncoder(map.getInt("AudioEncoding"));
        audioRecorder.setOutputFile(_path);
        audioRecorder.prepare();
    }

    @ReactMethod
    public void onProgress(Callback callback) {
        this._onProgress = callback;
    }

    @ReactMethod
    public void onFinished(Callback callback) {
        this._onFinished = callback;
    }

    @ReactMethod
    public void startRecording() {
        try {
            audioRecorder.start();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @ReactMethod
    public void pauseRecording() {
        try {
            audioRecorder.stop();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @ReactMethod
    public void stopRecording() {
        try {
            File audioFile = new File(_path);
            Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
            intent.setData(Uri.fromFile(audioFile));
            reactContext.sendBroadcast(intent);
            releaseAudioRecorder();
            WritableNativeMap payload = new WritableNativeMap();
            payload.putString("status", "ok");
            payload.putString("audioFileURL", _path);
            this._onFinished.invoke(payload);
        } catch (Exception ex) {
            _onFinished.invoke("Error occured: " + ex.getMessage());
        }
    }

    private void releaseAudioRecorder() {
        if (audioRecorder != null) {
            try {
                audioRecorder.stop();
            } catch (Exception ex) {
                //already stopped
            }
            audioRecorder.release();
            audioRecorder = null;
        }
    }
}
