import React, { PropTypes } from 'react';
import { Image, Text, TouchableOpacity, View, ListView } from 'react-native';
import update from 'react-addons-update';
import appraisalModel from '../../services/models/appraisal-model';
import dmxAppStateService from '../../services/state/stateService';
import styles from './options-listview.styles';
import circlePng from '../../../assets/circle.png';
import checkmarkPng from '../../../assets/checkmark.png';

export default class DmxOptionsListView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    filterBy: PropTypes.string.isRequired,
    nextView: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      optionsList: [],
      optionsSelected: [],
      isLoading: true,
    };
    this.lastScrollY = 0;
    this.headerView = null;
  }

  async componentWillReceiveProps(nextProps) {
    const optionsList = nextProps.options;
    const selectedOptions = await this.getSelectedOptions();

    if (selectedOptions.length > 0) {
      const selectedOptionsArr = selectedOptions.map((option) => option.id);
      this.setState({
        optionsList,
        isLoading: false,
        optionsSelected: selectedOptionsArr,
      });
    } else {
      this.setState({
        optionsList,
        isLoading: false,
      });
    }
  }

  getRowToggleState(optionId) {
    return this.state.optionsSelected.find((elem) => elem === optionId);
  }
  async getSelectedOptions() {
    const selectedOptions = await appraisalModel.getSelectedVehicleOptions();
    return selectedOptions;
  }

  getSelectedOptionValues() {
    const optionsValues = [];
    this.state.optionsList.forEach((option) => {
      this.state.optionsSelected.forEach((elem) => {
        if (elem === option.id) {
          optionsValues.push(option);
        }
      });
    });
    return optionsValues;
  }
  toggleOption(optionId) {
    let optionHasBeenSelectedKey;
    const optionHasBeenSelectedValue = this.state.optionsSelected.find((elem, idx) => {
      optionHasBeenSelectedKey = idx;
      return elem === optionId;
    });

    if (optionHasBeenSelectedValue) {
      this.setState({
        optionsSelected: update(
          this.state.optionsSelected,
          { $splice: [[optionHasBeenSelectedKey, 1]] }
        ),
      }, () => {
        const selectedOptionValues = this.getSelectedOptionValues();
        appraisalModel.saveSelectedVehicleOptions(selectedOptionValues);
      });
    } else {
            // let newOptionsSelected = this.state.optionsSelected.concat(optionId);
      this.setState({
        optionsSelected: update(this.state.optionsSelected, { $push: [optionId] }),
      }, () => {
        const selectedOptionValues = this.getSelectedOptionValues();
        appraisalModel.saveSelectedVehicleOptions(selectedOptionValues);
      });
    }
        // appraisalModel.update();
  }
  advanceToNextView() {
    const toView = this.props.nextView;
    const optionsSelected = String(this.state.optionsSelected);
    dmxAppStateService.setItem(this.props.filterBy.toLowerCase(), optionsSelected);
    this.props.navigator.push({
      name: toView,
      navigator: this.props.navigator,
    });
  }

  renderRow(option) {
    const textStyles = [
      styles.listItemText,
    ];
    const isSelected = this.getRowToggleState(option.id);
    if (isSelected) {
      textStyles.push(styles.listItemTextSelected);
    }

    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          style={styles.listItemWrapper}
          onPress={() => this.toggleOption(option.id)}
        >
          <Text style={textStyles}>{option.name}</Text>
          <Image style={[styles.checkMark]} source={isSelected ? checkmarkPng : circlePng} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const optionsListTemplate = (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource.cloneWithRows(this.state.optionsList)}
        renderRow={option => this.renderRow(option)}
        scrollEnabled
        initialListSize={20}
        pageSize={20}
        enableEmptySections
      />
    );

    return optionsListTemplate;
  }
}
