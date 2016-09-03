import React, { PropTypes } from 'react';
import { Text, TextInput, View } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import CustomSettingsHeader
  from '../../common/components/custom-settings-header/custom-settings-header';
import manualVinEntryStyles from '../manual-vin-entry/manual-vin-entry.styles.js';
import summaryCommonStyles from '../summary/summary.styles';

export default class NotificationFilterEditName extends React.Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { route } = this.props;
    const { name } = route.data;
    this.state = {
      name,
    };
  }

  render() {
    const { name } = this.state;
    const { navigator } = this.props;
    return (
      <DmxAppShell
        hasFooter
        hasHeader={false}
        collapseEnabled
        buttonIsActive={this.state.buttonIsActive}
        navigator={navigator}
        buttonText="SAVE NAME"
      >
        <CustomSettingsHeader navigator={navigator} text="Rename Filter" />
        <View style={[manualVinEntryStyles.container]}>
          <View style={summaryCommonStyles.summaryItemBodyWrap}>
            <View style={manualVinEntryStyles.unitTextWrap}>
              <Text style={summaryCommonStyles.summaryItemBodyListItemLabel}>Name:</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="default"
                onChangeText={newName => this.setState({ name: newName })}
                onSubmitEditing={() => {}}
                returnKeyType="done"
                style={manualVinEntryStyles.input}
                value={name}
              />
            </View>
          </View>
        </View>
      </DmxAppShell>
    );
  }
}
