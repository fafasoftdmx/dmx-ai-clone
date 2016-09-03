import React, { PropTypes } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import styles from './index.styles';

export const VehicleDetail = ({ year, make, model, vin, imageUri }) => (
  <View style={styles.container}>
    <View style={styles.vehicleInfoWrap}>
      <Text style={styles.vehicleInfoString}>
        {`${year} ${make} ${model}`}
      </Text>
      <Text style={styles.vinString}>
        {vin}
      </Text>
    </View>
    {
      imageUri === '' ?
        <View style={[styles.carImage, styles.noImage]}>
          <Text style={styles.vinString}>{'No Image Available'}</Text>
        </View> :
        <Image
          source={{ uri: imageUri }}
          resizeMode={Image.resizeMode.contain}
          style={styles.carImage}
        />
    }
  </View>
);

VehicleDetail.propTypes = {
  year: PropTypes.string.isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  vin: PropTypes.string.isRequired,
  imageUri: PropTypes.string,
};

export default VehicleDetail;
