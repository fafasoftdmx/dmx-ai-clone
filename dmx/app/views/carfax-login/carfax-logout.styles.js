import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  viewWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingBottom: 25,
  },
  textWrap: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  accountText: {
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.body,
    textAlign: 'center',
  },
  accountHighlight: {
    color: DMXCOLORS.BLUE,
  },
  errorText: {
    color: DMXCOLORS.RED,
    fontSize: FONTSIZES.body,
    textAlign: 'center',
  },
  btnWrap: {
    alignSelf: 'stretch',
  },
});

export default styles;
