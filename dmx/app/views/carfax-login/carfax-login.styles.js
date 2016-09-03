import { StyleSheet } from 'react-native';
import DIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const modalWidth = DIMENSIONS.SCREEN_WIDTH * 0.75;

const styles = StyleSheet.create({
  viewWrap: {
    flex: 1,
  },
  logoWrap: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  inputWrap: {
    alignSelf: 'stretch',
  },
  inputItemWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    padding: 2,
  },
  inputItemTextLabel: {
    fontSize: FONTSIZES.xsmall,
    color: DMXCOLORS.BLUE,
    paddingTop: 2,
    paddingLeft: 20,
    opacity: 0,
  },
  textInput: {
    fontSize: FONTSIZES.body,
    textAlign: 'left',
    color: DMXCOLORS.BLACK,
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
    overflow: 'hidden',
  },
  purchaseToggleWrap: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  purchaseToggleText: {
    color: DMXCOLORS.GREYDARK,
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: DIMENSIONS.SCREEN_HEIGHT,
    width: DIMENSIONS.SCREEN_WIDTH,
  },
  modalWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: DMXCOLORS.GREYLIGHT,
    backgroundColor: DMXCOLORS.WHITE,
    width: modalWidth,
  },
  explanation: {
    color: DMXCOLORS.BLACK,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    marginBottom: 20,
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
    color: DMXCOLORS.BLUE,
    textAlign: 'center',
  },
  cancelBtnText: {
    color: DMXCOLORS.GREYDARK,
    textAlign: 'center',
  },
  errorWrap: {
    alignSelf: 'stretch',
    height: 30,
    backgroundColor: DMXCOLORS.RED,
    justifyContent: 'center',
  },
  errorText: {
    color: DMXCOLORS.FLATWHITE,
    fontSize: FONTSIZES.body,
    paddingLeft: 10,
    textAlign: 'left',
  },
  btnWrap: {
    alignSelf: 'stretch',
  },
});

export default styles;
