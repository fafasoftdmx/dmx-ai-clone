import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, ListView } from 'react-native';
import update from 'react-addons-update';
import appraisalModel from '../../../common/services/models/appraisal-model';
import dmxAppStateService from '../../../common/services/state/stateService';
import styles from './color-picker.styles.js';

export default class ColorPicker extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    filterBy: PropTypes.string.isRequired,
    styleId: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      swatches: [],
      styleId: this.props.styleId,
      filterBy: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isLoading: true,
      isLoadingTail: false,
      activeSwatch: {},
      scrollEnabled: true,
    };
    this.lastScrollY = 0;
    this.headerView = null;
  }

  async componentWillReceiveProps(nextProps) {
    const swatches = nextProps.colors;
    const self = this;
    const selectedSwatch = await this.getSelectedColor(nextProps.filterBy);
    // console.log('swatches are', swatches);
    // filteredSwatches = swatches.filter(function(element){
    //    return type !== 'all' ? element.category === type : true;
    // });
    if (selectedSwatch) {
      const colorChips = selectedSwatch.colorChips;
      this.setState({
        swatches,
        isLoading: false,
        activeSwatch: update(this.state.activeSwatch, { $set: {
          colorHex: `#${(colorChips) ? colorChips.primary.hex : 'FFFFFF'}`,
          colorName: selectedSwatch.name,
          id: selectedSwatch.id,
        } }),
      });
    } else {
      self.setState({
        swatches,
        isLoading: false,
      });
    }
  }

  async getSelectedColor(type) {
    let selectedColor;
    if (type === 'interior') {
      selectedColor = await appraisalModel.getSelectedInteriorColor();
    } else if (type === 'exterior') {
      selectedColor = await appraisalModel.getSelectedExteriorColor();
    }
    return selectedColor;
  }

  saveSelectedColor(swatch) {
    if (this.props.filterBy === 'exterior') {
      appraisalModel.saveSelectedExteriorColor(swatch);
    } else {
      appraisalModel.saveSelectedInteriorColor(swatch);
    }
  }

  saveSwatchToggleState(swatch) {
    if (this.state.activeSwatch.id === swatch.id) {
      this.setState({
        activeSwatch: update(this.state.activeSwatch, { $set: {} }),
      });
      this.saveSelectedColor(false);
    } else {
      this.setState({
        activeSwatch: update(this.state.activeSwatch, { $set: {
          colorHex: `#${swatch.colorChips ? swatch.colorChips.primary.hex : 'FFFFFF'}`,
          colorName: swatch.name,
          id: swatch.id,
        } }),
      });
      this.saveSelectedColor(swatch);
    }
  }

  renderNextView(swatchId) {
    const toView = this.props.filterBy === 'Exterior' ? 'interior-color' : 'odometer';
    dmxAppStateService.setItem(this.props.filterBy.toLowerCase(), swatchId);
    this.props.navigator.push({
      name: toView,
      navigator: this.props.navigator,
    });
  }

  renderSwatch(swatch) {
    const colorHex = `#${(swatch.colorChips) ? swatch.colorChips.primary.hex : 'FFFFFF'}`;
    const isCurrentColor = this.state.activeSwatch.id === swatch.id;
    const { manufactureOptionCode } = swatch;
    return (
      <TouchableOpacity onPress={() => this.saveSwatchToggleState(swatch)}>
        <View style={[styles.row, isCurrentColor && styles.selectedRow]}>
          <Text style={styles.text}>
            {swatch.name + (manufactureOptionCode ? ` (${manufactureOptionCode})` : '')}
          </Text>
          <View style={[styles.microSwatch, { backgroundColor: colorHex }]} />
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (<ListView
      contentContainerStyle={styles.list}
      dataSource={this.state.dataSource.cloneWithRows(this.state.swatches)}
      renderRow={s => this.renderSwatch(s)}
      enableEmptySections
    />);
  }
}
