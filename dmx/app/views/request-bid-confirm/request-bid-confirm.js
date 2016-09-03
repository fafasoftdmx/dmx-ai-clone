import React, { PropTypes } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './request-bid-confirm.styles';
import checkIconAsset from '../../assets/check_icon_big.png';

export default class DmxRequestBidView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  returnToAppraisalList() {
    this.props.navigator.resetTo({
      name: 'appraisal-list',
    });
  }

  render() {
    const { year, make, model } = this.props.route.data || {};
    return (
      <DmxAppShell
        headerShowMenuButton
        headerShowLeftButton={false}
        hasFooter={false}
        hasHeader={false}
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.contentWrap}>
            <Image source={checkIconAsset} />
            <Text style={styles.confirmationHeader}>
              {`Successfully Requested Bids for a ${year} ${make} ${model}`}
            </Text>
            <Text style={styles.confirmationMessage}>
              {'We\'ll notify you when we receive the first bid for this vehicle.'}
            </Text>
          </View>
          <View style={styles.homeCtaWrap}>
            <TouchableOpacity
              style={styles.homeCtaTouch}
              onPress={() => this.returnToAppraisalList()}
            >
              <View style={styles.homeCtaTextWrap}>
                <Text style={styles.homeCtaText}>HOME</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DmxAppShell>
    );
  }
}

module.exports = DmxRequestBidView;
