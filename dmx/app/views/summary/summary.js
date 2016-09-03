import React, { PropTypes } from 'react';
import { ScrollView, Alert, DeviceEventEmitter } from 'react-native';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import appraisalModel from '../../common/services/models/appraisal-model';
import dmxApiService from '../../common/services/api/dmx-service';
import dmxStateService from '../../common/services/state/stateService';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import { isComplete } from '../../common/services/models/appraisal-validator';
import SummaryGeneral from './summary-general/summary-general';
import SummaryColors from './summary-colors/summary-colors';
import SummaryImages from './summary-images/summary-images';
import SummaryOptionsExterior from './summary-options-exterior/summary-options-exterior';
import SummaryRating from './summary-rating/summary-rating';
import SummaryPriceEstimation from './summary-price-estimation/summary-price-estimation';
import SummaryBidHistory from './summary-bid-history/summary-bid-history';
import SummaryAudioRecords from './summary-audio-records/summary-audio-records';
import SummaryCreated from './summary-created/summary-created';
import { EXISTING_APPRAISAL_EDITED } from '../../common/services/events/appraisal-event';
export default class Summary extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    componentIsDeactivated: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Loading...',
      buttonColor: 'BLUE',
      deactivated: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.existingAppraisalEdited) {
      this.existingAppraisalEdited.remove();
    }
  }

  onExistentAppraisalEdited() {
    const message = 'You have already requested bids on this vehicle appraisal that does not ' +
      'reflect the change you have just made. If you wish to get updated bids, please tap the' +
      '"Request More Bids" when you are finished editing.';
    Alert.alert('', message, [{ text: 'OK' }]);
  }

  async getAppraisal() {
    const appraisal = await appraisalModel.getCurrentAppraisal();
    this.setState({ appraisal });
    return appraisal;
  }

  getAppraisalHeader(appraisal) {
    let headerText = 'Appraisal Summary';
    if (appraisal && appraisal.generalInfo) {
      if (appraisal.generalInfo.make && appraisal.generalInfo.model) {
        headerText = `${appraisal.generalInfo.make} ${appraisal.generalInfo.model}`;
      }
    }
    return headerText;
  }

  getBidString(appraisal) {
    let bidString = '';
    switch (appraisal.bidRequestsMade) {
      case 0:
        break;
      case (appraisal.bidRequestsMade === 1):
        bidString = `${appraisal.bidRequestsMade} BID`;
        break;
      case (appraisal.bidRequestsMade > 1):
        bidString = `${appraisal.bidRequestsMade} BIDS`;
        break;
      default:
        break;
    }
    return bidString;
  }

  async getUser() {
    const uuid = DeviceInfo.getUniqueID();
    console.log('device uuid is ', uuid);
    const user = JSON.parse(await dmxStateService.getItem(dmxApiService.ServiceKeys.userProfile));
    return user;
  }

  async doRequestBids(appraisal, bidRequestsMade) {
    await appraisalModel.update();
    await dmxApiService.requestBids(appraisal.id);

    await appraisalModel.saveBidRequestsMade(bidRequestsMade + 1);

    this.props.navigator.push({
      name: 'request-bid-confirm',
      data: {
        year: appraisal.generalInfo.year,
        make: appraisal.generalInfo.make,
        model: appraisal.generalInfo.model,
      },
    });
  }

  async fetchData() {
    const user = await this.getUser();

    if (this.props.route.newAppraisal) {
      await appraisalModel.saveAppraiser(user._id, user.dealerId);
      const response = await appraisalModel.save();
      if (!response) {
        console.error('There was an error saving appraisal');
        return undefined;
      }
    }

    const appraisal = await this.getAppraisal();
    console.log('>>>>> appraisal data:', appraisal);
    console.log('>>>>> user data:', user);

    if (user._id !== appraisal.owner) {
      return this.setState({
        buttonAction: this.navigateToPlaceBid.bind(this),
        buttonText: 'PLACE A BID',
        buttonColor: 'GREEN',
        deactivated: true,
      });
    }

    const bidsRequested = appraisal.bidRequestsMade > 0;
    this.existingAppraisalEdited = DeviceEventEmitter.addListener(
      EXISTING_APPRAISAL_EDITED,
      () => this.onExistentAppraisalEdited()
    );
    return this.setState({
      buttonAction: this.requestBids.bind(this),
      buttonText: bidsRequested ? 'REQUEST MORE BIDS' : 'REQUEST BIDS',
      buttonColor: 'BLUE',
      deactivated: false,
    });
  }

  navigateToPlaceBid() {
    if (!this.validate()) {
      return;
    }
    this.props.navigator.push({
      name: 'place-bid',
    });
  }

  validate() {
    const validations = [
      this.refs.summaryGeneral.validate(),
      this.refs.summaryRating.validate(),
    ];

    return validations.every(i => i);
  }

  async requestBids() {
    const appraisal = await appraisalModel.getCurrentAppraisal();
    if (!this.validate()) {
      Alert.alert('', 'Check your entries for mileage and ratings.', [
        { text: 'OK', onPress: () => console.log('summary general/ratings validation failed') },
      ]);
      return;
    }

    if (!isComplete(appraisal)) {
      Alert.alert('', 'You must complete all sections before requesting bids.', [
        { text: 'OK', onPress: () => console.log('appraisal incomplete') },
      ]);
      return;
    }

    const bidRequestsMade = await appraisalModel.getBidRequestsMade();
    const dateCreated = moment(await appraisalModel.getAppraisalDateCreated());
        // FOR TESTING ↓↓↓
        // const dateCreated = moment().subtract(8, 'days');
    const now = moment.utc();
    const daysAgo = Math.abs(dateCreated.diff(now, 'days'));

    if (daysAgo > appraisalModel.MAX_BID_PERIOD_DAYS) {
      Alert.alert('', 'Bids cannot be requested for appraisals past 7 days.', [
              { text: 'OK', onPress: () => console.log('max bid request period exceeded') },
      ]);
      return;
    }

    if (bidRequestsMade === appraisalModel.MAX_BID_REQUESTS) {
      Alert.alert('', 'Maximum number of bids has already been made for this appraisal', [
                { text: 'OK', onPress: () => console.log('max bid request made') },
      ]);
      return;
    }

    if (bidRequestsMade === appraisalModel.MAX_BID_REQUESTS - 1) {
      Alert.alert('', 'This is your third and final bid request on this vehicle.', [
                { text: 'Continue', onPress: () => this.doRequestBids(appraisal, bidRequestsMade) },
                { text: 'Cancel', onPress: () => console.log('canceled bid request') },
      ]);
    } else {
      this.doRequestBids(appraisal, bidRequestsMade);
    }
  }

  render() {
    const { appraisal = {} } = this.state;
    const summaryViewProps = {
      navigator: this.props.navigator,
      componentIsDeactivated: this.state.deactivated,
    };

    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerShowMenuButton
        headerShowLeftButton
        headerText={this.getAppraisalHeader(appraisal)}
        headerSubText={this.getBidString(appraisal)}
        navigator={this.props.navigator}
        route={this.props.route}
        headerText="Appraisal Summary"
      >
        <ScrollView>
          <SummaryCreated appraisal={appraisal} />
          <SummaryGeneral ref={'summaryGeneral'} {...summaryViewProps} />
          <SummaryAudioRecords ref={'summaryAudioRecords'} {...summaryViewProps} />
          <SummaryColors ref={'summaryColors'} {...summaryViewProps} />
          <SummaryImages ref={'summaryImages'} {...summaryViewProps} />
          <SummaryOptionsExterior ref={'summaryOptionsExterior'} {...summaryViewProps} />
          <SummaryRating ref={'summaryRating'} {...summaryViewProps} />
          <SummaryPriceEstimation ref={'summaryPriceEstimation'} {...summaryViewProps} />
          {appraisal && appraisal.bids && appraisal.bids.length > 0 &&
            <SummaryBidHistory ref={'summaryBidHistory'} {...summaryViewProps} />
          }
        </ScrollView>
        <DmxFullWidthButton
          buttonIsActive
          buttonAction={this.state.buttonAction}
          buttonText={this.state.buttonText}
          buttonColor={this.state.buttonColor}
        />
      </DmxAppShell>
    );
  }
}
