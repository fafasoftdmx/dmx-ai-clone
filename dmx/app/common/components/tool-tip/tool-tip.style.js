import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../constants/colors';

export default StyleSheet.create({
  background: {
    position: 'absolute',
    top: -54,
    left: -36,
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: DMXCOLORS.WHITE,
    backgroundColor: 'transparent',
    fontSize: 16,
    marginTop: -4,
  },
});
