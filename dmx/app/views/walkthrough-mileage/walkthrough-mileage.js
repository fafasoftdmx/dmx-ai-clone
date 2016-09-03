import React, { PropTypes } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import numeral from 'numeral';
import appraisalModel from '../../common/services/models/appraisal-model';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './walkthrough-mileage.styles';
import DMXCOLORS from '../../common/constants/colors.js';
import TextInputError from '../../common/components/textinput-errordisplay';

export default class WalkthroughMileage extends React.Component {

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      vin: '',
      mileage: '',
      errorText: '',
      inputHasError: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  setMileage(strMileage) {
    const mileage = strMileage || false;
    this.setState({ mileage });
  }

  async fetchData() {
    let mileage = await appraisalModel.getMileage();
    mileage = numeral().unformat(mileage);
    this.setState({
      mileage,
    });
  }

  closeSelf() {
    if (!this.valid()) {
      return;
    }
    const mileageValue = numeral(this.state.mileage).value();
    appraisalModel.saveOdometer(mileageValue);
    this.props.closeModal();
  }

  valid() {
    let { mileage } = this.state;
    mileage = numeral(mileage).value();
    const isValid = typeof mileage === 'number' && mileage > 0;
    this.setState({
      inputHasError: !isValid,
      errorText: 'Mileage should be greater than 0!',
    });
    return isValid;
  }

  render() {
    const { mileage, inputHasError, errorText } = this.state;
    return (
      <Modal
        animationType="none"
        onRequestClose={() => this.closeSelf()}
        transparent
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            dismissKeyboard();
            this.closeSelf();
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalWrap}>
              <ScrollView
                keyboardShouldPersistTaps
                keyboardDismissMode="on-drag"
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showVerticalScrollIndicator={false}
                style={styles.scrollView}
              >
                <View style={styles.inputItemWrap}>
                  <View style={styles.inputItemTextWrap}>
                    <Text style={styles.inputItemTextLabel}>Mileage</Text>
                  </View>
                  <View>
                    <TextInput
                      autoCorrect={false}
                      autoFocus
                      clearButtonMode="while-editing"
                      keyboardType="numeric"
                      maxLength={7}
                      onBlur={() => this.setState({
                        placeholderText: '0',
                        errorText: '',
                      })}
                      onChangeText={(input) => {
                        this.setState({ inputHasError: false });
                        this.setMileage(input);
                      }}
                      onFocus={() => this.setState({ placeholderText: '' })}
                      onSubmitEditing={() => this.closeSelf()}
                      placeholder="<Tap to enter mileage>"
                      placeholderTextColor={inputHasError ? DMXCOLORS.RED : DMXCOLORS.GREYLIGHT}
                      returnKeyType="go"
                      style={[styles.textInput, inputHasError && { color: DMXCOLORS.RED }]}
                      value={String(mileage).length > 0 ? numeral(mileage).format('0,0') : ''}
                    />
                  </View>
                  {
                    inputHasError &&
                      <TextInputError hasError={inputHasError} errorText={errorText} />
                  }
                </View>
              </ScrollView>
              <View style={styles.modalButtonWrap}>
                <TouchableHighlight
                  onPress={() => this.closeSelf()}
                  underlayColor={DMXCOLORS.GREYLIGHT1}
                  style={styles.modalBtn}
                >
                  <Text style={styles.confirmBtnText}>SAVE</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
