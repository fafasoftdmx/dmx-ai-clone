import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';
import DMXCOLORS from '../../../common/constants/colors';
import FONTSIZES from '../../../common/constants/font-sizes';

const styles = StyleSheet.create({
  advanceArrow: {
    color: DMXCOLORS.GREYDARK,
    flex: 1,
    fontFamily: 'dmx-font',
    fontSize: FONTSIZES.h4,
    marginRight: 10,
    transform: [
            { scaleX: -1 },
    ],
  },
  appraisalItemRow: {
    flexDirection: 'row',
    height: APPDIMENSIONS.SCREEN_HEIGHT / 11 + 26,
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'dmx-font',
    fontSize: FONTSIZES.body,
    marginBottom: 2,
  },
  subHeaderText: {
    color: DMXCOLORS.GREYDARK,
    fontFamily: 'dmx-font',
    fontSize: FONTSIZES.xsmall,
  },
  textWrap: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  thumbnail: {
    borderRadius: 9,
    height: APPDIMENSIONS.SCREEN_HEIGHT / 11,
    marginLeft: 10,
    marginBottom: 13,
    marginTop: 13,
    width: APPDIMENSIONS.SCREEN_HEIGHT / 11,
  },
});

export default styles;
