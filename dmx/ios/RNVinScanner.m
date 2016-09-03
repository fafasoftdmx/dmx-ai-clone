//
//  RNVinScanner.m
//  RNVinScanner
//
//  Created by Wes Reid on 3/27/16.
//  Copyright © 2016 Dealer Market Exchange, LLC. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "RNVinScanner.h"
#import "RCTUIManager.h"

@implementation RNVinScanner

RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;

UIButton *cancelButton;
UIButton *manualVinEntryButton;
UIButton *torchButton;
UIColor *dmxBlue;
UIViewController *rootViewController;

/*
+ (void)register: (UIViewController*) rootViewController {
    rootViewController = rootViewController;
}
 */

- (dispatch_queue_t)methodQueue {
    return self.bridge.uiManager.methodQueue;
}

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        [self setDelegate:self];
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    dmxBlue = [UIColor colorWithRed:22/255.0f green:129/255.0f blue:215/255.0f alpha:1];
    [self createCancelButton];
    [self createManualVinEntryButton];
    [self createTorchButton];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(UIInterfaceOrientationMask) supportedInterfaceOrientations
{
    return UIInterfaceOrientationMaskPortrait;
}

-(BOOL) shouldAutorotate
{
    return YES;
}

/* B4H Delegate / Event */
- (void)scanner: (B4HScannerController *) scanner gotCode: (NSString *) code {
    [self.bridge.eventDispatcher sendAppEventWithName:@"ReactVinScanner.VinScanned"
                                                 body:@{@"vin": code}];
}

- (BOOL) callIsRunning {
    return [self isRunning];
}

- (void) callStartScanning {
    [self startScanning];
}

- (void) callStopScanning {
    [self stopScanning];
}

- (void) showVinScanner {
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    UIViewController *rootViewController = window.rootViewController;

    [rootViewController presentViewController:self animated:YES completion:^{
        [self startScanning];
    }];
}

- (void) hideVinScanner {
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    UIViewController *rootViewController = window.rootViewController;

    [rootViewController dismissViewControllerAnimated:YES completion:nil];
}

- (void) cancelVinScan {
    [self.bridge.eventDispatcher sendAppEventWithName:@"ReactVinScanner.Canceled"
                                                 body:nil];
}

- (void) requestManualVinEntry {
    [self.bridge.eventDispatcher sendAppEventWithName:@"ReactVinScanner.RequestManualVinEntry"
                                                 body:nil];
}

- (void) requestTorchToggle {
    [self.bridge.eventDispatcher sendAppEventWithName:@"ReactVinScanner.RequestTorchToggle"
                                                 body:nil];
}

- (void) createCancelButton {
    CGFloat screenHeight = [[UIScreen mainScreen] bounds].size.height;
    CGFloat screenWidth = [[UIScreen mainScreen] bounds].size.width;
    if (cancelButton != nil) {
        [cancelButton removeFromSuperview];
    }
    cancelButton = [[UIButton alloc] init];
    [cancelButton addTarget:self action:@selector(cancelButtonHandler:) forControlEvents:UIControlEventTouchUpInside];
    [cancelButton setTitle:@"Cancel" forState:UIControlStateNormal];
    [cancelButton sizeToFit];
    //    cancelButton.center = CGPointMake([[UIScreen mainScreen] bounds].size.width/2, screenHeight-43);
    [cancelButton setFrame:CGRectMake(0, screenHeight - 43, screenWidth, 43)];
    [cancelButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [cancelButton setBackgroundColor:dmxBlue];
    [self.view addSubview:cancelButton];
}

- (void) cancelButtonHandler:(UIButton *)button {
    [self stopScanning];
    [self hideVinScanner];
    [self cancelVinScan];
}

- (void) createManualVinEntryButton {
    CGFloat screenHeight = [[UIScreen mainScreen] bounds].size.height;
    CGFloat screenWidth = [[UIScreen mainScreen] bounds].size.width;
    if (manualVinEntryButton != nil) {
        [manualVinEntryButton removeFromSuperview];
    }
    manualVinEntryButton = [[UIButton alloc] init];
    [manualVinEntryButton addTarget:self action:@selector(manualVinEntryButtonHandler:) forControlEvents:UIControlEventTouchUpInside];
    [manualVinEntryButton setTitle:@"Enter Code Manually" forState:UIControlStateNormal];
    [manualVinEntryButton sizeToFit];
    [manualVinEntryButton setFrame:CGRectMake(20, screenHeight - 110, screenWidth - 50, 53)];
    [manualVinEntryButton setTitleColor:[UIColor darkGrayColor] forState:UIControlStateNormal];
    //  [[manualVinEntryButton layer] setBorderWidth:0];
    [[manualVinEntryButton layer] setCornerRadius:27];
    [[manualVinEntryButton layer]setBackgroundColor: [[UIColor colorWithWhite:1 alpha:.7] CGColor]];
    //  [manualVinEntryButton setBackgroundColor:dmxBlue];
    [self.view addSubview:manualVinEntryButton];
}

- (void) createTorchButton {
    CGFloat screenHeight = [[UIScreen mainScreen] bounds].size.height;
    CGFloat screenWidth = [[UIScreen mainScreen] bounds].size.width;
    if (torchButton != nil) {
        [torchButton removeFromSuperview];
    }
    torchButton = [[UIButton alloc] init];
    [torchButton addTarget:self action:@selector(torchButtonHandler:) forControlEvents:UIControlEventTouchUpInside];
    [torchButton setTitle:@"" forState:UIControlStateNormal];
    [torchButton sizeToFit];
    [torchButton setFrame:CGRectMake(screenWidth - 40, 30, 20, 20)];
    [torchButton setTitleColor:[UIColor darkGrayColor] forState:UIControlStateNormal];
    [[torchButton layer] setCornerRadius:10];
    [[manualVinEntryButton layer]setBackgroundColor: [[UIColor colorWithWhite:1 alpha:.7] CGColor]];
    [self.view addSubview:torchButton];
}

- (void) manualVinEntryButtonHandler:(UIButton *)button {
    [self stopScanning];
    [self hideVinScanner];
    [self requestManualVinEntry];
}

- (void) torchButtonHandler:(UIButton *)button {
    [self requestTorchToggle];
}

#pragma mark RCT_EXPORT

RCT_EXPORT_METHOD(start) {
    [self showVinScanner];
}

RCT_EXPORT_METHOD(stop) {
    [self hideVinScanner];
    [self stopScanning];
}

RCT_EXPORT_METHOD(addOverlayView:(nonnull NSNumber *)reactTag) {
    
    dispatch_async(_bridge.uiManager.methodQueue, ^{
        [_bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
            UIView *reactView = viewRegistry[reactTag];
            if (reactView != nil) {
                // Do the magic!
                [self.view addSubview:reactView];
                [self createCancelButton];
                [self createManualVinEntryButton];
                [self createTorchButton];
            }
        }];
    });
}

RCT_EXPORT_METHOD(toggleTorch) {
    NSError *error;
    
    AVCaptureDevice *capDevice = [AVCaptureDevice defaultDeviceWithMediaType: AVMediaTypeVideo];
    if (capDevice.hasTorch) {
        [capDevice lockForConfiguration: &error];
        if (capDevice.torchMode == AVCaptureTorchModeOff && [capDevice isTorchModeSupported: AVCaptureTorchModeOn]) {
            capDevice.torchMode = AVCaptureTorchModeOn;
        }
        else {
            capDevice.torchMode = AVCaptureTorchModeOff;
        }
        [capDevice unlockForConfiguration];
    }
}

@end
