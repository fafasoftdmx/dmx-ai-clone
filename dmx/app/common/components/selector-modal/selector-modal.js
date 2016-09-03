import React, { PropTypes } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styles from './selector-modal.style';

const DoneButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.buttonInner}>
      <Text style={styles.buttonLabel}>
        DONE
      </Text>
    </View>
  </TouchableOpacity>
);

DoneButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const ListView = ({ items, selectedItem, itemSelected }) => (
  <ScrollView>
    {items.map(item => (
      <View key={item.name}>
        <TouchableOpacity onPress={() => itemSelected(item)}>
          <View
            style={styles.listItem}
          >
            <Text
              style={
                selectedItem.name === item.name ?
                  styles.listItemLabelSelected :
                  styles.listItemLabel
              }
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);

ListView.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.shape({
    name: React.PropTypes.string,
  }),
  itemSelected: PropTypes.func,
};

export default class SelectorModal extends React.Component {

  static propTypes = {
    selectedItem: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    onItemSelected: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  componentWillMount() {
    const { selectedItem } = this.props;
    this.setState({ selectedItem });
  }

  setSelectedItem(selectedItem) {
    this.setState({ selectedItem });
  }

  render() {
    const { items, onItemSelected } = this.props;
    const { selectedItem } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.background} />
        <View style={{ flex: 1 }} />
        <View style={styles.listWrapper}>
          <ListView
            items={items}
            selectedItem={selectedItem}
            itemSelected={itemSelected => this.setSelectedItem(itemSelected)}
          />
          <DoneButton onPress={() => onItemSelected(selectedItem)} />
        </View>
      </View>
    );
  }
}
