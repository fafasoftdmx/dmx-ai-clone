import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';
import APPDIMENSIONS from '../../common/constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationHeader: {
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.h3,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
  },
  confirmationMessage: {
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.small,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  homeCtaWrap: {
    alignSelf: 'stretch',
    position: 'absolute',
    left: APPDIMENSIONS.SCREEN_WIDTH / 4,
    bottom: APPDIMENSIONS.SCREEN_HEIGHT * 0.075,
  },
  homeCtaTouch: {
    borderColor: DMXCOLORS.BLUE,
    borderWidth: 1,
    borderRadius: 50,
  },
  homeCtaTextWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    width: APPDIMENSIONS.SCREEN_WIDTH / 2,
  },
  homeCtaText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.body,
    textAlign: 'center',
    width: APPDIMENSIONS.SCREEN_WIDTH / 4,
  },
});

export default styles;
