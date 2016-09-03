import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../constants/colors.js';

const styles = StyleSheet.create({
  errorComponent: {
    flex: 1,
    height: 35,
    opacity: 0,
  },
  errorArrow: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: DMXCOLORS.RED,
  },
  errorContainer: {
    flex: 1,
    height: 30,
    backgroundColor: DMXCOLORS.RED,
    justifyContent: 'center',
  },
  errorComponentText: {
    color: DMXCOLORS.FLATWHITE,
    textAlign: 'left',
    paddingLeft: 10,
  },
});

export default styles;
