import { StyleSheet, PixelRatio } from 'react-native';
import DMXCOLORS from '../../constants/colors';
import FONTSIZES from '../../constants/font-sizes';
import APPDIMENSIONS from '../../constants/dimensions';

const HEADERRATIO = 0.06;

const styles = StyleSheet.create({
  headerWrapper: {
    height: APPDIMENSIONS.SCREEN_HEIGHT * HEADERRATIO + 22,
    backgroundColor: DMXCOLORS.WHITE,
    flexDirection: 'row',
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    borderBottomWidth: 1 / PixelRatio.get(),
    alignItems: 'center',
  },
  leftBtnWrap: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
  },
  leftBtnText: {
    color: DMXCOLORS.WHITE,
  },
  headerTitleWrap: {
    flex: 4,
  },
  mainHeader: {
    fontSize: FONTSIZES.h1,
    textAlign: 'center',
    alignItems: 'center',
    color: DMXCOLORS.BLUE,
  },
  subHeader: {
    fontSize: FONTSIZES.small,
    textAlign: 'center',
    alignItems: 'center',
    color: DMXCOLORS.GREYDARK,
  },
  menuBtn: {

  },
  rightBtnWrap: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 5,
  },
  rightBtnText: {
    color: DMXCOLORS.WHITE,
  },
  headerIconBtn: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.GREYLIGHT,
    fontFamily: 'dmx-font',
  },
  logoHeader: {
    flex: 4,
    fontSize: FONTSIZES.getScaledSize(30),
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'dmx-font',
  },
  headerTitleImage: {
    width: APPDIMENSIONS.SCREEN_WIDTH / 2.5,
  },
});

export default styles;
