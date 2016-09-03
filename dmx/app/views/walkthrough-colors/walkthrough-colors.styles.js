import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorSelector: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  colorSelectorItem: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYDARK,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: DMXCOLORS.GREYDARK,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  colorSelectorTouchable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  colorSelectorText: {
    color: DMXCOLORS.GREYDARK,
  },
  colorSelectedText: {
    color: DMXCOLORS.BLUE,
  },
  colorSelectedView: {
    borderBottomWidth: 2,
    borderBottomColor: DMXCOLORS.BLUE,
  },
});

export default styles;
