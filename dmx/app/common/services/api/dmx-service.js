import dmxAppStateService from './../state/stateService';
import appraisalTransformer from '../models/appraisal-transformer';
import promisify from 'es6-promisify';
import RNFS from 'react-native-fs';
import { DeviceEventEmitter, NativeModules } from 'react-native';

const baseAppraisalUrl = 'https://d1-appraisals.dmx.io/appraisals';

export const DMXENDPOINTS = {
  authentication: 'https://d1-authentication.dmx.io/',
  user: 'https://authentication.dmx.io/user/',
  appraisal: `${baseAppraisalUrl}/`,
  myAppraisals: `${baseAppraisalUrl}/appraiser/`,
  myDealershipAppraisals: `${baseAppraisalUrl}/dealer/`,
  vehicle: 'https://api.dmx.io/vehicle-info/vehicle/',
  media: 'https://api.dmx.io/media/', // will deprecate
  images: 'https://api.dmx.io/media/images/',
  audio: 'https://api.dmx.io/media/audio',
  decodeVin: 'https://api.dmx.io/vehicle-info/vin/',
  placeBid: id => `${baseAppraisalUrl}/${id}/place-bid`,
  requestBids: id => `${baseAppraisalUrl}/${id}/request-bids`,
  registerDevice: 'https://api.dmx.io/notifications/register',
  marketValue: (styleId, condition, mileage, zip, optionIdList, colorIdList) =>
    `https://api.dmx.io/vehicle-info/vehicle/${styleId}/true-market-value?condition=${condition}&mileage=${mileage}&zip=${zip}&optionid=${optionIdList.join('&optionid=')}&colorid=${colorIdList.join('&colorid=')}`,
};

const SERVICE_KEYS = {
  userAuthToken: 'dmxAuthToken',
  userProfile: 'userProfile',
};

const performActivity = activity => {
  DeviceEventEmitter.emit('valuechange-showactivity', true);
  return activity
        .then((res) => {
          DeviceEventEmitter.emit('valuechange-showactivity', false);
          return res;
        })
        .catch((error) => {
          DeviceEventEmitter.emit('valuechange-showactivity', false);
          throw error;
        });
};

const assertStatuses = (...statuses) =>
    res => {
      if (statuses.find(s => res.status === s || res.status === s.toString())) {
        return res;
      }
      throw new Error(`unexpected status: ${res.status}`);
    };

const expandResponse = async res => {
  if (res.ok) {
    return await res.json();
  }
  throw await res.text();
};

const logApiError = (endpoint, params, err) => {
  const message = `
    API CALL FAILED!
    ENDPOINT: ${endpoint}
    PARAMS: ${JSON.stringify(params)}
    ERROR: ${JSON.stringify(err)}
  `;
  console.error(message);
  throw err;
};

const logApi = (api, endpoint, params) => {
  const message = `
    CALLING API: ${endpoint}
    PARAMS: ${JSON.stringify(params)}
  `;
  console.log(message);
  return api
    .then(res => {
      console.log(`API CALL SUCCESS: ${JSON.stringify(res)}`);
      return res;
    })
    .catch(err => logApiError(endpoint, params, err));
};

const performApiCall = async (endpoint, params) => {
  const resolvedParams = await params;
  return performActivity(
    logApi(
      fetch(endpoint, resolvedParams)
        .then(expandResponse)
        .catch(e => logApiError(endpoint, resolvedParams, e)),
      endpoint,
      resolvedParams
    )
  );
};


const getToken = async () =>
  `Bearer ${await dmxAppStateService.getItem(SERVICE_KEYS.userAuthToken)}`;

const createAuthHeaders = async () => ({
  Authorization: await getToken(),
});

const createHeaders = async () => ({
  'Content-Type': 'application/json',
  Authorization: await getToken(),
});

const uploadFile = (...args) => promisify(NativeModules.FileUpload.upload)(...args)
    .then(assertStatuses(200));

const createParams = async (method, headers, body) => ({
  method,
  headers: await headers,
  body: JSON.stringify(body),
});

function handleFailedRequest(res) {
  console.log(`HTTP ${res.status} ${res.statusText}`);
  console.log(res.headers);
}

