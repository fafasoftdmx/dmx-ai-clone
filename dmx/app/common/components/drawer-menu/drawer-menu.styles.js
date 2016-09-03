import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../constants/dimensions';
import DMXCOLORS from '../../constants/colors';

const BUTTONHEIGHTRATIO = 0.063;

const styles = StyleSheet.create({
  homeLinkText: {
    color: DMXCOLORS.WHITE,
    fontSize: 20,
  },
  homeLinkWrap: {
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    marginLeft: 25,
  },
  logoutWrap: {
    height: APPDIMENSIONS.SCREEN_HEIGHT * BUTTONHEIGHTRATIO,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  menuWrap: {
    backgroundColor: DMXCOLORS.BLACK_DARK,
    height: APPDIMENSIONS.SCREEN_HEIGHT,
    width: (0.8 * APPDIMENSIONS.SCREEN_WIDTH),
  },
});

export default styles;
