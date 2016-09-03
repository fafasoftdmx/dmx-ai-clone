import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';
import APPDIMENSIONS from '../../common/constants/dimensions';

const HEADERRATIO = 0.075;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  buttons: {
    flex: 1,
    height: APPDIMENSIONS.SCREEN_HEIGHT * HEADERRATIO,
  },
  headerText: {
    color: DMXCOLORS.CHARCOAL,
  },
});

export default styles;
