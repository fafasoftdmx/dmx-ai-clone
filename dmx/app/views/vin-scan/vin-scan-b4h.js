import React, { PropTypes } from 'react';
import {
  View,
  Navigator,
  NativeAppEventEmitter,
  findNodeHandle,
  NativeModules,
  Platform,
} from 'react-native';
import appraisalModel from '../../common/services/models/appraisal-model';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DmxVinOverlayHeader from '../../common/components/header/header';
import styles from './vin-scan.styles';
import VinScannerView from '../../common/components/react-native-vin-scanner';

const VinScanner = NativeModules.RNVinScanner;

export default class VinScanView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      vin: '',
      isScanning: false,
    };
  }

  componentWillMount() {
    this.setState({ isScanning: true });
    NativeAppEventEmitter.addListener('ReactVinScanner.VinScanned', (data) => {
      this.setState({ vin: data.vin, isScanning: false });
      if (Platform.OS === 'ios') {
        VinScanner.stop();
      }
      this.resetAppraisal();
      this.props.navigator.replace({
        name: 'vin-scan-confirm',
        data: { vin: data.vin },
        gestures: Navigator.SceneConfigs.FloatFromRight.gestures,
      });
    });
    NativeAppEventEmitter.addListener('ReactVinScanner.Canceled', () => {
      this.setState({ isScanning: false });
      this.resetAppraisal();
      this.props.navigator.replace({
        name: 'appraisal-list',
        gestures: Navigator.SceneConfigs.FloatFromRight.gestures,
      });
    });
    NativeAppEventEmitter.addListener('ReactVinScanner.RequestManualVinEntry', () => {
      this.setState({ isScanning: false });
      if (Platform.OS === 'ios') {
        VinScanner.stop();
      }
      this.props.navigator.replace({
        name: 'manual-vin-entry',
        data: {},
        gestures: Navigator.SceneConfigs.FloatFromRight.gestures,
      });
    });
    NativeAppEventEmitter.addListener('ReactVinScanner.RequestTorchToggle', () => {
      VinScanner.toggleTorch();
    });
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      VinScanner.addOverlayView(findNodeHandle(this.refs.vinScannerOverlay));
      VinScanner.start();
    }
  }

  async resetAppraisal() {
    await appraisalModel.clearAppraisal();
  }

  render() {
    return (
      <DmxAppShell
        hasHeader={false}
        hasFooter={false}
        buttonText="CANCEL"
        toView="appraisal-list"
        buttonIsActive
        dataToPass={false}
        sceneConfig={Navigator.SceneConfigs.FloatFromLeft}
        gesture={Navigator.SceneConfigs.FloatFromLeft.gestures}
        headerShowLeftButton={false}
        headerShowRightButton={false}
        navigator={this.props.navigator}
      >
        {Platform.OS === 'ios' ?
          <View style={styles.vinScannerOverlay} ref="vinScannerOverlay">
            <DmxVinOverlayHeader
              headerStyle={styles.vinScannerHeader}
              headerText="Scan VIN"
              headerShowLeftButton
              headerShowRightButton
            />
            <View style={styles.overlayRedLine} />
            <View style={styles.overlayInfo} />
          </View>
          : <VinScannerView isScanning={this.state.isScanning} style={{ flex: 1 }} />}
      </DmxAppShell>
    );
  }
}
