import React, { PropTypes } from 'react';
import { ScrollView } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import OptionsListview from '../../common/components/options-listview/options-listview';

export default class DmxVehicleEquipmentView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filterBy: 'equipment',
      nextView: 'options',
    };
  }

  render() {
    return (
      <DmxAppShell
        headerShowMenuButton
        hasFooter
        hasHeader
        buttonText="NEXT"
        toView="summary"
        buttonIsActive
        dataToPass={false}
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <ScrollView>
          <OptionsListview
            navigator={this.props.navigator}
            filterBy={this.state.filterBy}
            nextView={this.state.nextView}
          />
        </ScrollView>
      </DmxAppShell>
    );
  }
}
