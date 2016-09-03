import React, { PropTypes } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { default as summaryCommonStyles } from '../summary.styles';
import styles from './summary-bid-history.styles';
import arrowBluePng from '../../../assets/arrow-blue.png';

export default class SummaryBidHistory extends React.Component {
  advanceToView(toView, dataToPass) {
    this.props.navigator.push({
      name: toView,
      data: dataToPass || false,
    });
  }

  render() {
    if (this.props.componentIsDeactivated) {
      return (
        <View style={[summaryCommonStyles.summaryItemHeaderWrap, styles.bidHistoryHeader]}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Bid History</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => this.advanceToView('bid-history')}>
        <View style={[summaryCommonStyles.summaryItemHeaderWrap, styles.bidHistoryHeader]}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Bid History</Text>
          <Image
            style={summaryCommonStyles.summaryItemHeaderArrow}
            source={arrowBluePng}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

SummaryBidHistory.propTypes = {
  navigator: PropTypes.object,
  componentIsDeactivated: PropTypes.bool,
};
