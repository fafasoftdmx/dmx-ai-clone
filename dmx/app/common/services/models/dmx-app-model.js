import appraisalModel from './appraisal-model';
import stateService from './../state/stateService';
import dmxApi from './../api/dmx-service';
import _ from 'underscore';

function cacheVinDecode(vehicleInfo) {
  stateService.setItem('cached-vin-decode', JSON.stringify(vehicleInfo));
}

function cacheVehicleInfo(vehicleInfo) {
    // console.log('full vehicle info is ----', vehicleInfo);
  stateService.setItem('full-vehicle-info', JSON.stringify(vehicleInfo));
}

function numberFormat(number, dec, dsep, tsep = ',') {
  if (isNaN(number) || number == null) return '';

  const numberToFixed = number.toFixed(~~dec);

  const parts = numberToFixed.split('.');
  const fnums = parts[0];
  const decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, `$1${tsep}`) + decimals;
}

const dmxAppModel = {
  async getVehicleInfo(vin, styleId = false) {
    const vehicleInfo = await dmxApi.vinDecode(vin);

    if (styleId !== false) {
      const fullVehicleStyleInfo = await dmxApi.getVehicleInfo(styleId);
      _.extend(vehicleInfo, fullVehicleStyleInfo);
    }

    console.log('----> vehicle info <----', vehicleInfo);
    cacheVinDecode(vehicleInfo);
    return vehicleInfo;
  },
  async getSelectedVehicleInfo() {
    const cachedVinDecode = await stateService.getItem('cached-vin-decode');
    return JSON.parse(cachedVinDecode);
  },
  saveSelectedVehiclePhotoUri(uri) {
    stateService.setItem('selected-vehicle-photo', uri);
  },
  async getSelectedVehiclePhotoUri() {
    const uri = stateService.getItem('selected-vehicle-photo');
    return JSON.parse(uri);
  },
  async updateVehicleInfo(styleId) {
    const extendedVehicleInfo = await dmxApi.getVehicleInfo(styleId);
    cacheVehicleInfo(extendedVehicleInfo);
        // save price to appraisal
    if (extendedVehicleInfo.price) {
      appraisalModel.savePrice(extendedVehicleInfo.price);
    }
  },
  async getSummaryGeneralViewModel() {
    return appraisalModel.getGeneralVehicleInfo();
  },
  async getColorViewModel(type) {
    let vehicleInfo = await stateService.getItem('full-vehicle-info');
    vehicleInfo = JSON.parse(vehicleInfo);
    let exteriorColors = [];
    let interiorColors = [];
    vehicleInfo.colors.forEach((colorsObj) => {
      if (colorsObj.category === 'Interior') {
        interiorColors = colorsObj.options;
      } else if (colorsObj.category === 'Exterior') {
        exteriorColors = colorsObj.options;
      }
    });

    const colorOutputObj = {
      interior: interiorColors,
      exterior: exteriorColors,
    };
    return (type === 'interior') ? colorOutputObj.interior : colorOutputObj.exterior;
  },
  async getVehicleOptionsViewModel() {
    let vehicleOptions = await stateService.getItem('full-vehicle-info');
    let vehicleOptionsParsed = [];

    vehicleOptions = JSON.parse(vehicleOptions);
    if (vehicleOptions && vehicleOptions.options.length > 0) {
      vehicleOptions.options.forEach((option) => {
        if (option.category === 'Package') {
          vehicleOptionsParsed = option.options;
        } else if (option.category === 'Other' && !vehicleOptionsParsed) {
          vehicleOptionsParsed = option.options;
        }
      });
    }

    return vehicleOptionsParsed;
  },
  async getPriceEstimateViewModel() {
    function formatPrices(vehicleInfo) {
      const pricesFormatted = [];
      if (vehicleInfo.price) {
        _.mapObject(vehicleInfo.price, (price, key) => {
          switch (key) {
            case 'usedTmvRetail':
              pricesFormatted.push({
                text: 'Used - Retail',
                price: `$${numberFormat(vehicleInfo.price[key])}`,
              });
              break;
            case 'usedPrivateParty':
              pricesFormatted.push({
                text: 'Used - Private Party',
                price: `$${numberFormat(vehicleInfo.price[key])}`,
              });
              break;
            case 'usedTradeIn':
              pricesFormatted.push({
                text: 'Used - Trade In',
                price: `$${numberFormat(vehicleInfo.price[key])}`,
              });
              break;
            default:
              console.warn(`unknown key: ${key}`);
          }
        });
      }
      return pricesFormatted;
    }
    let vehicleInfo = await stateService.getItem('full-vehicle-info');
    vehicleInfo = JSON.parse(vehicleInfo);
    const priceEstimates = formatPrices(vehicleInfo);
    return priceEstimates;
  },
};

export default dmxAppModel;
