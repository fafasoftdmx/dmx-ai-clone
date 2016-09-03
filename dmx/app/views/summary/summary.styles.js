import { StyleSheet, PixelRatio } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';
import DMXCOLORS from '../../common/constants/colors';
import FONTSIZES from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  summaryItemWrap: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
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
    paddingTop: 30,
  },
  summaryItemHeaderText: {
    color: DMXCOLORS.BLUE,
    fontSize: FONTSIZES.body,
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
    width: APPDIMENSIONS.SCREEN_WIDTH,
    height: APPDIMENSIONS.SCREEN_HEIGHT / 10,
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
    marginLeft: 10,
    fontSize: FONTSIZES.body,
  },
  bold: {
    fontWeight: 'bold',
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
    color: '#000000',
    paddingRight: 10,
    fontSize: FONTSIZES.body,
  },
  centeredSwatch: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default styles;
