import React, { Text, TouchableOpacity, View, ListView } from 'react-native';
import appState from '../../services/mocks/app-state-mock.json';
import styles from './domain-menu.styles';

export default class DmxDomainMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      vehicles: appState,
      activeVin: 'WBAWV53568P078170',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  setActiveVehicle(vehicle) {
    this.setState({
      activeVin: vehicle.vin,
    });
  }

  fetchData() {
    this.setState({
      vehicles: appState.vehicles,
      isLoading: false,
    });
  }

  renderDomainMenu() {
    const domainMenuTemplate = (
      <View style={styles.menuWrap}>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.state.vehicles)}
          renderRow={vehicle => this.renderRow(vehicle)}
          enableEmptySections
        />
      </View>
    );

    return domainMenuTemplate;
  }

  renderRow(vehicle) {
    return (
      <TouchableOpacity onPress={() => this.setActiveVehicle(vehicle.vin)}>
        <View
          style={[styles.listItem, (this.state.activeVin === vehicle.vin) && styles.activeVehicle]}
        >
          <Text style={styles.vehicleText}>{vehicle.ymm}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const domainMenuTemplate = this.renderDomainMenu();
    return domainMenuTemplate;
  }

}
