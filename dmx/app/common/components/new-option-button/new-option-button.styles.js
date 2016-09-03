import { StyleSheet } from 'react-native';
import DMXCOLORS from '../../constants/colors';

export default StyleSheet.create({
  addCustomOptionButtonContainer: {
    borderBottomWidth: 0.5,
    borderColor: DMXCOLORS.GREYLIGHT,
  },
  addCustomOptionButton: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 16,
  },
  plusIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  addCustomOptionButtonLabel: {
    fontSize: 20,
    flex: 1,
    color: DMXCOLORS.BLUE,
  },
});
