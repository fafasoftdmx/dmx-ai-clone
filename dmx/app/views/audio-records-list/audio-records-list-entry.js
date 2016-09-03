import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import styles from './audio-records-list.styles';
const pauseAudioAsset = require('../../assets/pause-audio@2x.png');
const playRecordingAsset = require('../../assets/play-recording@2x.png');
const binIconAsset = require('../../assets/bin-icon@2x.png');

const formatTime = (duration) => {
  const value = moment().hours(0).minutes(0)
    .seconds(0)
    .milliseconds(duration);
  return `${value.format('s')} seconds`;
};

const AudioRecordsListEntry = ({
  record,
  pauseRecord,
  playRecord,
  deleteRecord,
  canDeleteRecording,
  currentPlayingItem,
}) => (
  <View style={styles.recordEntry}>
    <View style={styles.playPauseButtonWrap}>
      {currentPlayingItem === record ? (
        <TouchableOpacity onPress={() => pauseRecord(record)}>
          <Image
            source={pauseAudioAsset}
            style={styles.pauseButton}
          />
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity onPress={() => playRecord(record)}>
            <Image source={playRecordingAsset} />
          </TouchableOpacity>
        </View>
      )}
    </View>
    <View>
      <Text style={styles.recordName}>{record.name}</Text>
      <Text style={styles.recordDescription}>
        {formatTime(record.duration)}
      </Text>
    </View>
    {canDeleteRecording &&
      <View style={styles.deleteButtonWrap}>
        <TouchableOpacity onPress={() => deleteRecord(record)}>
          <Image source={binIconAsset} />
        </TouchableOpacity>
      </View>}
  </View>
);

AudioRecordsListEntry.propTypes = {
  record: PropTypes.object,
  pauseRecord: PropTypes.func,
  playRecord: PropTypes.func,
  deleteRecord: PropTypes.func,
  canDeleteRecording: PropTypes.bool,
  currentPlayingItem: PropTypes.object,
};

export default AudioRecordsListEntry;
