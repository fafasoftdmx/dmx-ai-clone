package com.dmx.RNVinScanner;

import com.facebook.react.uimanager.*;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNVinScannerViewManager extends SimpleViewManager<RNVinScannerView> {
    private static final String REACT_CLASS = "RNVinScannerView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RNVinScannerView createViewInstance(ThemedReactContext context) {
        return new RNVinScannerView(context);
    }

    @ReactProp(name = "isScanning")
    public void setIsScanning(RNVinScannerView view, boolean isScanning) {
        view.setIsScanning(isScanning);
    }
}
