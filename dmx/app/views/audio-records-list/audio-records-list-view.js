import React, { PropTypes } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './audio-records-list.styles';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import AudioRecordsListEntry from './audio-records-list-entry';
import AudioRecordsList from './audio-records-list';

const voiceIconAsset = require('../../assets/voice-icon@2x.png');

export default class AudioRecordsListView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  navigateToRecords() {
    this.refs.recordList.releaseSounds();
    this.props.navigator.push({
      name: 'record-audio',
    });
  }

  renderRightButton() {
    const { data } = this.props.route;
    if (data && data.canCreateRecording === false) {
      return <View />;
    }
    return (
      <View style={styles.createRecordingButton}>
        <TouchableOpacity onPress={() => this.navigateToRecords()}>
          <Image source={voiceIconAsset} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { data } = this.props.route;
    const Renderer = ({ ...props }) => (
      <AudioRecordsListEntry
        {...props}
        canDeleteRecording={data && data.canCreateRecording !== false}
      />
    );
    return (
      <View style={styles.list}>
        <CustomSettingsHeader
          text="Records List"
          navigator={this.props.navigator}
          popToRoute="summary"
          rightButton={this.renderRightButton()}
        />
        <ScrollView
          style={styles.list}
        >
          <AudioRecordsList
            ref="recordList"
            entryRenderer={Renderer}
          />
        </ScrollView>
      </View>
    );
  }
}
