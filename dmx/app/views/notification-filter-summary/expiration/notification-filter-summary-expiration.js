import React from 'react';
import { View } from 'react-native';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import OptionListView from '../common/option-list-view';
import moment from 'moment';

export default class NotificationFilterSummaryExpiration extends React.Component {

  constructor() {
    super();
    this.state = {
      expirationOptions: [
        {
          name: '1 Day',
          expiration: moment.utc().add(1, 'd'),
        },
        {
          name: '2 Days',
          expiration: moment.utc().add(2, 'd'),
        },
        {
          name: '1 Week',
          expiration: moment.utc().add(1, 'w'),
        },
        {
          name: '2 Weeks',
          expiration: moment.utc().add(2, 'w'),
        },
        {
          name: '1 Month',
          expiration: moment.utc().add(1, 'M'),
        },
        {
          name: 'Active Until Deleted',
        },
      ],
    };
  }

  getExpirationDate(expiration) {
    if (expiration) {
      return expiration.format('MMMM Do, YYYY');
    }
    return '';
  }

  selectItem(activeItem) {
    this.setState({ activeItem });
  }

  render() {
    const { expirationOptions, activeItem } = this.state;
    return (<View>
      <SummarySectionHeader>
        Filter Expiration:* {activeItem && this.getExpirationDate(activeItem.expiration)}
      </SummarySectionHeader>
      <OptionListView
        itemSelected={item => this.selectItem(item)}
        items={expirationOptions}
      />
    </View>);
  }
}
