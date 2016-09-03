import { StyleSheet } from 'react-native';
import APPDIMENSIONS from '../../common/constants/dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  columnWrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: APPDIMENSIONS.SCREEN_HEIGHT,
    width: APPDIMENSIONS.SCREEN_WIDTH,
  },
  mileageInputBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  input: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
    width: 200,
    height: 100,
  },
  textInputWrap: {
    width: 200,
    height: 100,
  },
  unitTextWrap: {
    alignSelf: 'center',
  },
  unitText: {
    fontSize: 15,
  },
  advanceButtonWrap: {
    flex: 1,
  },
  advanceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',

  },
  advanceButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
});

export default styles;
