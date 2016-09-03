import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import styles from './../summary.styles';
import SummarySection from '../summary-common/summary-section';

const SummaryCreated = props => (
  <SummarySection label="Created">
    <Text style={styles.summaryItemBodyListItemValue}>
      {moment(props.appraisal.dateCreated).fromNow()}
    </Text>
  </SummarySection>
);

SummaryCreated.propTypes = {
  appraisal: PropTypes.object.isRequired,
};

export default SummaryCreated;
