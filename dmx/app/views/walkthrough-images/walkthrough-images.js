import React, { PropTypes } from 'react';
import {
  DeviceEventEmitter,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import _ from 'lodash';
import styles from './walkthrough-images.styles';
import DMXCOLORS from '../../common/constants/colors.js';
import appraisalModel from '../../common/services/models/appraisal-model';
import mobileCopyDeck from '../../common/services/mocks/mobile-copy-deck';
import AppShell from '../../common/components/app-shell/app-shell';
import VehicleDetail from '../../common/components/walkthrough-vehicle-detail';
import { SUMMARY_IMAGES_CAPTURED } from '../summary/summary-events';
import cameraIconAsset from '../../assets/camera.png';

export default class WalkthroughImages extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const mapAngles = () => {
      const mapAngle = (angleKey, angleData) => ({
        keyName: angleKey,
        tagName: angleData.value,
        source: false,
      });
      const vehicleTypeData = mobileCopyDeck.Sedan['camera-angles'];
      const angles = Object.keys(vehicleTypeData).map((key) => mapAngle(key, vehicleTypeData[key]));
      return angles;
    };
    const mappedAngles = mapAngles();

    this.state = {
      year: '',
      make: '',
      model: '',
      vin: '',
      images: [],
      mappedAngles,
    };
  }

  componentDidMount() {
    this.imagesCapturedListener = DeviceEventEmitter.addListener(
      SUMMARY_IMAGES_CAPTURED,
      () => this.fetchData()
    );
    this.fetchData();
  }

  componentWillUnmount() {
    this.imagesCapturedListener.remove();
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

    const images = await appraisalModel.getMedia();
    this.setState({
      images: images || [],
    });
  }

  launchImageCapture(angle) {
    this.props.navigator.push({
      name: 'capture',
      data: { angle },
    });
  }

  advanceToGroups() {
    this.props.navigator.pop();
  }

  renderAnglesByThrees(mappedAngles) {
    const angleRows = [];
    const byThrees = _.chunk(mappedAngles, 3);
    byThrees.map((angles, rowIndex) => {
      const thisRow = angles.map((angle, i) => this.renderAngleTemplate(angle, i));

      while (thisRow.length < 3) {
        thisRow.push(<View style={styles.angleWrap} key={thisRow.length} />);
      }

      angleRows.push(
        <View style={styles.angleRowWrap} key={rowIndex}>
          {thisRow}
        </View>
      );
      return false;
    });
    return angleRows;
  }

  renderAngleTemplate(angle, i) {
    const { images } = this.state;
    const existing = images.filter(img => img.angle === angle.keyName);
    const existingTemplate = () => (
      <View style={styles.vehicleImageWrap}>
        <Image
          source={{ uri: existing[0].thumb }}
          style={styles.vehicleImage}
        />
        <Text style={styles.angleNameText}>{angle.tagName.toUpperCase()}</Text>
      </View>
    );
    const takePhotoTemplate = () => (
      <View>
        <View style={styles.takePhotoWrap}>
          <Image source={cameraIconAsset} />
          <Text style={styles.takePhotoText}>TAKE PHOTO</Text>
        </View>
        <Text style={styles.angleNameText}>{angle.tagName.toUpperCase()}</Text>
      </View>
    );

    return (
      <TouchableHighlight
        underlayColor={DMXCOLORS.GREYLIGHT}
        onPress={() => this.launchImageCapture(angle.keyName)}
        style={styles.angleWrap}
        key={i}
      >
        {existing.length > 0 ? existingTemplate() : takePhotoTemplate()}
      </TouchableHighlight>
    );
  }

  render() {
    const { year, make, model, vin, mappedAngles, imageUri } = this.state;

    return (
      <AppShell
        hasFooter={false}
        hasHeader
        headerText="Appraisal Progress"
        headerShowLeftButton
        headerShowMenuButton
        collapseEnabled
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
          <View style={styles.imagesSectionWrap}>
            <View style={styles.imagesHeaderWrap}>
              <Text style={styles.imagesHeaderText}>IMAGES</Text>
            </View>
            <View style={styles.scrollWrap}>
              <ScrollView>
                <View style={styles.imagesWrap}>
                  {this.renderAnglesByThrees(mappedAngles)}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </AppShell>
    );
  }

}
