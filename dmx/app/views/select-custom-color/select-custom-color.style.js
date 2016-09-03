import { StyleSheet } from 'react-native';
import appDimensions from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 16,
  },
  list: {
    alignSelf: 'center',
  },
  headerContainer: {
    borderColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderWidth: 1,
    backgroundColor: '#ffffffef',
    top: 0,
    paddingLeft: 16,
    flexDirection: 'row',
    position: 'absolute',
    height: 50,
    width: appDimensions.SCREEN_WIDTH,
  },
  headerInnerContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  selectedLabel: {
    fontSize: 12,
    color: DMXCOLORS.GREYDARK,
  },
  colorNameLabel: {
    fontSize: 18,
    height: 26,
    color: DMXCOLORS.BLACK,
  },
  editColorNameButtonLabel: {
    fontSize: 12,
    alignSelf: 'center',
    color: DMXCOLORS.BLUE,
  },
  editColorNameButtonInner: {
    borderColor: DMXCOLORS.BLUE,
    justifyContent: 'space-around',
    borderWidth: 1.5,
    borderRadius: 18,
    height: 32,
    width: 84,
  },
  rightButton: {
    alignSelf: 'center',
    marginRight: 16,
  },
});
