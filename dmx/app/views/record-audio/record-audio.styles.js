import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors';

export default StyleSheet.create({
  descriptionText: {
    marginLeft: 66,
    marginRight: 66,
    marginTop: 18,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    color: DMXCOLORS.GREYDARK,
  },
  timerContainer: {
    flex: 1,
    alignSelf: 'center',
    width: 242, // otherwise, size (end position) will slightly change on every update
    alignItems: 'center',
    flexDirection: 'row',
  },
  timerLabel: {
    fontSize: 60,
    marginTop: -80,
    fontWeight: '300',
  },
  menuContainer: {
    flexDirection: 'row',
    marginBottom: -1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  microphone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 142,
    height: 100,
  },
  notRecordingStateLabel: {
    fontSize: 11,
    color: DMXCOLORS.GREYDARK,
  },
  sideButton: {
    width: 38,
  },
  recordingStateLabel: {
    fontSize: 11,
    color: DMXCOLORS.RED,
  },
});
