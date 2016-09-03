import { StyleSheet } from 'react-native';
import appDimensions from '../../constants/dimensions';
import DMXCOLORS from '../../constants/colors';
import fontSizes from '../../constants/font-sizes';

export default StyleSheet.create({
  leftBtnWrap: {
    flex: 1,
    paddingLeft: 13,
    justifyContent: 'center',
  },
  headerIconBtn: {
    fontSize: fontSizes.body,
    color: DMXCOLORS.GREYLIGHT,
    fontFamily: 'dmx-font',
  },
  menuBtn: {

  },
  menuWrap: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  colorizedHeader: {
    height: 20,
    width: appDimensions.SCREEN_WIDTH,
    backgroundColor: DMXCOLORS.GREYLIGHT,
  },
  noSelectedColorLabel: {
    height: 50,
    justifyContent: 'space-around',
    borderColor: DMXCOLORS.GREYLIGHT1,
    borderWidth: 1,
    width: appDimensions.SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  descriptionLabel: {
    fontSize: 22,
    color: DMXCOLORS.BLACK,
  },
});
