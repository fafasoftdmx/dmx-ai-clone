import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const SCREEN_WIDTH = APPDIMENSIONS.SCREEN_WIDTH;
const SCREEN_HEIGHT = APPDIMENSIONS.SCREEN_HEIGHT;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  confirmBtn: {
    bottom: 0,
    position: 'absolute',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  confirmTextHeader: {
    fontSize: FONTSIZES.h3,
    color: DMXCOLORS.BLACK,
    marginTop: 30,
  },
  confirmText: {
    textAlign: 'center',
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.body,
    lineHeight: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  vehicle: {
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.h2,
    textAlign: 'center',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: DMXCOLORS.GREYDARK,
    paddingRight: 10,
  },
  styleSelectorText: {
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.small,
    textAlign: 'left',
  },
  nextBtn: {
    width: 20,
    height: 20,
  },
  columnWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYDARK,
  },
  list: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  mileageInputBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
    width: 200,
    height: 100,
  },
  textInputWrap: {
    width: 200,
    height: 120,
  },
  unitTextWrap: {
    alignSelf: 'center',
  },
  unitText: {
    fontSize: 15,
  },
});
