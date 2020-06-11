/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, StatusBar, SafeAreaView, Image} from 'react-native';
import {Container} from 'native-base';
import logo from '../../../assets/logo.png';
import Carousel from 'react-native-snap-carousel';
import styles from './style';
import SliderItem from './SliderItem';
import {sliderWidth, itemWidth} from './SliderItem.style';
import Button from '../../../Component/Shared/Button';

const ENTRIES1 = [
  {
    title: 'Hoşgeldiniz',
    text: 'Başlamadan önce bazı önemli konulara değinmemizde fayda var, Fazla zamanını almayacağız. Başlamak için SAĞA KAYDIR.',
    step: 'Başla',
  },
  {
    title: 'Alakasız Cevaplar Vermeyin',
    text: 'Başlamadan önce bazı önemli konulara değinmemizde fayda var, Fazla zamanını almayacağız. Başlamak için SAĞA KAYDIR.',
    step: '1',
  },
  {
    title: 'Spam Yapmayın',
    text: 'Başlamadan önce bazı önemli konulara değinmemizde fayda var, Fazla zamanını almayacağız. Başlamak için SAĞA KAYDIR.',
    step: '2',
  },
  {
    title: 'Küfür Etmeyin',
    text: 'Başlamadan önce bazı önemli konulara değinmemizde fayda var, Fazla zamanını almayacağız. Başlamak için SAĞA KAYDIR.',
    step: '3',
  },
  {
    title: 'Saygılı Olun',
    text: 'Başlamadan önce bazı önemli konulara değinmemizde fayda var, Fazla zamanını almayacağız. Başlamak için SAĞA KAYDIR.',
    step: 'Bitti',
  }
];

class welcomeGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  _renderItem = ({item, index}) => {
    return <SliderItem data={item} />;
  };

  _skipGuide = () => {
    this.props.navigation.push('SearchMain');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
        <View style={styles.exampleContainer}>
          <Carousel
            ref={c => this._slider1Ref = c}
            data={ENTRIES1}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loopClonesPerSide={2}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
        </View>
        <View style={styles.buttonContainer}>
          {this.state.activeSlide === 4 ? (
            <Button
              borderWidth={1}
              borderColor={'#dedede'}
              action={() => this._skipGuide()}>
              DEVAM ET
            </Button>
          ) : (
            <Button
              colors={['#ffffff', '#ffffff']}
              borderWidth={1}
              borderColor={'#dedede'}
              fontColor={'#f5316f'}
              action={() => this._skipGuide()}>
              TANITIMI GEÇ
            </Button>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default welcomeGuide;
