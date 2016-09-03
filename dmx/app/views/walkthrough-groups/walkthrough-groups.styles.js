import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';
import FONTSIZES from '../../common/constants/font-sizes.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  detailWrap: {
    flex: 2,
  },
  groups: {
    flex: 1,
    flexDirection: 'row',
  },
  groupItemTouchable: {
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: DMXCOLORS.GREYDARK,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: DMXCOLORS.GREYDARK,
    flex: 1,
    justifyContent: 'center',
  },
  groupItemWrap: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  groupItem: {
    flex: 0,
  },
  groupItemText: {
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.h3,
    textAlign: 'center',
  },
  groupItemSubText: {
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.xsmall,
    textAlign: 'center',
  },
  errorIcon: {
    position: 'absolute',
    top: 3,
    right: 3,
  },
});

export default styles;
