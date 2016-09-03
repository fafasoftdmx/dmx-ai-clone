import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, Animated, View } from 'react-native';
import styles from './appraisal-list-menu.styles';
import DMXCOLORS from '../../../common/constants/colors';

export default class AppraisalListMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuHeight: new Animated.Value(0),
      menuOpen: false,
      selectedItem: '',
    };
  }

  selectItem(name) {
    this.props.onSelectItem(name);
    this.setState({ menuOpen: false, selectedItem: name }, () => {
      Animated.timing(this.state.menuHeight,
        {
          toValue: 0,
          duration: 200,
        }
      ).start();
    });
  }

  toggleMenu() {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false }, () => {
        Animated.timing(this.state.menuHeight,
          {
            toValue: 0,
            duration: 200,
          }
        ).start();
      });
    } else {
      this.setState({ menuOpen: true }, () => {
        Animated.timing(this.state.menuHeight,
          {
            toValue: 120,
            duration: 200,
          }
        ).start();
      });
    }
  }

  render() {
    return (
      <View style={styles.menuWrap}>
        <TouchableHighlight
          style={[styles.menuItem, styles.selectedMenuItem]}
          onPress={() => this.toggleMenu()}
          underlayColor="#FFFFFF"
        >
          <View style={styles.menuItemTextWrap}>
            <Text style={[styles.menuItemText, styles.selectedMenuItemText]}>
              {this.props.selectedItem}
            </Text>
            <Text style={styles.menuArrow}>
              {this.state.menuOpen ? '\u25B2' : '\u25BC'}
            </Text>
          </View>
        </TouchableHighlight>
        {!this.state.menuOpen ? <View /> :
          <Animated.View
            style={[styles.menuDropDown, { height: this.state.menuHeight }]}
          >
            {
              this.props.items
              .filter((name) => name !== this.props.selectedItem)
              .map((name, i) =>
                (<TouchableHighlight
                  key={i}
                  onPress={() => this.selectItem(name)}
                  style={styles.menuItem}
                  underlayColor={DMXCOLORS.GREYLIGHT}
                >
                  <Text style={styles.menuItemText}>{name}</Text>
                </TouchableHighlight>)
              )
            }
          </Animated.View>
        }
      </View>
    );
  }
}

AppraisalListMenu.propTypes = {
  items: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func,
  selectedItem: PropTypes.string.isRequired,
};
