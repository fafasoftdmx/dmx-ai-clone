import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './new-option-button.styles.js';
const addAsset = require('../../../assets/add_icon.png');

const NewOptionButton = ({ onPress, style, text }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <View style={styles.addCustomOptionButtonContainer}>
      <View style={[styles.addCustomOptionButton]}>
        <Text style={styles.addCustomOptionButtonLabel}>{text}</Text>
        <Image
          source={addAsset}
          style={styles.plusIcon}
        />
      </View>
    </View>
  </TouchableOpacity>
);

NewOptionButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.any,
  text: PropTypes.string,
};

export default NewOptionButton;
