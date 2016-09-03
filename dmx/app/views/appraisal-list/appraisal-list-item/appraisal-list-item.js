import React, { PropTypes } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import commonStyles from '../../../common/styles/common.styles';
import DMXCOLORS from '../../../common/constants/colors';
import numeral from 'numeral';
import styles from './appraisal-list-item.styles';
import moment from 'moment';

export const AppraisalListItem = ({ appraisal, onPress }) => {
  const mileage = numeral(appraisal.mileage).format('0,0');
  const city = appraisal.dealer &&
    appraisal.dealer.address ?
    appraisal.dealer.address.city : 'N/A';
  const image = appraisal.media &&
    appraisal.media.length > 0 ?
    appraisal.media[0] : {};
  const bids = appraisal.bidRequestsMade &&
    appraisal.bidRequestsMade > 0 ?
    { spacer: '\u22C5', number: appraisal.bidRequestsMade, text: 'BIDS' } :
    { spacer: '', number: '', text: '' };
    // TODO: once test data is removed, swap:

  return (
    <TouchableHighlight onPress={onPress} underlayColor={DMXCOLORS.GREYLIGHT}>
      <View style={[commonStyles.listViewRow, styles.appraisalItemRow]}>
        <Image source={{ uri: image.thumb }} style={styles.thumbnail} />
        <View style={styles.textWrap}>
          <View>
            <Text style={styles.headerText}>
              {appraisal.generalInfo.make} {appraisal.generalInfo.model}
            </Text>
          </View>
          <Text
            style={styles.subHeaderText}
          >
            {moment(appraisal.dateCreated).fromNow()} {bids.spacer} {bids.number} {bids.text}
          </Text>
          <View>
            <Text style={styles.subHeaderText}>{mileage} miles {'\u22C5'} {city}</Text>
          </View>
        </View>
        <Text style={styles.advanceArrow}>{'\ue906'}</Text>
      </View>
    </TouchableHighlight>
  );
};

AppraisalListItem.propTypes = {
  appraisal: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default AppraisalListItem;
