import { StyleSheet } from 'react-native';
import DmxColors from '../../constants/colors';
import DIMENSIONS from '../../constants/dimensions';
import fontSizes from '../../constants/font-sizes';

const selectorWidth = DIMENSIONS.SCREEN_WIDTH - 40;

const styles = StyleSheet.create({
  heading: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: fontSizes.body,
    color: DmxColors.CHARCOAL,
  },
  strip: {
    borderWidth: 1,
    height: 44,
    marginLeft: 20,
    width: selectorWidth,
    flex: 1,
    flexDirection: 'row',
    borderColor: DmxColors.GREYLIGHT1,
    overflow: 'hidden',
    borderRadius: 50,
  },
  grade: {
    width: selectorWidth / 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
  },
  separator: {
    borderRightWidth: 1,
    borderColor: DmxColors.GREYLIGHT1,
  },
  red: {
    backgroundColor: DmxColors.RED,
  },
  blue: {
    backgroundColor: DmxColors.BLUE,
  },
  yellow: {
    backgroundColor: DmxColors.YELLOW,
  },
  lightGreen: {
    backgroundColor: DmxColors.GREEN,
  },
  selectedText: {
    color: DmxColors.WHITE,
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    color: DmxColors.GREYDARK,
    fontSize: fontSizes.small,
    textAlign: 'center',
  },
});

export default styles;
