import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './SliderItem.style';
import LinearGradient from 'react-native-linear-gradient';

export default class SliderEntry extends Component {
  render() {
    const {title, text, step} = this.props.data;

    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        colors={['#f5316f', '#ff7b42']}
        style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.step}>{step}/4</Text>
        </View>
      </LinearGradient>
    );
  }
}
