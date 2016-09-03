import React, { PropTypes } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './summary-audio-records.style';
import moment from 'moment';

const playAsset = require('../../../assets/play@2x.png');
const pauseAsset = require('../../../assets/pause-audio@2x.png');

const formatTime = (duration) => {
  const value = moment().hours(0).minutes(0)
    .seconds(0)
    .milliseconds(duration);
  return `${value.format('m:ss')}`;
};

const SummaryAudioRecordsEntry = ({ record, pauseRecord, playRecord, currentPlayingItem }) => (
  <View style={styles.entryWrapper}>
    <TouchableOpacity
      onPress={() => (currentPlayingItem !== record ? playRecord(record) : pauseRecord(record))}
      style={{ flex: 1 }}
    >
      <View style={styles.previewItemWrapper}>
        <View style={styles.leftPartWrapper}>
          {currentPlayingItem === record ?
            <View>
              <Image style={styles.pauseButton} source={pauseAsset} />
            </View> :
            <Image source={playAsset} />
          }
          <Text style={styles.nameLabel}>{record.name}</Text>
        </View>
        <View style={styles.previewTimeBackground}>
          <Text style={styles.durationLabel}>
            {formatTime(record.duration)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

SummaryAudioRecordsEntry.propTypes = {
  onPress: PropTypes.func,
  record: PropTypes.object,
  pauseRecord: PropTypes.func,
  playRecord: PropTypes.func,
  currentPlayingItem: PropTypes.object,
};

export default SummaryAudioRecordsEntry;
