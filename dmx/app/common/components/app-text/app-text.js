import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import styles from './app-text.styles';

let textStyleList = [];

export default class DmxAppText extends React.Component {

  static propTypes = {
    style: PropTypes.any,
  };

  constructor(props) {
    textStyleList = props.style ? [styles.text, props.style] : styles.text;
    super(props);
  }

  render() {
    return (<Text style={textStyleList} {...this.props} />);
  }
}
