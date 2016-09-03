import React, { PropTypes } from 'react';
import { Text, View, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import summaryCommonStyles from './../summary.styles';
import { SUMMARY_RECORDING_ADDED } from '../summary-events';
import styles from './summary-audio-records.style';
import SummaryAudioRecordsEntry from './summary-audio-records-entry';
import AudioRecordsList from '../../audio-records-list/audio-records-list';
import appraisalModel from '../../../common/services/models/appraisal-model';
const arrowAsset = require('../../../assets/arrow-blue.png');

const DEFAULT_DISPLAY_COUNT = 3;

const ShowMoreButton = ({ onPress, count }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.entryWrapper,
          styles.previewItemWrapper,
          { justifyContent: 'space-around' },
        ]}
      >
        <Text style={styles.showMoreLabel}>+{count} MORE</Text>
      </View>
    </TouchableOpacity>
  </View>
);

ShowMoreButton.propTypes = {
  onPress: PropTypes.func,
  count: PropTypes.number,
};

export default class SummaryAudioRecords extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    componentIsDeactivated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      recordings: [],
      collapsed: true,
    };
  }

  componentWillMount() {
    this.updateRecordings();
    this.recordCreatedListener = DeviceEventEmitter.addListener(
      SUMMARY_RECORDING_ADDED,
      e => this.updateRecordings(e)
    );
  }

  componentWillUnmount() {
    this.recordCreatedListener.remove();
  }

  async updateRecordings() {
    const recordings = await appraisalModel.getRecordings();
    this.setState({ recordings });
  }

  async navigateToRecords() {
    const { componentIsDeactivated } = this.props;
    const { recordings } = this.state;
    const haveRecordings = recordings.length > 0;
    this.refs.recordList.releaseSounds();
    this.props.navigator.push({
      name: haveRecordings ? 'audio-records-list' : 'record-audio',
      data: {
        canCreateRecording: !componentIsDeactivated,
      },
    });
  }

  toggleCollapsed() {
    this.setState({ collapsed: false });
  }

  render() {
    const { componentIsDeactivated } = this.props;
    const { recordings, collapsed } = this.state;
    const canOpenView = recordings.length > 0 || !componentIsDeactivated;
    const showMoreOptions = recordings.length > DEFAULT_DISPLAY_COUNT && collapsed;
    const displayedRecordings = showMoreOptions ? DEFAULT_DISPLAY_COUNT : recordings.length;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.navigateToRecords()}
          disabled={!canOpenView}
        >
          <View style={summaryCommonStyles.summaryItemHeaderWrap}>
            <Text style={summaryCommonStyles.summaryItemHeaderText}>Vehicle Voice Notes</Text>
            {canOpenView && <Image
              style={summaryCommonStyles.summaryItemHeaderArrow}
              source={arrowAsset}
              resizeMode="contain"
            />}
          </View>
        </TouchableOpacity>
        <AudioRecordsList
          ref="recordList"
          displayedRecordings={displayedRecordings}
          entryRenderer={SummaryAudioRecordsEntry}
        />
        {
          showMoreOptions && <ShowMoreButton
            count={recordings.length - DEFAULT_DISPLAY_COUNT}
            onPress={() => this.toggleCollapsed()}
          />
        }
      </View>
    );
  }
}
