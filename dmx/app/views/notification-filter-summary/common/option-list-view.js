import React, { PropTypes } from 'react';
import { View } from 'react-native';
import OptionListEntry from './option-list-entry';

export default class OptionListView extends React.Component {

  static propTypes = {
    itemSelected: PropTypes.func,
    items: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps({ activeItem }) {
    if (activeItem && activeItem !== this.state.activeItem) {
      this.setState({ activeItem });
    }
  }

  selectItem(activeItem) {
    const { itemSelected } = this.props;
    // optimistic update
    this.setState({ activeItem });
    if (itemSelected) {
      itemSelected(activeItem);
    }
  }

  render() {
    const { items } = this.props;
    const { activeItem } = this.state;
    return (<View>
      {items.map(e =>
        <OptionListEntry
          key={e.name}
          label={e.name}
          onPress={() => this.selectItem(e)}
          selected={activeItem === e}
        />
      )}
    </View>);
  }
}
