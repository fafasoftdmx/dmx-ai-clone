import { StyleSheet, PixelRatio } from 'react-native';
import DMXCOLORS from '../../../common/constants/colors';
import fontSizes from '../../../common/constants/font-sizes';
import appDimensions from '../../../common/constants/dimensions';

const BACK_BTN_WIDTH = (30 * PixelRatio.get()) * 0.8;

const styles = StyleSheet.create({
  imageViewerScrollView: {
    width: appDimensions.SCREEN_HEIGHT,
    height: appDimensions.SCREEN_WIDTH,
  },
  imageWrap: {
    width: appDimensions.SCREEN_HEIGHT,
  },
  imageViewerInnerWrap: {
    flex: 1,
  },
  image: {
    width: appDimensions.SCREEN_HEIGHT,
    height: appDimensions.SCREEN_WIDTH,
  },
  captionWrap: {
    width: appDimensions.SCREEN_HEIGHT,
    backgroundColor: '#000000',
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  captionText: {
    color: DMXCOLORS.FLATWHITE,
    textAlign: 'center',
    fontSize: fontSizes.body,
  },
  imagePagination: {
    color: DMXCOLORS.FLATWHITE,
    textAlign: 'center',
    fontSize: fontSizes.body,
    marginLeft: 10,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.GREYLIGHT,
    borderRadius: (BACK_BTN_WIDTH / 2),
    height: BACK_BTN_WIDTH,
    justifyContent: 'center',
    width: BACK_BTN_WIDTH,
  },
  backButtonContainer: {
    right: (BACK_BTN_WIDTH / 2),
    position: 'absolute',
    top: appDimensions.SCREEN_WIDTH - BACK_BTN_WIDTH - 20,
  },
  backButtonText: {
    alignSelf: 'center',
    backgroundColor: '#00000000',
    color: DMXCOLORS.GREYDARK,
    fontFamily: 'dmx-font',
    fontSize: fontSizes.h1,
    paddingBottom: 1 * PixelRatio.get(),
  },
  scrollViewWrap: {
    flex: 0,
    width: appDimensions.SCREEN_HEIGHT,
    height: appDimensions.SCREEN_WIDTH,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default styles;
