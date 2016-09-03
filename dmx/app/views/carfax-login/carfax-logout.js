import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import FullWidthButton from '../../common/components/full-width-button/full-width-button';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './carfax-logout.styles';
import carfaxLogoPng from '../../assets/carfax-logo.png';
import userModel from '../../common/services/models/user-model';

export default class CarfaxLogout extends React.Component {
  constructor() {
    super();
    this.state = {
      carfaxUsername: '',
      errorMsg: '',
    };
  }

  componentWillMount() {
    this.fetchCarfaxCredentials();
  }

  async fetchCarfaxCredentials() {
    const carfaxUsername = (await userModel.getCarfaxAccount()).username;
    this.setState({ carfaxUsername });
  }

  async logout() {
    try {
      await userModel.removeCarfaxAccount();
      this.props.navigator.replace({ name: 'carfax-login' });
    } catch (error) {
      this.setState({ errorMsg: 'There was an error removing the account' });
    }
  }

  render() {
    return (
      <DmxAppShell
        navigator={this.props.navigator}
        route={this.props.route}
        hasHeader
        headerShowLeftButton
        headerText="Carfax Settings"
      >
        <View style={styles.viewWrap}>
          <View>
            <View style={styles.logoWrap}>
              <Image source={carfaxLogoPng} />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.accountText}>
                You are logged in to your Carfax account
                [<Text style={styles.accountHighlight}>
                  {this.state.carfaxUsername}
                </Text>].
                If you want to change accounts or remove this account, press button below.
              </Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.errorText}>
                {this.state.errorMsg}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.btnWrap}>
          <FullWidthButton
            buttonIsActive
            buttonAction={() => this.logout()}
            buttonColor="RED"
            buttonText="LOGOUT"
          />
        </View>
      </DmxAppShell>
    );
  }
}

CarfaxLogout.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
