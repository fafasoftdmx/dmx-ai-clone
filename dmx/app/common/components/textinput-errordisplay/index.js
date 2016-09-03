import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './index.styles';

const TextInputError = ({ hasError, errorText }) => (
  <View style={[styles.errorComponent, hasError && { opacity: 1 }]}>
    <View style={[styles.errorArrow]} />
    <View style={[styles.errorContainer]}>
      <Text style={styles.errorComponentText}>{errorText}</Text>
    </View>
  </View>
);

TextInputError.propTypes = {
  hasError: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
};

export default TextInputError;
