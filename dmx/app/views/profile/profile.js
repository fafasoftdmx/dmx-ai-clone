import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Image, Switch } from 'react-native';
import DmxAppShell from '../../common/components/app-shell/app-shell';
import styles from './profile.styles';

const arrowBlueAsset = require('../../assets/arrow-blue.png');

export default class ProfileView extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        profilePicUrl: 'http://icons.iconarchive.com/icons/graphicloads/business/512/profile-icon.png',
        firstName: 'EVAN',
        lastName: 'ROSE',
        phoneNumber: '(999) 999-9999',
        notificationStatus: true,
      },
    };
  }

  advanceToView(view) {
    this.props.navigator.push({
      name: view,
    });
  }

  changeNotificationStatus(value) {
    console.log('value of toggle in profile is', value);
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        notificationStatus: value,
      },
    });
  }

  render() {
    return (
      <DmxAppShell
        navigator={this.props.navigator}
        route={this.props.route}
        hasHeader
        headerShowLeftButton
        headerShowMenuButton
        headerShowRightButton={false}
      >
        <View style={styles.loginPageWrap}>
          <View style={styles.imageSection}>
            <View style={styles.imageSectionBg} />
            <View style={styles.imageSectionImageWrap}>
              <Image
                style={styles.imageSectionImage}
                source={{ uri: this.state.userProfile.profilePicUrl }}
              />
            </View>
            <View style={styles.profileSimpleDetails}>
              <Text
                style={styles.userName}
              >
                {this.state.userProfile.firstName} {this.state.userProfile.lastName}
              </Text>
              <Text style={styles.userPhoneNumber}>
                {this.state.userProfile.phoneNumber}
              </Text>
            </View>
          </View>
          <View style={styles.profileBodySection}>
            <TouchableOpacity onPress={() => this.advanceToView('profile-edit')}>
              <View style={[styles.summaryItemHeaderWrap, styles.switchItem]}>
                <Text style={styles.summaryItemHeaderText}>Profile</Text>
                <Switch
                  value={this.state.userProfile.notificationStatus}
                  onValueChange={(value) => this.changeNotificationStatus(value)}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.advanceToView('profile-search-agents')}>
              <View style={styles.summaryItemHeaderWrap}>
                <Text style={styles.summaryItemHeaderText}>Manage Search Agents</Text>
                <Image
                  style={styles.summaryItemHeaderArrow}
                  source={arrowBlueAsset}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.summaryItemHeaderWrap}>
              <Text style={styles.summaryItemHeaderText}>Profile Item 3</Text>
              <Image
                style={styles.summaryItemHeaderArrow}
                source={arrowBlueAsset}
                resizeMode="contain"
              />
            </View>
            <View style={styles.summaryItemHeaderWrap}>
              <Text style={styles.summaryItemHeaderText}>Profile Item 4</Text>
              <Image
                style={styles.summaryItemHeaderArrow}
                source={arrowBlueAsset}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </DmxAppShell>
    );
  }
}
