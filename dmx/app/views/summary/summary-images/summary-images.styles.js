import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';

const styles = StyleSheet.create({
  summaryItemImagesWrap: {
    height: 75,
    width: APPDIMENSIONS.SCREEN_WIDTH - 15,
  },
  vehicleImagesWrap: {
    paddingTop: 5,
    paddingLeft: 15,
    height: 75,
    flexDirection: 'row',
  },
  vehicleImageWrap: {

  },
  vehicleImage: {
    borderRadius: 4,
    width: 75,
    height: 75,
    marginRight: 5,
  },

});

export default styles;
