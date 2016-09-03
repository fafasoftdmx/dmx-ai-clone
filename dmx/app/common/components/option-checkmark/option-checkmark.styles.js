import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  optionStateIndicator: {
    borderWidth: 1,
    width: 16,
    height: 16,
    borderColor: COLORS.GREY_CONTENT_BORDER,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  roundIndicator: {
    borderRadius: 8,
  },
  squareIndicator: {
    borderRadius: 3,
  },
  optionStateIndicatorSelection: {
    backgroundColor: COLORS.MOUNTAIN_MEADOW,
  },
});
