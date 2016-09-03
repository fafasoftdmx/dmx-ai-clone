import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../../common/constants/colors';

export default StyleSheet.create({
  pauseButton: {
    width: 21,
    height: 20,
  },
  showMoreLabel: {
    color: DMXCOLORS.BLUE,
  },
  previewItemWrapper: {
    flex: 1,
    height: 36,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: DMXCOLORS.BLUE,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftPartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryWrapper: {
    marginLeft: 12,
    marginRight: 24,
    marginTop: 10,
  },
  nameLabel: {
    marginLeft: 5,
  },
  durationLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 13,
  },
  previewTimeBackground: {
    width: 40,
    height: 20,
    backgroundColor: DMXCOLORS.BLUE,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
