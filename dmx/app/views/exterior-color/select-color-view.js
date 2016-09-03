import React, { PropTypes } from 'react';
import { DeviceEventEmitter } from 'react-native';
import dmxAppModel from '../../common/services/models/dmx-app-model';
import NewOptionButton from '../../common/components/new-option-button/new-option-button';
import appraisalModel from '../../common/services/models/appraisal-model';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import ColorPicker from '../../common/components/color-picker/color-picker';
import { SUMMARY_CUSTOM_COLOR_ADDED, SUMMARY_COLOR_UPDATED } from '../summary/summary-events';

export default class SelectColorView extends React.Component {

  static propTypes = {
    filterBy: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filterBy: this.props.filterBy,
      buttonText: 'NEXT',
      colors: [],
    };
  }

  componentDidMount() {
    this.addCustomColorListener = DeviceEventEmitter.addListener(
      SUMMARY_CUSTOM_COLOR_ADDED,
      data => this.customColorAdded(data)
    );
    this.fetchData();
  }

  componentWillUnmount() {
    this.addCustomColorListener.remove();
  }

  addCustomColor() {
    this.props.navigator.push({
      name: 'select-custom-color',
      navigator: this.props.navigator,
    });
  }

  customColorAdded({ newColor }) {
    this.newColor = newColor;
    this.fetchData();
  }

  async fetchData() {
    const filterBy = this.props.filterBy;
    const colors = await dmxAppModel.getColorViewModel(filterBy);
    let selectedColor;
    if (filterBy === 'exterior') {
      selectedColor = await appraisalModel.getSelectedExteriorColor();
    } else {
      selectedColor = await appraisalModel.getSelectedInteriorColor();
    }
    if (selectedColor && !colors.find(c => c.id === selectedColor.id)) {
      colors.push(selectedColor);
    }
    if (this.newColor && !colors.find(e => e.id === this.newColor.id)) {
      colors.push(this.newColor);
    }
    this.setState({
      colors,
    });
  }

  turnToPreviousView() {
    DeviceEventEmitter.emit(SUMMARY_COLOR_UPDATED);
    this.props.navigator.pop();
  }

  render() {
    return (
      <DmxAppShell
        headerShowLeftButton
        headerShowMenuButton
        hasFooter
        hasHeader
        headerText="Select A Color"
        buttonAction={() => this.turnToPreviousView()}
        buttonText="CONFIRM"
        buttonIsActive
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <NewOptionButton onPress={() => this.addCustomColor()} text="Add Custom Color" />
        <ColorPicker
          navigator={this.props.navigator}
          filterBy={this.state.filterBy}
          colors={this.state.colors}
        />
      </DmxAppShell>
    );
  }

}
