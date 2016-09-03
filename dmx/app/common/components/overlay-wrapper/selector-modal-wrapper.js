import React, { PropTypes } from 'react';
import { View } from 'react-native';
import styles from './selector-modal-wrapper.style';

const OverlayWrapper = ({ children, overlayView }) => (
  <View style={{ flex: 1 }}>
    {children}
    {overlayView && <View style={styles.overlayWrapper}>
      {overlayView}
    </View>}
  </View>
);

OverlayWrapper.propTypes = {
  children: PropTypes.array,
  overlayView: PropTypes.node,
};

export default OverlayWrapper;
