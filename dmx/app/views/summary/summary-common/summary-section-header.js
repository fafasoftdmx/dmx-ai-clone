import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import styles from './../summary.styles';

const SummarySectionHeader = ({ children }) => (
  <View style={styles.summaryItemHeaderWrap}>
    <Text style={styles.summaryItemHeaderText}>{children}</Text>
  </View>
);

SummarySectionHeader.propTypes = {
  children: PropTypes.array.isRequired,
};

export default SummarySectionHeader;
