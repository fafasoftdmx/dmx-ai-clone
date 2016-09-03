import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import SummarySection from '../../summary/summary-common/summary-section';
import SummarySectionHeader from '../../summary/summary-common/summary-section-header';
import styles from './notification-filter-summary-general.styles';

const NotificationFilterSummaryGeneral = ({ name }) => (
  <View>
    <SummarySectionHeader>General*</SummarySectionHeader>
    <SummarySection label="FILTER NAME">
      <Text style={styles.filterNameLabel}>
        {name}
      </Text>
    </SummarySection>
  </View>
);

NotificationFilterSummaryGeneral.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NotificationFilterSummaryGeneral;
