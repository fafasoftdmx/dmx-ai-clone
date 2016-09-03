import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import DMXCOLORS from '../../../common/constants/colors.js';
import styles from './appraisal-sort-group.styles';
import circlePng from '../../../assets/circle.png';
import checkmarkPng from '../../../assets/checkmark.png';

export const AppraisalSortGroup = (props) => {
  const { selected = {} } = props;
  const { name, field, options, numeric } = props.sortInfo;

  return (
    <View style={styles.container}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupHeaderText}>{name}</Text>
      </View>
      {
        options.map((option, index) => {
          const isSelected = (field === selected.field &&
            option.value === selected.option.value);
          return (
            <View key={index}>
              <TouchableHighlight
                onPress={() => props.onSelectOption({ field, option, numeric })}
                underlayColor={DMXCOLORS.GREYLIGHT}
              >
                <View style={styles.option}>
                  <Text style={isSelected && styles.optionTextSelected}>
                    {option.name}
                  </Text>
                  <Image source={isSelected ? checkmarkPng : circlePng} />
                </View>
              </TouchableHighlight>
            </View>
          );
        })
      }
    </View>
  );
};

AppraisalSortGroup.propTypes = {
  sortInfo: PropTypes.object,
  selected: PropTypes.object,
  onSelectOption: PropTypes.func,
};

export default AppraisalSortGroup;
