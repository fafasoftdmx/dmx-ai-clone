import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import dmxService from '../../services/api/dmx-service';
import commonStyles from '../../styles/common.styles';
import fullWidthButtonStyles from '../full-width-button/full-width-button.styles';
import styles from './drawer-menu.styles';
const arrowAsset = require('../../../assets/arrow@3x.png');

const OptionButton = ({ children, onPress }) =>
  <View style={styles.homeLinkWrap}>
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
        <Text style={styles.homeLinkText}>{children}</Text>
        <View style={{ flex: 1 }} />
        <Image source={arrowAsset} style={{ transform: [{ scale: -1 }] }} />
      </View>
    </TouchableOpacity>
  </View>;

OptionButton.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
};

export default class DrawerMenu extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  logout() {
    dmxService.logout();
    this.props.navigator.resetTo({
      name: 'login',
    });
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={[commonStyles.container, styles.menuWrap]}>
        <View style={styles.logoutWrap}>
          <TouchableOpacity
            style={fullWidthButtonStyles.button}
            onPress={() => this.logout()}
          >
            <Text style={fullWidthButtonStyles.text}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        <OptionButton
          onPress={() => navigator.resetTo({ name: 'appraisal-list' })}
        >
          Home
        </OptionButton>
        <OptionButton
          onPress={() => navigator.push({ name: 'carfax-login' })}
        >
          Carfax Settings
        </OptionButton>
        {/* <OptionButton
         onPress={() => navigator.push({name: 'notification-filter-list'})}
         >
         Notifications
         </OptionButton> */}
      </View>
    );
  }
}

DrawerMenu.propTypes = {
  navigator: PropTypes.object.isRequired,
};
