import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import styles from './record-audio.styles';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import AudioRecordService from '../../common/services/audio/audio-record-service';
import moment from 'moment';
import appraisalModel from '../../common/services/models/appraisal-model';
import permissionsService from '../../common/services/api/permissions';
import RNFS from 'react-native-fs';
import { SUMMARY_RECORDING_ADDED } from '../summary/summary-events';

const doneCtaAsset = require('../../assets/done-cta@3x.png');
const menuCtaAsset = require('../../assets/menu-cta@3x.png');
const checkMarkDisabledAsset = require('../../assets/checkmark-disabled.png');
const recordingAsset = require('../../assets/recording...@3x.png');
const pauseAsset = require('../../assets/pause@2x.png');
const imageMap = {
  'done cta.png': doneCtaAsset,
  'menu-cta.png': menuCtaAsset,
  'checkmark-disabled.png': checkMarkDisabledAsset,
  'recording.png': recordingAsset,
  'pause.png': pauseAsset,
};
const MAX_RECORDING_TIME = 15000;
const NOT_STARTED = 'NOT_STARTED';
const RECORDING = 'RECORDING';
const PAUSED = 'PAUSED';
const DONE = 'DONE';

export default class RecordAudioView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.state = {
      recordingState: NOT_STARTED,
      currentTime: 0,
      currentOptimisticTime: 0,
    };
  }

  componentDidMount() {
    const audioPath = `${RNFS.DocumentDirectoryPath}/${moment.utc().valueOf()}.mp4`;
    AudioRecordService.prepareRecordingAtPath(audioPath, {
      AudioEncoding: AudioRecordService.AudioEncoding.AAC,
      OutputFormat: AudioRecordService.OutputFormat.MPEG_4,
    });
    AudioRecordService.onProgress((data) => {
      this.updateTime(data.currentTime);
      this.checkExceeded(data.currentTime * 1000);
    });
    AudioRecordService.onFinished(async (data) => {
      console.log(`Finished recording: ${data.status}`);
      AudioRecordService.onProgress(undefined);
      AudioRecordService.onFinished(undefined);
      this.saveRecording(data);
    });
  }

  getCurrentTime() {
    const ms = this.calculateTotalTime();
    const currentMoment = moment()
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(ms);
    return currentMoment.format('mm:ss.SS');
  }

  getRecordingState(recordingState) {
    switch (recordingState) {
      case RECORDING:
        return (<TouchableOpacity onPress={() => this.pauseRecording()}>
          <Image source={imageMap['pause.png']} />
        </TouchableOpacity>);
      case PAUSED:
      case NOT_STARTED:
        return (<View>
          <TouchableOpacity onPress={() => this.startRecording()}>
            <Image source={imageMap['recording.png']} />
          </TouchableOpacity>
        </View>);
      default:
        return <View />;
    }
  }

  approveRecording() {
    AudioRecordService.stopRecording();
  }

  calculateTotalTime() {
    return Math.floor(this.state.currentTime * 1000 + this.state.currentOptimisticTime);
  }

  async saveRecording(data) {
    try {
      await appraisalModel.saveRecording(data.audioFileURL, this.calculateTotalTime());
    } catch (err) {
      Alert.alert('', 'Upload failed!', [
                { text: 'TRY AGAIN', onPress: () => this.saveRecording() },
                { text: 'TURN BACK', onPress: () => this.props.navigator.pop() },
      ]);
    }
    DeviceEventEmitter.emit(SUMMARY_RECORDING_ADDED);
    this.props.navigator.push({
      name: 'audio-records-list',
      data: undefined,
    });
  }

  checkExceeded(time) {
    if (time >= MAX_RECORDING_TIME) {
      this.recordingLimitExceed();
    }
  }

  updateTime(currentTime) {
    this.lastUpdated = +new Date();
    this.setState({
      currentTime,
      currentOptimisticTime: 0,
    });
  }

  startRecording() {
    const permissionType = 'microphone';
    // check permissions first
    permissionsService.checkPermission(permissionType)
      .then((response) => {
        console.log('permission check response', response);
        if (response === 'undetermined') {
          DeviceEventEmitter.emit('dmx-showmodal', permissionsService.packagePermissionsModalContent(permissionType)); // eslint-disable-line max-len
        } else if (response === 'denied') {
          permissionsService.handleDeniedRequest(permissionType);
        } else if (response === 'authorized') {
          AudioRecordService.startRecording();
          this.updateTime(0);
          this.interval = setInterval(() => {
            const currentOptimisticTime = +new Date() - this.lastUpdated;
            this.setState({ currentOptimisticTime });
            this.checkExceeded(this.calculateTotalTime());
          }, 30);
          this.setState({ recordingState: RECORDING });
        }
      });
  }

  recordingLimitExceed() {
    clearInterval(this.interval);
    AudioRecordService.pauseRecording();
    this.setState({ recordingState: DONE });
  }

  pauseRecording() {
    AudioRecordService.pauseRecording();
    clearInterval(this.interval);
    this.setState({ recordingState: Platform.OS === 'ios' ? PAUSED : DONE });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomSettingsHeader showMenuButton={false} navigator={this.props.navigator}>
          <View style={{ alignItems: 'center' }}>
            <Text>Describe Vehicle</Text>
            {
              this.state.recordingState === RECORDING ?
                <Text style={styles.recordingStateLabel}>Recording...</Text> :
                <Text style={styles.notRecordingStateLabel}>Not Recording</Text>
            }
          </View>
        </CustomSettingsHeader>
        <Text style={styles.descriptionText}>
          Maximum Length = 15 Seconds
        </Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>
            {this.getCurrentTime()}
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.sideButton} />
          <View style={styles.microphone}>
            {this.getRecordingState(this.state.recordingState)}
          </View>
          <View style={styles.sideButton}>
            {this.state.recordingState === PAUSED || this.state.recordingState === DONE ?
              <TouchableOpacity
                onPress={() => this.approveRecording()}
              >
                <Image source={imageMap['done cta.png']} />
              </TouchableOpacity> :
              <Image source={imageMap['checkmark-disabled.png']} />}
          </View>
        </View>
      </View>
    );
  }
}
