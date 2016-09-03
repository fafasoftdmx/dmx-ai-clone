import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const SCREEN_WIDTH = APPDIMENSIONS.SCREEN_WIDTH;
const SCREEN_HEIGHT = APPDIMENSIONS.SCREEN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHalfView: {
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.5,
  },
  columnWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  bidInputBlock: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DMXCOLORS.GREYLIGHT,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.2,
    borderRadius: 10,
  },
  input: {
    flex: 3,
    fontSize: FONTSIZES.getScaledSize(42),
    marginLeft: 20,
    color: DMXCOLORS.BLUE,
    alignSelf: 'center',
    textAlign: 'left',
    width: SCREEN_WIDTH / 1.5,
    height: SCREEN_HEIGHT / 9,
  },
  textInputWrap: {
    width: 200,
    height: 100,
  },
  unitTextWrap: {
    alignSelf: 'center',
  },
  unitText: {
    flex: 1,
    fontSize: FONTSIZES.getScaledSize(64),
    color: DMXCOLORS.GREEN,
    textAlign: 'right',
  },
  advanceButtonWrap: {
    flex: 1,
  },
  advanceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',

  },
  advanceButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  bidCtaWrap: {
    marginTop: 20,
  },
  bidCta: {
    borderColor: DMXCOLORS.BLUE,
    borderWidth: 2,
    borderRadius: 50,
    padding: 20,
  },
  bidCtaText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.h2,
  },
});

export default styles;
