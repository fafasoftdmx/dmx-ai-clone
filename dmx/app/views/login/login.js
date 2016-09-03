import React, { PropTypes } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import dmxService from '../../common/services/api/dmx-service';
import DMXCOLORS from '../../common/constants/colors';
import DmxAppStateService from '../../common/services/state/stateService';
import styles from './login.styles';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import logoPng from '../../assets/logo.png';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      inputHasError: false,
      errorMsg: '',
    };
  }

  async componentDidMount() {
    const userToken = await DmxAppStateService.getItem('dmxAuthToken');
    if (userToken) {
      this.navigateTo('appraisal-list');
    }
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

  executeLogin() {
    const { email, password } = this.state;

    if (this.verifyInputs()) {
      this.setState({
        inputHasError: false,
        errorMsg: '',
      });

      dmxService.login({ email, password }).then((response) => {
        if (response && response.status === 'success') {
          this.navigateTo('appraisal-list');
        } else {
          this.setState({
            inputHasError: true,
            errorMsg: 'Login unsuccessful with those credentials',
          });
        }
      }, () => {
        this.setState({
          inputHasError: true,
          errorMsg: 'An error occurred during login',
        });
      });
    } else {
      this.setState({
        inputHasError: true,
        errorMsg: 'Invalid email or password',
      });
    }
  }

  navigateTo(view) {
    if (view !== 'register' && !dmxService.isLoggedIn()) {
      return;
    }

    this.props.navigator.push({
      name: view,
    });
  }

  verifyInputs() {
    const regexp = /.+[.+\S]*@.+\..+/ig;
    if (regexp.test(this.state.email) && this.state.password.length > 6) {
      return true;
    }
    return false;
  }

  renderErrorComponent() {
    return (
      <View style={[styles.errorComponent, this.state.inputHasError && { opacity: 1 }]}>
        <View style={[styles.errorArrow]} />
        <View style={[styles.errorContainer]}>
          <Text style={styles.errorComponentText}>{this.state.errorMsg}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { inputHasError } = this.state;
    return (
      <DmxAppShell
        navigator={this.props.navigator}
        route={this.props.route}
        hasFooter={false}
        buttonText="LOGIN"
        toView="summary"
        buttonIsActive
        hasHeader={false}
        headerShowLeftButton={false}
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
            <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
              <View style={styles.loginLogoWrap}>
                <Image
                  source={logoPng}
                  style={styles.logo}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.dataInputWrap}>
              <View style={styles.summaryItemWrap}>
                <View style={styles.summaryItemBodyWrap}>
                  <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
                    <View style={styles.unitTextWrap}>
                      <Text
                        style={[
                          styles.summaryItemBodyListItemLabel,
                          inputHasError && { color: DMXCOLORS.RED },
                        ]}
                      >
                        Email
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={styles.textInputWrap} accessible={true}>
                    <TextInput
                      accessibilityLabel="USERNAME"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      keyboardType="email-address"
                      maxLength={50}
                      onChangeText={(email) => this.setUsername(email)}
                      onSubmitEditing={() => this.refs.password.focus()}
                      placeholderTextColor={inputHasError ? DMXCOLORS.RED : DMXCOLORS.GREYDARK}
                      returnKeyType="next"
                      style={[styles.input, inputHasError && { color: DMXCOLORS.RED }]}
                      value={this.state.email}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.summaryItemWrap}>
                <View style={styles.summaryItemBodyWrap}>
                  <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
                    <View style={styles.unitTextWrap}>
                      <Text
                        style={[
                          styles.summaryItemBodyListItemLabel,
                          inputHasError && { color: DMXCOLORS.RED },
                        ]}
                      >
                        Password
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={styles.textInputWrap} accessible={true}>
                    <TextInput
                      accessibilityLabel="PASSWORD"
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      keyboardType="default"
                      maxLength={20}
                      onChangeText={(password) => this.setPassword(password)}
                      onSubmitEditing={() => this.executeLogin()}
                      placeholderTextColor={inputHasError ? DMXCOLORS.RED : DMXCOLORS.GREYDARK}
                      ref="password"
                      returnKeyType="go"
                      secureTextEntry
                      style={[styles.input, inputHasError && { color: DMXCOLORS.RED }]}
                      value={this.state.password}
                    />
                  </View>
                </View>
              </View>
              <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
                {this.renderErrorComponent()}
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.loginButtonWrap}>
            <TouchableOpacity style={styles.button} onPress={() => this.executeLogin()}>
              <View>
                <Text style={styles.loginBtnText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DmxAppShell>
    );

    /*
    Registration not ready to be added to alpha dealer group
    Full registration onboarding flow is required with dealer id, etc

     <View style={styles.registerText}>
        <TouchableOpacity onPress={()=> this.navigateTo('registration')}>
            <Text style={styles.registerTextInner}>Register</Text>
        </TouchableOpacity>
     </View>
     */
  }
}

LoginView.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
