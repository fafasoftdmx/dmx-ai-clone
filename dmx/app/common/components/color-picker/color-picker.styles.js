import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../constants/dimensions';
import DMX_COLORS from '../../../common/constants/colors';
import FONTSIZES from '../../constants/font-sizes';

const microSwatchWidthRatio = 0.08;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: FONTSIZES.h2,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 5,
  },
  colorSwatch: {
    width: APPDIMENSIONS.SCREEN_WIDTH / 3,
  },
  list: {
        // height: APPDIMENSIONS.SCREEN_HEIGHT,
        // width: APPDIMENSIONS.SCREEN_WIDTH
  },
  row: {
    width: APPDIMENSIONS.SCREEN_WIDTH,
    height: APPDIMENSIONS.SCREEN_HEIGHT / 10,
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    backgroundColor: DMX_COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomColor: DMX_COLORS.GREYLIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedRow: {
    backgroundColor: '#ECFBF6',
  },
  microSwatch: {
    width: APPDIMENSIONS.SCREEN_WIDTH * microSwatchWidthRatio,
    height: APPDIMENSIONS.SCREEN_WIDTH * microSwatchWidthRatio,
    borderRadius: (APPDIMENSIONS.SCREEN_WIDTH * microSwatchWidthRatio) / 2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: DMX_COLORS.GREYDARK,
  },
  text: {
    flex: 3,
    color: '#000000',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: FONTSIZES.body,
  },
  centeredSwatch: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default styles;
