import React, { PropTypes } from 'react';
import {
	View,
	ScrollView,
	Switch,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Image,
	Modal,
} from 'react-native';
import FullWidthButton from '../../common/components/full-width-button/full-width-button';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './carfax-login.styles';
import DMXCOLORS from '../../common/constants/colors';
import carfaxLogoPng from '../../assets/carfax-logo.png';
import userModel from '../../common/services/models/user-model';

export default class CarfaxLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      autoPurchaseReport: false,
      errorMsg: '',
      inputHasError: false,
      modalVisible: false,
      showUsernameLabel: false,
      showPasswordLabel: false,
    };

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
  }

  setUsername(username) {
    this.setState({ username });
  }

  setPassword(password) {
    this.setState({ password });
  }

  validateInput() {
    const { username, password } = this.state;
    const number = /\d+/g;
    const alphanum = /\w+/g;
    return username.length <= 12 &&
      password.length <= 5 &&
      number.test(password) &&
      alphanum.test(username);
  }

  async login() {
    if (!this.validateInput()) {
      this.setState({
        inputHasError: true,
        errorMsg: 'Check your credentials',
      });
      return;
    }

    this.setState({ inputHasError: false, errorMsg: '' });
    const { username, password } = this.state;
    try {
      await userModel.setCarfaxAccount(username, password);
      this.props.navigator.replace({ name: 'carfax-logout' });
    } catch (error) {
      this.setState({ errorMsg: 'Something bad happened' });
    }
  }

  updateAutoPurchase(setting) {
    if (!this.state.autoPurchaseReport && setting) {
      this.setState({ modalVisible: true, autoPurchaseReport: setting });
    } else {
      this.setState({ modalVisible: false, autoPurchaseReport: setting });
    }
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const {
      errorMsg,
      inputHasError,
      showUsernameLabel,
      showPasswordLabel,
    } = this.state;

    return (
      <DmxAppShell
        navigator={this.props.navigator}
        route={this.props.route}
        hasHeader
        headerShowLeftButton
        headerText="Carfax Settings"
      >
        <View style={styles.viewWrap}>
          <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.logoWrap}>
              <Image source={carfaxLogoPng} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.inputWrap}>
            <ScrollView
              keyboardShouldPersistTaps
              keyboardDismissMode="on-drag"
              scrollEnabled={false}
              showVerticalScrollIndicator={false}
            >
              <View
                style={[
                  styles.inputItemWrap,
                  showUsernameLabel && { borderBottomColor: DMXCOLORS.BLUE },
                ]}
              >
                <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
                  <View style={styles.inputItemTextWrap}>
                    <Text
                      style={[
                        styles.inputItemTextLabel,
                        inputHasError && { color: DMXCOLORS.RED },
                        showUsernameLabel && { opacity: 1 },
                      ]}
                    >
                      Username
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    maxLength={50}
                    onBlur={() => this.setState({ showUsernameLabel: false })}
                    onChangeText={(email) => this.setUsername(email)}
                    onFocus={() => this.setState({ showUsernameLabel: true })}
                    onSubmitEditing={() => this.refs.password.focus()}
                    placeholder={showUsernameLabel ? '' : 'Username'}
                    placeholderTextColor={inputHasError ? DMXCOLORS.RED : DMXCOLORS.GREYDARK}
                    returnKeyType="next"
                    style={styles.textInput}
                    value={this.state.email}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.inputItemWrap,
                  showPasswordLabel && { borderBottomColor: DMXCOLORS.BLUE },
                ]}
              >
                <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
                  <View style={styles.inputItemTextWrap}>
                    <Text
                      style={[
                        styles.inputItemTextLabel,
                        inputHasError && { color: DMXCOLORS.RED },
                        showPasswordLabel && { opacity: 1 },
                      ]}
                    >
                      Password
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="default"
                    maxLength={50}
                    onBlur={() => this.setState({ showPasswordLabel: false })}
                    onChangeText={(password) => this.setPassword(password)}
                    onFocus={() => this.setState({ showPasswordLabel: true })}
                    onSubmitEditing={() => this.login()}
                    placeholder={showPasswordLabel ? '' : 'Password'}
                    placeholderTextColor={inputHasError ? DMXCOLORS.RED : DMXCOLORS.GREYDARK}
                    ref="password"
                    returnKeyType="next"
                    secureTextEntry
                    style={styles.textInput}
                    value={this.state.password}
                  />
                </View>
              </View>
            </ScrollView>
            <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
              <View style={styles.purchaseToggleWrap}>
                <Text style={styles.purchaseToggleText}>
                  {`Automatically purchase report\nif not in my history.`}
                </Text>
                <Switch
                  value={this.state.autoPurchaseReport}
                  onValueChange={(value) => this.updateAutoPurchase(value)}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {
            this.state.inputHasError &&
              <View style={styles.errorWrap}>
                <Text style={styles.errorText}>
                  {errorMsg}
                </Text>
              </View>
          }
          <View style={styles.btnWrap}>
            <FullWidthButton
              buttonIsActive
              buttonAction={() => this.login()}
              buttonColor="BLUE"
              buttonText="LOGIN"
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          onRequestClose={() => this.closeModal()}
          transparent
          visible={this.state.modalVisible}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalWrap}>
              <Text style={styles.explanation}>
                Are you sure you want to enable auto-purchase of Carfax reports?
              </Text>
              <View style={styles.modalButtonWrap}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({ autoPurchaseReport: true });
                    this.closeModal();
                  }}
                  underlayColor={DMXCOLORS.GREYLIGHT1}
                  style={styles.modalBtn}
                >
                  <Text style={styles.confirmBtnText}>YES, ENABLE</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.modalButtonWrap}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({ autoPurchaseReport: false });
                    this.closeModal();
                  }}
                  underlayColor={DMXCOLORS.GREYLIGHT1}
                  style={styles.modalBtn}
                >
                  <Text style={styles.cancelBtnText}>CANCEL</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </DmxAppShell>
    );
  }
}

CarfaxLogin.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
