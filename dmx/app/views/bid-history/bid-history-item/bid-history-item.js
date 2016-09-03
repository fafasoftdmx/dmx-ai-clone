import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import numeral from 'numeral';
import styles from './bid-history-item.styles';

export default class BidHistoryItem extends React.Component {

  static propTypes = {
    bid: PropTypes.object.isRequired,
  };

  getAgoString(ms) {
    const seconds = ms / 1000;
    const intervals = [
      [31536000, 'year'],
      [2592000, 'month'],
      [86400, 'day'],
      [3600, 'hr'],
      [60, 'min'],
    ];
    for (const [division, label] of intervals) {
      const unit = Math.floor(seconds / division);
      if (unit >= 1) {
        return `${unit} ${label}${unit > 1 ? 's' : ''}`;
      }
    }
    return `${Math.floor(seconds)} sec${seconds > 1 ? 's' : ''}`;
  }

  getCurrencyString(amount) {
    return numeral(amount).format('($0,0)');
  }

  render() {
    const { bid } = this.props;
    const agoString = this.getAgoString(Date.now() - bid.currentBid.created);
    const currencyString = this.getCurrencyString(bid.currentBid.amount);

    return (
      <View>
        <View style={styles.bidHeaderRow}>
          <Text style={[styles.nameAmount, styles.dealerName]}>{bid.bidder.name}</Text>
          <Text style={[styles.nameAmount, styles.amount]}>{currencyString}</Text>
        </View>
        <View style={styles.bidSubRow}>
          <Text style={styles.mobileCreated}>+ {bid.bidder.mobile}</Text>
          <Text style={styles.mobileCreated}>{agoString}</Text>
        </View>
      </View>
    );
  }
}
