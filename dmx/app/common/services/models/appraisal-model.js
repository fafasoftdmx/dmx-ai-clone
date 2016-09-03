// The appraisal model service is meant to hold the current appraisal object and contain functions
// that will enable the developer to get and set properties on that object.
// This service is also where we save the appraisal to the back end.
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';
import dmxApi from './../api/dmx-service';
import dmxAppModel from './../models/dmx-app-model.js';
import stateService from './../state/stateService';
import { EXISTING_APPRAISAL_EDITED } from '../events/appraisal-event';

const APPRAISAL_KEYS = {
  dateCreated: 'dateCreated',
  general: 'generalInfo',
  styleId: 'styleId',
  mileage: 'mileage',
  acv: 'acv',
  exteriorColor: 'exteriorColor',
  interiorColor: 'interiorColor',
  options: 'options',
  equipment: 'equipment',
  media: 'media',
  recordings: 'recordings',
  ratings: 'ratings',
  owner: 'owner',
  dealerId: 'dealerId',
  price: 'price',
  location: 'location',
  marketValue: 'marketValue',
  bidRequestsMade: 'bidRequestsMade',
};

async function updateAppraisalModel(key, value) {
    // check if we have an active-vehicle at all
  let activeVehicle = await stateService.getItem('active-vehicle');
  let updatedAppraisal;
  if (activeVehicle) {
        // parse it then add the key + value
    activeVehicle = JSON.parse(activeVehicle);
    if (activeVehicle.bidRequestsMade > 0 && !activeVehicle.hasBeenEdited) {
      if (key !== APPRAISAL_KEYS.bidRequestsMade) {
        activeVehicle.hasBeenEdited = true;
        DeviceEventEmitter.emit(EXISTING_APPRAISAL_EDITED);
      }
    }
    updatedAppraisal = {
      ...activeVehicle,
      [key]: value,
    };
  } else {
    updatedAppraisal = {
      [key]: value,
    };
  }
  stateService.setItem('active-vehicle', JSON.stringify(updatedAppraisal));
}

async function returnAppraisalDataByKey(key) {
  let appraisalDataByKey = await stateService.getItem('active-vehicle');
  appraisalDataByKey = JSON.parse(appraisalDataByKey);
  return appraisalDataByKey[key] || false;
}

const getRatingsAvg = (ratings) => {
  console.log('ratings are in get ratings avg', ratings);
  let avg = 2;
  if (ratings) {
    const ratingKeys = Object.keys(ratings);
    let sum = 0;
    ratingKeys.forEach((key) => {
      sum += ratings[key];
    });
        // default to middle rating avg
    avg = (sum > 0) ? sum / ratingKeys.length : 2;
  }
  return avg;
};

