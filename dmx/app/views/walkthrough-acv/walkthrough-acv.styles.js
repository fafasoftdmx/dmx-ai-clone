import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';
import FONTSIZES from '../../common/constants/font-sizes.js';
import APPDIMENSIONS from '../../common/constants/dimensions';

const MODALWIDTH = APPDIMENSIONS.SCREEN_WIDTH * 0.80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: APPDIMENSIONS.SCREEN_HEIGHT,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  modalWrap: {
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: DMXCOLORS.GREYLIGHT,
    backgroundColor: DMXCOLORS.FLATWHITE,
    marginTop: APPDIMENSIONS.SCREEN_HEIGHT * 0.30,
    width: MODALWIDTH,
  },
  modalButtonWrap: {
    alignSelf: 'stretch',
    borderTopColor: DMXCOLORS.GREYLIGHT,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modalBtn: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
  },
  confirmBtnText: {
    color: DMXCOLORS.GREYDARK,
    textAlign: 'center',
  },
  scrollView: {
    flex: 0,
  },
  inputItemWrap: {
    alignSelf: 'stretch',
    padding: 10,
  },
  inputItemTextWrap: {

  },
  inputItemTextLabel: {
    fontSize: FONTSIZES.xsmall,
    color: DMXCOLORS.GREYDARK,
    paddingTop: 2,
    paddingLeft: 10,
    textAlign: 'left',
  },
  textInput: {
    fontSize: FONTSIZES.body,
    textAlign: 'left',
    color: DMXCOLORS.GREYDARK,
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
    overflow: 'hidden',
  },
});

export default styles;
