import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';
import DMXCOLORS from '../../../common/constants/colors';

const microSwatchWidthRatio = 0.05;

const styles = StyleSheet.create({
  microSwatchTiny: {
    width: APPDIMENSIONS.SCREEN_WIDTH * microSwatchWidthRatio,
    height: APPDIMENSIONS.SCREEN_WIDTH * microSwatchWidthRatio,
    borderRadius: (APPDIMENSIONS.SCREEN_WIDTH * microSwatchWidthRatio) / 2,
  },
  rowMargin: {
    paddingLeft: 15,
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
});

export default styles;