const api = {

  ServiceKeys: SERVICE_KEYS,

  async registerDevice(device, token) {
    return performApiCall(
      DMXENDPOINTS.registerDevice,
      createParams(
        'POST',
        createHeaders(),
        { device, token }
      )
    );
  },

  registerUser(query) {
    const formattedQuery = query || {
      firstname: 'Bilbo',
      lastname: 'Bagginses',
      email: 'baggins1@dmx.io',
      password: 'testpassword',
    };
    return performApiCall(
      `${DMXENDPOINTS.authentication}register`,
      createParams(
        'POST',
        createHeaders(),
        formattedQuery
      )
    ).then(res => {
      console.log(`User Registration was successful with email: ${res.email}`);
      return res;
    });
  },

  login(query) {
    const formattedQuery = query || {
      email: 'baggins1@dmx.io',
      password: 'testpassword',
    };

    return performApiCall(
      `${DMXENDPOINTS.authentication}login`,
      createParams(
        'POST',
        createHeaders(),
        formattedQuery
      )
    ).then(res => {
      if (res.token) {
        console.log(`Login was successful with email: ${formattedQuery.email}`);
        dmxAppStateService.setItem(SERVICE_KEYS.userAuthToken, res.token);
        dmxAppStateService.setItem(SERVICE_KEYS.userProfile, JSON.stringify(res.user));
        console.log(`Saved authorization token: ${res.token}`);
        return { status: 'success', user: res.user };
      }
      return res;
    });
  },
  logout() {
    dmxAppStateService.multiRemoveItems([SERVICE_KEYS.userAuthToken, SERVICE_KEYS.userProfile]);
    console.log('Logged out user');
  },
  isLoggedIn() {
    const token = dmxAppStateService.getItem(SERVICE_KEYS.userAuthToken);
    return token !== false;
  },
  getUserProfileByToken(token) {
    return performApiCall(
      DMXENDPOINTS.user + token,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
  // TODO: rewrite to new approach
  async saveCarfaxAccount(userId, username, password) {
    const fetchParams = {
      method: 'POST',
      headers: await createHeaders(),
      body: JSON.stringify({ username, password }),
    };
    const url = `${DMXENDPOINTS.user}${userId}/carfax`;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
      .then((res) => {
        DeviceEventEmitter.emit('valuechange-showactivity', false);
        if (res.ok) {
          return res.json();
        }
        handleFailedRequest(res);
        throw new Error(`request to ${url} failed`);
      })
      .catch((error) => {
        console.log(error);
        DeviceEventEmitter.emit('valuechange-showactivity', false);
        throw error;
      });
  },
  // TODO: rewrite to new approach
  async deleteCarfaxAccount(userId) {
    const fetchParams = {
      method: 'DELETE',
      headers: await createHeaders(),
    };
    const url = `${DMXENDPOINTS.user}${userId}/carfax`;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    return fetch(url, fetchParams)
      .then((res) => {
        DeviceEventEmitter.emit('valuechange-showactivity', false);
        if (res.ok) {
          return res.json();
        }
        handleFailedRequest(res);
        throw new Error(`request to ${url} failed`);
      })
      .catch((error) => {
        console.log(error);
        DeviceEventEmitter.emit('valuechange-showactivity', false);
        throw error;
      });
  },
  // TODO: rewrite to new approach
  async saveAppraisalSort(userId, option) {
    const fetchParams = {
      method: 'POST',
      headers: await createHeaders(),
      body: JSON.stringify(option),
    };
    const url = `${DMXENDPOINTS.user}${userId}/appraisalsort`;
    return fetch(url, fetchParams)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        handleFailedRequest(res);
        throw new Error(`request to ${url} failed`);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },
  // TODO: rewrite to new approach
  async deleteAppraisalSort(userId) {
    const fetchParams = {
      method: 'DELETE',
      headers: await createHeaders(),
    };
    const url = `${DMXENDPOINTS.user}${userId}/appraisalsort`;
    return fetch(url, fetchParams)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        handleFailedRequest(res);
        throw new Error(`request to ${url} failed`);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  },
  vinDecode(vin) {
    return performApiCall(
      DMXENDPOINTS.decodeVin + vin,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
  getVehicleInfo(styleId) {
    return performApiCall(
      DMXENDPOINTS.vehicle + styleId,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
  saveAppraisal(appraisal) {
    const dmAppraisal = appraisalTransformer.viewToDomain(appraisal);
    return performApiCall(
      DMXENDPOINTS.appraisal,
      createParams(
        'POST',
        createHeaders(),
        dmAppraisal
      )
    );
  },
  deleteAppraisal(id) {
    return performApiCall(
      `${DMXENDPOINTS.appraisal}${id}`,
      createParams(
        'DELETE',
        createHeaders()
      )
    );
  },
  updateAppraisal(appraisal) {
    const dmAppraisal = appraisalTransformer.viewToDomain(appraisal);
    return performApiCall(
      `${DMXENDPOINTS.appraisal}${appraisal.id}`,
      createParams(
        'PUT',
        createHeaders(),
        dmAppraisal
      )
    );
  },
  getAppraisal(id) {
    return performApiCall(
      DMXENDPOINTS.appraisal + id,
      createParams(
        'GET',
        createHeaders()
      )
    ).then(appraisalTransformer.domainToView);
  },
  getMyAppraisals(owner, limit, skip) {
    return performApiCall(
      `${DMXENDPOINTS.myAppraisals}${owner}?limit=${limit}&skip=${skip}`,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
  getMyDealershipAppraisals(owner, dealerId, limit, skip) {
    // there
    return performApiCall(
      `${DMXENDPOINTS.myDealershipAppraisals}${owner}?limit=${limit}&skip=${skip}`,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
  getAppraisals(limit, skip = 0) {
    return performApiCall(
      `${DMXENDPOINTS.appraisal}?limit=${limit}&skip=${skip}`,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
  placeBid(appraisalId, amount) {
    return performApiCall(
      DMXENDPOINTS.placeBid(appraisalId),
      createParams(
        'POST',
        createHeaders(),
        { amount }
      )
    );
  },
  requestBids(appraisalId) {
    return performApiCall(
      DMXENDPOINTS.requestBids(appraisalId),
      createParams(
        'PUT',
        createHeaders()
      )
    );
  },
  async saveMedia(uri, fileName) {
    console.log('uri in web service call', uri);
    console.log('angle in web service call', fileName);
    const obj = {
      uploadUrl: DMXENDPOINTS.media,
      method: 'POST', // default 'POST',support 'POST' and 'PUT'
      headers: await createAuthHeaders(),
      files: [
        {
          name: fileName, // optional, if none then `filename` is used instead
          filename: fileName, // require, file name
          filepath: uri, // require, file absoluete path
          filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
        },
      ],
      // NB: for current (21.06.2016) implementation, this field is required for Android.
      fields: {},
    };
    try {
      DeviceEventEmitter.emit('valuechange-showactivity', true);
      console.log('attempting to upload photo with data', obj);
      return new Promise((resolve, reject) => {
        NativeModules.FileUpload.upload(obj, (err, res) => {
          DeviceEventEmitter.emit('valuechange-showactivity', false);
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    } catch (err) {
      DeviceEventEmitter.emit('valuechange-showactivity', false);
      throw new Error('Image save network request failed with error ', err);
    }
  },
  async getAudio(fromUrl) {
    const destinationDirectory = RNFS.DocumentDirectoryPath;
    const toFile = `${destinationDirectory}/${fromUrl.split('/').pop()}.mp4`;

    return performActivity(RNFS.downloadFile({
      fromUrl,
      toFile,
      headers: await createHeaders(),
    })).then(() => {
      console.log('file downloaded!');
      return toFile;
    })
            .catch((error) => {
              console.log(error);
              throw error;
            });
  },
  async saveAudio(uri, fileName) {
    console.log('uri in web service call', uri);
    console.log('fileName in web service call', fileName);
    const obj = {
      uploadUrl: DMXENDPOINTS.audio,
      method: 'POST',
      headers: await createAuthHeaders(),
      files: [
        {
          name: fileName,
          filename: fileName,
          filepath: uri,
          filetype: 'audio/mp4',
        },
      ],
      // NB: for current (21.06.2016) implementation, this field is required for Android.
      fields: {},
    };
    console.log('attempting to upload audio with data', obj);
    return performActivity(uploadFile(obj).then(res => JSON.parse(res.data)));
  },
  getMarketValue(styleId, condition = 'Clean', mileage, zip = '77019', optionIdList, colorIdList) {
    const url = DMXENDPOINTS.marketValue(
      styleId,
      condition,
      mileage,
      zip,
      optionIdList || [],
      colorIdList || []
    );
    return performApiCall(
      url,
      createParams(
        'GET',
        createHeaders()
      )
    );
  },
};

export default api;
