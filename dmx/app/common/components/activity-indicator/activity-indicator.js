import React, { PropTypes } from 'react';
import { View, Animated } from 'react-native';
import styles from './activity-indicator.styles';
import dmxLogo from '../../../assets/logo.png';

export default class ActivityIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      xDeg: new Animated.Value(0),
      yDeg: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity,
      {
        toValue: 1,
        duration: 200,
      }
    ).start();
    this.logoAnimate();
  }

  logoAnimate() {
    Animated.sequence([
      Animated.timing(this.state.xDeg,
        {
          toValue: 180,
          duration: 500,
        }
      ),
      Animated.timing(this.state.yDeg,
        {
          toValue: 180,
          duration: 500,
        }
      ),
      Animated.timing(this.state.xDeg,
        {
          toValue: 0,
          duration: 500,
        }
      ),
      Animated.timing(this.state.yDeg,
        {
          toValue: 0,
          duration: 500,
        }
      ),
    ]).start(() => this.logoAnimate());
  }

  render() {
    const backgroundStyle = this.props.orientation === 'LANDSCAPE'
      ? styles.landscapeBackground
      : styles.portraitBackground;
    const logoStyle = this.props.orientation === 'LANDSCAPE'
      ? styles.landscapeLogo
      : styles.portraitLogo;

    return (
      <Animated.View style={[backgroundStyle, { opacity: this.state.opacity }]}>
        <Animated.Image
          source={dmxLogo}
          style={[logoStyle, {
            transform: [
              { perspective: 120 },
              { rotateX: this.state.xDeg.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '-180deg'],
              }) },
              { rotateY: this.state.yDeg.interpolate({
                inputRange: [0, 180],
                outputRange: ['0deg', '-180deg'],
              }) },
            ],
          }]}
        />
      </Animated.View>
    );
  }
}

ActivityIndicator.propTypes = {
  orientation: PropTypes.string,
};
