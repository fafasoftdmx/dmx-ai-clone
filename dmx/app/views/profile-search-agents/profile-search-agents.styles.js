import { StyleSheet, PixelRatio } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const SCREEN_WIDTH = APPDIMENSIONS.SCREEN_WIDTH;
const SCREEN_HEIGHT = APPDIMENSIONS.SCREEN_HEIGHT;

const styles = StyleSheet.create({
  addSearchAgentWrap: {
    marginTop: 20,
    marginBottom: 10,
  },
  addSearchAgentText: {
    textAlign: 'center',
    color: DMXCOLORS.BLUE,
  },
  searchAgentsPageWrap: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flexDirection: 'column',
  },
  searchAgentsWrap: {
    flex: 1,
  },
  leftAlign: {
    flex: 0.5,
  },
  userName: {
    textAlign: 'center',
    marginTop: 75,
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.body,
  },
  userPhoneNumber: {
    textAlign: 'center',
    marginTop: 5,
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.xsmall,
  },
  summaryItemWrap: {
    width: SCREEN_WIDTH,
    flexDirection: 'column',
  },
  summaryItemWrapInner: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  summaryItemHeaderWrap: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  switchItem: {
    paddingTop: 7,
    paddingBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryItemHeaderText: {
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.small,
    flex: 0.5,
  },
  summaryItemHeaderArrow: {
    flex: 0.05,
  },
  summaryItemBodyWrap: {
    flexDirection: 'column',
  },
  summaryItemBodyListItemWrap: {
    borderBottomColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  summaryItemBodyListItemLabel: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.GREYDARK,
  },
  summaryItemBodyListItemValue: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.BLACK,
  },
  row: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 10,
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    backgroundColor: DMXCOLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: DMXCOLORS.GREY_CONTENT_BORDER,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    flex: 3,
    color: '#000000',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: FONTSIZES.body,
  },
});

export default styles;
