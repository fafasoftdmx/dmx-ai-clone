import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Image,
  View,
  ListView,
  RefreshControl,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import AppraisalListItem from '../appraisal-list-item/appraisal-list-item';
import appraisalModel from '../../../common/services/models/appraisal-model';
import DMXCOLORS from '../../../common/constants/colors';
import styles from './appraisal-list-view.styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import carPng from '../../../assets/car-icon.png';

export default class AppraisalListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  async advanceToSummary(appraisal) {
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    await appraisalModel.forceActiveVehicleUpdate(appraisal);
    this.props.navigator.push({
      name: 'summary',
      newAppraisal: false,
    });
    DeviceEventEmitter.emit('valuechange-showactivity', false);
  }

  async deleteRow(data, secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    const success = await this.props.deleteItem(data.id);
    if (!success) {
      Alert.alert('', 'Something unexpected happened, try that again.', [
        { text: 'OK', onPress: () => console.log('appraisal deletion api call failed') },
      ]);
    }
  }

  renderNoAppraisals() {
    return (
      <View style={styles.noAppraisalsWrap}>
        <Image style={styles.noAppraisalsImage} source={carPng} />
        <Text style={styles.noAppraisalsHeaderText}>No Appraisals</Text>
        <Text style={styles.noAppraisalsBodyText}>
          Click on the button below to create your first Appraisal.
        </Text>
      </View>
    );
  }

  render() {
    const { appraisals } = this.props;
    const hasAppraisals = appraisals && appraisals.length > 0;
    return !hasAppraisals ? this.renderNoAppraisals() :
      <SwipeListView
        enableEmptySections
        closeOnRowPress={false}
        dataSource={this.ds.cloneWithRows(this.props.appraisals)}
        disableLeftSwipe={!this.props.enableDelete}
        disableRightSwipe
        leftOpenValue={75}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isRefreshing}
            onRefresh={() => this.props.onRefresh()}
            tintColor={DMXCOLORS.BLUE}
            title="Loading appraisals..."
          />
        }
        renderRow={appraisal => (
          <AppraisalListItem
            appraisal={appraisal}
            onPress={() => this.advanceToSummary(appraisal)}
          />
        )}
        renderHiddenRow={(data, secId, rowId, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => this.deleteRow(data, secId, rowId, rowMap)}
            >
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        style={styles.listWrap}
      />;
  }
}

AppraisalListView.propTypes = {
  navigator: PropTypes.object,
  appraisals: PropTypes.array,
  deleteItem: PropTypes.func,
  enableDelete: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};
