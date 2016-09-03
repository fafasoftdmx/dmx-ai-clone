import { AsyncStorage } from 'react-native';

const dmxAppStateService = {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      throw new Error(`AsyncStorage error: ${error.message}`);
    }
  },
  async getItem(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        console.log(`Retrieved item: ${item}`);
        return item;
      }
      throw new Error('no items found');
    } catch (error) {
      throw new Error(`Async Storage Error: ${error.message}`);
    }
  },
  async multiGetItems(keyArr) {
    try {
      const items = await AsyncStorage.multiGet(keyArr);
      if (items !== null) {
        console.log(`Retrieved items: ${items}`);
        return items;
      }
      throw new Error('no items found');
    } catch (error) {
      throw new Error(`Async Storage Error: ${error.message}`);
    }
  },
  async multiSetItems(keyValueArr) {
    try {
      const items = await AsyncStorage.multiSet(keyValueArr);
      if (items !== null) {
        console.log(`Items set: ${items}`);
        return items;
      }
      console.log(`No data for key: ${keyValueArr}`);
      throw new Error(`No data for key: ${keyValueArr}`);
    } catch (error) {
      throw new Error(`Async Storage Error: ${error.message}`);
    }
  },
  async multiRemoveItems(keyArr) {
    try {
      const items = await AsyncStorage.multiRemove(keyArr);
      if (items !== null) {
        console.log(`Retrieved item: ${items}`);
        return items;
      }
      console.log(`No data for key: ${keyArr}`);
      throw new Error(`No data for key: ${keyArr}`);
    } catch (error) {
      throw new Error(`Async Storage Error: ${error.message}`);
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
  async loadAppState(key) {
    try {
      await AsyncStorage.multiGet(key);
      console.log(`Cached selection to disk: ${key}`);
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  },
};

export default dmxAppStateService;
