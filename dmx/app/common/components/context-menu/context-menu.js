import React, { View, ListView } from 'react-native';
import Rx from 'rx';
import appState from '../../services/mocks/app-state-mock.json';
import styles from './context-menu.styles';

export default class DmxContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      appState,
      activeVin: 'WBAWV53568P078170',
    };
  }

  buildContextMenu() {
        // get active vehicle object
    const activeVehicles$ = Rx.Observable.from(appState.vehicles);
    activeVehicles$.subscribe(() => {});

    const contextMenuTemplate = (
      <View style={styles.menuWrap} />
    );

    return contextMenuTemplate;
  }
  render() {
    const contextMenuTemplate = this.buildContextMenu();
    return contextMenuTemplate;
  }
}
