import React, { PropTypes } from 'react';
import {
  DeviceEventEmitter,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './walkthrough-colors.styles';
import appraisalModel from '../../common/services/models/appraisal-model';
import dmxAppModel from '../../common/services/models/dmx-app-model';
import AppShell from '../../common/components/app-shell/app-shell';
import ColorPicker from '../../common/components/color-picker/color-picker';
import VehicleDetail from '../../common/components/walkthrough-vehicle-detail';
import { SUMMARY_CUSTOM_COLOR_ADDED, SUMMARY_COLOR_UPDATED } from '../summary/summary-events';

export default class WalkthroughMileage extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      vin: '',
      filterBy: 'exterior',
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
    const { year, make, model, vin, imageUri } = this.props.route.data;
    this.setState({
      year,
      make,
      model,
      vin,
      imageUri,
    });

    const filterBy = this.state.filterBy;
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

  advanceToGroups() {
    DeviceEventEmitter.emit(SUMMARY_COLOR_UPDATED);
    this.props.navigator.pop();
  }

  render() {
    const { year, make, model, vin, filterBy, colors, imageUri } = this.state;
    return (
      <AppShell
        hasFooter={false}
        hasHeader
        headerText="Appraisal Progress"
        headerShowLeftButton
        headerShowMenuButton
        collapseEnabled
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.detailWrap}>
            <VehicleDetail
              year={String(year)}
              make={make}
              model={model}
              vin={vin}
              imageUri={imageUri}
            />
          </View>
          <View style={styles.colorSelectWrap}>
            <View style={styles.colorSelector}>
              <View
                style={[
                  styles.colorSelectorItem,
                  filterBy === 'exterior' && styles.colorSelectedView,
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ filterBy: 'exterior' })}
                  style={styles.colorSelectorTouchable}
                >
                  <View>
                    <Text
                      style={[
                        styles.colorSelectorText,
                        filterBy === 'exterior' && styles.colorSelectedText,
                      ]}
                    >
                      EXTERIOR COLOR
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View
                style={[
                  styles.colorSelectorItem,
                  filterBy === 'interior' && styles.colorSelectedView,
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ filterBy: 'interior' })}
                  style={styles.colorSelectorTouchable}
                >
                  <View>
                    <Text
                      style={[
                        styles.colorSelectorText,
                        filterBy === 'interior' && styles.colorSelectedText,
                      ]}
                    >
                      INTERIOR COLOR
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <ColorPicker
              navigator={this.props.navigator}
              filterBy={filterBy}
              colors={colors}
            />
          </View>
        </View>
      </AppShell>
    );
  }

}
