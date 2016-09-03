import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Image, DeviceEventEmitter } from 'react-native';
import appraisalModel from '../../../common/services/models/appraisal-model';
import DMXCOLORS from '../../../common/constants/colors';
import summaryCommonStyles from './../summary.styles';
import styles from './summary-rating.styles';
import { SUMMARY_RATING_UPDATED } from '../summary-events';
import _ from 'underscore';
const arrowBlueAsset = require('../../../assets/arrow-blue.png');

export default class SummaryRating extends React.Component {

  static propTypes = {
    componentIsDeactivated: PropTypes.bool.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formattedRatings: [],
      ratings: {},
      inputHasError: false,
      errorMsg: 'Ratings section must be complete.',
    };
  }

  componentDidMount() {
    this.summaryRatingUpdatedListener = DeviceEventEmitter.addListener(
      SUMMARY_RATING_UPDATED,
      () => this.fetchData()
    );
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateAppraisal) {
      console.log('updating ratings module inside of rating');
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.summaryRatingUpdatedListener.remove();
  }

  getRatingsViewModel(ratings) {
    let summaryRatingOutput = [];
    console.log('these are our raw ratings', ratings);

    if (ratings) {
      _.mapObject(ratings, (rating, key) => {
        const formattedRating = this.ratingFormat(rating);
        summaryRatingOutput.push({
          type: key,
          prettyType: key.charAt(0).toUpperCase() + key.slice(1),
          rating,
          ratingText: formattedRating.text,
          colorHex: formattedRating.color,
        });
      });
    } else {
      summaryRatingOutput = false;
    }

    return summaryRatingOutput;
  }

  getSectionHeader() {
    let headerTemplate;
    if (this.props.componentIsDeactivated) {
      headerTemplate = (
        <View style={summaryCommonStyles.summaryItemHeaderWrap}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Ratings</Text>
        </View>
      );
    } else {
      headerTemplate = (
        <TouchableOpacity onPress={() => this.advanceToView('ratings', this.state.ratings)}>
          <View style={summaryCommonStyles.summaryItemHeaderWrap}>
            <Text
              style={[
                summaryCommonStyles.summaryItemHeaderText,
                this.state.inputHasError && { color: DMXCOLORS.RED },
              ]}
            >
              Ratings
            </Text>
            <Image
              style={summaryCommonStyles.summaryItemHeaderArrow}
              source={arrowBlueAsset}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      );
    }
    return headerTemplate;
  }

  advanceToView(toView, dataToPass) {
    this.props.navigator.push({
      name: toView,
      data: dataToPass || false,
    });
  }

  async fetchData() {
    const ratings = await appraisalModel.getRatings();
    const formattedRatings = this.getRatingsViewModel(ratings);
    console.log('ratings in summary ', ratings);
    if (ratings && formattedRatings) {
      this.setState({
        ratings,
        formattedRatings,
      });
    }
  }

  ratingFormat(rating) {
    let formattedRating = {};
    switch (rating) {
      case 1:
        formattedRating = {
          text: 'Poor',
          color: DMXCOLORS.RED,
        };
        break;
      case 2:
        formattedRating = {
          text: 'Fair',
          color: DMXCOLORS.YELLOW,
        };
        break;
      case 3:
        formattedRating = {
          text: 'Good',
          color: DMXCOLORS.BLUE,
        };
        break;
      case 4:
        formattedRating = {
          text: 'Excellent',
          color: DMXCOLORS.GREEN,
        };
        break;
      default:
        throw new Error(`Unknown rating ${rating}`);
    }
    return formattedRating;
  }

  validate() {
    const { ratings } = this.state;
    const isValid = ratings &&
      typeof ratings.paint === 'number' &&
      typeof ratings.tires === 'number' &&
      typeof ratings.interior === 'number' &&
      typeof ratings.body === 'number';
    this.setState({ inputHasError: !isValid });

    return isValid;
  }

  renderErrorComponent() {
    return (
      <View style={[styles.errorComponent, this.state.inputHasError && { opacity: 1 }]}>
        <View style={[styles.errorArrow]} />
        <View style={[styles.errorContainer]}>
          <Text style={styles.errorComponentText}>{this.state.errorMsg}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={summaryCommonStyles.summaryItemWrap}>
        {this.getSectionHeader()}
        {
          this.state.formattedRatings.map((rating, i) => (
            <View style={[summaryCommonStyles.row, styles.rowMargin]} key={i}>
              <View style={[styles.microSwatchTiny, { backgroundColor: rating.colorHex }]} />
              <Text style={summaryCommonStyles.text}>
                {rating.prettyType} - {rating.ratingText}
              </Text>
            </View>
          ))
        }
        {this.renderErrorComponent()}
      </View>
    );
  }
}
