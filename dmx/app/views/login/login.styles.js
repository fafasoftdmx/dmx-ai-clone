import { StyleSheet, PixelRatio } from 'react-native';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';
import APPDIMENSIONS from '../../common/constants/dimensions';

const FOOTERRATIO = 0.063;

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
  },
  loginLogoWrap: {
    marginTop: APPDIMENSIONS.SCREEN_HEIGHT / 8,
    alignItems: 'center',
  },
  dataInputWrap: {
    marginTop: 20,
  },
  registerText: {
    marginTop: 40,
    alignItems: 'center',
  },
  registerTextInner: {
    color: DMXCOLORS.BLUE,
  },
  errorComponent: {
    flex: 1,
    height: 35,
    opacity: 0,
  },
  errorArrow: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: DMXCOLORS.RED,
  },
  errorContainer: {
    flex: 1,
    height: 30,
    backgroundColor: DMXCOLORS.RED,
    justifyContent: 'center',
  },
  errorComponentText: {
    color: DMXCOLORS.FLATWHITE,
    textAlign: 'left',
    paddingLeft: 10,
  },
  scrollView: {
    height: APPDIMENSIONS.SCREEN_HEIGHT,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  loginButtonWrap: {
    flex: 0,
    height: APPDIMENSIONS.SCREEN_HEIGHT * FOOTERRATIO,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DMXCOLORS.BLUE,
  },
  loginBtnText: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.WHITE,
  },
  buttonInactive: {
    color: DMXCOLORS.GREYLIGHT,
  },
  input: {
    fontSize: FONTSIZES.body,
    textAlign: 'left',
    color: DMXCOLORS.BLACK,
    paddingLeft: 10,
    marginRight: 20,
    height: 40,
  },
  unitTextWrap: {
    padding: 10,
    paddingBottom: 0,
  },
  unitText: {
    fontSize: FONTSIZES.body,
  },
  summaryItemWrap: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
    flexDirection: 'column',
    borderBottomColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  summaryItemWrapInner: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  summaryItemHeaderWrap: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
  },
  summaryItemHeaderText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.body,
    flex: 0.5,
  },
  summaryItemHeaderArrow: {
    flex: 0.05,
  },
  summaryItemBodyWrap: {
    flexDirection: 'column',
  },
  summaryItemBodyListItemWrap: {
    borderBottomColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  summaryItemBodyListItemLabel: {
    fontSize: FONTSIZES.h4,
    color: DMXCOLORS.GREYDARK,
  },
  summaryItemBodyListItemValue: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.BLACK,
  },
  row: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
    height: APPDIMENSIONS.SCREEN_HEIGHT / 10,
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: DMXCOLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    flex: 3,
    color: '#000000',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: FONTSIZES.body,
  },
  centeredSwatch: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default styles;
