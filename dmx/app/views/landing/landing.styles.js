import { StyleSheet } from 'react-native';
import fontSizes from '../../common/constants/font-sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: fontSizes.h2,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'System',

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 5,
  },
  marginTop: {
    marginTop: 10,
  },
  text: {
    fontSize: fontSizes.body,
  },
});

export default styles;
