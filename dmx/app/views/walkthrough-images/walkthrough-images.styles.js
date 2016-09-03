import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';
import FONTSIZES from '../../common/constants/font-sizes.js';
import APPDIMENSIONS from '../../common/constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesSectionWrap: {
    flex: 1,
  },
  imagesHeaderWrap: {
    alignSelf: 'stretch',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: DMXCOLORS.GREYLIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    padding: 10,
  },
  imagesHeaderText: {
    fontSize: FONTSIZES.h2,
    color: DMXCOLORS.BLUE,
    textAlign: 'center',
  },
  scrollWrap: {
    alignSelf: 'stretch',
    height: APPDIMENSIONS.SCREEN_HEIGHT / 2,
    paddingBottom: 20,
  },
  imagesWrap: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  angleRowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  angleWrap: {
    flex: 1,
    marginRight: 5,
  },
  angleNameText: {
    color: DMXCOLORS.GREYLIGHT,
    fontSize: FONTSIZES.xsmall,
    textAlign: 'center',
    marginTop: 5,
  },
  takePhotoWrap: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DMXCOLORS.GREYLIGHT,
    padding: 5,
  },
  takePhotoText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.xsmall,
    textAlign: 'center',
    marginTop: 3,
  },
  vehicleImageWrap: {
    flex: 1,
    alignItems: 'center',
    height: 80,
  },
  vehicleImage: {
    borderRadius: 4,
    width: 75,
    height: 75,
  },
});

export default styles;
