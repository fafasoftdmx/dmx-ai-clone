#import "ImageResizeManager.h"
#import "RCTLog.h"
#import <UIKit/UIKit.h>

@implementation ImageResizeManager

RCT_EXPORT_MODULE();

- (UIImage *)resizeImage:(UIImage *)image convertToSize:(CGSize)size {
  UIGraphicsBeginImageContext(size);
  [image drawInRect:CGRectMake(0, 0, size.width, size.height)];
  UIImage *destImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return destImage;
}

RCT_EXPORT_METHOD(resizeImageInFile:(NSString *)path options:(NSDictionary *)options resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSData *fileData = [NSData dataWithContentsOfFile:path];

  float width = [options[@"width"] floatValue];
  float height = [options[@"height"] floatValue];

  UIImage *image = [[UIImage alloc] initWithData:fileData];
  if (image.size.width > width || image.size.height > height) {
    float aspectRatio = image.size.width / image.size.height;
    int newWidth = aspectRatio > 1 ? width : (int) lroundf(width * aspectRatio);
    int newHeight = aspectRatio > 1 ? (int) lroundf(height / aspectRatio) : height;
    image = [self resizeImage:image convertToSize:CGSizeMake(newWidth, newHeight)];
    NSData *imageData = UIImageJPEGRepresentation(image, 1);
    [imageData writeToFile:path atomically:YES];
  }

  NSDictionary *response = @{
          @"width" : [NSNumber numberWithFloat: image.size.width],
          @"height" : [NSNumber numberWithFloat: image.size.height]
  };

  resolve(response);
}

@end