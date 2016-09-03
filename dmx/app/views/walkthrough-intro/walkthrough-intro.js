import React, { PropTypes } from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import appraisalModel from '../../common/services/models/appraisal-model';
import dmxAppModel from '../../common/services/models/dmx-app-model';
import styles from './walkthrough-intro.styles';
import AppShell from '../../common/components/app-shell/app-shell';
import FullWidthButton from '../../common/components/full-width-button/full-width-button';

export default class WalkThroughIntro extends React.Component {

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
    };

    this.getStylePhotoUri = this.getStylePhotoUri.bind(this);
    this.findBestPhoto = this.findBestPhoto.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  getStylePhotoUri(edmundsInfo) {
    const edmundsApiPrefix = edmundsInfo.media && edmundsInfo.media.url || '';
    const stylePhotoPath = edmundsInfo.media && this.findBestPhoto(edmundsInfo.media);
    if (stylePhotoPath === '') {
      return '';
    }
    return `${edmundsApiPrefix}${stylePhotoPath}`;
  }

  async fetchData() {
    const vehicleInfo = await appraisalModel.getGeneralVehicleInfo();
    const { year, make, model, vin } = vehicleInfo;
    this.setState({
      year,
      make,
      model,
      vin,
    });

    const edmundsInfo = await dmxAppModel.getSelectedVehicleInfo();
    const stylePhotoUri = this.getStylePhotoUri(edmundsInfo);

    this.setState({
      imageUri: stylePhotoUri,
    });
  }

  findBestPhoto(media) {
    // TODO: verify there is an exact style match (photos sometimes includes other model years),
    // choose photo relative to device width
    if (media.data.photos.length > 0) {
      const closest = media.data.photos[0].sources.filter(photo => photo.size.width >= 300);
      return closest[0].link.href ||
        media.data.photos[0].sources[0].link.href ||
        '';
    }
    return '';
  }

  advanceToGroups() {
    const { year, make, model, vin, imageUri } = this.state;
    this.props.navigator.push({
      name: 'walkthrough-groups',
      data: {
        year,
        make,
        model,
        vin,
        imageUri,
      },
    });
  }

  render() {
    const { year, make, model, vin, imageUri } = this.state;
    return (
      <AppShell
        hasFooter={false}
        hasHeader
        headerText="Vehicle"
        headerShowLeftButton
        headerShowMenuButton
        navigator={this.props.navigator}
        route={this.props.route}
      >
        <View style={styles.container}>
          <View style={styles.vehicleInfoWrap}>
            <Text style={styles.vehicleInfoString}>
              {`${year} ${make} ${model}`}
            </Text>
            <Text style={styles.vinString}>
              {vin}
            </Text>
          </View>
          {
            imageUri === '' ?
              <View style={[styles.carImage, styles.noImage]}>
                <Text style={styles.explanationText}>{'No Image Available'}</Text>
              </View> :
              <Image
                source={{ uri: imageUri }}
                resizeMode={Image.resizeMode.contain}
                style={styles.carImage}
              />
          }
          <Text style={styles.explanationText}>
            You will be taken through a series of steps
            that will help you complete an appraisal.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <FullWidthButton
              buttonColor="GREY"
              buttonText="CANCEL"
              buttonIsActive
            />
          </View>
          <View style={styles.buttons}>
            <FullWidthButton
              buttonIsActive
              buttonAction={() => this.advanceToGroups()}
              buttonText="BEGIN APPRAISAL"
              buttonColor="BLUE"
            />
          </View>
        </View>
      </AppShell>
    );
  }

}
