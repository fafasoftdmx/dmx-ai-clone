import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './select-custom-color.style';
const closeAsset = require('../../assets/close@3x.png');

export default class Header extends React.Component {

  static propTypes = {
    currentColor: PropTypes.object.isRequired,
    colorNameChanged: PropTypes.func.isRequired,
    cancelNameEditing: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      autoFocus: false,
      editingName: false,
    };
  }

  startNameEditing() {
    this.refs.changeNameInput.focus();
  }

  cancelNameEditing() {
    const { cancelNameEditing } = this.props;
    this.refs.changeNameInput.blur();
    cancelNameEditing();
  }

  render() {
    const { autoFocus, editingName } = this.state;
    const { currentColor, colorNameChanged } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <Text style={styles.selectedLabel}>selected color</Text>
          <TextInput
            ref="changeNameInput"
            style={styles.colorNameLabel}
            autoFocus={autoFocus}
            onChangeText={(acv) => colorNameChanged(acv)}
            onFocus={() => this.setState({ editingName: true })}
            onBlur={() => this.setState({ editingName: false })}
            value={currentColor.name}
          />
        </View>
        {editingName ?
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => this.cancelNameEditing()}
          >
            <Image source={closeAsset} />
          </TouchableOpacity>
          :
          <TouchableOpacity
            style={styles.rightButton}
            onPress={() => this.startNameEditing()}
          >
            <View style={styles.editColorNameButtonInner}>
              <Text style={styles.editColorNameButtonLabel}>
                EDIT NAME
              </Text>
            </View>
          </TouchableOpacity>}
      </View>
    );
  }
}
