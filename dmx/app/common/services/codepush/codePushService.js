import codePush from 'react-native-code-push';
import { AppState } from 'react-native';
const SYNC_DELAY = 1000 * 60 * 5; // 5 minutes

export const codePushService = {

  performSync() {
    console.log('>>> SYNC APPLICATION');
    codePush.sync({ installMode: codePush.InstallMode.ON_NEXT_RESUME });
  },

  startSyncing(delay = SYNC_DELAY) {
    const doStartSync = () => {
      clearInterval(this.syncInterval);
      this.performSync();
      this.syncInterval = setInterval(() => this.performSync(), delay);
    };
    doStartSync();
    AppState.addEventListener('change', newState => {
      if (newState === 'active') {
        doStartSync();
      } else {
        clearInterval(this.syncInterval);
      }
    });
  },


};
