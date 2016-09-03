import React, { PropTypes } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import styles from './odometer.styles';
import dmxAppStateService from '../../common/services/state/stateService';

export default class DmxOdometerView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      mileage: '',
    };
  }

  advanceToRatings() {
    dmxAppStateService.setItem('mileage', String(this.state.mileage));
    this.props.navigator.push({
      name: 'equipment',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.columnWrap}>
            <View style={styles.mileageInputBlock}>
              <View style={styles.textInputWrap}>
                <TextInput
                  style={styles.input}
                  onChangeText={(mileage) => this.setState({ mileage })}
                  value={this.state.mileage}
                  keyboardType="numeric"
                  placeholder="1000"
                  placeholderTextColor="#000000"
                  autoCorrect={false}
                  maxLength={6}
                />
              </View>
              <View style={styles.unitTextWrap}>
                <Text style={styles.unitText}>miles</Text>
              </View>
            </View>
            <View style={styles.advanceButtonWrap}>
              <TouchableOpacity onPress={() => this.advanceToRatings()}>
                <View style={styles.advanceButton} />
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }

}
