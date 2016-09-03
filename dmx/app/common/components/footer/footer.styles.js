import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../constants/dimensions';
const FOOTERRATIO = 0.075;

const styles = StyleSheet.create({
  footerWrap: {
    height: APPDIMENSIONS.SCREEN_HEIGHT * FOOTERRATIO,
    alignItems: 'stretch',
    flexDirection: 'column',
  },
});

export default styles;
