import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import _ from 'lodash';
import appraisalModel from '../../../common/services/models/appraisal-model';
import appDimensions from '../../../common/constants/dimensions';
import mobileCopyDeck from '../../../common/services/mocks/mobile-copy-deck';
import Orientation from 'react-native-orientation';
import styles from './image-viewer.styles.js';

export default class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      captionIsVisible: true,
      activeImage: {
        angle: '',
        page: 0,
      },
    };
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
  }

  componentWillMount() {
    Orientation.lockToLandscapeLeft();
  }

  componentDidMount() {
    this.fetchData();
  }

  onMomentumScrollEnd(e) {
    const activeImage = e.nativeEvent.contentOffset.x / appDimensions.SCREEN_HEIGHT;
    const activeImageState = {
      angle: this.state.images[activeImage].angle,
      page: activeImage + 1,
    };

    this.setState({
      activeImage: activeImageState,
    });
  }

  getBackButton() {
    return (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => this.backToSummaryView()}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonText}>{'\u2715'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  getPrettyAngleName(angleName) {
    let anglePrettyName = angleName;

    _.map(mobileCopyDeck, (vehicleCategory) => {
      _.map(vehicleCategory['camera-angles'], (value, key) => {
        if (angleName === key) {
          anglePrettyName = value.value;
        }
      });
    });

    return anglePrettyName ? anglePrettyName.toUpperCase() : anglePrettyName;
  }

  setActiveAngle() {
    const { route } = this.props;
    if (route && route.data && route.data.angle) {
      const imageIndex = this.checkImageIndex(route.data.angle);
      this.refs.imageViewer.scrollTo({
        x: imageIndex * appDimensions.SCREEN_HEIGHT,
        y: 0,
        animated: true,
      });
      this.setState({
        activeImage: {
          angle: route.data.angle,
          page: imageIndex + 1,
        },
      });
    } else {
      this.setState({
        activeImage: {
          angle: this.state.images[0].angle,
          page: 1,
        },
      });
    }
  }

  backToSummaryView() {
    this.props.navigator.pop();
  }

  checkImageIndex(angleName) {
    const images = this.state.images;
    let imgKey;

    images.map((img, key) => {
      if (img.angle === angleName) {
        imgKey = key;
      }
      return false;
    });

    return imgKey;
  }

  async fetchData() {
    const images = await appraisalModel.getMedia();
    this.setState({
      images,
    }, () => this.setActiveAngle());
  }

  render() {
    // snapToInterval={appDimensions.SCREEN_WIDTH}
    // snapToAlignment="center"
    return (
      <View style={styles.scrollViewWrap}>
        <ScrollView
          ref="imageViewer"
          style={styles.imageViewerScrollView}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          directionalLockEnabled
          scrollToTop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        >
          {
            this.state.images.map((image, key) => (
              <View key={key} style={styles.imageWrap}>
                <View style={styles.imageViewerInnerWrap}>
                  <Image
                    source={{ uri: image.medium }}
                    style={styles.image}
                    resizeMode={Image.resizeMode.contain}
                  />
                </View>
              </View>
            ))
          }
        </ScrollView>
        <View style={styles.captionWrap}>
          <Text style={styles.captionText}>
            {this.getPrettyAngleName(this.state.activeImage.angle)}
          </Text>
          <Text style={styles.imagePagination}>
            {this.state.activeImage.page} / {this.state.images.length}
          </Text>
        </View>
        {this.getBackButton()}
      </View>
    );
  }
}

ImageViewer.propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object,
};
