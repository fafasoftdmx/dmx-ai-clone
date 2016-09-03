import { StyleSheet } from 'react-native';
import FONTSIZES from '../../../common/constants/font-sizes';
import DMXCOLORS from '../../../common/constants/colors';
import APPDIMENSIONS from '../../../common/constants/dimensions';

const styles = StyleSheet.create({
  amount: {
    color: DMXCOLORS.BLUE,
  },
  bidHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  bidSubRow: {
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  bidRow: {
    flex: 1,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  dealerName: {
    color: DMXCOLORS.GREYDARK,
  },
  mobileCreated: {
    color: DMXCOLORS.GREYLIGHT,
    fontFamily: 'dmx-font',
    fontSize: FONTSIZES.xsmall,
  },
  nameAmount: {
    fontSize: FONTSIZES.small,
    fontFamily: 'dmx-font',
  },
});

export default styles;
