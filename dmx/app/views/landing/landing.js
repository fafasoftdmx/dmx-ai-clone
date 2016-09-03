import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Navigator } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import { default as commonStyles } from '../../common/styles/common.styles';
import styles from './landing.styles';

export default class DmxLandingView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  advanceToView(toView, gesture, transition, dataToPass) {
    this.props.navigator.push({
      name: toView,
      data: dataToPass || false,
      gestures: gesture,
      sceneConfig: transition,
    });
  }

  render() {
    const vinData = { vin: 'WBANE53517CK92498' };
    return (
      <DmxAppShell
        route={this.props.route}
        hasFooter={false}
        hasHeader
        headerShowLeftButton={false}
        headerShowRightButton={false}
      >
        <View style={commonStyles.contentsCentered}>
          <Text style={styles.welcome}>DMX Views</Text>
          <TouchableOpacity onPress={() => this.advanceToView('appraisal-list')}>
            <View style={styles.marginTop}>
              <Text style={styles.text}>Appraisal List</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => this.advanceToView(
                'vin-scan-confirm',
                Navigator.SceneConfigs.FloatFromRight.gestures,
                Navigator.SceneConfigs.FloatFromRight,
                vinData
              )
            }
          >
            <View style={styles.marginTop}>
              <Text style={styles.text}>Scan VIN Mock</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.advanceToView('vin-scan')}>
            <View style={styles.marginTop}>
              <Text style={styles.text}>Scan VIN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.advanceToView('summary')}>
            <View style={styles.marginTop}>
              <Text style={styles.text}>Vehicle Summary</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.advanceToView('capture')}>
            <View style={styles.marginTop}>
              <Text style={styles.text}>Camera</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => this.advanceToView(
                'place-bid',
                Navigator.SceneConfigs.FloatFromBottom.gestures,
                Navigator.SceneConfigs.FloatFromBottom
              )
            }
          >
            <View style={styles.marginTop}>
              <Text style={styles.text}>Place Bid</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              () => this.advanceToView(
                'place-bid-confirm',
                null,
                null,
                { bid: '$42,750' }
              )
            }
          >
            <View style={styles.marginTop}>
              <Text style={styles.text}>Place Bid Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DmxAppShell>
    );
  }
}
