import React, { PropTypes } from 'react';
import {
    DeviceEventEmitter,
    Image,
    ListView,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import dmxAppModel from '../../common/services/models/dmx-app-model';
import appraisalModel from '../../common/services/models/appraisal-model';
import styles from './vin-scan-confirm.styles';
import { default as commonStyles } from '../../common/styles/common.styles';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import checkboxAsset from '../../assets/checkbox.png';
import alertIconAsset from '../../assets/alert-icon.png';

export default class DmxConfirmVinView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      styleIdSelected: null,
      selectedStyleString: false,
      vehicleInfo: {
        vin: '',
        showStyleSelect: false,
        styles: [
          {
            id: false,
          },
        ],
        vehicleInfoString: '',
      },
    };
  }

  componentWillMount() {
    appraisalModel.initAppraisal();
  }

  componentDidMount() {
    this.fetchData();
  }

  async advanceToSummary() {
    const vehicleStyleId = this.state.styleIdSelected;
    const { vin } = this.state.vehicleInfo;

    DeviceEventEmitter.emit('valuechange-showactivity', true);

    await appraisalModel.saveSelectedStyleId(vehicleStyleId);
    const vehicleInfo = await dmxAppModel.getVehicleInfo(vin, vehicleStyleId);
    await appraisalModel.saveGeneralVehicleInfo(vehicleInfo, vin);

    this.props.navigator.push({
      name: 'walkthrough-intro',
    });

    DeviceEventEmitter.emit('valuechange-showactivity', false);
  }

  async fetchData() {
    const { vin } = this.props.route.data;
    const vehicleInfo = await dmxAppModel.getVehicleInfo(vin);
    appraisalModel.saveGeneralVehicleInfo(vehicleInfo, vin);
    const { years, make, model } = vehicleInfo;
    const singleStyle = years[0].styles.length === 1;
    const style = singleStyle ? years[0].styles[0] : {};
    this.setState({
      styleIdSelected: singleStyle ? style.id : false,
      selectedStyleString: singleStyle ? style.id : false,
      vehicleInfo: {
        vin,
        showStyleSelect: !singleStyle,
        styles: singleStyle ? style : years[0].styles,
        vehicleInfoString: `${years[0].year} ${make.name} ${model.name} \n${style.name}`,
      },
    });
  }

  async selectStyleId(vehicleStyleId) {
    console.log('vehicle style id var is ', vehicleStyleId);
    this.setState({
      styleIdSelected: vehicleStyleId,
      selectedStyleString: vehicleStyleId,
    });
  }

  renderRow(vehicleStyle) {
    if (this.state.styleIdSelected === vehicleStyle.id) {
      return (
        <TouchableHighlight onPress={() => this.selectStyleId(vehicleStyle.id)}>
          <View style={commonStyles.listViewRow}>
            <Text style={styles.styleSelectorText}>{vehicleStyle.name}</Text>
            <Image source={checkboxAsset} />
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableHighlight onPress={() => this.selectStyleId(vehicleStyle.id)}>
        <View style={commonStyles.listViewRow}>
          <Text style={styles.styleSelectorText}>{vehicleStyle.name}</Text>
          <View style={styles.checkbox} />
        </View>
      </TouchableHighlight>
    );
  }

  renderVinScanConfirmTemplate() {
    const { vehicleInfo } = this.state;
    if (vehicleInfo.showStyleSelect) {
      return (
        <View style={styles.columnWrap}>
          <View style={styles.messageWrap}>
            <Image source={alertIconAsset} />
            <Text style={styles.confirmTextHeader}>{'Multiple Vehicles Found'}</Text>
            <Text style={styles.confirmText}>
              There are multiple vehicles associated with this VIN. Select the correct
              style and tap confirm to continue.
            </Text>
          </View>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource.cloneWithRows(vehicleInfo.styles)}
            renderRow={vehicleStyle => this.renderRow(vehicleStyle)}
            enableEmptySections
          />
        </View>
      );
    }
    if (vehicleInfo.vehicleInfoString) {
      return (
        <View style={styles.columnWrap}>
          <Image source={alertIconAsset} />
          <Text style={styles.confirmTextHeader}>
            {'Vehicle Found'}
          </Text>
          <Text style={styles.vehicle}>
            {vehicleInfo.vehicleInfoString}
          </Text>
          <Text style={styles.confirmText}>
            {'Press Confirm to continue or the back arrow to retry.'}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.columnWrap}>
        <Text style={styles.confirmTextHeader}>
          {'Searching...'}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerText="Approve"
        headerShowLeftButton
        headerShowMenuButton
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          {this.renderVinScanConfirmTemplate()}
        </View>
        <View style={styles.confirmBtn}>
          <DmxFullWidthButton
            buttonIsActive={this.state.selectedStyleString}
            buttonAction={() => this.advanceToSummary()}
            buttonText="CONFIRM"
            buttonColor="BLUE"
          />
        </View>
      </DmxAppShell>
    );
  }

}
