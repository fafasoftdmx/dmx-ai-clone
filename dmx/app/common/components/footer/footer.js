import React from 'react';
import { View } from 'react-native';
import styles from './footer.styles';
import DmxFullWidthButton from '../full-width-button/full-width-button';

export default class DmxFooter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  buildFooter() {
    const footerTemplate = (
      <View style={styles.footerWrap}>
        <DmxFullWidthButton {...this.props} />
      </View>
    );
    return footerTemplate;
  }

  render() {
    const footerTemplate = this.buildFooter();
    return footerTemplate;
  }

}
