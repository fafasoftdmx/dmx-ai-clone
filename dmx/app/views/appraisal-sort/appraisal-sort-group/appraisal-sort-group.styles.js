import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../../common/constants/colors.js';
import FONTSIZES from '../../../common/constants/font-sizes.js';
import APPDIMENSIONS from '../../../common/constants/dimensions';

const HEADERRATIO = 0.075;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupHeader: {
    backgroundColor: DMXCOLORS.GREYLIGHT1,
    height: APPDIMENSIONS.SCREEN_HEIGHT * HEADERRATIO + 22,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  groupHeaderText: {
    bottom: 0,
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.xsmall,
    paddingLeft: 20,
    paddingBottom: 15,
    position: 'absolute',
  },
  option: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DMXCOLORS.GREYLIGHT1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  optionText: {
    color: DMXCOLORS.CHARCOAL,
    fontSize: FONTSIZES.body,
  },
  optionTextSelected: {
    color: DMXCOLORS.GREEN,
  },
});

export default styles;
