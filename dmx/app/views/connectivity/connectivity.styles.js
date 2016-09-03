import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  bodyText: {
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.xsmall,
    marginBottom: 25,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  dismissCtaWrap: {
    alignItems: 'center',
    bottom: APPDIMENSIONS.SCREEN_HEIGHT / 12,
    justifyContent: 'center',
    left: APPDIMENSIONS.SCREEN_WIDTH * 0.25,
    position: 'absolute',
  },
  dismissCta: {
    borderColor: DMXCOLORS.BLUE,
    borderWidth: 1,
    borderRadius: 50,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    width: APPDIMENSIONS.SCREEN_WIDTH * 0.5,
  },
  dismissCtaText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.small,
    textAlign: 'center',
  },
  header: {
    color: '#3C454A',
    margin: 10,
    fontSize: 20,
    fontFamily: 'System',
  },
  subText: {
    paddingLeft: APPDIMENSIONS.SCREEN_WIDTH * 0.25,
    paddingRight: APPDIMENSIONS.SCREEN_WIDTH * 0.25,
  },
});

export default styles;
