import { StyleSheet, PixelRatio } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const SCREEN_WIDTH = APPDIMENSIONS.SCREEN_WIDTH;
const SCREEN_HEIGHT = APPDIMENSIONS.SCREEN_HEIGHT;
const CAPTURE_BTN_OUTER_WIDTH = 30 * PixelRatio.get();
const CAPTURE_BTN_INNER_WIDTH = CAPTURE_BTN_OUTER_WIDTH / 3;
const BACK_BTN_WIDTH = CAPTURE_BTN_OUTER_WIDTH * 0.8;
const IMAGE_TYPE_SELECTOR_HEIGHT = SCREEN_HEIGHT / 14;


const styles = StyleSheet.create({
  uiLevel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_WIDTH,
    width: SCREEN_HEIGHT,
  },
  actionBtnWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: SCREEN_WIDTH - 70,
    width: SCREEN_HEIGHT,
  },
  activeImage: {
    borderBottomWidth: 2,
    borderBottomColor: DMXCOLORS.BLUE,
    backgroundColor: DMXCOLORS.WHITE,
    flex: 4,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.WHITE,
    borderRadius: BACK_BTN_WIDTH / 2,
    height: BACK_BTN_WIDTH,
    justifyContent: 'center',
    width: BACK_BTN_WIDTH,
  },
  backButtonContainer: {
    right: (CAPTURE_BTN_OUTER_WIDTH / 2) + 20 - (BACK_BTN_WIDTH / 2),
    position: 'absolute',
    top: SCREEN_WIDTH - BACK_BTN_WIDTH - 20,
  },
  backButtonText: {
    alignSelf: 'center',
    backgroundColor: '#00000000',
    color: DMXCOLORS.GREYDARK,
    fontFamily: 'dmx-font',
    fontSize: FONTSIZES.h1,
  },
  torchButton: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.WHITE,
    borderRadius: BACK_BTN_WIDTH / 2,
    height: BACK_BTN_WIDTH,
    justifyContent: 'center',
    width: BACK_BTN_WIDTH,
  },
  torchButtonContainer: {
    left: (CAPTURE_BTN_OUTER_WIDTH / 2) + 20 - (BACK_BTN_WIDTH / 2),
    position: 'absolute',
    top: SCREEN_WIDTH - BACK_BTN_WIDTH - 20,
  },
  torchIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  captureBtnContainer: {
    position: 'absolute',
    right: 20,
    top: SCREEN_WIDTH / 2 - CAPTURE_BTN_OUTER_WIDTH / 2,
  },
  captureBtnOuter: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.BLUE,
    borderRadius: CAPTURE_BTN_OUTER_WIDTH / 2,
    height: CAPTURE_BTN_OUTER_WIDTH,
    justifyContent: 'center',
    width: CAPTURE_BTN_OUTER_WIDTH,
  },
  captureBtnInner: {
    alignSelf: 'center',
    borderRadius: CAPTURE_BTN_INNER_WIDTH / 2,
    backgroundColor: DMXCOLORS.WHITE,
    height: CAPTURE_BTN_INNER_WIDTH,
    width: CAPTURE_BTN_INNER_WIDTH,
  },
  container: {
    flex: 0,
    height: SCREEN_WIDTH,
    left: 0,
    position: 'absolute',
    width: SCREEN_HEIGHT,
    top: 0,
  },
  bodyWrap: {
    bottom: 0,
    flex: 0,
    height: SCREEN_WIDTH,
    left: 0,
    position: 'absolute',
    width: SCREEN_HEIGHT,
  },
  hasImage: {
    color: DMXCOLORS.GREEN,
  },
  imagePreviewWrap: {
    height: SCREEN_WIDTH - IMAGE_TYPE_SELECTOR_HEIGHT,
    width: SCREEN_HEIGHT,
  },
  imagePreview: {
    flex: 0,
    height: SCREEN_WIDTH,
    left: 0,
    position: 'absolute',
    top: 0,
    width: SCREEN_HEIGHT,
  },
  imageType: {
    backgroundColor: '#FFFFFF',
    height: IMAGE_TYPE_SELECTOR_HEIGHT,
    justifyContent: 'center',
    flex: 3,
  },
  imageTypeBackground: {
    flexDirection: 'row',
  },
  imageTypeSelectorWrap: {
    backgroundColor: '#FFFFFF',
    height: IMAGE_TYPE_SELECTOR_HEIGHT,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: SCREEN_HEIGHT,
  },
  imageTypeSelection: {
    backgroundColor: '#00000000',
    height: IMAGE_TYPE_SELECTOR_HEIGHT,
    justifyContent: 'center',
    width: SCREEN_HEIGHT / 2.5,
  },
  imageTypeText: {
    alignSelf: 'center',
    backgroundColor: '#00000000',
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.body,
    justifyContent: 'center',
    textAlign: 'center',
    width: SCREEN_HEIGHT / 2.5,
  },
  imageTypeTextSelected: {
    color: DMXCOLORS.BLUE,
  },
  preview: {
    flex: 0,
    height: SCREEN_WIDTH,
    left: 0,
    position: 'absolute',
    top: 0,
    width: SCREEN_HEIGHT,
  },
  retakeBtn: {
    alignSelf: 'center',
    backgroundColor: DMXCOLORS.GREYDARK,
    borderRadius: 30,
    padding: 15,
  },
  retakeBtnText: {
    color: DMXCOLORS.WHITE,
    fontSize: FONTSIZES.body,
  },
  useBtn: {
    alignSelf: 'flex-end',
    backgroundColor: DMXCOLORS.GREEN,
    borderRadius: 20,
    padding: 10,
  },
});

export default styles;
