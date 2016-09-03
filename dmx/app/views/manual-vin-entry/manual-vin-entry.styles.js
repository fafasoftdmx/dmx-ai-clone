import { StyleSheet } from 'react-native';
import FONTSIZES from '../../common/constants/font-sizes';
import DMXCOLORS from '../../common/constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  inputWrap: {
    alignSelf: 'stretch',
  },
  inputItemWrap: {
    alignSelf: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    padding: 2,
  },
  inputItemTextLabel: {
    fontSize: FONTSIZES.xsmall,
    color: DMXCOLORS.GREYDARK,
    paddingTop: 2,
    paddingLeft: 20,
  },
  textInput: {
    fontSize: FONTSIZES.body,
    textAlign: 'left',
    color: DMXCOLORS.GREYDARK,
    paddingLeft: 20,
    paddingRight: 20,
    height: 35,
    overflow: 'hidden',
  },
  errorWrap: {
    alignSelf: 'stretch',
    height: 30,
    justifyContent: 'center',
  },
  errorText: {
    color: DMXCOLORS.RED,
    fontSize: FONTSIZES.body,
    paddingLeft: 10,
    textAlign: 'left',
  },
});

export default styles;
