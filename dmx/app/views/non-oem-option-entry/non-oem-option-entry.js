import React, { PropTypes } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  DeviceEventEmitter,
} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DMXCOLORS from '../../common/constants/colors';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import styles from './non-oem-option-entry.styles';
import { SUMMARY_CUSTOM_OPTION_ADDED } from '../summary/summary-events';

export default class NonOemOptionEntry extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      toView: 'options',
      keyboardShowing: false,
      optionName: '',
      placeholderText: '<Enter option name>',
    };
  }

  updateOptionName(optionName) {
    this.setState({
      optionName,
    });
  }

  turnToPreviousView() {
    DeviceEventEmitter.emit(SUMMARY_CUSTOM_OPTION_ADDED, { newOption: this.state.optionName });
    this.props.navigator.pop();
  }

  render() {
    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerShowLeftButton
        headerShowMenuButton
        headerText="Custom Equipment"
        collapseEnabled
        navigator={this.props.navigator}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.inputWrap}>
              <ScrollView
                keyboardShouldPersistTaps
                keyboardDismissMode="on-drag"
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showVerticalScrollIndicator={false}
                style={styles.scrollView}
              >
                <View style={styles.inputItemWrap}>
                  <Text style={styles.inputItemTextLabel}>Name</Text>
                  <TextInput
                    style={styles.textInput}
                    onBlur={() => this.setState({ placeholderText: '<Enter option name>' })}
                    onChangeText={(e) => this.updateOptionName(e)}
                    onFocus={() => this.setState({ placeholderText: '' })}
                    value={this.state.optionName}
                    clearButtonMode="while-editing"
                    placeholder={this.state.placeholderText}
                    placeholderTextColor={DMXCOLORS.GREYLIGHT}
                    autoCorrect={false}
                  />
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.saveBtn}>
          <DmxFullWidthButton
            buttonText="ADD"
            buttonAction={() => this.turnToPreviousView()}
            buttonIsActive={!!this.state.optionName}
          />
        </View>
      </DmxAppShell>
    );
  }
}
