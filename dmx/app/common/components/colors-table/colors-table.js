import React, { PropTypes } from 'react';
import { View, Image, TouchableOpacity, ListView } from 'react-native';
import styles from './colors-table.style';
import appDimensions from '../../constants/dimensions';
import _ from 'lodash';
const checkMarkBig = require('../../../assets/checkmark_big.png');

export const ColorsEntry = ({ entry, selectedIds, colorSelected, itemBounds }) => {
  const isSelected = selectedIds && selectedIds.indexOf(entry.id) !== -1;
  return (
    <TouchableOpacity onPress={() => colorSelected(entry)}>
      <View
        style={[
          styles.colorRenderer,
          { width: itemBounds, height: itemBounds },
          { backgroundColor: `#${entry.colorChips.primary.hex}` },
        ]}
      >
        {
          isSelected && <Image
            style={styles.colorCheckMark}
            source={checkMarkBig}
          />
        }
      </View>
    </TouchableOpacity>
  );
};

ColorsEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  selectedIds: PropTypes.array,
  colorSelected: PropTypes.func,
  itemBounds: PropTypes.number,
};

const ColorsRow = ({ entries, itemRenderer, elementsInRow, ...props }) => {
  const itemBounds = appDimensions.SCREEN_WIDTH / elementsInRow - 13;
  return (
    <View style={styles.colorRow}>
      {entries.map((entry, i) => {
        const entryProps = { entry, itemBounds, ...props };
        return (
          <View key={`color_${i}`}>
            {itemRenderer && itemRenderer(entryProps) || <ColorsEntry
              {...entryProps}
            />}
          </View>
        );
      })}
    </View>
  );
};

ColorsRow.propTypes = {
  entries: PropTypes.array.isRequired,
  itemRenderer: PropTypes.func,
  elementsInRow: PropTypes.number.isRequired,
};

const ColorsTable = ({ colors, ...props }) => {
  const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return (
    <ListView
      contentContainerStyle={styles.list}
      dataSource={dataSource.cloneWithRows(
        _.chunk(colors, props.elementsInRow)
      )}
      renderRow={entries => <ColorsRow
        {...props}
        entries={entries}
      />}
    />
  );
};

ColorsTable.propTypes = {
  colors: PropTypes.array,
  elementsInRow: PropTypes.number,
};

export default ColorsTable;
