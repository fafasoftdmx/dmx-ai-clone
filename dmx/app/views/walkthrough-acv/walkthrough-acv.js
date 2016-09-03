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
import styles from './walkthrough-acv.styles';
import DMXCOLORS from '../../common/constants/colors.js';

export default class WalkthroughAcv extends React.Component {

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
      acv: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  setAcv(strAcv) {
    const acv = strAcv || false;
    this.setState({ acv });
  }

  async fetchData() {
    let acv = await appraisalModel.getAcv();
    acv = numeral().unformat(acv);
    this.setState({
      acv,
    });
  }

  closeSelf() {
    const acvValue = numeral(this.state.acv).value();
    appraisalModel.saveAcv(acvValue);
    this.props.closeModal();
  }

  render() {
    const { acv } = this.state;
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
                    <Text style={styles.inputItemTextLabel}>ACV</Text>
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
                      onChangeText={(acvInput) => this.setAcv(acvInput)}
                      onFocus={() => this.setState({ placeholderText: '' })}
                      onSubmitEditing={() => this.advanceToGroups()}
                      placeholder="<Tap to enter ACV>"
                      placeholderTextColor={DMXCOLORS.GREYLIGHT}
                      returnKeyType="go"
                      style={styles.textInput}
                      value={String(acv).length > 0 ? numeral(acv).format('$0,0') : ''}
                    />
                  </View>
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
