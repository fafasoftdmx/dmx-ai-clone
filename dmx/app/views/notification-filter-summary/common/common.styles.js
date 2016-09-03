import { StyleSheet } from 'react-native';
import COLORS from '../../../common/constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listElementWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREYLIGHT1,
  },
  optionLabel: {
    color: COLORS.BLACK,
    fontSize: 16,
  },
});
