import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import dmxService from '../../common/services/api/dmx-service';
import DMXCOLORS from '../../common/constants/colors';
import styles from './registration.styles';

export default class RegistrationView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      inputHasError: false,
      errorMsg: '',
    };
  }

  setFirstname(firstName) {
    this.setState({
      firstName,
    });
  }

  setLastname(lastName) {
    this.setState({
      lastName,
    });
  }

  setUsername(email) {
    this.setState({
      email,
    });
  }

  setPassword(password) {
    this.setState({
      password,
    });
  }

  verifyInputs() {
    if (this.state.firstName.length === 0 || this.state.lastName.length === 0) {
      this.setState({
        errorMsg: 'Enter first and last name',
        inputHasError: true,
      });
      return false;
    }

    if (!this.emailValid(this.state.email)) {
      this.setState({
        errorMsg: 'Invalid email address',
        inputHasError: true,
      });
      return false;
    }

    if (!this.passwordValid(this.state.password)) {
      this.setState({
        errorMsg: 'Password must be minimum 8 characters and contain an uppercase,' +
        ' lowercase and symbol character',
        inputHasError: true,
      });
      return false;
    }

    this.setState({
      errorMsg: '',
      inputHasError: false,
    });
    return true;
  }

  emailValid(email) {
    const regexp = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|io|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return regexp.test(email);
  }

  passwordValid(password) {
    const upper = /[A-Z]/g;
    const number = /[0-9]/g;
    const symbol = /[$-/:-?{-~!"^_`\\[\]]/g;
    return password.length >= 8 &&
            upper.test(password) &&
            number.test(password) &&
            symbol.test(password);
  }

  executeRegistration() {
    if (this.verifyInputs()) {
      const registerCreds = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      };

      dmxService.registerUser(registerCreds).then((response) => {
        console.log('registration response is', response);
        this.props.navigator.replace({
          name: 'appraisal-list',
        });
      }, (error) => {
        console.log('registration error', error);
        this.setState({
          errorMsg: 'An error occurred during registration',
          inputHasError: true,
        });
      });
    }
  }

  renderErrorComponent() {
    return (
      <View style={styles.errorComponent}>
        <Text style={styles.errorComponentText}>{this.state.errorMsg}</Text>
      </View>
    );
  }

  render() {
    const { navigator, route } = this.props;
    return (
      <DmxAppShell
        navigator={navigator}
        route={route}
        hasFooter={false}
        buttonText="Register"
        toView="summary"
        buttonIsActive
        hasHeader
        headerShowLeftButton
        headerShowRightButton={false}
      >
        <ScrollView
          keyboardShouldPersistTaps
          keyboardDismissMode="on-drag"
          scrollEnabled={false}
          showVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.loginWrap}>
            <View style={styles.dataInputWrap}>
              <View style={styles.summaryItemWrap}>
                <View style={styles.summaryItemBodyWrap}>
                  <View style={styles.unitTextWrap}>
                    <Text style={styles.summaryItemBodyListItemLabel}>First Name</Text>
                  </View>
                  <View style={styles.textInputWrap}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(firstName) => this.setFirstname(firstName)}
                      value={this.state.firstName}
                      autoCapitalize="words"
                      keyboardType="default"
                      clearButtonMode="while-editing"
                      placeholderTextColor={DMXCOLORS.GREYDARK}
                      autoCorrect={false}
                      maxLength={30}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.summaryItemWrap}>
                <View style={styles.summaryItemBodyWrap}>
                  <View style={styles.unitTextWrap}>
                    <Text style={styles.summaryItemBodyListItemLabel}>Last Name</Text>
                  </View>
                  <View style={styles.textInputWrap}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(lastName) => this.setLastname(lastName)}
                      value={this.state.lastName}
                      autoCapitalize="words"
                      keyboardType="default"
                      clearButtonMode="while-editing"
                      placeholderTextColor={DMXCOLORS.GREYDARK}
                      autoCorrect={false}
                      maxLength={30}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.summaryItemWrap}>
                <View style={styles.summaryItemBodyWrap}>
                  <View style={styles.unitTextWrap}>
                    <Text style={styles.summaryItemBodyListItemLabel}>E-Mail</Text>
                  </View>
                  <View style={styles.textInputWrap}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(email) => this.setUsername(email)}
                      value={this.state.email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      clearButtonMode="while-editing"
                      placeholderTextColor={DMXCOLORS.GREYDARK}
                      autoCorrect={false}
                      maxLength={50}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.summaryItemWrap}>
                <View style={styles.summaryItemBodyWrap}>
                  <View style={styles.unitTextWrap}>
                    <Text style={styles.summaryItemBodyListItemLabel}>Password</Text>
                  </View>
                  <View style={styles.textInputWrap}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(password) => this.setPassword(password)}
                      value={this.state.password}
                      autoCapitalize="none"
                      keyboardType="default"
                      clearButtonMode="while-editing"
                      placeholderTextColor={DMXCOLORS.GREYDARK}
                      autoCorrect={false}
                      maxLength={20}
                      secureTextEntry
                    />
                  </View>
                </View>
              </View>
              {this.state.inputHasError && this.renderErrorComponent()}
            </View>
          </View>
          <View style={styles.loginButtonWrap}>
            <TouchableOpacity style={styles.button} onPress={() => this.executeRegistration()}>
              <View>
                <Text style={styles.loginBtnText}>REGISTER</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DmxAppShell>
    );
  }
}

