import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Switch, ScrollView } from 'react-native';
import update from 'react-addons-update';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import searchAgentsJson from '../../common/services/mocks/search-agents-mock.json';
import styles from './profile-search-agents.styles';

export default class ProfileSearchAgentsView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchAgents: searchAgentsJson.searchAgents,
    };
  }

  changeAgentStatus(key) {
    const isActive = !this.state.searchAgents[key].isActive;
    const searchAgents = update(
      this.state.searchAgents,
      {
        [key]: {
          $merge: { isActive },
        },
      }
    );
    this.setState({ searchAgents });
  }

  advanceToView(view, vehicle) {
    this.props.navigator.push({
      name: view,
      agent: vehicle,
    });
  }

  render() {
    return (
      <DmxAppShell
        route={this.props.route}
        hasHeader
        headerShowLeftButton
        headerShowRightButton={false}
      >
        <ScrollView style={styles.searchAgentsPageWrap}>
          <View style={styles.searchAgentsWrap}>
            <View style={styles.addSearchAgentWrap}>
              <TouchableOpacity onPress={() => this.advanceToView('profile-add-search-agent')}>
                <Text style={styles.addSearchAgentText}>+ Add New Search Agent</Text>
              </TouchableOpacity>
            </View>
            {
              this.state.searchAgents.map((agent, key) => (
                <View key={key} style={[styles.summaryItemHeaderWrap, styles.switchItem]}>
                  <View style={styles.leftAlign}>
                    <TouchableOpacity
                      onPress={() => this.advanceToView('profile-add-search-agent', agent)}
                    >
                      <Text style={styles.summaryItemHeaderText}>
                        {agent.year} {agent.make} {agent.model}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Switch
                    value={agent.isActive}
                    onValueChange={() => this.changeAgentStatus(key)}
                  />
                </View>
              ))
            }
          </View>
        </ScrollView>
      </DmxAppShell>
    );
  }
}
