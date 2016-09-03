import { StyleSheet } from 'react-native';
import COLORS from '../../../common/constants/colors';

export default StyleSheet.create({
  fullWidth: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    borderColor: COLORS.GREYLIGHT1,
    borderWidth: 0.5,
    borderRadius: 3,
    height: 8,
  },
  thumb: {
    borderColor: COLORS.GREYLIGHT1,
    borderWidth: 0.5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  entireMarketLabel: {
    color: COLORS.BLACK,
  },
  milesLabel: {
    color: COLORS.GREYDARK,
  },
});
