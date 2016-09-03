import { requireNativeComponent, View } from 'react-native';
import { PropTypes } from 'react';

const iface = {
  name: 'VinScannerView',
  propTypes: {
    ...View.propTypes,
    isScanning: PropTypes.bool,
  },
};

export default requireNativeComponent('RNVinScannerView', iface);
