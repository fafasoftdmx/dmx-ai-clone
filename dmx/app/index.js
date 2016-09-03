import React, { PropTypes } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Linking,
  StatusBar,
  Navigator,
  NetInfo,
  View,
} from 'react-native';
import ActivityIndicator from './common/components/activity-indicator/activity-indicator';
import AppraisalList from './views/appraisal-list/appraisal-list';
import AppraisalSort from './views/appraisal-sort/appraisal-sort';
import Capture from './views/capture/capture';
import CarfaxLogin from './views/carfax-login/carfax-login';
import CarfaxLogout from './views/carfax-login/carfax-logout';
import { default as CommonStyles } from './common/styles/common.styles';
import Connectivity from './views/connectivity/connectivity';
import DeviceInfo from 'react-native-device-info';
import DmxApi from './common/services/api/dmx-service';
import DmxPermissionsApi from './common/services/api/permissions';
import DmxLandingView from './views/landing/landing';
import DmxModal from './common/components/modal/modal';
import ExteriorColorView from './views/exterior-color/exterior-color';
import ImageViewer from './common/components/image-viewer/image-viewer';
import InteriorColorView from './views/interior-color/interior-color';
import Login from './views/login/login';
import ManualVinEntry from './views/manual-vin-entry/manual-vin-entry';
import Odometer from './views/odometer/odometer';
import Orientation from 'react-native-orientation';
import PlaceBid from './views/place-bid/place-bid';
import BidHistory from './views/bid-history/bid-history';
import PlaceBidConfirm from './views/place-bid-confirm/place-bid-confirm';
import Profile from './views/profile/profile';
import ProfileSearchAgents from './views/profile-search-agents/profile-search-agents';
import Ratings from './views/ratings/ratings';
import Registration from './views/registration/registration';
import RequestBidConfirm from './views/request-bid-confirm/request-bid-confirm';
import Summary from './views/summary/summary';
import VehicleEquipment from './views/vehicle-equipment/vehicle-equipment';
import VehicleOptions from './views/vehicle-options/vehicle-options';
import VinScanView from './views/vin-scan/vin-scan-b4h';
import VinScanConfirmView from './views/vin-scan-confirm/vin-scan-confirm';
import WalkThroughIntro from './views/walkthrough-intro/walkthrough-intro';
import WalkThroughGroups from './views/walkthrough-groups/walkthrough-groups';
import WalkThroughMileage from './views/walkthrough-mileage/walkthrough-mileage';
import WalkThroughAcv from './views/walkthrough-acv/walkthrough-acv';
import WalkThroughColors from './views/walkthrough-colors/walkthrough-colors';
import WalkThroughImages from './views/walkthrough-images/walkthrough-images';
import WalkThroughOptions from './views/walkthrough-options/walkthrough-options';
import WalkThroughRatings from './views/walkthrough-ratings/walkthrough-ratings';
import PushNotification from 'react-native-push-notification';
import NonOemOptionEntry from './views/non-oem-option-entry/non-oem-option-entry';
import SelectCustomColor from './views/select-custom-color/select-custom-color';
import NotificationFilterList from './views/notification-filter-list/notification-filter-list';
import NotificationFilterSummary
  from './views/notification-filter-summary/notification-filter-summary';
import NotificationFilterEditName
  from './views/notification-filter-edit-name/notification-filter-edit-name';
import RecordAudioView from './views/record-audio/record-audio';
import AudioRecordsList from './views/audio-records-list/audio-records-list-view';
import { codePushService } from './common/services/codepush/codePushService';
const GCMSENDERID = '';
const defaultRoute = 'login';
const defaultRouteComponent = Login;

