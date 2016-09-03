import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../../common/constants/colors';
import FONTSIZES from '../../../common/constants/font-sizes';

const styles = StyleSheet.create({
  input: {
    fontSize: FONTSIZES.body,
    textAlign: 'left',
    color: DMXCOLORS.BLACK,
    paddingLeft: 10,
    marginRight: 20,
    height: 40,
  },
  errorComponent: {
    flex: 1,
    height: 35,
    opacity: 0,
  },
  errorArrow: {
    alignSelf: 'flex-start',
    marginLeft: 10,
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
  unitTextWrap: {
    padding: 10,
    paddingBottom: 0,
  },
  unitText: {
    fontSize: FONTSIZES.body,
  },
});

export default styles;
