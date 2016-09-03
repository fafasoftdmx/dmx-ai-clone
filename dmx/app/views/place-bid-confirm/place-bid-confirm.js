import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import numeral from 'numeral';
import styles from './place-bid-confirm.styles';

export default class DmxPlaceBidView extends React.Component {

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
    const routeData = this.props.route.data;
    const bidAmount = numeral(routeData.bid).format('$0,0');

    return (
      <DmxAppShell
        headerShowMenuButton
        headerShowLeftButton={false}
        hasFooter={false}
        hasHeader
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.contentWrap}>
            <Text style={styles.confirmationMessage}>
              {`Your bid of ${bidAmount}\nwas successfully submitted.`}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.moreCtaWrap}
            onPress={() => this.returnToAppraisalList()}
          >
            <View style={styles.moreCta}>
              <Text style={styles.moreCtaText}>SEE MORE TRADE-INS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DmxAppShell>
    );
  }
}

module.exports = DmxPlaceBidView;