export default class DmxAppParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultRoute: {
        name: defaultRoute,
        component: defaultRouteComponent,
        index: 0,
      },
      isLoading: false,
      showDmxModal: false,
      modalContent: {},
      modalOnClose() {
        console.log('permissions modal has closed');
      },
    };

    this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    codePushService.startSyncing();
    StatusBar.setHidden(true, 'none');
    Linking.addEventListener('url', this.processURL);
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: token => {
        // console.log('PUSH NOTIFICATION TOKEN:', token);
        this.registerAPN(token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: notification => {
        // console.log('PUSH NOTIFICATION NOTIFICATION:', notification);
        this.onNotification(notification);
      },
      // ANDROID ONLY: (optional) GCM Sender ID.
      senderID: GCMSENDERID,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
        * IOS ONLY: (optional) default: true
        * - Specified if permissions will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });

    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectivityChange
    );

    this.activityEventHandle = DeviceEventEmitter.addListener(
      'valuechange-showactivity',
      this.handleActivityChange
    );

    this.handleRequestPermissionsEvent = DeviceEventEmitter.addListener(
      'dmx-showmodal',
      this.handleShowModal
    );
  }

  componentWillUnmount() {
    this.activityEventHandle.remove();
    this.handleRequestPermissionsEvent.remove();
    Linking.removeEventListener('url', this.processURL);
    PushNotification.unregister();
  }

  onNotification(notification) {
    const { message } = notification;

    Alert.alert(
      message.title,
      message.content,
      [
        {
          text: 'Bid',
          onPress: () => {
            const url = `dmx://summary/${message.id}`;
            Linking.openURL(url);
          },
        },
        {
          text: 'Dismiss',
          onPress: null,
        },
      ]
    );
  }

  getRouteComponent(route, nav) {
    switch (route.name) {
      case 'login':
        return <Login route={route} navigator={nav} />;
      case 'registration':
        return <Registration route={route} navigator={nav} />;
      case 'profile':
        return <Profile route={route} navigator={nav} />;
      case 'profile-search-agents':
        return <ProfileSearchAgents route={route} navigator={nav} />;
      case 'appraisal-list':
        return <AppraisalList route={route} navigator={nav} />;
      case 'appraisal-sort':
        return <AppraisalSort route={route} navigator={nav} />;
      case 'bid-history':
        return <BidHistory route={route} navigator={nav} />;
      case 'landing':
        return <DmxLandingView route={route} navigator={nav} />;
      case 'vin-scan':
        return <VinScanView route={route} navigator={nav} />;
      case 'non-oem-option-entry':
        return <NonOemOptionEntry route={route} navigator={nav} />;
      case 'select-custom-color':
        return <SelectCustomColor route={route} navigator={nav} />;
      case 'vin-scan-confirm':
        return <VinScanConfirmView route={route} navigator={nav} />;
      case 'manual-vin-entry':
        return <ManualVinEntry route={route} navigator={nav} />;
      case 'exterior-color':
        return <ExteriorColorView route={route} navigator={nav} />;
      case 'interior-color':
        return <InteriorColorView route={route} navigator={nav} />;
      case 'odometer':
        return <Odometer route={route} navigator={nav} />;
      case 'equipment':
        return <VehicleEquipment route={route} navigator={nav} />;
      case 'options':
        return <VehicleOptions route={route} navigator={nav} />;
      case 'capture':
        return <Capture route={route} navigator={nav} />;
      case 'ratings':
        return <Ratings route={route} navigator={nav} />;
      case 'summary':
        return <Summary route={route} navigator={nav} />;
      case 'place-bid':
        return <PlaceBid route={route} navigator={nav} />;
      case 'place-bid-confirm':
        return <PlaceBidConfirm route={route} navigator={nav} />;
      case 'request-bid-confirm':
        return <RequestBidConfirm route={route} navigator={nav} />;
      case 'image-viewer':
        return <ImageViewer route={route} navigator={nav} />;
      case 'record-audio':
        return <RecordAudioView route={route} navigator={nav} />;
      case 'audio-records-list':
        return <AudioRecordsList route={route} navigator={nav} />;
      case 'notification-filter-list':
        return <NotificationFilterList route={route} navigator={nav} />;
      case 'notification-filter-summary':
        return <NotificationFilterSummary route={route} navigator={nav} />;
      case 'notification-filter-edit-name':
        return <NotificationFilterEditName route={route} navigator={nav} />;
      case 'connectivity':
        return <Connectivity route={route} navigator={nav} />;
      case 'carfax-login':
        return <CarfaxLogin route={route} navigator={nav} />;
      case 'carfax-logout':
        return <CarfaxLogout route={route} navigator={nav} />;
      case 'walkthrough-intro':
        return <WalkThroughIntro route={route} navigator={nav} />;
      case 'walkthrough-groups':
        return <WalkThroughGroups route={route} navigator={nav} />;
      case 'walkthrough-mileage':
        return <WalkThroughMileage route={route} navigator={nav} />;
      case 'walkthrough-acv':
        return <WalkThroughAcv route={route} navigator={nav} />;
      case 'walkthrough-colors':
        return <WalkThroughColors route={route} navigator={nav} />;
      case 'walkthrough-images':
        return <WalkThroughImages route={route} navigator={nav} />;
      case 'walkthrough-options':
        return <WalkThroughOptions route={route} navigator={nav} />;
      case 'walkthrough-ratings':
        return <WalkThroughRatings route={route} navigator={nav} />;
      default:
        return <DmxLandingView route={route} navigator={nav} />;
    }
  }

  handleActivityChange(status) {
    if (status === true) {
      this.setState({ isLoading: true });
    } else {
      this.setState({ isLoading: false });
    }
  }

  handleShowModal(modalData) {
    // modalContent, showModalContent, modalOnClose
    console.log('handling data for modal', modalData);
    const self = this;
    this.setState({
      modalContent: (modalData.showModal) ? modalData : {},
      showDmxModal: modalData.showModal,
      modalOnClose: self.advanceToView,
    });
  }

  handleConnectivityChange(isConnected) {
    if (!isConnected) {
      this.refs.nav.push({
        name: 'connectivity',
      });
    } else {
      const currentRoutes = this.refs.nav.getCurrentRoutes();
      const route = currentRoutes[currentRoutes.length - 1];

      if (route.name === 'connectivity') {
        this.refs.nav.pop();
      }
    }
  }

  handleRouteChange(route) {
    Orientation.getOrientation((err, orientation) => {
      this.setState({ orientation });
    });
    if (route.name !== 'capture' && route.name !== 'image-viewer') {
      Orientation.lockToPortrait();
    }
  }

  processURL() {
    // TODO: Add Logic to handle the deep link
    // console.log('Application Start-up url: ' + e.url);
  }

  registerAPN(token) {
    // { '0': 'aed60c07a812daa0c0c2157a3a6c06964d0aa95447fbc4b6d0735ec64fb777c3', length: 1 }
    // https://api.dmx.io/notifications/register
    // {
    // token: "",
    // device: ""
    // }
    DmxApi.registerDevice(DeviceInfo.getUniqueID(), token);
  }

  advanceToView(toView, dataToPass) {
    this.refs.nav.push({
      name: toView,
      data: dataToPass || false,
      gestures: Navigator.SceneConfigs.FloatFromRight.gestures,
    });
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  closeModal() {
    this.setState({
      showDmxModal: false,
    });
  }

  renderScene(route, nav) {
    const routeComponent = this.getRouteComponent(route, nav);
    const { isLoading, orientation, showDmxModal, modalContent, modalOnClose } = this.state;
    return (
      <View style={CommonStyles.container}>
        {routeComponent}
        {isLoading && <ActivityIndicator orientation={orientation} />}
        {
          showDmxModal && (
            <DmxModal
              navigator={nav}
              modalVisible={showDmxModal}
              content={modalContent}
              onClose={modalOnClose}
              handlePressPrimary={DmxPermissionsApi.requestPermission}
              handlePressSecondary={this.closeModal}
            />
          )
        }
      </View>
    );
  }

  render() {
    return (
      <Navigator
        ref="nav"
        style={CommonStyles.container}
        initialRoute={{
          name: defaultRoute,
          component: defaultRouteComponent,
        }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        onDidFocus={this.handleRouteChange}
      />
    );
  }
}

DmxAppParent.propTypes = {
  navigator: PropTypes.object,
};

// // This is just for testing APN
// setTimeout(function () {
//    var msg = {
//        title: 'Request to bid',
//        content: 'Hey plz bid for this car',
//        id: '123456'
//    };
//
//    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
//        aps: {
//            alert: JSON.stringify(msg),
//            sound: 'default',
//            category: 'DMX'
//        }
//    });
// }, 100);
//
//
