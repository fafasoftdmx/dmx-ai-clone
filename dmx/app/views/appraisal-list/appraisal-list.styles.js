import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';

const styles = StyleSheet.create({
  appraisalListMenu: {
    position: 'absolute',
    top: 0,
  },
  appraisalListView: {
    flex: 1,
    height: APPDIMENSIONS.SCREEN_HEIGHT * 0.84 - 50,
    position: 'absolute',
    top: 40,
  },
  appraisalListWrap: {
    flex: 1,
  },
  newAppraisalBtn: {
    bottom: 0,
    position: 'absolute',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
});

export const TEST_VALUE_6 = 'testValue';

export default styles;
