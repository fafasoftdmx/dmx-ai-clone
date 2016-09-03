import { AsyncStorage } from 'react-native';

const dmxAppStateService = {
  async setItem(key, value) {
        // key = STORAGE_KEYS.dmxAppModelState + key;
    try {
      await AsyncStorage.setItem(key, value);
      return true;
            // console.log('Saved selection to disk: ' + key + ', value: ' + value);
    } catch (error) {
      throw new Error(`AsyncStorage error: ${error.message}`);
    }
  },
  async getItem(key) {
        // key = STORAGE_KEYS.dmxAppModelState + key;
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        return item;
      }
      return false;
    } catch (error) {
      throw new Error(`Async Storage Error: ${error.message}`);
    }
  },
  async multiGetItems(keyArr) {
        // key = STORAGE_KEYS.dmxAppModelState + key;
    try {
      const items = await AsyncStorage.multiGet(keyArr);
      return items;
    } catch (error) {
      throw new Error(`Async Storage Error: ${error}`);
    }
  },
  async multiSetItems(items) {
        // key = STORAGE_KEYS.dmxAppModelState + key;
    try {
      console.log('setting a bunch of items', items);
      const response = await AsyncStorage.multiSet(items);
      console.log('multi set response', response);
      return true;
    } catch (error) {
      throw new Error(`AsyncStorage error: ${error.message}`);
    }
  },
  async multiRemoveItems(keyArr) {
        // key = STORAGE_KEYS.dmxAppModelState + key;
    try {
      await AsyncStorage.multiRemove(keyArr);
      return true;
    } catch (error) {
      throw new Error(`AsyncStorage error: ${error.message}`);
    }
  },
  async removeItem(key) {
        // key = STORAGE_KEYS.dmxAppModelState + key;
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      throw new Error(`Async Storage Error: ${error.message}`);
    }
  },
  async cacheResponse(key, value) {
        // key = STORAGE_KEYS.cache + key;
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`Cached selection to disk: ${key}`);
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  },
  async loadAppState(key, value) {
    try {
      await AsyncStorage.multiGet(key, value);
      console.log(`Cached selection to disk: ${key}`);
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  },
};

export default dmxAppStateService;
