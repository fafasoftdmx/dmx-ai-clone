import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './full-width-button.styles';

export default class DmxFullWidthButton extends React.Component {

  static propTypes = {
    buttonColor: PropTypes.any,
    buttonStyle: PropTypes.any,
    toView: PropTypes.string,
    dataToPass: PropTypes.any,
    sceneConfig: PropTypes.object,
    gesture: PropTypes.any,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  getButtonColorStyle(color) {
    switch (color) {
      case 'GREEN':
        return styles.greenButton;
      case 'RED':
        return styles.redButton;
      case 'GREY':
        return styles.greyButton;
      case 'BLUE':
      default:
        return styles.blueButton;
    }
  }

  handlePress() {
    if (this.props.buttonIsActive) {
      if (this.props.buttonAction) {
        this.props.buttonAction();
        return;
      }
      // TODO: pull this up into the respective views that use this component,
      // then going forward can just invoke buttonAction
      const navigationType = this.props.buttonText.toLowerCase() === 'cancel' ?
        this.props.navigator.resetTo :
        this.props.navigator.push;
      navigationType({
        name: this.props.toView,
        data: this.props.dataToPass,
        sceneConfig: this.props.sceneConfig,
        gestures: this.props.gesture,
      });
    }
  }

  render() {
    const { buttonColor, buttonStyle } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.button,
          this.getButtonColorStyle(buttonColor),
          buttonStyle,
        ]}
        onPress={() => this.handlePress()}
      >
        <View>
          <Text style={[styles.text, (!this.props.buttonIsActive) && styles.buttonInactive]}>
            {this.props.buttonText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

DmxFullWidthButton.propTypes = {
  buttonAction: PropTypes.func,
  buttonColor: PropTypes.string,
  buttonIsActive: PropTypes.any,
  buttonText: PropTypes.string,
};
