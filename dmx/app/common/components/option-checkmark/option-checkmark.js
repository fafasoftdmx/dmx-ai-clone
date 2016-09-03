import React, { PropTypes } from 'react';
import { View, Image } from 'react-native';
import styles from './option-checkmark.styles';
const checkmarkAloneAsset = require('../../../assets/checkmark_alone@2x.png');

const CheckMark = ({ selected, style }) => (
  <View
    style={[
      style,
      styles.optionStateIndicator,
      selected && styles.optionStateIndicatorSelection,
    ]}
  >
    {selected && <Image
      style={{ width: 9, height: 7 }}
      source={checkmarkAloneAsset}
    />}
  </View>
);

CheckMark.propTypes = {
  selected: PropTypes.bool.isRequired,
  style: PropTypes.any,
};

export const SquareCheckmark = ({ selected }) => (
  <CheckMark selected={selected} style={styles.squareIndicator} />
);

SquareCheckmark.propTypes = {
  selected: PropTypes.bool,
};

export const RoundCheckmark = ({ selected }) => (
  <CheckMark selected={selected} style={styles.roundIndicator} />
);

RoundCheckmark.propTypes = {
  selected: PropTypes.bool,
};
