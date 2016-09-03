import React, { PropTypes } from 'react';
import { ScrollView, View, DeviceEventEmitter } from 'react-native';
import SelectorModal from '../../common/components/selector-modal/selector-modal';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import DmxAppShell
  from '../../common/components/app-shell/app-shell';
import FullWidthButton
  from '../../common/components/full-width-button/full-width-button';
import NotificationFilterSummaryGeneral from './general/notification-filter-summary-general';
import NotificationFilterSummaryExpiration
  from './expiration/notification-filter-summary-expiration';
import NotificationFilterSummaryModel from './model/notification-filter-summary-model';
import NotificationFilterSummaryDistance from './distance/notification-filter-summary-distance';
import VehiclePackageSelection from './vehicle-package/notification-filter-summary-vehicle-package';
import RatingCategoryRestrictions
  from './rating-category-restrictions/notification-filter-summary-vehicle-package';

export default class NofificationFilterSummary extends React.Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    name: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {};
    this.listener = DeviceEventEmitter.addListener(
      'selectorModalOpen',
      ({ items, selectedItem }) => {
        this.setState({ items, selectedItem });
      }
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  modalItemSelected(item) {
    DeviceEventEmitter.emit('selectorModalItemSelected', item);
    this.setState({ items: undefined });
  }

  deleteFilter() {
    const { navigator } = this.props;
    navigator.pop();
  }

  saveFilter() {
    const { navigator } = this.props;
    navigator.push({
      name: 'notification-filter-edit-name',
      data: {
        name: 'Generated Name',
      },
    });
  }

  render() {
    const { items } = this.state;
    const { name } = this.props.route.data || {};
    const overlayView = items && (
      <SelectorModal
        {...this.state}
        onItemSelected={item => this.modalItemSelected(item)}
      />
    );
    return (<DmxAppShell
      overlayView={overlayView}
      collapseEnabled
      navigator={navigator}
      route={this.props.route}
    >
      <CustomSettingsHeader navigator={this.props.navigator} text="Notification Filter Settings" />
      <ScrollView>
        {name && <NotificationFilterSummaryGeneral name={name} />}
        <NotificationFilterSummaryExpiration />
        <NotificationFilterSummaryModel />
        <NotificationFilterSummaryDistance />
        <VehiclePackageSelection />
        <RatingCategoryRestrictions />
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <FullWidthButton
          buttonStyle={{ flex: 1 }}
          buttonAction={() => this.deleteFilter()}
          buttonIsActive
          buttonText="REMOVE FILTER"
          buttonColor="RED"
        />
        <FullWidthButton
          buttonStyle={{ flex: 1 }}
          buttonAction={() => this.saveFilter()}
          buttonIsActive
          buttonText="SAVE FILTER"
          buttonColor="BLUE"
        />
      </View>
    </DmxAppShell>);
  }
}
