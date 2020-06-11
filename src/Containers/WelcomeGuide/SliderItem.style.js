import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors} from './style';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * .6;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin;

const entryBorderRadius = 18;

export default StyleSheet.create({
  itemContainer: {
    borderRadius: 15,
    flexGrow: 1,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  textContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 28,
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  step: {
    textAlign: 'left',
    fontSize: 17,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
