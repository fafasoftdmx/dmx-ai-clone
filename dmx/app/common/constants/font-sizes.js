import { PixelRatio } from 'react-native';
const pixelRatio = PixelRatio.get();
const linearComponent = pixelRatio * 2;

const fontSizes = {
  body: 13 + linearComponent,
  h1: 19 + linearComponent,
  h2: 17 + linearComponent,
  h3: 15 + linearComponent,
  h4: 14 + linearComponent,
  small: 11 + linearComponent,
  xsmall: 9 + linearComponent,
  getScaledSize: (size) => size + linearComponent,
};

export default fontSizes;
