import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../../common/constants/dimensions';
import DMXCOLORS from '../../../common/constants/colors';
import FONTSIZES from '../../../common/constants/font-sizes';

const styles = StyleSheet.create({
  permissionsIcon: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: DMXCOLORS.BLACK,
    opacity: 1,
    justifyContent: 'center',
    paddingTop: APPDIMENSIONS.SCREEN_HEIGHT * 0.25,
    paddingLeft: APPDIMENSIONS.SCREEN_WIDTH * 0.1,
    paddingRight: APPDIMENSIONS.SCREEN_WIDTH * 0.1,
    paddingBottom: APPDIMENSIONS.SCREEN_HEIGHT * 0.25,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: DMXCOLORS.FLATWHITE,
    borderRadius: 5,
    alignItems: 'center',
  },
  innerContainerTextWrapper: {
    flex: 0.8,
    padding: 10,
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: FONTSIZES.small,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  modalBodyText: {
    fontSize: FONTSIZES.small,
    textAlign: 'center',
    paddingTop: 10,
  },
  modalButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: APPDIMENSIONS.SCREEN_HEIGHT * 0.075,
    justifyContent: 'center',
    flex: 0,
  },
  modalButton: {
    width: (APPDIMENSIONS.SCREEN_WIDTH - APPDIMENSIONS.SCREEN_WIDTH * 0.2) / 2,
    height: APPDIMENSIONS.SCREEN_HEIGHT * 0.075,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    // borderTopColor: DMXCOLORS.GREY_CONTENT_BORDER,
    // borderTopWidth: 1
  },
  modalButtonPrimary: {
    alignItems: 'center',
    backgroundColor: DMXCOLORS.BLUE,
    borderBottomRightRadius: 5,
  },
  modalButtonPrimaryText: {
    color: DMXCOLORS.FLATWHITE,
  },
  modalButtonSecondary: {
    backgroundColor: DMXCOLORS.FLATWHITE,
    borderBottomLeftRadius: 5,
  },
  modalButtonSecondaryText: {
    color: DMXCOLORS.GREYDARK,
  },
});

export default styles;
