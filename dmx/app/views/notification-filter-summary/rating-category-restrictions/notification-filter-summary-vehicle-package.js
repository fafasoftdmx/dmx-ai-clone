import React from 'react';
import { View } from 'react-native';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import OptionListView from '../common/option-list-view';

export default class VehiclePackageSelection extends React.Component {

  constructor() {
    super();
    this.state = {
      categoryRestrictions: [
        {
          name: 'Outstanding',
        },
        {
          name: 'Clean',
        },
        {
          name: 'Average',
        },
        {
          name: 'Rough',
        },
        {
          name: 'Damaged',
        },
      ],
    };
  }

  render() {
    const { categoryRestrictions } = this.state;
    return (<View>
      <SummarySectionHeader>Rating Category Restrictions</SummarySectionHeader>
      <OptionListView items={categoryRestrictions} />
    </View>);
  }
}
