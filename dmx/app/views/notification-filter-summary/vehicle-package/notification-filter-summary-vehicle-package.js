import React from 'react';
import { View } from 'react-native';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import OptionListView from '../common/option-list-view';

export default class VehiclePackageSelection extends React.Component {

  constructor() {
    super();
    this.state = {
      packages: [
        {
          name: 'M Sport',
        },
        {
          name: 'Ivory White Interior Design Package',
        },
        {
          name: 'Mocha Interior Design Package',
        },
        {
          name: 'Bang & Olufsen',
        },
      ],
    };
  }

  render() {
    const { packages } = this.state;
    return (<View>
      <SummarySectionHeader>Vehicle Package Selections</SummarySectionHeader>
      <OptionListView items={packages} />
    </View>);
  }
}
