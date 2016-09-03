import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';
import FONTSIZES from '../../../common/constants/font-sizes';
import DMXCOLORS from '../../../common/constants/colors';

const styles = StyleSheet.create({
  noAppraisalsWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  noAppraisalsImage: {
    marginBottom: 30,
  },
  noAppraisalsHeaderText: {
    color: DMXCOLORS.BLACK,
    fontSize: FONTSIZES.h2,
    padding: 5,
    marginBottom: 5,
  },
  noAppraisalsBodyText: {
    color: DMXCOLORS.GREYDARK,
    fontSize: FONTSIZES.small,
    paddingLeft: (APPDIMENSIONS.SCREEN_WIDTH / 6),
    paddingRight: (APPDIMENSIONS.SCREEN_WIDTH / 6),
    textAlign: 'center',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.RED,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 75,
  },
  deleteBtnText: {
    alignSelf: 'center',
    bottom: 0,
    color: DMXCOLORS.WHITE,
    textAlign: 'center',
    top: 0,
    width: 75,
  },
});

export default styles;
