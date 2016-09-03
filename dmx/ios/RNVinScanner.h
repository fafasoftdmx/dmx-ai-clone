//
//  RNVinScanner.h
//  RNVinScanner
//
//  Created by Wes Reid on 3/27/16.
//  Copyright © 2016 Dealer Market Exchange, LLC. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "B4HScannerController.h"

@interface RNVinScanner : B4HScannerController<RCTBridgeModule,B4HScannerDelegate>

//@property (nonatomic, retain) VinScannerController *vinScannerController;
//@property (nonatomic, retain) UIControl
//+ (void)register: (UIViewController*) rootViewController;
- (BOOL) callIsRunning;
- (void) callStartScanning;
- (void) callStopScanning;
- (void) showVinScanner;
- (void) hideVinScanner;
- (void) toggleTorch;

@end
