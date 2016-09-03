import React, { PropTypes } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import styles from './select-custom-color.style';
import embeddedColors from './embedded-colors';
import Header from './select-custom-color-header';
import { SUMMARY_CUSTOM_COLOR_ADDED } from '../summary/summary-events';
import ColorsTable from './../../common/components/colors-table/colors-table';

export default class SelectCustomColor extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor() {
    super();
        // convert to the format retrieved from backend
    const availableColors = embeddedColors.map(({ hex, name }) => ({
      name,
      id: hex,
      colorChips: { primary: { hex } },
    }));
    this.state = {
      colors: availableColors,
      editingName: false,
    };
  }

  setColorName(name) {
    this.setState({
      currentColor: {
        ...this.state.currentColor,
        name,
      },
    });
  }

  cancelNameEditing() {
    const currentColor = this.state.colors.find(
      c => c.id === this.state.currentColor.id
    );
    this.setColorName(currentColor.name);
  }

  colorSelected(color) {
    this.setState({
      currentColor: { ...color },
    });
  }

  createDataToPath(newColor) {
    return { newColor };
  }

  turnToPreviousView() {
    DeviceEventEmitter.emit(
      SUMMARY_CUSTOM_COLOR_ADDED,
      this.createDataToPath(this.state.currentColor)
    );
    this.props.navigator.pop();
  }

  render() {
    const { colors, currentColor } = this.state;
    return (<DmxAppShell
      hasFooter
      hasHeader={false}
      collapseEnabled
      buttonText="NEXT"
      buttonAction={() => this.turnToPreviousView()}
      buttonIsActive
      navigator={this.props.navigator}
      route={this.props.route}
    >
      <CustomSettingsHeader navigator={this.props.navigator} text="Add Color" />
      <View style={styles.listContainer}>
        <ColorsTable
          colors={colors}
          elementsInRow={3}
          selectedIds={[currentColor ? currentColor.id : undefined]}
          colorSelected={(entry) => this.colorSelected(entry)}
        />
        {currentColor && <Header
          colorNameChanged={(name) => this.setColorName(name)}
          cancelNameEditing={() => this.cancelNameEditing()}
          currentColor={currentColor}
        />}
      </View>
    </DmxAppShell>);
  }
}
