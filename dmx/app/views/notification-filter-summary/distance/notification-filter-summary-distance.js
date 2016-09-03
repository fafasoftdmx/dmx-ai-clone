import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from 'react-native-slider';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import { SquareCheckmark } from '../../../common/components/option-checkmark/option-checkmark';
import ToolTip from '../../../common/components/tool-tip/tool-tip';
import summaryCommonStyles from '../../summary/summary.styles';
import styles from './notification-filter-summary-distance.styles';
import COLORS from '../../../common/constants/colors';

export default class NotificationFilterSummaryDistance extends React.Component {

  static propTypes = {
    lowestValue: PropTypes.number,
    highestValue: PropTypes.number,
  };

  static defaultProps = {
    lowestValue: 5,
    highestValue: 1000,
  };

  constructor(props) {
    super(props);
    this.state = { entireMarket: false };
  }

  toggleEntireMarket() {
    const { entireMarket } = this.state;
    this.setState({ entireMarket: !entireMarket });
  }

  interpolateValue(value) {
    const { lowestValue, highestValue } = this.props;
    return Math.floor(value * (highestValue - lowestValue) + lowestValue);
  }

  render() {
    const { toolTipVisible, entireMarket } = this.state;
    const { lowestValue, highestValue } = this.props;

    return (<View>
      <SummarySectionHeader>Maximum Distance From Me*</SummarySectionHeader>
      <View style={[styles.fullWidth, summaryCommonStyles.summaryItemWrapInner]}>
        <Text style={styles.entireMarketLabel}>Entire US Market</Text>
        <TouchableOpacity onPress={() => this.toggleEntireMarket()}>
          <SquareCheckmark selected={entireMarket} />
        </TouchableOpacity>
      </View>
      <View
        pointerEvents={entireMarket ? 'none' : 'auto'}
        style={[summaryCommonStyles.summaryItemWrapInner, entireMarket && { opacity: 0.3 }]}
      >
        <Slider
          minimumTrackTintColor={COLORS.MOUNTAIN_MEADOW}
          maximumTrackTintColor={COLORS.WHITE}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          onSlidingComplete={
            () => this.setState({
              toolTipVisible: false,
            })
          }
          onValueChange={
            value => this.setState({
              value: this.interpolateValue(value),
              toolTipVisible: true,
            })
          }
          createThumbMiddleware={view => (
            <ToolTip
              visible={toolTipVisible}
              text={`${this.state.value} MILES`}
            >
              {view}
            </ToolTip>
          )}
        />
        <View style={styles.fullWidth}>
          <Text style={styles.milesLabel}>{lowestValue} MILES</Text>
          <Text style={styles.milesLabel}>{highestValue} MILES</Text>
        </View>
      </View>
    </View>);
  }
}
