import { NativeModules } from 'react-native';


const AudioRecorder = NativeModules.AudioRecorder;

class AndroidAudioRecordService {
  constructor() {
    this.AudioEncoding = {
      AAC: 3,
    };
    this.OutputFormat = {
      MPEG_4: 2,
    };
  }

  prepareRecordingAtPath(path, options) {
    AudioRecorder.prepareRecordingAtPath(path, options);
  }

  onProgress(onProgress) {
    AudioRecorder.onProgress(onProgress);
  }

  onFinished(onFinished) {
    AudioRecorder.onFinished(onFinished);
  }

  startRecording() {
    AudioRecorder.startRecording();
  }

  pauseRecording() {
    AudioRecorder.pauseRecording();
  }

  stopRecording() {
    AudioRecorder.stopRecording();
  }
}

export default new AndroidAudioRecordService();
