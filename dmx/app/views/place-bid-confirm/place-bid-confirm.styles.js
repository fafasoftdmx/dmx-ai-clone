import { StyleSheet } from 'react-native';
import dmxColors from '../../common/constants/colors';
import fontSizes from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dmxLogoWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  dmxLogo: {
    fontFamily: 'dmx-font',
    fontSize: fontSizes.getScaledSize(80),
    color: dmxColors.BLUE,
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparklingCar: {
    fontFamily: 'dmx-font',
    textAlign: 'center',
    color: dmxColors.BLUE,
    fontSize: fontSizes.getScaledSize(80),
  },
  confirmationMessage: {
    color: dmxColors.GREYLIGHT,
    fontSize: fontSizes.h1,
    textAlign: 'center',
  },
  moreCtaWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  moreCta: {
    borderColor: dmxColors.BLUE,
    borderWidth: 2,
    borderRadius: 50,
    padding: 20,
  },
  moreCtaText: {
    color: dmxColors.BLUE,
    fontSize: fontSizes.h2,
  },
});

export default styles;
