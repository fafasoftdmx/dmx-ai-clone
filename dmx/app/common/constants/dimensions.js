import { Dimensions } from 'react-native';

const appDimensions = {
  SCREEN_WIDTH: Dimensions.get('window').width,
  SCREEN_HEIGHT: Dimensions.get('window').height,
};

export default appDimensions;
