import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors';
import APPDIMENSIONS from '../../common/constants/dimensions';

export default StyleSheet.create({
  list: {
    flex: 1,
  },
  pauseButton: {
    width: 32,
    height: 32,
  },
  recordEntry: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomColor: DMXCOLORS.GREYLIGHT1,
    borderBottomWidth: 0.5,
  },
  createRecordingButton: {
    marginRight: 7,
  },
  playPauseButtonWrap: {
    marginRight: 8,
  },
  recordName: {
    fontSize: 18,
  },
  recordDescription: {
    fontSize: 12,
    color: DMXCOLORS.GREYDARK,
  },
  deleteButtonWrap: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 20,
  },
});
