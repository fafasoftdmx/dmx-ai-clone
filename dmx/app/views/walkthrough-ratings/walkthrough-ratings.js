import React, { PropTypes } from 'react';
import {
  DeviceEventEmitter,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './walkthrough-ratings.styles';
import appraisalModel from '../../common/services/models/appraisal-model';
import AppShell from '../../common/components/app-shell/app-shell';
import DmxButtonStrip from '../../common/components/button-strip/button-strip';
import VehicleDetail from '../../common/components/walkthrough-vehicle-detail';
import { SUMMARY_RATING_UPDATED } from '../summary/summary-events';

export default class WalkthroughRatings extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      vin: '',
      ratings: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { year, make, model, vin, imageUri } = this.props.route.data;
    this.setState({
      year,
      make,
      model,
      vin,
      imageUri,
    });

    const ratings = await appraisalModel.getRatings();
    this.setState({
      ratings,
    });
  }

  advanceToGroups() {
    DeviceEventEmitter.emit(SUMMARY_RATING_UPDATED);
    this.props.navigator.pop();
  }

  render() {
    const { year, make, model, vin, ratings, imageUri } = this.state;
    return (
      <AppShell
        hasFooter={false}
        hasHeader
        headerText="Appraisal Progress"
        headerShowLeftButton
        headerShowMenuButton
        collapseEnabled
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.detailWrap}>
            <VehicleDetail
              year={String(year)}
              make={make}
              model={model}
              vin={vin}
              imageUri={imageUri}
            />
          </View>
          <View style={styles.ratingsSelectWrap}>
            <View style={styles.headerWrap}>
              <Text style={styles.headerText}>RATINGS</Text>
            </View>
            <View style={styles.scrollWrap}>
              <ScrollView>
                <DmxButtonStrip
                  style={styles.buttonStrip}
                  value={ratings.paint}
                  type="paint"
                  name="Paint"
                />
                <DmxButtonStrip
                  style={styles.buttonStrip}
                  value={ratings.tires}
                  type="tires"
                  name="Tires"
                />
                <DmxButtonStrip
                  style={styles.buttonStrip}
                  value={ratings.wheels}
                  type="wheels"
                  name="Wheels"
                />
                <DmxButtonStrip
                  style={styles.buttonStrip}
                  value={ratings.interior}
                  type="interior"
                  name="Interior"
                />
                <DmxButtonStrip
                  style={styles.buttonStrip}
                  value={ratings.body}
                  type="body"
                  name="Body"
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </AppShell>
    );
  }

}
