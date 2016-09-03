import { StyleSheet, PixelRatio } from 'react-native';
import APPDIMENSIONS from '../../constants/dimensions';

const styles = StyleSheet.create({
  landscapeLogo: {
    top: (APPDIMENSIONS.SCREEN_WIDTH / 2) - (36 * PixelRatio.get() / 2),
  },
  landscapeBackground: {
    width: APPDIMENSIONS.SCREEN_HEIGHT,
    height: APPDIMENSIONS.SCREEN_WIDTH,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(22,129,215,0.1)',
    alignItems: 'center',
  },
  portraitLogo: {
    top: (APPDIMENSIONS.SCREEN_HEIGHT / 2) - (36 * PixelRatio.get() / 2),
  },
  portraitBackground: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
    height: APPDIMENSIONS.SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(22,129,215,0.1)',
    alignItems: 'center',
  },
});

export default styles;
