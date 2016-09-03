import React, { PropTypes } from 'react';
import { ScrollView } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import appraisalModel from '../../common/services/models/appraisal-model';
import BidHistoryItem from './bid-history-item/bid-history-item';
import styles from './bid-history.styles';

export default class BidHistory extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const appraisal = await appraisalModel.showCurrentAppraisal();
    this.setState({
      appraisal: JSON.parse(appraisal),
    });
  }

  render() {
    const { appraisal } = this.state;
    const make = appraisal ? appraisal.generalInfo.make : '';
    const year = appraisal ? appraisal.generalInfo.year : '';
    let bids = [];
    if (appraisal && appraisal.bids) {
      bids = appraisal.bids;
    }

    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerText={`${make} ${year} Bids`}
        headerTextStyle={styles.headerText}
        headerShowLeftButton
        headerShowMenuButton
        headerShowRightButton={false}
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <ScrollView style={styles.bidHistoryScroll}>
          {
            bids.map((bid, i) => (
              <BidHistoryItem bid={bid} key={i} />
            ))
          }
        </ScrollView>
      </DmxAppShell>
    );
  }
}
