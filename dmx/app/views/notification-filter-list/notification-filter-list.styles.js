import { StyleSheet } from 'react-native';
import COLORS from '../../common/constants/colors';

export default StyleSheet.create({
  listItemWrapper: {
    alignItems: 'center',
    height: 60,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    borderColor: COLORS.GREYLIGHT,
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 19,
  },
  listItemArrow: {
    transform: [{ scaleX: -1 }],
  },
});
