import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, ListView, ScrollView } from 'react-native';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './notification-filter-list.styles';
import { SwipeRow } from 'react-native-swipe-list-view';
const arrowAsset = require('../../assets/arrow@3x.png');
const binIcon = require('../../assets/bin-icon-white@2x.png');

const NotificationFilterItem = ({ item: { title }, onPress }) =>
  <View style={{ backgroundColor: 'white' }}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItemWrapper}>
        <Text style={styles.listItemText}>
          {title}
        </Text>
        <View style={{ flex: 1 }} />
        <Image style={styles.listItemArrow} source={arrowAsset} />
      </View>
    </TouchableOpacity>
  </View>;

NotificationFilterItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const DeleteNotificationButton = ({ onPress }) =>
  <View style={{ flex: 1 }}>
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: 'red',
          width: 60,
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}
      >
        <Image
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
          }}
          source={binIcon}
        />
      </View>
    </TouchableOpacity>
  </View>;

DeleteNotificationButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default class NotificationFilterList extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      filters: [
        { name: 'AAAA' },
        { name: 'AAAB' },
        { name: 'AAAC' },
      ],
    };
  }

  addNewNotificationFilter() {
    const { navigator } = this.props;
    navigator.push({ name: 'notification-filter-summary' });
  }

  openItem(item) {
    const { navigator } = this.props;
    navigator.push({
      name: 'notification-filter-summary',
      data: item,
    });
  }

  deleteItem(item) {
    this.setState({
      filters: this.state.filters.filter(i => i.name !== item.name),
    });
  }

  render() {
    const { navigator, route } = this.props;
    const filters = this.state.filters.map(f => ({
      ...f,
      title: f.name,
    }));

    return (<DmxAppShell
      hasFooter
      hasHeader={false}
      collapseEnabled
      buttonText="ADD NEW NOTIFICATION FILTER"
      buttonAction={() => this.addNewNotificationFilter()}
      buttonIsActive
      navigator={navigator}
      route={route}
    >
      <CustomSettingsHeader navigator={this.props.navigator} text="Notification Filters" />
      <ScrollView>
        {filters.map((item, i) => (
          <SwipeRow
            key={`row_${i}`}
            ref={`key_${i}`}
            closeOnRowPress
            closeOnScroll
            disableRightSwipe
            dataSource={this.dataSource.cloneWithRows(filters)}
            rightOpenValue={-60}
          >
            <DeleteNotificationButton
              item={item}
              onPress={() => {
                this.refs[`row_${i}`].closeRow();
                this.deleteItem(item);
              }}
            />
            <NotificationFilterItem
              item={item}
              onPress={() => this.openItem(item)}
            />
          </SwipeRow>
        ))}
      </ScrollView>
    </DmxAppShell>);
  }
}
