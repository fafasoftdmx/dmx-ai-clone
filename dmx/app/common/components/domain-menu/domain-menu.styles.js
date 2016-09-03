import { StyleSheet } from 'react-native';
import DMXCOLORS from './../../constants/colors';
import appDimensions from './../../constants/dimensions';

const styles = StyleSheet.create({
  menuWrap: {
    flex: 1,
    backgroundColor: DMXCOLORS.BLACK,
    paddingTop: 20,
  },
  listItem: {
    height: appDimensions.SCREEN_HEIGHT / 8,
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    paddingLeft: 30,
    backgroundColor: DMXCOLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'flex-start',
        // borderBottomColor: DMXCOLORS.GREYDARK,
        // borderBottomWidth: StyleSheet.hairlineWidth
  },
  activeVehicle: {
    borderLeftColor: DMXCOLORS.GREEN,
    borderLeftWidth: 5,
    paddingLeft: 25,
  },
  vehicleText: {
    color: DMXCOLORS.WHITE,
  },
});

export default styles;
