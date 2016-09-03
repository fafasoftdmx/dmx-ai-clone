import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../../common/constants/colors.js';
import FONTSIZES from '../../../common/constants/font-sizes.js';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  vehicleInfoWrap: {
    alignSelf: 'stretch',
    borderColor: DMXCOLORS.GREYLIGHT,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    margin: 20,
    padding: 10,
  },
  vehicleInfoString: {
    fontSize: FONTSIZES.h3,
    color: DMXCOLORS.BLACK,
    textAlign: 'center',
  },
  vinString: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.GREYDARK,
    textAlign: 'center',
  },
  carImage: {
    width: 250,
    height: 150,
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DMXCOLORS.GREYLIGHT,
  },
});

export default styles;
