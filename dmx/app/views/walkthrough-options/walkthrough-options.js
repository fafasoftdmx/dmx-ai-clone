import React, { PropTypes } from 'react';
import {
  DeviceEventEmitter,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './walkthrough-options.styles';
import appraisalModel from '../../common/services/models/appraisal-model';
import dmxAppModel from '../../common/services/models/dmx-app-model';
import AppShell from '../../common/components/app-shell/app-shell';
import VehicleDetail from '../../common/components/walkthrough-vehicle-detail';
import OptionsListview from '../../common/components/options-listview/options-listview';
import NewOptionButton from '../../common/components/new-option-button/new-option-button';
import { SUMMARY_CUSTOM_OPTION_ADDED, SUMMARY_OPTIONS_SELECTED } from '../summary/summary-events';
import _ from 'lodash';

export default class WalkthroughOptions extends React.Component {

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
      filterBy: 'options',
      options: [],
    };
  }

  componentDidMount() {
    this.optionAddedListener = DeviceEventEmitter.addListener(
      SUMMARY_CUSTOM_OPTION_ADDED,
      option => this.onCustomOptionAdded(option)
    );
    this.fetchData();
  }

  componentWillUnmount() {
    this.optionAddedListener.remove();
  }

  onCustomOptionAdded({ newOption }) {
    this.newOption = newOption;
    this.fetchData();
  }

  addNonOemOption() {
    this.props.navigator.push({
      name: 'non-oem-option-entry',
      navigator: this.props.navigator,
    });
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

    const options = await dmxAppModel.getVehicleOptionsViewModel();
    const appraisalOptions = await appraisalModel.getSelectedVehicleOptions() || [];
    appraisalOptions
      .filter(appraisalOption =>
        !options.find(o => o.id === appraisalOption.id)
      )
      .forEach(value => options.push(value));
    if (this.newOption && !options.find(e => e.name === this.newOption)) {
      options.push({
        name: this.newOption,
        id: _.random(Math.pow(10, 9)).toString(),
      });
    }
    this.setState({
      options,
    });
  }

  advanceToGroups() {
    DeviceEventEmitter.emit(SUMMARY_OPTIONS_SELECTED);
    this.props.navigator.pop();
  }

  render() {
    const { year, make, model, vin, imageUri } = this.state;
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
          <View style={styles.optionSelectWrap}>
            <View style={styles.headerWrap}>
              <Text style={styles.headerText}>OPTIONS</Text>
            </View>
            <NewOptionButton onPress={() => this.addNonOemOption()} text="Add Custom Equipment" />
            <View style={styles.scrollWrap}>
              <ScrollView>
                <OptionsListview
                  options={this.state.options}
                  navigator={this.props.navigator}
                  filterBy={this.state.filterBy}
                  nextView="vehicle-groups"
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </AppShell>
    );
  }

}
