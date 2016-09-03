import React, { PropTypes } from 'react';
import { View, Dimensions, Keyboard } from 'react-native';

export default class CollapsableView extends React.Component {

  static propTypes = {
    collapseEnabled: PropTypes.bool,
    style: PropTypes.any,
    children: PropTypes.any,
  }

  constructor() {
    super();
    this.currentDelta = 0;
  }

  componentWillMount() {
    this.updateDimensions(0);
    this.onKeyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow.bind(this)
    );
    this.onKeyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide.bind(this)
    );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.collapseEnabled !== this.props.collapseEnabled) {
      this.updateDimensions(this.currentDelta);
    }
  }

  componentWillUnmount() {
    this.onKeyboardWillShow.remove();
    this.onKeyboardWillHide.remove();
  }

  keyboardWillShow(e) {
    this.currentDelta = e.endCoordinates.height;
    this.updateDimensions(this.currentDelta);
  }

  keyboardWillHide() {
    this.currentDelta = 0;
    this.updateDimensions();
  }

  updateDimensions(hiddenPart = 0) {
    const { collapseEnabled } = this.props;
    const windowHeight = Dimensions.get('window').height;
    this.setState({ visibleHeight: windowHeight - (collapseEnabled ? hiddenPart : 0) });
  }

  render() {
    return (
      <View
        style={[
          this.props.style,
          { height: this.state.visibleHeight },
        ]}
      >
        {this.props.children}
      </View>);
  }
}
