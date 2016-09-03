import { StyleSheet } from 'react-native';
import DMXCOLORS from '../constants/colors';
import FONTSIZES from '../constants/font-sizes';
import APPDIMENSIONS from '../constants/dimensions';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: DMXCOLORS.WHITE,
  },
  innerContainer: {
    flex: 1,
  },
  contentsCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONTSIZES.body,
  },
  nestedListViewWrap: {
    flex: 1,
  },
  listViewRow: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
    height: APPDIMENSIONS.SCREEN_HEIGHT / 12,
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: DMXCOLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: DMXCOLORS.GREYLIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default commonStyles;