const appraisalModel = {
  async setAppraisalDateCreated() {
    updateAppraisalModel(APPRAISAL_KEYS.dateCreated, moment.utc());
  },
  async getAppraisalDateCreated() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.dateCreated);
  },
  async showCurrentAppraisal() {
    const appraisal = await stateService.getItem('active-vehicle');
    return appraisal;
  },
  async getCurrentAppraisal() {
    const appraisal = await stateService.getItem('active-vehicle');
    return JSON.parse(appraisal);
  },
  async initAppraisal() {
    await this.clearAppraisal();
    this.setAppraisalDateCreated();
  },
  async save() {
    const appraisal = await this.getCurrentAppraisal();
    try {
      const saveResponse = await dmxApi.saveAppraisal(appraisal);
      appraisal.id = saveResponse._id;
      stateService.setItem('active-vehicle', JSON.stringify(appraisal));
      return true;
    } catch (ex) {
      return false;
    }
  },
  async update() {
    try {
      const appraisal = await this.getCurrentAppraisal();
      const updateResponse = await dmxApi.updateAppraisal(appraisal);
      console.log('model.update', appraisal);
      if (updateResponse.ok) {
        return true;
      }
      return false;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  },
  async clearAppraisal() {
    return await stateService.removeItem('active-vehicle');
  },
  async saveOdometer(mileage) {
    updateAppraisalModel('mileage', mileage);
    if (mileage > 1000) {
      DeviceEventEmitter.emit('valuechange-mileage', mileage);
    }
  },
  async saveAcv(acv) {
    updateAppraisalModel('acv', acv);
  },
  async getMileage(year) {
    console.log('----- >>>>> Mileage Year: ', year);
    const mileage = await returnAppraisalDataByKey(APPRAISAL_KEYS.mileage);
    const defaultMileage = (year && year > 1900) ?
      ((new Date()).getFullYear() - year) * 15000 : null;
    return mileage || defaultMileage;
  },
  async getAcv() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.acv);
  },
  async saveGeneralVehicleInfo(vehicleInfo, vin) {
    const payload = {
      make: vehicleInfo.make.name,
      model: vehicleInfo.model.name,
      vin,
      year: (vehicleInfo.year) ? vehicleInfo.year.year : vehicleInfo.years[0].year,
      styleId: String(vehicleInfo.id), // this has to be a string or validation will fail
      categories: vehicleInfo.categories,
    };
    updateAppraisalModel(APPRAISAL_KEYS.general, payload);
    console.log('----- >>>>> saved general vehicle info: ', vehicleInfo);
  },
  async getGeneralVehicleInfo() {
        // let vehicleInfoKeys = ['make', 'model', 'vin', 'year'];
    return returnAppraisalDataByKey(APPRAISAL_KEYS.general);
        // let generalVehicleInfo = await stateService.getItem('activeVehicle');
        // console.log('general vehicle info in appraisal model', generalVehicleInfo);
        // return JSON.parse(generalVehicleInfo);
  },
  async saveSelectedStyleId(styleId) {
    console.log('----- >>>>> save StyleId: ', styleId);
    await updateAppraisalModel(APPRAISAL_KEYS.styleId, styleId);

        // need to hit the back end to grab the vehicleInfo
    await dmxAppModel.updateVehicleInfo(styleId);
  },
  async getSelectedStyleId() {
    const styleId = await returnAppraisalDataByKey(APPRAISAL_KEYS.styleId);
    return styleId;
  },
  async saveSelectedExteriorColor(color) {
    updateAppraisalModel(APPRAISAL_KEYS.exteriorColor, color);
  },
  async getSelectedExteriorColor() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.exteriorColor);
  },
  async saveSelectedInteriorColor(color) {
    updateAppraisalModel(APPRAISAL_KEYS.interiorColor, color);
  },
  async getSelectedInteriorColor() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.interiorColor);
  },
  async saveSelectedVehicleOptions(options) {
    updateAppraisalModel(APPRAISAL_KEYS.options, options);
  },
  async getSelectedVehicleOptions() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.options);
  },
  async saveSelectedEquipment(equipment) {
    updateAppraisalModel(APPRAISAL_KEYS.equipment, equipment);
  },
  async saveSelectedMedia(mediaArr) {
    updateAppraisalModel(APPRAISAL_KEYS.media, mediaArr);
  },
  async saveRatings(type, rating) {
    const currentRatings = await returnAppraisalDataByKey(APPRAISAL_KEYS.ratings);
    let newRatings = {};
    if (currentRatings) {
      newRatings = {
        ...currentRatings,
        [type]: rating,
      };
    } else {
      newRatings = {
        [type]: rating,
      };
    }

    updateAppraisalModel(APPRAISAL_KEYS.ratings, newRatings);
    const avg = getRatingsAvg(newRatings);
    DeviceEventEmitter.emit('valuechange-ratings', { newRatings, avg });
  },
  async savePrice(price) {
    updateAppraisalModel(APPRAISAL_KEYS.price, price);
  },
  async getBidRequestsMade() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.bidRequestsMade);
  },
  async saveBidRequestsMade(bidRequestsMade) {
    return updateAppraisalModel(APPRAISAL_KEYS.bidRequestsMade, bidRequestsMade);
  },
  async getRatings() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.ratings);
  },
  async getEdmundsCondition() {
    const ratings = await returnAppraisalDataByKey(APPRAISAL_KEYS.ratings);
    const avg = getRatingsAvg(ratings);
    if (avg < 1.5) {
      return 'Rough';
    } else if (avg < 2) {
      return 'Average';
    } else if (avg < 2.5) {
      return 'Clean';
    }
    return 'Outstanding';
  },
  async saveAppraiser(userId, dealerId) {
    console.log('>>>>> --- >>>>> Save Appraiser User Id: ', userId);
    await updateAppraisalModel(APPRAISAL_KEYS.owner, userId);
    console.log('>>>>> --- >>>>> Save Appraiser Dealer Id: ', dealerId);
    await updateAppraisalModel(APPRAISAL_KEYS.dealerId, dealerId);
  },
  async flushAll() {
    console.log('flushing the asyncstorage store');
  },
  async getMedia() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.media);
  },
  async getRecordings() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.recordings);
  },
  async saveMedia(imagePath, angle) {
    let images = await returnAppraisalDataByKey(APPRAISAL_KEYS.media);

    function saveToArray(networkImages) {
      if (images && images.length > 0) {
                // find if we have an image by this angle
        let hasAngleKey = false;
        images.forEach((image, key) => {
          if (image.angle === networkImages.angle) {
            hasAngleKey = true;
            images[key] = networkImages;
          }
        });
        if (!hasAngleKey) {
                    // its a new angle, push it on to the array
          images.push(networkImages);
        }
      } else {
        images.push(networkImages);
      }
      return images;
    }


    console.log('images array', images);
    if (!images) {
      images = [];
    }
        // then pass to api for saving
    const newPaths = await dmxApi.saveMedia(imagePath, angle);
    console.log('images which have just been saved', newPaths);
    const dmxMediaPrefix = 'https://media-svc.dmx.io/media/';
    const checkStatus = (status) => (
      newPaths.status === status || newPaths.status === status.toString()
    );
    if (newPaths && (checkStatus(200) || checkStatus(201))) {
      const pathArr = JSON.parse(newPaths.data);
      const networkImages = {
        angle,
      };

      pathArr.forEach((path) => {
        networkImages[path.size] = dmxMediaPrefix + path.data.name;
      });

      const fullImageArray = saveToArray(networkImages);
      console.log('full image array to save', fullImageArray);
      updateAppraisalModel(
        APPRAISAL_KEYS.media,
        fullImageArray.filter(item => typeof item === 'object')
      );
    } else {
      console.log('saving local images', images);
      const fullImageArray = saveToArray(angle, imagePath);
      updateAppraisalModel(
        APPRAISAL_KEYS.media,
        fullImageArray.filter(item => typeof item === 'object')
      );
    }
  },

  async deleteRecording(recordingUrl) {
    const recordings = await returnAppraisalDataByKey(APPRAISAL_KEYS.recordings)
            .then(res => (res || []));
    const newRecordings = recordings.filter(r => r.url !== recordingUrl);
    return updateAppraisalModel(APPRAISAL_KEYS.recordings, newRecordings);
  },

  async saveRecording(recordingPath, duration) {
    const recordings = await returnAppraisalDataByKey(APPRAISAL_KEYS.recordings)
            .then(res => (res || []));
    const fileName = recordingPath.split('/').pop();
    const newRecordings = await dmxApi.saveAudio(recordingPath, fileName);
    return updateAppraisalModel(APPRAISAL_KEYS.recordings, [...recordings, {
      url: newRecordings.url,
      name: newRecordings.name,
      duration,
    }]);
  },
  async forceActiveVehicleUpdate(vehicle) {
    if (vehicle.generalInfo && vehicle.generalInfo.styleId) {
      await dmxAppModel.updateVehicleInfo(vehicle.generalInfo.styleId);
    }
    await this.clearAppraisal();
    const retVal = await stateService.setItem('active-vehicle', JSON.stringify(vehicle));
    return retVal;
  },
  async saveLocation(position, postalCode) {
    updateAppraisalModel(APPRAISAL_KEYS.location, { position, postalCode });
  },
  async getLocation() {
    return returnAppraisalDataByKey(APPRAISAL_KEYS.location);
  },
  MAX_BID_REQUESTS: 3,
  MAX_BID_PERIOD_DAYS: 7,
};

export default appraisalModel;
