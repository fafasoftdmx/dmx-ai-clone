import React, { Component, PropTypes } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import appraisalTransformer from '../../common/services/models/appraisal-transformer';
import AppraisalListMenu from './appraisal-list-menu/appraisal-list-menu';
import AppraisalListView from './appraisal-list-view/appraisal-list-view';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import DmxFullWidthButton from '../../common/components/full-width-button/full-width-button';
import dmxService from '../../common/services/api/dmx-service';
import permissionsService from '../../common/services/api/permissions';
import { isComplete } from '../../common/services/models/appraisal-validator';
import styles from './appraisal-list.styles';
import numeral from 'numeral';
import userModel from '../../common/services/models/user-model';

export default class AppraisalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appraisals: [],
      appraisalFilter: 'Mine',
      isRefreshing: false,
      currentAppraisalOffset: 0,
      defaultSort: { field: 'dateCreated', option: { value: 'high' } },
      myAppraisals: [],
      myDealershipAppraisals: [],
      menuOptions: ['Mine', 'My Dealership', 'DMX Market', 'Incomplete'],
      user: {},
    };

    this.selectAppraisals = this.selectAppraisals.bind(this);
    this.deleteAppraisal = this.deleteAppraisal.bind(this);
    this.advanceToSort = this.advanceToSort.bind(this);
  }

  async componentDidMount() {
    await this.getUser();
    this.sortListener = DeviceEventEmitter.addListener(
      'valuechange-appraisalsort',
      (sortOption) => this.setState({ selectedSort: sortOption })
    );
    this.fetchAppraisals();
  }

  componentWillUnmount() {
    this.sortListener.remove();
  }

  async onRefresh() {
    this.setState({ isRefreshing: true });
    await this.fetchAppraisals();
    this.setState({ isRefreshing: false });
  }

  async getUser() {
    const user = await userModel.getUser();
    this.setState({ user, selectedSort: user.appraisalSort });
  }

  advanceToVinScan() {
    const self = this;
    const permissionType = 'camera';
    // check permissions first
    permissionsService.checkPermission(permissionType)
      .then((response) => {
        console.log('permission check response', response);
        if (response === 'undetermined') {
          DeviceEventEmitter
            .emit('dmx-showmodal',
              permissionsService.packagePermissionsModalContent(permissionType)
            );
        } else if (response === 'denied') {
          permissionsService.handleDeniedRequest(permissionType);
        } else if (response === 'authorized') {
          self.props.navigator.push({
            name: 'vin-scan',
          });
        }
      });
  }

  advanceToSort() {
    this.props.navigator.push({
      name: 'appraisal-sort',
      sortOption: this.state.selectedSort,
    });
  }

  async deleteAppraisal(id) {
    const response = await dmxService.deleteAppraisal(id);
    if (response && response.ok) {
      const { myAppraisals } = this.state;
      const myAppraisalsUpdated = myAppraisals.filter(appraisal => id !== appraisal._id);
      this.setState({
        myAppraisals: myAppraisalsUpdated,
      });
      return true;
    }
    return false;
  }

  sortAppraisals(sort, appraisals) {
    if (!sort.field || !sort.option) {
      return appraisals;
    }

    let fields = [];
    if (sort.field.indexOf('.') > 0) {
      fields = sort.field.split('.');
    } else {
      fields.push(sort.field);
    }
    const top = sort.option.value;
    console.log('sort fields', fields);
    function compare(a, b) {
      let aValue = fields.length > 1 ? a[fields[0]][fields[1]] : a[fields[0]];
      let bValue = fields.length > 1 ? b[fields[0]][fields[1]] : b[fields[0]];
      aValue = sort.numeric ? numeral().unformat(aValue) : aValue;
      bValue = sort.numeric ? numeral().unformat(bValue) : bValue;

      if ((top === 'low' && aValue < bValue) ||
            (top === 'high' && aValue > bValue)) {
        return -1;
      }
      if ((top === 'low' && aValue > bValue) ||
            (top === 'high' && aValue < bValue)) {
        return 1;
      }
      return 0;
    }

    return appraisals.sort(compare);
  }

  selectAppraisals(filter) {
    const {
      appraisals,
      myAppraisals,
      myDealershipAppraisals,
    } = this.state;

    if (filter === 'Mine') {
      return myAppraisals.filter(i => i.isComplete);
    }
    if (filter === 'My Dealership') {
      return myDealershipAppraisals.filter(i => i.isComplete);
    }
    if (filter === 'Incomplete') {
      return myAppraisals.filter(i => !i.isComplete);
    }
    return appraisals;
  }

  selectFilter(filter) {
    this.setState({
      appraisalFilter: filter,
    });
  }

  async fetchAppraisals() {
    const { user, currentAppraisalOffset } = this.state;
    DeviceEventEmitter.emit('valuechange-showactivity', true);
    const appraisals = (await dmxService.getAppraisals(20, currentAppraisalOffset))
      .filter(i => i.vehicleBuildInfo)
      .map(i => {
        const vmAppraisal = appraisalTransformer.domainToView(i);
        vmAppraisal.isComplete = isComplete(vmAppraisal);
        return vmAppraisal;
      });
    const myAppraisals = (await dmxService.getMyAppraisals(
      user._id, 20, currentAppraisalOffset))
        .filter(i => i.vehicleBuildInfo)
        .map(i => {
          const vmAppraisal = appraisalTransformer.domainToView(i);
          vmAppraisal.isComplete = isComplete(vmAppraisal);
          return vmAppraisal;
        });
    const myDealershipAppraisals = (await dmxService.getMyDealershipAppraisals(
      user._id, user.dealerId, 20, currentAppraisalOffset))
        .filter(i => i.vehicleBuildInfo)
        .map(i => {
          const vmAppraisal = appraisalTransformer.domainToView(i);
          vmAppraisal.isComplete = isComplete(vmAppraisal);
          return vmAppraisal;
        });
    DeviceEventEmitter.emit('valuechange-showactivity', false);
    this.setState({ myAppraisals, myDealershipAppraisals, appraisals });
  }

  render() {
    const { route, navigator } = this.props;
    const { appraisalFilter, defaultSort, selectedSort } = this.state;
    const sortOption = selectedSort || defaultSort;
    const appraisals = this.selectAppraisals(appraisalFilter);

    return (
      <DmxAppShell
        hasFooter={false}
        hasHeader
        headerText="Appraisals"
        headerShowLeftButton
        headerLeftButton="sort"
        leftButtonAction={this.advanceToSort}
        headerShowMenuButton
        navigator={navigator}
        route={route}
      >
        <View style={styles.appraisalListWrap}>
          <View style={styles.appraisalListView}>
            <AppraisalListView
              appraisals={this.sortAppraisals(sortOption, appraisals)}
              deleteItem={this.deleteAppraisal}
              enableDelete={appraisalFilter === 'Incomplete'}
              isRefreshing={this.state.isRefreshing}
              navigator={navigator}
              onRefresh={() => this.onRefresh()}
            />
          </View>
          <View style={styles.appraisalListMenu}>
            <AppraisalListMenu
              items={this.state.menuOptions}
              onSelectItem={(name) => this.selectFilter(name)}
              selectedItem={appraisalFilter}
            />
          </View>
          <View style={styles.newAppraisalBtn}>
            <DmxFullWidthButton
              buttonIsActive
              buttonAction={() => this.advanceToVinScan()}
              buttonText="NEW APPRAISAL"
              buttonColor="GREEN"
            />
          </View>
        </View>
      </DmxAppShell>
    );
  }
}

AppraisalList.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
