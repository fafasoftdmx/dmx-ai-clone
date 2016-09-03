import React from 'react';
import { Text, TouchableOpacity, View, DeviceEventEmitter } from 'react-native';
import numeral from 'numeral';
import dmxAppModel from '../../../common/services/models/dmx-app-model';
import appraisalModel from '../../../common/services/models/appraisal-model';
import dmxApi from '../../../common/services/api/dmx-service';
import permissionsService from '../../../common/services/api/permissions';
import ThirdPartyApis from '../../../common/services/api/third-party-services';
import { default as summaryCommonStyles } from './../summary.styles';

export default class SummaryPriceEstimation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: {},
      currentPostalCode: '',
      marketValue: null,
      vehicleInfo: null,
    };
  }

  async componentWillMount() {
    const self = this;
    const location = await appraisalModel.getLocation();
    const edmundsCondition = await appraisalModel.getEdmundsCondition();
    const vehicleInfo = await dmxAppModel.getSummaryGeneralViewModel();
    const mileage = await appraisalModel.getMileage(vehicleInfo.year);
    await this.setState({ vehicleInfo });
    if (!location) {
      const position = await this.fetchLocation();
      if (position) {
        const address = await this.fetchAddress(position.coords.latitude, position.coords.longitude); // eslint-disable-line max-len

        const pc = address.results.filter((item) => item.types.indexOf('postal_code') > -1);
        if (pc.length > 0) {
          const postalCode = pc[0].address_components[0].short_name;
          await appraisalModel.saveLocation(position, postalCode);
          this.setState({
            currentPosition: { position, postalCode },
          });
        }
      }
    }
    this.fetchMarketValue(edmundsCondition, mileage);
    this.milageChangeListener = DeviceEventEmitter.addListener(
      'valuechange-mileage',
      async (newMileage) => {
        console.log('----- >>>>> Mileage Changed: ', newMileage);
        const newEdmundsCondition = await appraisalModel.getEdmundsCondition();
        self.fetchMarketValue(newEdmundsCondition, newMileage);
      }
    );
    this.ratingsChangeListener = DeviceEventEmitter.addListener(
      'valuechange-ratings',
      async (newRatings) => {
        console.log('----- >>>>> Ratings Changed: ', newRatings);
        const newEdmundsCondition = await appraisalModel.getEdmundsCondition();
        const newMileage = await appraisalModel.getMileage(self.state.vehicleInfo.year);
        self.fetchMarketValue(newEdmundsCondition, newMileage);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateAppraisal) {
      this.fetchData();
    }
  }

  async componentWillUnmount() {
    if (this.milageChangeListener) {
      this.milageChangeListener.remove();
    }
    if (this.ratingsChangeListener) {
      this.ratingsChangeListener.remove();
    }
  }

  async fetchData() {
    const estimatedPrices = await dmxAppModel.getPriceEstimateViewModel();
    this.setState({
      estimations: estimatedPrices,
    });
  }
  async fetchAddress(lat, lng) {
    return ThirdPartyApis.geocode(lat, lng);
  }

  async fetchLocation() {
    const permissionType = 'location';
    // check permissions first
    permissionsService.checkPermission(permissionType)
      .then((response) => {
        console.log('permission check response', response);
        if (response === 'undetermined') {
          DeviceEventEmitter
            .emit('dmx-showmodal',
              permissionsService.packagePermissionsModalContent(permissionType)
            );
        } else if (response === 'denied') {
          permissionsService.handleDeniedRequest(permissionType);
        } else if (response === 'authorized') {
          console.log('location permission is authorized');
          return (new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position),
              (error) => reject(error),
              { enableHighAccuracy: false, timeout: 600000, maximumAge: 1000 }
            );
          }));
        }
        return false;
      });
  }

  async fetchMarketValue(edmundsCondition, mileage) {
    // styleId, condition, mileage, zip, optionIdList, colorIdList
    const location = await appraisalModel.getLocation();
    const postalCode = location && typeof location.postalCode !== 'undefined' ?
      location.postalCode :
      this.state.currentPosition.postalCode;
    const edmundsTmv = await dmxApi.getMarketValue(
      this.state.vehicleInfo.styleId,
      edmundsCondition,
      mileage,
      postalCode
    );
    if (edmundsTmv) {
      const tmv = edmundsTmv.tmv;
      const {
        nationalBasePrice,
        regionalAdjustment,
        conditionAdjustment,
        mileageAdjustment,
      } = tmv;
      const allFactors = [
        nationalBasePrice,
        regionalAdjustment,
        conditionAdjustment,
        mileageAdjustment,
      ];

      this.setState({
        marketValue: {
          base: nationalBasePrice.usedTradeIn,
          regionalAdj: regionalAdjustment.usedTradeIn,
          conditionAdj: conditionAdjustment.usedTradeIn,
          mileageAdj: mileageAdjustment.usedTradeIn,
          totalWithAdj: allFactors.reduce((p, { usedTradeIn }) => p + usedTradeIn, 0),
        },
      });
    }
    console.log('----- >>>>> Market Value: ', edmundsTmv);
  }

  render() {
    let priceEstimationTemplate;
    const mv = this.state.marketValue;
    if (mv) {
      priceEstimationTemplate = (
        <View style={summaryCommonStyles.summaryItemWrap}>
          <TouchableOpacity>
            <View style={summaryCommonStyles.summaryItemHeaderWrap}>
              <Text style={summaryCommonStyles.summaryItemHeaderText}>Market Value</Text>
            </View>
          </TouchableOpacity>

          <View style={summaryCommonStyles.row}>
            <Text style={[summaryCommonStyles.text, summaryCommonStyles.bold]}>
              Market Value
            </Text>
            <Text
              style={[summaryCommonStyles.textRight, summaryCommonStyles.bold]}
            >
              {numeral(mv.totalWithAdj).format('$0,0')}
            </Text>
          </View>
          <View style={summaryCommonStyles.row}>
            <Text style={summaryCommonStyles.text}>Baseline Value</Text>
            <Text style={summaryCommonStyles.textRight}>{numeral(mv.base).format('$0,0')}</Text>
          </View>
          <View style={summaryCommonStyles.row}>
            <Text style={summaryCommonStyles.text}>Mileage Price Adjustment</Text>
            <Text style={summaryCommonStyles.textRight}>
              -{numeral(mv.mileageAdj).format('$0,0')}
            </Text>
          </View>
          <View style={summaryCommonStyles.row}>
            <Text style={summaryCommonStyles.text}>Condition Price Adjustment</Text>
            <Text style={summaryCommonStyles.textRight}>
              {numeral(mv.conditionAdj).format('$0,0')}
            </Text>
          </View>
          <View style={summaryCommonStyles.row}>
            <Text style={summaryCommonStyles.text}>Region Price Adjustment</Text>
            <Text style={summaryCommonStyles.textRight}>
              {numeral(mv.regionalAdj).format('$0,0')}
            </Text>
          </View>
        </View>
      );
    } else {
      priceEstimationTemplate = (<View />);
    }
    return priceEstimationTemplate;
  }
}
