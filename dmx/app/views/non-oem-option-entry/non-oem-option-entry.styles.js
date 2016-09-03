import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 0,
  },
  inputItemWrap: {
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
  saveBtn: {
    bottom: 0,
    position: 'absolute',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
});

export default styles;
