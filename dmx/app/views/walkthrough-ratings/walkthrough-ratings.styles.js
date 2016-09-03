import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';
import FONTSIZES from '../../common/constants/font-sizes.js';
import APPDIMENSIONS from '../../common/constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrap: {
    alignSelf: 'stretch',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: DMXCOLORS.GREYLIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    padding: 10,
  },
  headerText: {
    fontSize: FONTSIZES.h2,
    color: DMXCOLORS.BLUE,
    textAlign: 'center',
  },
  scrollWrap: {
    height: APPDIMENSIONS.SCREEN_HEIGHT / 2,
    paddingBottom: 50,
  },
  buttonStrip: {
    paddingTop: 20,
  },
});

export default styles;
