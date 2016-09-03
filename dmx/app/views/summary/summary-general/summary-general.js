import React, { PropTypes } from 'react';
import { Text, TextInput, View } from 'react-native';
import numeral from 'numeral';
import dmxAppModel from '../../../common/services/models/dmx-app-model';
import appraisalModel from '../../../common/services/models/appraisal-model';
import DMXCOLORS from '../../../common/constants/colors';
import styles from './summary-general.styles';
import { default as summaryCommonStyles } from './../summary.styles';
import SummarySection from '../summary-common/summary-section';

export default class SummaryGeneral extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mileage: 0,
      acv: '',
      vehicleInfo: {
        vin: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
      },
      inputHasError: false,
      errorMsg: 'Mileage is required',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateAppraisal) {
      this.fetchData();
    }
  }

  setMileage(strMileage) {
    const mileage = strMileage || false;
    this.setState({
      mileage,
    }, () => {
      const mileageValue = numeral(mileage).value();
      console.log('mileage value ', mileageValue);
      appraisalModel.saveOdometer(mileageValue);
      // appraisalModel.update();
    });
  }

  setAcv(strAcv) {
    const acv = strAcv || false;
    this.setState({
      acv,
    }, () => {
      const acvValue = numeral(acv).value();
      console.log('acv value ', acvValue);
      appraisalModel.saveAcv(acvValue);
      // appraisalModel.update();
    });
  }

  async fetchData() {
    // TODO Error handling
    const vehicleInfo = await dmxAppModel.getSummaryGeneralViewModel();
    let mileage = await appraisalModel.getMileage();
    let acv = await appraisalModel.getAcv();
    console.log('vehicle info in summary general section', vehicleInfo);
    console.log('mileage info', mileage);

    // unformat the number
    mileage = numeral().unformat(mileage);
    acv = numeral().unformat(acv);
    this.setState({
      vehicleInfo,
      mileage,
      acv: acv || '',
    });
  }

  validate() {
    let { mileage, acv } = this.state;
    mileage = numeral(mileage).value(); // the value is a formatted string, not a number
    acv = numeral(acv).value();
    const isValid = typeof mileage === 'number' && mileage > 0;
    this.setState({ inputHasError: !isValid });

    return isValid;
  }

  compileAcvTemplate() {
    const { acv } = this.state;
    const { componentIsDeactivated } = this.props;

    console.log('component is deactivated?', componentIsDeactivated);
    if (componentIsDeactivated) {
      return (
        <SummarySection label="Appraiser's ACV">
          <Text style={summaryCommonStyles.summaryItemBodyListItemValue}>
            {acv > 0 ? numeral(acv).format('$0,0') : ''}
          </Text>
        </SummarySection>
      );
    }

    return (
      <View style={summaryCommonStyles.summaryItemBodyWrap}>
        <View style={styles.unitTextWrap}>
          <Text style={summaryCommonStyles.summaryItemBodyListItemLabel}>Your ACV</Text>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            maxLength={7}
            onChangeText={(acvInput) => this.setAcv(acvInput)}
            placeholder="<Tap to enter ACV>"
            placeholderTextColor={DMXCOLORS.GREYLIGHT}
            style={styles.input}
            value={String(acv).length > 0 ? numeral(acv).format('$0,0') : ''}
          />
        </View>
      </View>
    );
  }

  compileMileageTemplate() {
    const { mileage, inputHasError } = this.state;
    const { componentIsDeactivated } = this.props;

    console.log('component is deactivated?', componentIsDeactivated);
    if (componentIsDeactivated) {
      return (
        <SummarySection label="Mileage">
          <Text style={summaryCommonStyles.summaryItemBodyListItemValue}>
            {mileage > 0 ? numeral(mileage).format('0,0') : ''}
          </Text>
        </SummarySection>
      );
    }

    return (
      <View style={summaryCommonStyles.summaryItemBodyWrap}>
        <View style={styles.unitTextWrap}>
          <Text
            style={[
              summaryCommonStyles.summaryItemBodyListItemLabel,
              inputHasError && { color: DMXCOLORS.RED },
            ]}
          >
            Mileage
          </Text>
        </View>
        <View style={styles.textInputWrap}>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="numeric"
            maxLength={7}
            onChangeText={(mileageInput) => this.setMileage(mileageInput)}
            placeholder="<Tap to enter mileage>"
            placeholderTextColor={inputHasError ? DMXCOLORS.RED : DMXCOLORS.GREYLIGHT}
            style={[styles.input, inputHasError && { color: DMXCOLORS.RED }]}
            value={String(mileage).length > 0 ? numeral(mileage).format('0,0') : ''}
          />
        </View>
      </View>
    );
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
    const { vehicleInfo = {} } = this.state;

    return (
      <View style={summaryCommonStyles.summaryItemWrap}>
        <View style={summaryCommonStyles.summaryItemHeaderWrap}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>General</Text>
        </View>
        <SummarySection label="Vehicle">
          <Text style={summaryCommonStyles.summaryItemBodyListItemValue}>
            {`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
          </Text>
        </SummarySection>
        <SummarySection label="VIN">
          <Text style={summaryCommonStyles.summaryItemBodyListItemValue}>
            {vehicleInfo.vin}
          </Text>
        </SummarySection>
        {this.compileMileageTemplate()}
        {this.renderErrorComponent()}
        {this.compileAcvTemplate()}
      </View>
    );
  }
}

SummaryGeneral.propTypes = {
  navigator: PropTypes.object,
  componentIsDeactivated: PropTypes.bool,
};
