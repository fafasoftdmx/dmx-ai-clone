import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import summaryCommonStyles from '../../summary/summary.styles';
import styles from './notification-filter-summary-model.styles';
import _ from 'lodash';

const availableYearsFixture = _.times(17, i => (2000 + i).toString());
const makes = [
  {
    name: 'BMW',
    models: [
      {
        name: 'X3',
      },
      {
        name: 'X5',
      },
      {
        name: 'X6',
      },
    ],
  },
  {
    name: 'Volkswagen',
    models: [
      {
        name: 'Jetta',
      },
      {
        name: 'Passat',
      },
    ],
  },
];

const YearView = ({ year, changeYear }) => (
  <View>
    <TouchableOpacity onPress={() => changeYear()}>
      <Text style={styles.valueLabel}>{year}</Text>
    </TouchableOpacity>
  </View>
);

YearView.propTypes = {
  year: PropTypes.string.isRequired,
  changeYear: PropTypes.func.isRequired,
};

const MakeView = ({ make, selectMake }) => (
  <View style={summaryCommonStyles.summaryItemWrapInner}>
    <TouchableOpacity onPress={() => selectMake()}>
      <Text style={styles.valueLabel}>{make}</Text>
    </TouchableOpacity>
  </View>
);

MakeView.propTypes = {
  make: PropTypes.string.isRequired,
  selectMake: PropTypes.func.isRequired,
};

const ModelView = ({ model, selectModel }) => (
  <View style={summaryCommonStyles.summaryItemWrapInner}>
    <TouchableOpacity onPress={() => selectModel()}>
      <Text style={styles.valueLabel}>{model}</Text>
    </TouchableOpacity>
  </View>
);

ModelView.propTypes = {
  model: PropTypes.string.isRequired,
  selectModel: PropTypes.func.isRequired,
};

const NotificationFilterSummaryModel = ({
  fromYear = 2000,
  selectFromYear,
  toYear = 2016,
  selectToYear,
  make,
  selectMake,
  model,
  selectModel,
  }) => (
  <View>
    <SummarySectionHeader>Select Year Range*</SummarySectionHeader>
    <View
      style={[
        summaryCommonStyles.summaryItemWrapInner,
        { flexDirection: 'row' },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.dateTitleLabel}>FROM</Text>
        <YearView year={fromYear} changeYear={selectFromYear} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.dateTitleLabel}>TO</Text>
        <YearView year={toYear} changeYear={selectToYear} />
      </View>
    </View>
    <SummarySectionHeader>Select Make*</SummarySectionHeader>
    <MakeView make={make} selectMake={selectMake} />
    <SummarySectionHeader>Select Model*</SummarySectionHeader>
    <ModelView model={model} selectModel={selectModel} />
  </View>
);

NotificationFilterSummaryModel.propTypes = {
  make: PropTypes.string.isRequired,
  selectMake: PropTypes.func.isRequired,
  model: PropTypes.string.isRequired,
  selectModel: PropTypes.func.isRequired,
  fromYear: PropTypes.string.isRequired,
  selectFromYear: PropTypes.func.isRequired,
  toYear: PropTypes.string.isRequired,
  selectToYear: PropTypes.func.isRequired,
};

// this component is statefull, and will emulate redux connect behavior
export default class ModelMakeYearViewConnect extends React.Component {

  constructor() {
    super();
    this.state = {
      availableYears: availableYearsFixture,
      fromYearIndex: 0,
      toYearIndex: availableYearsFixture.length - 1,
      make: makes[0],
      model: makes[0].models[0],
    };
  }

  componentWillUnmount() {
    if (this.selectorListener) {
      this.selectorListener.remove();
    }
  }

  getYearItems(fromYear, toYear) {
    const { availableYears } = this.state;
    const items = availableYears
      .slice(fromYear, toYear + 1)
      .map(e => ({ name: e }));
    return items;
  }

  openSelector(items, selectedItem, callback) {
    this.selectorListener = DeviceEventEmitter.addListener(
      'selectorModalItemSelected',
      item => {
        this.selectorListener.remove();
        callback(item);
      }
    );
    DeviceEventEmitter.emit('selectorModalOpen', { items, selectedItem });
  }

  selectToYear() {
    const { fromYearIndex, toYearIndex, availableYears } = this.state;
    this.openSelector(
      this.getYearItems(fromYearIndex, availableYears.length + 1),
      { name: availableYears[toYearIndex] },
      this.yearToSelected.bind(this)
    );
  }

  selectFromYear() {
    const { fromYearIndex, toYearIndex, availableYears } = this.state;
    this.openSelector(
      this.getYearItems(0, toYearIndex),
      { name: availableYears[fromYearIndex] },
      this.yearFromSelected.bind(this)
    );
  }

  selectMake() {
    this.openSelector(
      makes,
      this.state.make,
      this.makeSelected.bind(this)
    );
  }

  selectModel() {
    const { make } = this.state;
    if (!make) {
      return;
    }
    this.openSelector(
      make.models,
      this.state.model,
      this.modelSelected.bind(this)
    );
  }

  yearFromSelected(item) {
    const { availableYears } = this.state;
    this.setState({
      fromYearIndex: availableYears.indexOf(item.name),
      selectorItems: undefined,
    });
  }

  yearToSelected(item) {
    const { availableYears } = this.state;
    this.setState({
      toYearIndex: availableYears.indexOf(item.name),
      selectorItems: undefined,
    });
  }

  makeSelected(make) {
    if (make === this.state.make) {
      this.setState({ selectorItems: undefined });
      return;
    }
    this.setState({
      make,
      model: make.models[0],
      selectorItems: undefined,
    });
  }

  modelSelected(model) {
    this.setState({
      model,
      selectorItems: undefined,
    });
  }

  render() {
    const {
      availableYears,
      make,
      model,
      fromYearIndex,
      toYearIndex,
      } = this.state;

    return (
      <NotificationFilterSummaryModel
        fromYear={availableYears[fromYearIndex]}
        selectFromYear={() => this.selectFromYear()}
        toYear={availableYears[toYearIndex]}
        selectToYear={() => this.selectToYear()}
        make={make && make.name}
        selectMake={() => this.selectMake()}
        model={model && model.name}
        selectModel={() => this.selectModel()}
      />
    );
  }
}
