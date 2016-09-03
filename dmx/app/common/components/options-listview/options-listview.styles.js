import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../constants/colors.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const listItemPaddingLeftRight = 25;

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: listItemPaddingLeftRight,
    paddingRight: listItemPaddingLeftRight,
    borderBottomWidth: 0.5,
    borderColor: COLORS.GREYDARK,
  },
  listItemText: {
    fontSize: 20,
    width: SCREEN_WIDTH - 2 * listItemPaddingLeftRight,
    color: COLORS.GREYDARK,
  },
  listItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
  },
  checkMark: {
    right: 10,
  },
  listItemTextSelected: {
    color: '#13D18C',
  },
  nextBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
  },
});

export default styles;
