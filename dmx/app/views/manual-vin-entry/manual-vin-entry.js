import React, { PropTypes } from 'react';
import { Text, TextInput, View, ScrollView } from 'react-native';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import styles from './manual-vin-entry.styles.js';
import * as vinUtils from '../../common/lib/vin-util';
import DmxAppShell from '../../common/components/app-shell/app-shell';

export default class DmxManualVinEntryView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const vin = '';
    this.state = {
      vin, // please to add a test vin, edit variable above!
      buttonIsActive: vinUtils.validate(vin),
      keyboardShowing: false,
      placeholderText: '1GCGTCE33F1217586',
      errorText: '',
    };
  }

  advanceToConfirm() {
    this.props.navigator.push({
      name: 'vin-scan-confirm',
      data: { vin: this.state.vin },
    });
  }

  updateVinState(vin) {
    let buttonIsActive = vin && vin.length === 17;
    let errorText = '';
    const dataToPassToView = { vin };
    if (vin.length === 17) {
      buttonIsActive = vinUtils.validate(vin);
      if (!buttonIsActive) {
        errorText = 'Whoa! Something is wrong. Double-check that VIN!';
      }
    } else {
      errorText = `${17 - vin.length} characters remaining`;
    }
    this.setState({ vin: vin.toUpperCase(), buttonIsActive, errorText, dataToPassToView });
  }

  render() {
    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerShowLeftButton
        headerShowMenuButton
        collapseEnabled
        toView={this.state.toView}
        dataToPass={this.state.dataToPassToView}
        navigator={this.props.navigator}
        headerText="Submit VIN"
      >
        <View style={[styles.container]}>
          <View style={styles.inputWrap}>
            <ScrollView
              keyboardShouldPersistTaps
              keyboardDismissMode="on-drag"
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showVerticalScrollIndicator={false}
            >
              <View style={styles.inputItemWrap}>
                <View style={styles.inputItemTextWrap}>
                  <Text style={styles.inputItemTextLabel}>VIN</Text>
                </View>
                <View>
                  <TextInput
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="default"
                    maxLength={17}
                    onBlur={() => this.setState({
                      placeholderText: '1GCGTCE33F1217586',
                      errorText: '',
                    })}
                    onChangeText={(vin) => this.updateVinState(vin)}
                    onFocus={() => this.setState({ placeholderText: '' })}
                    onSubmitEditing={() => this.advanceToConfirm()}
                    placeholder={this.state.placeholderText}
                    placeholderTextColor="#cacdcd"
                    returnKeyType="go"
                    style={styles.textInput}
                    value={this.state.vin}
                  />
                </View>
              </View>
              {
                this.state.errorText.length > 0 &&
                  <View style={styles.errorWrap}>
                    <Text style={styles.errorText}>{this.state.errorText}</Text>
                  </View>
              }
            </ScrollView>
          </View>
        </View>
        <DmxFullWidthButton
          buttonIsActive={this.state.buttonIsActive}
          buttonAction={() => this.advanceToConfirm()}
          buttonText="SAVE"
          buttonColor="BLUE"
        />
      </DmxAppShell>
    );
  }
}
