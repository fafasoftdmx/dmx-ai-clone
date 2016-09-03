import React, { PropTypes } from 'react';
import { Image, Text, TouchableOpacity, View, NativeAppEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DMXCOLORS from '../../../common/constants/colors';
import styles from './header.styles';

const arrowAsset = require('../../../assets/arrow.png');
const filterAsset = require('../../../assets/filter.png');
const menuAsset = require('../../../assets/menu-icon.png');
const voiceAsset = require('../../../assets/voice-icon.png');

const imageMap = {
  'arrow.png': arrowAsset,
  'filter.png': filterAsset,
  'menu-icon.png': menuAsset,
  'voice-icon.png': voiceAsset,
};

export default class DmxHeader extends React.Component {

  static propTypes = {
    navigator: PropTypes.object,
    headerLeftButton: PropTypes.any,
    headerShowLeftButton: PropTypes.bool,
    leftButtonAction: PropTypes.func,
    headerShowMenuButton: PropTypes.bool,
    headerShowRightButton: PropTypes.bool,
    rightButtonPress: PropTypes.func,
    toggleDrawer: PropTypes.func,
    headerStyle: PropTypes.any,
    headerText: PropTypes.string,
    headerTextStyle: PropTypes.any,
    headerSubText: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isTorchOn: false,
    };
  }

  componentDidMount() {
    NativeAppEventEmitter.addListener('ReactVinScanner.RequestTorchToggle', () => {
      this.setState({ isTorchOn: !this.state.isTorchOn });
    });
  }

  getHeaderTemplate() {
    if (this.props.headerText) {
      if (this.props.headerSubText) {
        return (
          <View style={styles.headerTitleWrap}>
            <Text style={[styles.mainHeader, this.props.headerTextStyle]}>
              {this.props.headerText}
            </Text>
            <Text style={styles.subHeader}>{this.props.headerSubText}</Text>
          </View>
        );
      }
      return (
        <View style={styles.headerTitleWrap}>
          <Text style={[styles.mainHeader, this.props.headerTextStyle]}>
            {this.props.headerText}
          </Text>
        </View>
      );
    }
    return (<Text style={styles.logoHeader}>{'\ue905'}</Text>);
  }

  leftButtonAction() {
    if (this.props.leftButtonAction) {
      this.props.leftButtonAction();
    } else {
      this.props.navigator.pop();
    }
  }

  rightButtonPress() {
    this.setState({ isTorchOn: !this.state.isTorchOn });
    this.props.rightButtonPress();
  }

  buildHeader() {
    return (
      <View style={[styles.headerWrapper, this.props.headerStyle]}>
        <View style={styles.leftBtnWrap}>
          {
            this.props.headerShowLeftButton && (
              <TouchableOpacity onPress={() => this.leftButtonAction()}>
                {
                  this.props.headerLeftButton === 'sort' ?
                    <Image
                      style={styles.filterBtn}
                      source={imageMap['filter.png']}
                    /> :
                    <Text style={styles.headerIconBtn}>{'\ue906'}</Text>
                }
              </TouchableOpacity>
            )
          }
        </View>
        {this.getHeaderTemplate()}
        <View style={styles.rightBtnWrap}>
          {
            this.props.headerShowMenuButton && (
              <TouchableOpacity style={styles.menuBtn} onPress={this.props.toggleDrawer}>
                <Image source={imageMap['menu-icon.png']} />
              </TouchableOpacity>
            )
          }
          {
            this.props.headerShowRightButton &&
              <TouchableOpacity style={styles.menuBtn} onPress={() => this.rightButtonPress()}>
                <Icon
                  name={this.state.isTorchOn ? 'flash-on' : 'flash-off'}
                  size={25}
                  color={DMXCOLORS.GREYDARK}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }

  render() {
    return this.buildHeader();
  }
}
