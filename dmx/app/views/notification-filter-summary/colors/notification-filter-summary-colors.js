import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import ColorsTable from '../../../common/components/colors-table/colors-table';
import colorsTableStyle from '../../../common/components/colors-table/colors-table.style';
import styles from './notification-filter-summary-colors.styles';
const addIconGreyAsset = require('../../../assets/add_icon_gray@2x.png');

const colors = [
  {
    name: 'Athens Gray',
    hex: 'F7F7F9',
  },
  {
    name: 'Fire Brick',
    hex: '9E1F26',
  },
  {
    name: 'Swamp',
    hex: '00110C',
  },
  {
    name: 'Pumice',
    hex: 'C2C7C5',
  },
  {
    name: 'Rodeo Dust',
    hex: 'CCB69E',
  },
  {
    name: 'Cadet Blue',
    hex: 'A5B8C7',
  },
  {
    name: 'Regal Blue',
    hex: '004075',
  },
  {
    name: 'Prussian Blue',
    hex: '02375D',
  },
  {
    name: 'Astronaut Blue',
    hex: '023A5F',
  },
  {
    name: 'Falu Red',
    hex: '961A1D',
  },
  {
    name: 'Nandor',
    hex: '465754',
  },
  {
    type: 'selectMoreColorsButton',
  },
].map(e => ({
  ...e,
  colorChips: { primary: { hex: e.hex } },
  id: e.hex,
}));

export default class NotificationFilterSummaryColors extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectedIds: [] };
  }

  toggleColorSelected(colorId) {
    const selectedIds = this.state.selectedIds;
    if (selectedIds.indexOf(colorId) === -1) {
      this.setState({ selectedIds: [...selectedIds, colorId] });
    } else {
      this.setState({ selectedIds: selectedIds.filter(id => id !== colorId) });
    }
  }

  renderItem({ entry, itemBounds }) {
    if (entry.type === 'selectMoreColorsButton') {
      return (<TouchableOpacity onPress={() => {}}>
        <View
          style={[
            colorsTableStyle.colorRenderer,
            styles.plusContainer,
            { width: itemBounds, height: itemBounds },
          ]}
        >
          <Image
            style={styles.plus}
            source={addIconGreyAsset}
          />
        </View>
      </TouchableOpacity>);
    }
    return undefined;
  }

  render() {
    const { selectedIds } = this.state;
    return (<View>
      <SummarySectionHeader>Colors Selections</SummarySectionHeader>
      <ColorsTable
        colors={colors}
        elementsInRow={4}
        selectedIds={selectedIds}
        itemRenderer={(props) => this.renderItem(props)}
        colorSelected={color => this.toggleColorSelected(color.id)}
      />
    </View>);
  }
}
