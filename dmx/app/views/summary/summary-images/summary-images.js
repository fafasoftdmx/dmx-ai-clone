import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, Image, ScrollView, DeviceEventEmitter } from 'react-native';
import appraisalModel from '../../../common/services/models/appraisal-model';
import { default as summaryCommonStyles } from './../summary.styles';
import styles from './summary-images.styles';
import { SUMMARY_IMAGES_CAPTURED } from '../summary-events';
import arrowBluePng from '../../../assets/arrow-blue.png';

export default class SummaryImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.imagesCapturedListner = DeviceEventEmitter.addListener(
      SUMMARY_IMAGES_CAPTURED,
      () => this.fetchData()
    );
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateAppraisal) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.imagesCapturedListner.remove();
  }

  getSectionHeader() {
    if (this.props.componentIsDeactivated) {
      return (
        <View style={summaryCommonStyles.summaryItemHeaderWrap}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Images</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => this.advanceToView('capture')}>
        <View style={summaryCommonStyles.summaryItemHeaderWrap}>
          <Text style={summaryCommonStyles.summaryItemHeaderText}>Images</Text>
          <Image
            style={summaryCommonStyles.summaryItemHeaderArrow}
            source={arrowBluePng}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  }

  async advanceToView(toView) {
    const vehicleInfo = await appraisalModel.getGeneralVehicleInfo();
    this.props.navigator.push({
      name: toView,
      data: vehicleInfo,
    });
  }

  async fetchData() {
    const images = await appraisalModel.getMedia();
    this.setState({
      images,
    });
  }

  launchImageViewer(angle) {
    this.props.navigator.push({
      name: 'image-viewer',
      data: { angle },
    });
  }

  generateImageTemplate() {
    const { images } = this.state;
    const imageTemplates = [];
    if (images.length > 0) {
      images.map((image, i) => {
        imageTemplates.push(
          <View style={styles.vehicleImageWrap} key={i}>
            <TouchableOpacity onPress={() => this.launchImageViewer(image.angle)}>
              <Image
                source={{ uri: image.thumb }}
                style={styles.vehicleImage}
              />
            </TouchableOpacity>
          </View>
        );
        return false;
      });
    } else {
      imageTemplates.push(<Text key="0">Please capture vehicle photos.</Text>);
    }
    return imageTemplates;
  }

  render() {
    // TODO: Turn header into a component
    return (
      <View style={summaryCommonStyles.summaryItemWrap}>
        {this.getSectionHeader()}
        <ScrollView
          horizontal
          style={styles.summaryItemImagesWrap}
        >
          <View style={styles.vehicleImagesWrap}>
            {this.generateImageTemplate()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

SummaryImages.propTypes = {
  navigator: PropTypes.object,
  componentIsDeactivated: PropTypes.bool,
};
