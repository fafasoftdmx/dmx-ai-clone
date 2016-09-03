import React, { PropTypes } from 'react';
import { Modal, View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './modal.styles';
import dmxLogo from '../../../assets/logo.png';

export default class DmxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent
        visible={this.props.modalVisible}
        onRequestClose={() => { this.props.onClose(this.props.content.toView); }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.innerContainerTextWrapper}>
              <Image style={styles.permissionsIcon} source={dmxLogo} resizeMode="contain" />
              <Text style={styles.modalHeaderText}>{this.props.content.headerText}</Text>
              <Text style={styles.modalBodyText}>{this.props.content.bodyText}</Text>
              <Text style={styles.modalBodyText}>{this.props.content.ctaText}</Text>
            </View>
            <View style={styles.modalButtonWrapper}>
              <TouchableOpacity onPress={() => this.props.handlePressSecondary()}>
                <View style={[styles.modalButton, styles.modalButtonSecondary]}>
                  <Text style={styles.modalButtonSecondaryText}>
                    {this.props.content.secondaryBtnText}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.handlePressPrimary(this.props.content.type)}
              >
                <View style={[styles.modalButton, styles.modalButtonPrimary]}>
                  <Text style={styles.modalButtonPrimaryText}>
                    {this.props.content.primaryBtnText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

DmxModal.propTypes = {
  content: PropTypes.shape({
    headerText: PropTypes.string,
    bodyText: PropTypes.string,
    ctaText: PropTypes.string,
    primaryBtnText: PropTypes.string,
    secondaryBtnText: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    toView: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
  handlePressPrimary: PropTypes.func.isRequired,
  handlePressSecondary: PropTypes.func.isRequired,
  animationType: PropTypes.string,
  modalVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

DmxModal.defaultProps = {
  animationType: 'slide',
  modalVisible: false,
};
