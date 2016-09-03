import React, { Component, PropTypes } from 'react';
import { View, ScrollView, DeviceEventEmitter } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import AppraisalSortGroup from './appraisal-sort-group/appraisal-sort-group';
import styles from './appraisal-sort.styles';
import userModel from '../../common/services/models/user-model';

export default class AppraisalSort extends Component {
  constructor() {
    super();

    this.state = {
      sortGroups: [
        {
          name: 'MILEAGE',
          field: 'mileage',
          numeric: true,
          options: [
            { value: 'low', name: 'Lowest To Highest' },
            { value: 'high', name: 'Highest To Lowest' },
          ],
        },
        {
          name: 'BIDS',
          field: 'bids.length',
          numeric: true,
          options: [
            { value: 'low', name: 'Lowest To Highest' },
            { value: 'high', name: 'Highest To Lowest' },
          ],
        },
        {
          name: 'CREATED',
          field: 'dateCreated',
          options: [
            { value: 'low', name: 'Oldest To Newest' },
            { value: 'high', name: 'Newest To Oldest' },
          ],
        },
        {
          name: 'MAKE',
          field: 'generalInfo.make',
          options: [
            { value: 'low', name: 'A to Z' },
            { value: 'high', name: 'Z to A' },
          ],
        },
      ],
    };

    this.onSelectOption = this.onSelectOption.bind(this);
    this.reset = this.reset.bind(this);
    this.close = this.close.bind(this);
  }

  onSelectOption(option) {
    this.setState({ selected: option });
    userModel.setAppraisalSort(option);
    DeviceEventEmitter.emit('valuechange-appraisalsort', option);
  }

  close() {
    this.props.navigator.jumpBack();
  }

  reset() {
    this.setState({ selected: {} });
    userModel.clearAppraisalSort();
    DeviceEventEmitter.emit('valuechange-appraisalsort', {});
  }

  render() {
    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerText="Sort"
        headerTextStyle={styles.headerText}
        headerShowLeftButton
        leftButtonAction={this.close}
        headerShowMenuButton={false}
        headerShowRightButton={false}
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <ScrollView>
          {
            this.state.sortGroups.map((sortGroup, index) => (
              <AppraisalSortGroup
                key={index}
                sortInfo={sortGroup}
                selected={this.state.selected || this.props.route.sortOption}
                onSelectOption={this.onSelectOption}
              />
            ))
          }
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <DmxFullWidthButton
              buttonColor="GREY"
              buttonText="RESET"
              buttonIsActive
              buttonAction={this.reset}
            />
          </View>
          <View style={styles.buttons}>
            <DmxFullWidthButton
              buttonColor="GREEN"
              buttonText="CLOSE"
              buttonIsActive
              buttonAction={this.close}
            />
          </View>
        </View>
      </DmxAppShell>
    );
  }
}

AppraisalSort.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
