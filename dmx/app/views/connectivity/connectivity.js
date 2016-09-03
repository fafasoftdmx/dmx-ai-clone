import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './connectivity.styles.js';

export default class DmxConnectivityView extends React.Component {

  dismiss() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="signal" size={60} color="#1681D7" />
        <Text style={styles.header}>Network Connection Alert</Text>
        <View style={styles.subText}>
          <Text style={styles.bodyText}>
            We've detected that you have a less than optimal network connection.
          </Text>
          <Text style={styles.bodyText}>
            Please note that performance may suffer as a consequence.
          </Text>
        </View>
        <View style={styles.dismissCtaWrap}>
          <TouchableOpacity onPress={() => this.dismiss()}>
            <View style={styles.dismissCta}>
              <Text style={styles.dismissCtaText}>OKAY, GOT IT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
