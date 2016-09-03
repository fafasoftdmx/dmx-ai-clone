import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Image, DeviceEventEmitter } from 'react-native';
import appraisalModel from '../../../common/services/models/appraisal-model';
import dmxAppModel from '../../../common/services/models/dmx-app-model';
import { default as summaryCommonStyles } from './../summary.styles';
import { SUMMARY_OPTIONS_SELECTED } from '../summary-events';
const arrowBlueAsset = require('../../../assets/arrow-blue.png');

export default class SummaryOptionsExterior extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    componentIsDeactivated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      vehicleOptions: [],
      allOptions: [],
    };
  }

  componentDidMount() {
    this.optionsSelectedListener = DeviceEventEmitter.addListener(
      SUMMARY_OPTIONS_SELECTED,
      () => this.fetchData()
    );
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateAppraisal) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.optionsSelectedListener.remove();
  }

  getSectionHeader() {
    // this.props.componentIsDeactivated
    let headerTemplate;
    if (this.props.componentIsDeactivated || this.state.allOptions.length === 0) {
      headerTemplate = (
        <View style={summaryCommonStyles.summaryItemHeaderWrap}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Options</Text>
        </View>
      );
    } else {
      headerTemplate = (
        <TouchableOpacity onPress={() => this.advanceToView('options')}>
          <View style={summaryCommonStyles.summaryItemHeaderWrap}>
            <Text style={summaryCommonStyles.summaryItemHeaderText}>Options</Text>
            <Image
              style={summaryCommonStyles.summaryItemHeaderArrow}
              source={arrowBlueAsset}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      );
    }
    return headerTemplate;
  }

  advanceToView(toView, dataToPass) {
    this.props.navigator.push({
      name: toView,
      data: dataToPass || false,
    });
  }

  displayOptions() {
        // console.log('vehicle options in display routine', this.state.vehicleOptions);
    const optionDisplayTemplate = [];
    if (this.state.vehicleOptions.length > 0) {
      this.state.vehicleOptions.forEach((option, i) => {
        optionDisplayTemplate.push(
          <View style={summaryCommonStyles.row} key={i}>
            <Text style={summaryCommonStyles.text}>{option.name}</Text>
          </View>
        );
      });
    } else if (this.state.allOptions.length > 0) {
      optionDisplayTemplate.push(
        <View key={0} style={summaryCommonStyles.row}>
          <Text>Please select some options.</Text>
        </View>
      );
    } else {
      optionDisplayTemplate.push(
        <View key={0} style={summaryCommonStyles.row}>
          <Text>No options found for this vehicle.</Text>
        </View>
      );
    }
    return optionDisplayTemplate;
  }

  async fetchData() {
    const optionsSelected = await appraisalModel.getSelectedVehicleOptions();
    const allOptions = await dmxAppModel.getVehicleOptionsViewModel();
    console.log('all options are ---', allOptions);
    this.setState({
      vehicleOptions: optionsSelected,
      allOptions,
    });
  }

  render() {
        // TODO: Turn header into a component
    return (
      <View style={summaryCommonStyles.summaryItemWrap}>
        {this.getSectionHeader()}
        {this.displayOptions()}
      </View>
    );
  }
}
