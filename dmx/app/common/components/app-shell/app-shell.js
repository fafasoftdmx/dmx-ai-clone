import React, { PropTypes } from 'react';
import { View } from 'react-native';
import CollapsableView from '../../components/collapsable-view/collapsable-view';
import Drawer from 'react-native-drawer';
import DrawerMenu from '../drawer-menu/drawer-menu';
import DmxHeader from '../header/header';
import DmxFooter from '../footer/footer';
import commonStyles from '../../styles/common.styles';
import styles from './app-shell.style';
import OverlayWrapper from '../overlay-wrapper/selector-modal-wrapper';

export default class DmxAppShell extends React.Component {

  static propTypes = {
    hasFooter: PropTypes.bool,
    hasHeader: PropTypes.bool,
    leftButtonAction: PropTypes.func,
    navigator: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    collapseEnabled: PropTypes.bool,
    overlayView: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  buildFooterTemplate() {
    return (
      <DmxFooter {...this.props} />
    );
  }

  buildHeaderTemplate() {
    return (
      <DmxHeader
        leftButtonAction={this.props.leftButtonAction}
        leftBtnIcon="arrow.png"
        rightBtnIcon="voice-icon.png"
        navigator={this.props.navigator}
        toggleDrawer={() => this.toggleDrawer()}
        {...this.props}
      />
    );
  }

  toggleDrawer() {
    if (this.state.drawerOpen) {
      this.drawer.close();
      this.setState({
        drawerOpen: false,
      });
    } else {
      this.drawer.open();
      this.setState({
        drawerOpen: true,
      });
    }
  }

  render() {
    const footerTemplate = this.props.hasFooter ? this.buildFooterTemplate() : false;
    const headerTemplate = this.props.hasHeader ? this.buildHeaderTemplate() : false;
    const menuContent = <DrawerMenu navigator={this.props.navigator} />;
    const { overlayView } = this.props;
    return (
      <Drawer
        ref={ref => { this.drawer = ref; }}
        type="static"
        content={menuContent}
        acceptPan={false}
        tapToClose
        side="right"
        openDrawerOffset={0.2}
        closedDrawerOffset={0}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <View style={styles.contentWrapper}>
          <CollapsableView collapseEnabled={this.props.collapseEnabled}>
            <OverlayWrapper overlayView={overlayView}>
              {headerTemplate}
              <View style={commonStyles.innerContainer}>
                {this.props.children}
              </View>
              {footerTemplate}
            </OverlayWrapper>
          </CollapsableView>
        </View>
      </Drawer>
    );
  }
}
