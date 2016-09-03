import React, { PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import update from 'react-addons-update';
import Camera from 'react-native-camera';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import appraisalModel from '../../common/services/models/appraisal-model';
import mobileCopyDeck from '../../common/services/mocks/mobile-copy-deck';
import styles from './capture.styles.js';
import DMXCOLORS from '../../common/constants/colors';
import ImageResizeManager from '../../common/services/images/ImageResizeManager';
import { SUMMARY_IMAGES_CAPTURED } from '../summary/summary-events';
const SCREENHEIGHT = Dimensions.get('window').height;
const IMAGESIZE = 1024;

export default class DmxCaptureView extends React.Component {
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
      mappedAngles,
      imageInventory: mappedAngles,
      imageTypeSelected: mappedAngles[0].keyName,
      imageSelectedIndex: 0,
      imageTypePictureSource: false,
      torchMode: Camera.constants.TorchMode.on,
      isLoading: true,
    };

    this.renderCameraTemplate = this.renderCameraTemplate.bind(this);
    this.getCategoryScroll = this.getCategoryScroll.bind(this);
    this.getPreviewTemplate = this.getPreviewTemplate.bind(this);
    this.getCaptureButton = this.getCaptureButton.bind(this);
    this.getBackButton = this.getBackButton.bind(this);
    this.getTorchButton = this.getTorchButton.bind(this);
    this.getRetakeButton = this.getRetakeButton.bind(this);
  }

  componentWillMount() {
    Orientation.lockToLandscapeLeft();
  }

  componentDidMount() {
    const { route } = this.props;
    if (route && route.data && route.data.angle) {
      this.selectImageType(route.data.angle);
    }
  }

  getBackButton() {
    return (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => this.goBack()}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>{'\u2715'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  getTorchButton() {
    return (
      <View style={styles.torchButtonContainer}>
        <TouchableOpacity onPress={() => this.toggleTorch()}>
          <View style={styles.torchButton}>
            <Icon
              name={
                this.state.torchMode === Camera.constants.TorchMode.on
                ? 'flash-off'
                : 'flash-on'
              }
              size={25}
              color={DMXCOLORS.GREYDARK}
              style={styles.torchIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  getCaptureButton() {
    return (
      <View style={styles.captureBtnContainer}>
        <TouchableOpacity onPress={() => this.takePicture()}>
          <View style={styles.captureBtnOuter}>
            <View style={styles.captureBtnInner} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  getRetakeButton() {
    return (
      <TouchableOpacity style={styles.actionBtnWrap} onPress={() => this.retakePicture()}>
        <View style={styles.retakeBtn}>
          <Text style={styles.retakeBtnText}>RETAKE</Text>
        </View>
      </TouchableOpacity>
    );
  }

  getCategoryScroll() {
    return (
      <View style={styles.bodyWrap}>
        <View style={styles.imageTypeBackground}>
          <View style={styles.imageType} />
        </View>
        <ScrollView
          contentOffset={{ x: -(SCREENHEIGHT / 3.3), y: 0 }}
          horizontal
          style={styles.imageTypeSelectorWrap}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref="imageSelectorScrollView"
        >
        {
          this.state.imageInventory.map((image, i) => {
            const isSelected = this.state.imageTypeSelected === image.keyName;
            return (
              <TouchableOpacity
                onPress={() => this.selectImageType(image.keyName)}
                style={[styles.imageTypeSelection, isSelected && styles.activeImage]}
                key={i}
              >
                <Text
                  key={i}
                  style={[
                    styles.imageTypeText,
                    isSelected && styles.imageTypeTextSelected,
                    image.source && styles.hasImage]}
                >
                  {image.tagName.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })
        }
        </ScrollView>
      </View>
    );
  }

  getImgTypeIdx() {
    let imgTypeIdx;
    this.state.imageInventory.map((img, key) => {
      if (img.keyName === this.state.imageTypeSelected) {
        imgTypeIdx = key;
      }
      return false;
    });
    return imgTypeIdx;
  }

  getPreviewTemplate(imgTypeIdx) {
    return (
      <View style={styles.imagePreviewWrap}>
        <Image
          style={styles.imagePreview}
          resizeMode="cover"
          source={{ uri: this.state.imageInventory[imgTypeIdx].source }}
        />
      </View>
    );
  }

  handleZoom() {
    // console.log('zoom event data: velocity is ', event.nativeEvent.velocity);
    // console.log('zoom event data: zoomfactor is ', event.nativeEvent.zoomFactor);
  }

  goBack() {
    Orientation.lockToPortrait();
    DeviceEventEmitter.emit(SUMMARY_IMAGES_CAPTURED);
    this.props.navigator.pop();
  }

  toggleTorch() {
    this.setState({
      torchMode: this.state.torchMode === Camera.constants.TorchMode.on
          ? Camera.constants.TorchMode.off
          : Camera.constants.TorchMode.on,
    });
  }

  retakePicture() {
    const imgTypeIdx = this.getImgTypeIdx();
    const newState = update(this.state.imageInventory, {
      [imgTypeIdx]: {
        source: { $set: false },
      },
    });
    // TODO: REMOVE IMAGE FROM ASYNCSTORAGE AND APP MODEL
    this.setState({
      imageInventory: newState,
    });
  }

  scrollToSelected(keyName) {
    let i = 0;
    for (let l = this.state.imageInventory.length; i < l; i++) {
      if (this.state.imageInventory[i].keyName === keyName) {
        break;
      }
    }

    this.setState({
      imageSelectedIndex: i,
    });

    const itemWidth = (SCREENHEIGHT / 2.5);
    const xPos = (itemWidth * i) - (SCREENHEIGHT / 3.3);
    this.refs.imageSelectorScrollView.scrollTo({ x: xPos, y: 0, animated: true });
  }

  selectImageType(type) {
    let imageSelectedIndex = 0;
    for (let i = 0; i < this.state.mappedAngles.length; i++) {
      if (type === this.state.mappedAngles[i].keyName) {
        imageSelectedIndex = i;
        break;
      }
    }

    const selectedImage = { keyName: type };
    this.setState({
      imageTypeSelected: type,
      imageSelectedIndex,
    });
    this.scrollToSelected(selectedImage.keyName);
  }

  selectNextImage() {
    const { imageSelectedIndex, mappedAngles } = this.state;
    if (imageSelectedIndex < mappedAngles.length - 1) {
      this.setState({
        imageSelectedIndex: (imageSelectedIndex + 1),
      }, () => {
        const nextImage = mappedAngles[this.state.imageSelectedIndex];
        this.selectImageType(nextImage.keyName);
      });
    }
  }

  takePicture() {
    const { imageTypeSelected, imageInventory } = this.state;

    this.camera.capture().then((data) => {
      imageInventory.map((item, i) => {
        if (item.keyName === imageTypeSelected) {
          const newState = update(imageInventory, {
            [i]: {
              source: { $set: data.path },
            },
          });

          this.setState({ imageInventory: newState }, () => {
            ImageResizeManager.resizeImageInFile(
              data.path,
              { width: IMAGESIZE, height: IMAGESIZE }
            ).then(() => appraisalModel.saveMedia(data.path, imageTypeSelected),
              // appraisalModel.update();
              (err) => { throw err; }
            ).then(() => this.selectNextImage(), (err) => { throw err; });
          });
        }
        return false;
      });
    })
    .catch((err) => { throw err; });
  }

  renderCameraTemplate() {
    const imgTypeIdx = this.getImgTypeIdx();
    const imageSelected = this.state.imageTypeSelected ===
      this.state.imageInventory[imgTypeIdx].keyName &&
      this.state.imageInventory[imgTypeIdx].source;

    return (
      <View>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          torchMode={this.state.torchMode}
          onZoomChanged={this.handleZoom}
        />
        <View style={styles.uiLevel}>
          {imageSelected && this.getPreviewTemplate(imgTypeIdx)}
          {this.getCategoryScroll()}
          {imageSelected && this.getRetakeButton()}
          {!imageSelected && this.getCaptureButton()}
          {this.getBackButton()}
          {this.getTorchButton()}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCameraTemplate()}
      </View>
    );
  }
}

DmxCaptureView.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
