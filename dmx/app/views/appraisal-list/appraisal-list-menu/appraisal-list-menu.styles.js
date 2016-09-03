import { StyleSheet, PixelRatio } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';
import DMXCOLORS from '../../../common/constants/colors';
import FONTSIZES from '../../../common/constants/font-sizes';

const styles = StyleSheet.create({
  menuArrow: {
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.small,
    paddingTop: 4,
  },
  menuItem: {
    backgroundColor: '#FEFEFEEE',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    height: 40,
    justifyContent: 'center',
  },
  menuItemText: {
    alignSelf: 'center',
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.h3,
    textAlign: 'center',
  },
  menuItemTextWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuWrap: {
    overflow: 'hidden',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  selectedMenuItem: {
    backgroundColor: '#FEFEFEFF',
  },
  selectedMenuItemText: {
    color: DMXCOLORS.BLACK,
  },
});

export default styles;
