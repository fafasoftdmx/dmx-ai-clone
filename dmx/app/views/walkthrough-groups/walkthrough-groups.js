import React, { PropTypes } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import appraisalModel from '../../common/services/models/appraisal-model';
import * as validator from '../../common/services/models/appraisal-validator';
import styles from './walkthrough-groups.styles';
import DMXCOLORS from '../../common/constants/colors.js';
import AppShell from '../../common/components/app-shell/app-shell';
import FullWidthButton from '../../common/components/full-width-button/full-width-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import WalkthroughMileage from '../walkthrough-mileage/walkthrough-mileage';
import WalkthroughAcv from '../walkthrough-acv/walkthrough-acv';
import VehicleDetail from '../../common/components/walkthrough-vehicle-detail';

export default class WalkthroughGroups extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      vin: '',
      mileageStatus: '',
      acvStatus: '',
      colorsStatus: '',
      imagesStatus: '',
      optionsStatus: '',
      ratingsStatus: '',
      mileageModalVisible: false,
      acvModalVisible: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { year, make, model, vin, imageUri } = this.props.route.data;
    this.setState({
      year,
      make,
      model,
      vin,
      imageUri,
    });
  }

  advanceToView(view) {
    const { year, make, model, vin, imageUri } = this.state;
    this.props.navigator.push({
      name: view,
      data: {
        year,
        make,
        model,
        vin,
        imageUri,
      },
      newAppraisal: true,
    });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  async validate() {
    const appraisal = await appraisalModel.getCurrentAppraisal();
    let isValid = true;
    if (!validator.mileageComplete(appraisal)) {
      isValid = false;
      this.setState({ mileageStatus: 'invalid' });
    }
    if (!validator.colorsComplete(appraisal)) {
      isValid = false;
      this.setState({ colorsStatus: 'invalid' });
    }
    if (!validator.imagesComplete(appraisal)) {
      isValid = false;
      this.setState({ imagesStatus: 'invalid' });
    }
    if (!validator.ratingsComplete(appraisal)) {
      isValid = false;
      this.setState({ ratingsStatus: 'invalid' });
    }
    if (isValid) {
      this.setState({
        mileageStatus: '',
        acvStatus: '',
        colorsStatus: '',
        imagesStatus: '',
        optionsStatus: '',
        ratingsStatus: '',
      });
      this.advanceToView('summary');
    }
  }

  render() {
    const {
      year,
      make,
      model,
      vin,
      imageUri,
      mileageStatus,
      colorsStatus,
      imagesStatus,
      ratingsStatus,
    } = this.state;

    return (
      <AppShell
        hasFooter={false}
        hasHeader
        headerText="Appraisal Progress"
        headerShowLeftButton
        headerShowMenuButton
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.detailWrap}>
            <VehicleDetail
              year={String(year)}
              make={make}
              model={model}
              vin={vin}
              imageUri={imageUri}
            />
          </View>
          <View style={styles.groups}>
            <TouchableHighlight
              underlayColor={DMXCOLORS.GREYLIGHT}
              onPress={() => this.setState({ mileageModalVisible: true })}
              style={styles.groupItemTouchable}
            >
              <View style={styles.groupItemWrap}>
                {
                  mileageStatus === 'invalid' &&
                    <Icon
                      name="exclamation-circle"
                      size={20}
                      color={DMXCOLORS.RED}
                      style={styles.errorIcon}
                    />
                }
                <View style={styles.groupItem}>
                  <Text style={styles.groupItemText}>
                    MILEAGE
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={DMXCOLORS.GREYLIGHT}
              onPress={() => {
                this.advanceToView('walkthrough-colors');
                this.setState({ colorsStatus: '' });
              }}
              style={styles.groupItemTouchable}
            >
              <View style={styles.groupItemWrap}>
                {
                  colorsStatus === 'invalid' &&
                    <Icon
                      name="exclamation-circle"
                      size={20}
                      color={DMXCOLORS.RED}
                      style={styles.errorIcon}
                    />
                }
                <View style={styles.groupItem}>
                  <Text style={styles.groupItemText}>
                    COLORS
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={DMXCOLORS.GREYLIGHT}
              onPress={() => {
                this.advanceToView('walkthrough-images');
                this.setState({ imagesStatus: '' });
              }}
              style={styles.groupItemTouchable}
            >
              <View style={styles.groupItemWrap}>
                {
                  imagesStatus === 'invalid' &&
                    <Icon
                      name="exclamation-circle"
                      size={20}
                      color={DMXCOLORS.RED}
                      style={styles.errorIcon}
                    />
                }
                <View style={styles.groupItem}>
                  <Text style={styles.groupItemText}>
                    IMAGES
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.groups}>
            <TouchableHighlight
              underlayColor={DMXCOLORS.GREYLIGHT}
              onPress={() => {
                this.advanceToView('walkthrough-options');
                this.setState({ optionsStatus: '' });
              }}
              style={styles.groupItemTouchable}
            >
              <View style={styles.groupItem}>
                <Text style={styles.groupItemText}>
                  OPTIONS
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={DMXCOLORS.GREYLIGHT}
              onPress={() => {
                this.advanceToView('walkthrough-ratings');
                this.setState({ ratingsStatus: '' });
              }}
              style={styles.groupItemTouchable}
            >
              <View style={styles.groupItemWrap}>
                {
                  ratingsStatus === 'invalid' &&
                    <Icon
                      name="exclamation-circle"
                      size={20}
                      color={DMXCOLORS.RED}
                      style={styles.errorIcon}
                    />
                }
                <View style={styles.groupItem}>
                  <Text style={styles.groupItemText}>
                    RATINGS
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={DMXCOLORS.GREYLIGHT}
              onPress={() => this.setState({ acvModalVisible: true })}
              style={styles.groupItemTouchable}
            >
              <View style={styles.groupItem}>
                <Text style={styles.groupItemText}>
                  YOUR ACV
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View>
          <FullWidthButton
            buttonIsActive
            buttonAction={() => this.validate()}
            buttonText="REVIEW"
            buttonColor="BLUE"
          />
        </View>
        <WalkthroughMileage
          closeModal={() => this.setState({ mileageModalVisible: false, mileageStatus: '' })}
          visible={this.state.mileageModalVisible}
        />
        <WalkthroughAcv
          closeModal={() => this.setState({ acvModalVisible: false })}
          visible={this.state.acvModalVisible}
        />
      </AppShell>
    );
  }

}
