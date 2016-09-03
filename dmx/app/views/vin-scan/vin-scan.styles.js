import { StyleSheet, PixelRatio } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const SCREEN_WIDTH = APPDIMENSIONS.SCREEN_WIDTH;
const SCREEN_HEIGHT = APPDIMENSIONS.SCREEN_HEIGHT;
const TORCH_BTN_OUTER_WIDTH = 30 * PixelRatio.get();
const TORCH_BTN_WIDTH = TORCH_BTN_OUTER_WIDTH * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  spinner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {

  },
  footerWrap: {
    flex: 0,
    height: 100,
    backgroundColor: DMXCOLORS.WHITE,
    paddingBottom: 10,
  },
  imageTypeSelectorWrap: {
    height: 60,
    width: SCREEN_WIDTH,
  },
  imageTypeSelection: {
    width: 80,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  imageTypeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  imageTypeSelected: {
    color: DMXCOLORS.BLUE,
  },
  activeBorder: {
    borderTopWidth: 4,
    borderTopColor: DMXCOLORS.BLUE,
    paddingTop: 16,
  },
  imagePreviewWrap: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 128,
  },
  imagePreview: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 128,
    marginTop: 40,
  },
  captureBtnWrap: {
    width: SCREEN_WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  captureBtn: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    flex: 1,
  },
  actionBtnWrap: {
    width: SCREEN_WIDTH,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  retakeBtn: {
    backgroundColor: DMXCOLORS.GREYDARK,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
  },
  useBtn: {
    backgroundColor: DMXCOLORS.GREEN,
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 20,
  },
  btnText: {
    fontSize: 14,
    color: DMXCOLORS.WHITE,
  },
  hasImage: {
    color: DMXCOLORS.GREEN,
  },
  beginAppraisalText: {
    color: DMXCOLORS.GREYDARK,
    flex: 0,
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.15,
    left: 0,
    textAlign: 'center',
    width: SCREEN_WIDTH,
    height: 60,
    fontSize: FONTSIZES.h3,
  },
  scanButton: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH / 2.5,
    height: SCREEN_WIDTH / 2.5,
    backgroundColor: DMXCOLORS.GREEN,
    borderWidth: 6,
    borderRadius: SCREEN_WIDTH / 2.5,
    borderColor: DMXCOLORS.WHITE,
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.5 - SCREEN_WIDTH * 0.2,
    left: (SCREEN_WIDTH / 2 - SCREEN_WIDTH * 0.2),
    shadowColor: DMXCOLORS.GREYDARK,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  scanButtonText: {
    color: DMXCOLORS.WHITE,
    textAlign: 'center',
  },
  vinScannerOverlay: {
    position: 'absolute',
    flex: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 83,
    top: 0,
    left: 0,
  },
  vinScannerHeader: {
    backgroundColor: DMXCOLORS.GREYLIGHT1,
    position: 'absolute',
    flex: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.075,
    top: 0,
    left: 0,
  },
  overlayRedLine: {
    flex: 0,
    position: 'absolute',
    top: SCREEN_HEIGHT / 2,
    left: 20,
    width: SCREEN_WIDTH - 40,
    height: 4,
    backgroundColor: '#FB193F',
    borderWidth: 1,
    borderColor: '#C70929',
    shadowColor: '#FB193F',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  overlayInfo: {
    flex: 0,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'transparent',
    top: SCREEN_HEIGHT - 100,
    left: 0,
    width: SCREEN_WIDTH,
    height: 43,
    paddingLeft: 40,
    paddingRight: 40,
  },
  overlayInfoText: {
    flex: 1,
    color: DMXCOLORS.GREYDARK,
    textAlign: 'center',
    paddingTop: 10,
  },
  torchButton: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.WHITE,
    borderRadius: TORCH_BTN_WIDTH / 2,
    height: TORCH_BTN_WIDTH,
    justifyContent: 'center',
    width: TORCH_BTN_WIDTH,
  },
  torchButtonContainer: {
    left: (TORCH_BTN_OUTER_WIDTH / 2) + 20 - (TORCH_BTN_WIDTH / 2),
    position: 'absolute',
    top: SCREEN_WIDTH - TORCH_BTN_WIDTH - 20,
  },
  torchIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  manualVinEntryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: SCREEN_WIDTH / 1.5,
        // height: SCREEN_WIDTH / 2.5,
    backgroundColor: 'transparent',
    borderColor: DMXCOLORS.WHITE,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
        // position: 'absolute',
        // top: SCREEN_HEIGHT * .5 - SCREEN_WIDTH * .2,
        // left: (SCREEN_WIDTH / 2 - SCREEN_WIDTH * .2)
  },
  manualVinEntryButtonText: {
    color: DMXCOLORS.WHITE,
    textAlign: 'center',
  },
});

export default styles;
