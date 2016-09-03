import React, { PropTypes } from 'react';
import { ScrollView, DeviceEventEmitter } from 'react-native';
import dmxAppModel from '../../common/services/models/dmx-app-model';
import appraisalModel from '../../common/services/models/appraisal-model';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import OptionsListview from '../../common/components/options-listview/options-listview';
import NewOptionButton from '../../common/components/new-option-button/new-option-button';
import { SUMMARY_CUSTOM_OPTION_ADDED, SUMMARY_OPTIONS_SELECTED } from '../summary/summary-events';
import _ from 'lodash';

export default class DmxVehicleOptionsView extends React.Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filterBy: 'options',
      nextView: 'summary',
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

  turnToPreviousView() {
    DeviceEventEmitter.emit(SUMMARY_OPTIONS_SELECTED);
    this.props.navigator.pop();
  }

  async fetchData() {
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

  render() {
    return (
      <DmxAppShell
        headerShowMenuButton
        hasFooter
        hasHeader
        buttonText="NEXT"
        buttonAction={() => this.turnToPreviousView()}
        buttonIsActive
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <NewOptionButton onPress={() => this.addNonOemOption()} text="Add Custom Equipment" />
        <ScrollView>
          <OptionsListview
            options={this.state.options}
            navigator={this.props.navigator}
            filterBy={this.state.filterBy}
            nextView={this.state.nextView}
          />
        </ScrollView>
      </DmxAppShell>
    );
  }
}
