import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../constants/colors';
import FONTSIZES from '../../constants/font-sizes';
import APPDIMENSIONS from '../../constants/dimensions';
const FOOTERRATIO = 0.075;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: DMXCOLORS.BLUE,
    height: APPDIMENSIONS.SCREEN_HEIGHT * FOOTERRATIO,
    justifyContent: 'center',
  },
  greenButton: {
    backgroundColor: DMXCOLORS.GREEN,
  },
  redButton: {
    backgroundColor: '#d7162f',
  },
  blueButton: {
    backgroundColor: DMXCOLORS.BLUE,
  },
  greyButton: {
    backgroundColor: DMXCOLORS.GREYDARK,
  },
  text: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.WHITE,
  },
  buttonInactive: {
    color: DMXCOLORS.GREYLIGHT,
  },
});

export default styles;
