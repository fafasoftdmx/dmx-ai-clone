import React, { PropTypes } from 'react';
import { View, Alert, DeviceEventEmitter } from 'react-native';
import Sound from 'react-native-sound';
import appraisalModel from '../../common/services/models/appraisal-model';
import dmxApi from '../../common/services/api/dmx-service';
import { SUMMARY_RECORDING_ADDED } from '../summary/summary-events';

export default class AudioRecordsList extends React.Component {

  static propTypes = {
    entryRenderer: PropTypes.func.isRequired,
    displayedRecordings: PropTypes.number,
  }

  constructor() {
    super();
    this.soundByPath = {};
    this.state = {
      recordings: [],
      currentPlayingItem: undefined,
    };
  }

  componentWillMount() {
    this.fetchData();
    this.recordCreatedListener = DeviceEventEmitter.addListener(
      SUMMARY_RECORDING_ADDED,
      () => this.fetchData()
    );
  }

  componentWillUnmount() {
    this.recordCreatedListener.remove();
    this.releaseSounds();
  }

  releaseSounds() {
    this.pauseCurrent();
    const keys = Object.keys(this.soundByPath);
    keys.forEach(key => {
      if (this.soundByPath[key]) {
        this.soundByPath[key].release();
        this.soundByPath[key] = undefined;
      }
    });
  }

  async fetchData() {
    const recordings = await appraisalModel.getRecordings()
            .then(result => result || []);
    this.setState({ recordings });
  }

  async playRecord(record) {
    this.pauseCurrent();
    this.setState({ currentPlayingItem: record });
    const { url } = record;

    const play = (path) =>
      error => {
        if (error) {
          console.log('failed to load the sound', error);
        } else {
          this.soundByPath[path].play(() => {
            if (this.state.currentPlayingItem === record) {
              this.setState({ currentPlayingItem: undefined });
            }
          });
        }
      };

    if (this.soundByPath[url]) {
      play(url)(undefined);
    } else {
      const filePath = await dmxApi.getAudio(url);
      this.soundByPath[url] = new Sound(filePath, '', play(url));
    }
  }

  pauseCurrent() {
    if (this.state.currentPlayingItem) {
      this.pauseRecord(this.state.currentPlayingItem);
    }
  }

  pauseRecord(record) {
    if (this.soundByPath[record.url]) {
      this.soundByPath[record.url].pause();
    }
    this.setState({ currentPlayingItem: undefined });
  }

  deleteNotificationApprove(record) {
    this.pauseRecord(record);
    this.setState({ recordings: this.state.recordings.filter(e => e !== record) });
    appraisalModel.deleteRecording(record.url);
  }

  showDeleteRecordNotification(record) {
    Alert.alert('', `Are you sure you want to delete ${record.name}`, [
      { text: 'YES REMOVE', onPress: () => this.deleteNotificationApprove(record) },
      { text: 'NO' },
    ]);
  }

  render() {
    const { currentPlayingItem, recordings } = this.state;
    const { entryRenderer: Renderer, displayedRecordings } = this.props;
    return (
      <View>
        {recordings.slice(0, displayedRecordings || recordings.length).map((e, i) => (
          <Renderer
            key={`record_${i}`}
            record={e}
            currentPlayingItem={currentPlayingItem}
            pauseRecord={(r) => this.pauseRecord(r)}
            playRecord={(r) => this.playRecord(r)}
            deleteRecord={(r) => this.showDeleteRecordNotification(r)}
          />
        ))}
      </View>
    );
  }
}
