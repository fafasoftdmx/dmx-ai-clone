import React, { PropTypes } from 'react';
import { View, Image, Text, Animated } from 'react-native';
import styles from './tool-tip.style';
const toolTipBackgroundAsset = require('../../../assets/tooltip_background@2x.png');

export default class ToolTip extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    text: PropTypes.string,
    visible: PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      visible: false,
      animation: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(newProps) {
    const { visible } = this.props;
    const { animation } = this.state;
    if (newProps.visible !== visible) {
      if (newProps.visible) {
        animation.setValue(1);
      } else {
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
        }).start();
      }
    }
  }

  render() {
    const { animation } = this.state;
    const { children, text } = this.props;
    return (
      <View>
        <Animated.Image
          style={[
            styles.background,
            { opacity: animation },
          ]}
          source={toolTipBackgroundAsset}
        >
          <Text style={styles.text}>
            {text}
          </Text>
        </Animated.Image>
        {children}
      </View>
    );
  }
}
