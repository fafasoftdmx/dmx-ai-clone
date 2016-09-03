import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../common/constants/colors.js';
import FONTSIZES from '../../common/constants/font-sizes.js';
import APPDIMENSIONS from '../../common/constants/dimensions';

const HEADERRATIO = 0.075;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: 40,
    marginBottom: 40,
    width: 300,
    height: 200,
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: DMXCOLORS.GREYLIGHT,
  },
  explanationText: {
    fontSize: FONTSIZES.body,
    color: DMXCOLORS.GREYDARK,
    lineHeight: 25,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  buttons: {
    flex: 1,
    height: APPDIMENSIONS.SCREEN_HEIGHT * HEADERRATIO,
  },
});

export default styles;
