import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './custom-settings-header.styles';
const menyIcon = require('../../../assets/menu-icon@3x.png');

const imageMap = {
  'menu-icon.png': menyIcon,
};

export default class CustomSettingsHeader extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    popToRoute: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.any,
    rightButton: PropTypes.node,
    showMenuButton: PropTypes.bool,
  };

  getRightButton() {
    if (this.props.rightButton) {
      return this.props.rightButton;
    }
    if (this.props.showMenuButton) {
      return (
        <TouchableOpacity style={styles.menuBtn}>
          <Image source={imageMap['menu-icon.png']} />
        </TouchableOpacity>
      );
    }
    return undefined;
  }

  popRoute() {
    const { navigator, popToRoute } = this.props;
    console.log('popToRoute: ', popToRoute);
    if (popToRoute) {
      const routes = navigator.getCurrentRoutes();
      for (let i = routes.length - 1; i >= 0; i--) {
        if (routes[i].name === popToRoute) {
          navigator.popToRoute(routes[i]);
          break;
        }
      }
    } else {
      navigator.pop();
    }
  }

  render() {
    const { text, children } = this.props;
    return (
      <View>
        <View style={styles.noSelectedColorLabel}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.leftBtnWrap} onPress={() => this.popRoute()}>
              <Text style={styles.headerIconBtn}>{'\ue906'}</Text>
            </TouchableOpacity>
          </View>
          {
            children || <Text style={styles.descriptionLabel}>{text}</Text>
          }
          <View style={styles.menuWrap}>
            {this.getRightButton()}
          </View>
        </View>
      </View>
    );
  }
}
