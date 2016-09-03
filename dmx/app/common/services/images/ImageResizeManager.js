import { NativeModules } from 'react-native';
const NativeImageResizeManager = NativeModules.ImageResizeManager;

export default class ImageResizeManager {
  static resizeImageInFile(path, options) {
    return NativeImageResizeManager.resizeImageInFile(path, options)
            .then(({ width, height }) =>
                console.log(
                  `ImageResizeManager resizeImageInFile. width: ${width}, height: ${height}`
                )
            );
  }
}
