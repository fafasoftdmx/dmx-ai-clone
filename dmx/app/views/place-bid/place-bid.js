import React, { PropTypes } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import numeral from 'numeral';
import appraisalModel from '../../common/services/models/appraisal-model';
import dmxApiService from '../../common/services/api/dmx-service';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './place-bid.styles';

export default class DmxPlaceBidView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      bid: '',
      toView: 'summary',
      keyboardShowing: false,
    };
  }

  async placeBid() {
    const appraisal = JSON.parse(await appraisalModel.showCurrentAppraisal());
    const bid = this.state.bid;
    console.log('placing bid', { bid, appraisal });

    const bidResponse = await dmxApiService.placeBid(appraisal.id, bid);
    console.log('bid response is', bidResponse);

    this.props.navigator.push({
      name: 'place-bid-confirm',
      data: {
        bid,
      },
    });
  }

  render() {
    return (
      <DmxAppShell
        headerShowMenuButton
        hasFooter={false}
        hasHeader
        buttonText="CONFIRM"
        toView={this.state.toView}
        buttonIsActive
        navigator={this.props.navigator}
      >
        <View style={[styles.container, this.state.keyboardShowing && styles.containerHalfView]}>
          <View style={styles.bidInputBlock}>
            <Text style={styles.unitText}>$</Text>
            <TextInput
              style={styles.input}
              onChangeText={(bid) => this.setState({ bid })}
              onFocus={() => { this.setState({ keyboardShowing: true }); }}
              value={this.state.bid.length > 0 ? numeral(this.state.bid).format('0,0') : ''}
              keyboardType="numeric"
              placeholder="Enter Bid"
              placeholderTextColor="#cacdcd"
              autoCorrect={false}
              maxLength={6}
              returnKeyType="go"
            />
          </View>
          <TouchableOpacity style={styles.bidCtaWrap} onPress={() => this.placeBid()}>
            <View style={styles.bidCta}>
              <Text style={styles.bidCtaText}>BID NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DmxAppShell>
    );
  }
}
