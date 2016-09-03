import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import summaryStyles from './../../summary/summary.styles';
import { RoundCheckmark } from '../../../common/components/option-checkmark/option-checkmark';
import styles from './common.styles';

const OptionListEntry = ({ label, onPress, selected }) => (
  <View style={styles.listElementWrapper}>
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          summaryStyles.summaryItemWrapInner,
          styles.container,
        ]}
      >
        <Text style={styles.optionLabel}>{label}</Text>
        <RoundCheckmark selected={selected} />
      </View>
    </TouchableOpacity>
  </View>
);

OptionListEntry.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default OptionListEntry;
