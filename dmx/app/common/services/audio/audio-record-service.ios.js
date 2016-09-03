import { AudioRecorder } from 'react-native-audio';

class IosAudioRecordService {

  constructor() {
    this.AudioEncoding = {
      AAC: 'aac',
    };
    this.OutputFormat = {
      MPEG_4: 2,
    };
  }

  prepareRecordingAtPath(path, options) {
    AudioRecorder.prepareRecordingAtPath(path, options);
  }

  onProgress(onProgress) {
    AudioRecorder.onProgress = onProgress;
  }

  onFinished(onFinished) {
    AudioRecorder.onFinished = onFinished;
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

export default new IosAudioRecordService();
