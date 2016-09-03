import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Rx from 'rx';
import vehicleOptionsData from '../../../common/services/mocks/edmunds-mock-vehicle-options.json';
import { default as summaryCommonStyles } from './../summary.styles';
const arrowBlueAsset = require('../../../assets/arrow-blue.png');

export default class SummaryOptionsPackages extends React.Component {

  propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      vehicleOptions: [
        vehicleOptionsData.options[0],
        vehicleOptionsData.options[1],
        vehicleOptionsData.options[2],
        vehicleOptionsData.options[3],
      ],
    };
  }

  advanceToView(toView, dataToPass) {
    this.props.navigator.push({
      name: toView,
      data: dataToPass || false,
    });
  }

  returnOptionsTemplate(options) {
    let optionsTemplate;
    const options$ = Rx.Observable.from(options);
    options$.subscribe(option => {
      optionsTemplate += (
        <View style={summaryCommonStyles.row}>
          <Text style={summaryCommonStyles.text}>{option.name}</Text>
        </View>
      );
    });
    return optionsTemplate;
  }
  render() {
        // TODO: Turn header into a component
    return (
      <View style={summaryCommonStyles.summaryItemWrap}>
        <TouchableOpacity onPress={() => this.advanceToView('equipment')}>
          <View style={summaryCommonStyles.summaryItemHeaderWrap}>
            <Text style={summaryCommonStyles.summaryItemHeaderText}>Options Packages</Text>
            <Image
              style={summaryCommonStyles.summaryItemHeaderArrow}
              source={arrowBlueAsset}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {this.state.vehicleOptions.map((option, i) => (
          <View style={summaryCommonStyles.row} key={i}>
            <Text style={summaryCommonStyles.text}>{option.name}</Text>
          </View>
        ))}
      </View>
    );
  }
}
