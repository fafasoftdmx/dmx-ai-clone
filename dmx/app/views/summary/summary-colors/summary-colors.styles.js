import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';
import DMXCOLORS from '../../../common/constants/colors';

const MICROSWATCHWIDTHRATIO = 0.08;

const styles = StyleSheet.create({
  microSwatch: {
    borderColor: DMXCOLORS.GREYDARK,
    borderRadius: (APPDIMENSIONS.SCREEN_WIDTH * MICROSWATCHWIDTHRATIO) / 2,
    borderStyle: 'solid',
    borderWidth: 1,
    height: APPDIMENSIONS.SCREEN_WIDTH * MICROSWATCHWIDTHRATIO,
    marginRight: 10,
    width: APPDIMENSIONS.SCREEN_WIDTH * MICROSWATCHWIDTHRATIO,
  },
});

export default styles;
