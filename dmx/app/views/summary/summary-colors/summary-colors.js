import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, DeviceEventEmitter } from 'react-native';
import appraisalModel from '../../../common/services/models/appraisal-model';
import colorSwatches from '../../../common/services/mocks/edmunds-mock-colors.json';
import { default as summaryCommonStyles } from './../summary.styles';
import styles from './summary-colors.styles';
import { SUMMARY_COLOR_UPDATED } from '../summary-events';

export default class SummaryColors extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    componentIsDeactivated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      swatches: [
        colorSwatches.colors[0],
        colorSwatches.colors[1],
      ],
      selectedInteriorColor: false,
      selectedExteriorColor: false,
    };
  }

  componentDidMount() {
    this.updateColorListener = DeviceEventEmitter.addListener(
      SUMMARY_COLOR_UPDATED,
      () => this.fetchData()
    );
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateAppraisal) {
      // console.log('fetching new colors now');
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.updateColorListener.remove();
  }

  advanceToView(toView, dataToPass) {
    this.props.navigator.push({
      name: toView,
      data: dataToPass || false,
    });
  }

  async fetchData() {
    const selectedExteriorColor = await appraisalModel.getSelectedExteriorColor();
    const selectedInteriorColor = await appraisalModel.getSelectedInteriorColor();
    console.log('fetched exterior color', selectedExteriorColor);
    console.log('fetched interior color', selectedInteriorColor);
    this.setState({
      selectedInteriorColor,
      selectedExteriorColor,
    });
  }

  returnColorSwatch(swatch) {
    const colorHex = `#${(swatch.colorChips) ? swatch.colorChips.primary.hex : 'FFFFFF'}`;
    return (
      <View style={summaryCommonStyles.row}>
        <Text style={summaryCommonStyles.text}>{swatch.name}</Text>
        <View style={[styles.microSwatch, { backgroundColor: colorHex }]} />
      </View>
    );
  }

  returnUnselectedTemplate(toSelectText) {
    return (
      <View style={summaryCommonStyles.row}>
        <Text style={summaryCommonStyles.text}>Select {toSelectText} Color</Text>
      </View>
    );
  }

  render() {
    const exteriorColor = this.state.selectedExteriorColor;
    const interiorColor = this.state.selectedInteriorColor;
    const exteriorColorTemplate = exteriorColor ?
      this.returnColorSwatch(exteriorColor) :
      this.returnUnselectedTemplate('Exterior');
    const interiorColorTemplate = interiorColor ?
        this.returnColorSwatch(interiorColor) :
        this.returnUnselectedTemplate('Interior');
        // TODO: Turn header into a component
    return (
      <View style={summaryCommonStyles.summaryItemWrap}>
        <View style={summaryCommonStyles.summaryItemHeaderWrap}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Colors</Text>
        </View>
        <TouchableOpacity
          disabled={this.props.componentIsDeactivated}
          onPress={() => this.advanceToView('exterior-color')}
        >
          {exteriorColorTemplate}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.props.componentIsDeactivated}
          onPress={() => this.advanceToView('interior-color')}
        >
          {interiorColorTemplate}
        </TouchableOpacity>
      </View>
    );
  }
}
