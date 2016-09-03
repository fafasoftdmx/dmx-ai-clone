import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import styles from './../summary.styles';

const SummarySection = ({ label, children }) => (
  <View style={[styles.summaryItemBodyWrap]}>
    <View style={styles.summaryItemBodyListItemWrap}>
      <View style={styles.summaryItemWrapInner}>
        <Text style={styles.summaryItemBodyListItemLabel}>{label}</Text>
        {children}
      </View>
    </View>
  </View>);

SummarySection.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
};

export default SummarySection;
