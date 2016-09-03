import React, { PropTypes } from 'react';
import { View } from 'react-native';
import DmxFullWidthButton from './../full-width-button/full-width-button';
import styles from './view-with-footer.styles';
import commonStyles from '../../styles/common.styles';

const DmxViewWithFooter = () => (
  <View style={commonStyles.nestedListViewWrap}>
    {this.props.children}
    <View style={styles.footerWrap}>
      <DmxFullWidthButton
        navigator={this.props.navigator}
        toView={this.props.toView}
        buttonText={this.props.buttonText}
        dataToPass={this.props.dataToPass}
      />
    </View>
  </View>
);

DmxViewWithFooter.propTypes = {
  navigator: PropTypes.object.isRequired,
  toView: PropTypes.any.isRequired,
  buttonText: PropTypes.string,
  dataToPass: PropTypes.any,
  children: PropTypes.any,
};

export default DmxViewWithFooter;
