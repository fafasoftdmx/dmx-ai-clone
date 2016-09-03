import { NativeModules } from 'react-native';
const NativeImageRotateManager = NativeModules.ImageRotateManager;

export default class ImageRotateManager {
  static rotateImageInFile(path) {
    return NativeImageRotateManager.rotateImageInFile(path)
      .then(({ width, height }) =>
        console.log(`ImageRotateManager rotateImageInFile. width: ${width}, height: ${height}`)
      );
  }
}
