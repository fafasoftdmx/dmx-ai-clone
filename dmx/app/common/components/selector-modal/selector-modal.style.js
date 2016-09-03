import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../constants/dimensions';
import DMXCOLORS from '../../constants/colors';

export default StyleSheet.create({
  overlayWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    backgroundColor: 'black',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  listWrapper: {
    flex: 0.5,
    backgroundColor: 'white',
  },
  listItem: {
    backgroundColor: DMXCOLORS.WHITE,
    width: SCREEN_WIDTH,
    height: 40,
    borderColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listItemLabel: {
    color: DMXCOLORS.GREYDARK,
  },
  listItemLabelSelected: {
    color: DMXCOLORS.BLUE,
  },
  buttonInner: {
    height: 50,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonLabel: {
    color: DMXCOLORS.GREYLIGHT,
  },
});
