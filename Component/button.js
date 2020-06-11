/* eslint-disable react/self-closing-comp */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Input,
  Item,
  Content,
  Card,
  CardItem,
} from 'native-base';
import styles from '../styles/styles';
import {FlatGrid} from 'react-native-super-grid';
import FullWidthImage from 'react-native-fullwidth-image';
import Video from 'react-native-video';

const ustBar = require('../assets/talk/ustbar.png');
const kizlar = require('../assets/talk/kizlar.png');
const bosprofildolu = require('../assets/talk/bosprofildolu.png');
const cizgi = require('../assets/talk/cizgi.png');
const cips = require('../assets/talk/cips.png');
const et = require('../assets/talk/et.png');
const makarna = require('../assets/talk/makarna.png');
const sambali = require('../assets/talk/sambali.png');

export const button = (text, nav, props, img, col) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.push(nav)}>
        <View>
          <Image
            source={img}
            style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: col,
              marginTop: -85,
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {' '}
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const buttonWithSize = (
  text,
  nav,
  props,
  img,
  col,
  width = null,
  height = null,
  m,
) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.push(nav)}>
        <View>
          <Image
            source={img}
            style={{
              width: width,
              height: height,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: col,
              marginTop: -85,
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {' '}
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const buttonOnPress = (text, nav, props, img, col) => {
  return (
    <View>
      <TouchableOpacity onPress={() => nav}>
        <View>
          <Image
            source={img}
            style={{width: '90%', alignSelf: 'center', resizeMode: 'contain'}}
          />
          <Text
            style={{
              color: col,
              marginTop: -85,
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {' '}
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const buttonPressWithWidth = (text, nav, width, img, col, props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
      }}>
      <TouchableOpacity onPress={() => nav}>
        <View>
          <Image source={img} style={{width: width, height: width / 2.3}} />
          <Text
            style={{
              color: col,
              marginTop: -36,
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const buttonOnPressWithWidth = (text, nav, width, img, col, props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
      }}>
      <TouchableOpacity onPress={() => props.props.navigation.push(nav)}>
        <View>
          <Image source={img} style={{width: width, height: width / 2.3}} />
          <Text
            style={{
              color: col,
              marginTop: -36,
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const TalkHeader = (resim1, resim2, resim3, resim4, resim5) => {
  return (
    <ImageBackground
      source={ustBar}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Left>
        <TouchableOpacity onPress={() => props.props.navigation.push(nav)}>
          <Image
            source={kizlar}
            style={{height: 55, resizeMode: 'contain', marginLeft: -35}}
          />
        </TouchableOpacity>
      </Left>
      <Body style={{flexDirection: 'row'}}>
        <Image source={resim1} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim2} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim3} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim4} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim5} style={{height: 25, width: 25}} />
      </Body>

      <Right>
        <Image
          source={bosprofildolu}
          style={{height: 55, resizeMode: 'contain', marginRight: -60}}
        />
      </Right>
    </ImageBackground>
  );
};
export const TalkHeaderWithTouch = (resim1, resim2, resim3, resim4, resim5,props, nav) => {
  return (
    <ImageBackground
      source={ustBar}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Left>
        <TouchableOpacity onPress={() => props.props.navigation.push(nav)}>
          <Image
            source={kizlar}
            style={{height: 55, resizeMode: 'contain', marginLeft: -35}}
          />
        </TouchableOpacity>
      </Left>
      <Body style={{flexDirection: 'row'}}>
        <Image source={resim1} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim2} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim3} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim4} style={{height: 25, width: 25}} />
        <Image source={cizgi} style={{width: 10, resizeMode: 'contain'}} />
        <Image source={resim5} style={{height: 25, width: 25}} />
      </Body>

      <Right>
        <Image
          source={bosprofildolu}
          style={{height: 55, resizeMode: 'contain', marginRight: -60}}
        />
      </Right>
    </ImageBackground>
  );
};
export const _onPress = (item, index) => {
  //this.setState({selected: true});
  //this.setState({selectedItem: item.id});
  alert(JSON.stringify(item) + '---' + index);
};
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    resim: makarna,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    resim: et,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    resim: cips,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Fourth Item',
    resim: sambali,
  },
];
export const TextSoru = (soru, tip, sendbuton, selectedItem) => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: '#e53935',
            fontFamily: 'Raleway-Regular',
            textAlign: 'center',
          }}>
          Q1:
          <Text style={{color: '#424242', fontWeight: 'normal'}}>
            {' '}
            Bu test sizin her türlü sorunuza cevap veriyor. Tek yapmanız gereken
            alttaki soru kısmına sorunuzu yazmanız.{' '}
          </Text>
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <FlatList
          extraData={selectedItem}
          data={DATA}
          renderItem={({item, index, separators}) => (
            <View style={{backgroundColor: 'transparent'}}>
              <Card
                style={{
                  borderColor: 'transparent',
                  marginTop: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 5,
                }}>
                <CardItem
                  button
                  onPress={() => this._onPress(item, index)}
                  style={
                    selectedItem === item.id
                      ? {
                          backgroundColor: '#116cb3',
                          marginTop: 2,
                          borderRadius: 5,
                        }
                      : {
                          backgroundColor: '#fff',
                          marginTop: 2,
                          borderRadius: 5,
                        }
                  }>
                  <Icon active name="logo-googleplus" />
                  <Text
                    style={
                      selectedItem === item.id
                        ? {
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            fontSize: 14,
                            color: '#fff',
                          }
                        : {
                            fontFamily: 'Raleway-Regular',
                            textAlign: 'center',
                            fontSize: 14,
                          }
                    }>
                    {item.title}
                  </Text>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </CardItem>
              </Card>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{backgroundColor: 'transparent'}}>
        {buttonOnPressWithWidth('SEND', '', 120, sendbuton, '#ef5350')}
      </View>
    </View>
  );
};

const renderItem = ({item, index}) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
};

const numColumns = 2;
export const GrafikSoru = (nav, sendbuton) => {
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#e53935',
            fontFamily: 'Raleway-Regular',
            textAlign: 'center',
          }}>
          Q2:
          <Text style={{color: '#424242', fontWeight: 'normal'}}>
            {' '}
            Bu test sizin her türlü sorunuza cevap veriyor. Tek yapmanız gereken
            alttaki soru kısmına sorunuzu yazmanız.
          </Text>
        </Text>
      </View>
      <FlatGrid
        itemDimension={130}
        items={DATA}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.itemContainer,
              {backgroundColor: 'transparent', justifyContent: 'center'},
            ]}>
            <TouchableOpacity onPress={() => alert(JSON.stringify(item))}>
              <FullWidthImage
                onPress={() => alert(JSON.stringify(item))}
                source={item.resim}
                ratio={4 / 6}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{flex: 0.5, backgroundColor: 'transparent'}}>
        {buttonOnPressWithWidth('SEND', nav, 120, sendbuton, '#ef5350')}
      </View>
    </View>
  );
};

let {width, height} = Dimensions.get('window');
export const VideoSoru = (nav, sendbuton, prop) => {
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: '#e53935',
            fontFamily: 'Raleway-Regular',
            textAlign: 'center',
          }}>
          Q2:
          <Text
            style={{
              color: '#424242',
              fontSize: 12,
              fontFamily: 'Raleway-Medium',
            }}>
            {' '}
            Bu test sizin her türlü sorunuza cevap veriyor. Tek yapmanız gereken
            alttaki soru kısmına sorunuzu yazmanız.
          </Text>
        </Text>
      </View>
      <View style={{marginTop: 10, flex: 1}}>
        <Video
          volume={1}
          source={{
            uri:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          }}
          ref={ref => {
            prop.player = ref;
          }} // Store reference
          onBuffer={buff => {
            alert(JSON.stringify(buff));
          }}
          onError={err => {
            alert(JSON.stringify(err));
          }}
          style={{flex: 1, marginLeft: 20, marginRight: 20}}
        />
      </View>
      <View style={{flex: 0.5, backgroundColor: 'transparent'}}>
        {buttonOnPressWithWidth('SEND', nav, 120, sendbuton, '#ef5350', prop)}
      </View>
    </View>
  );
};

//#region
/*
<FlatList
        style={{marginVertical: 0}}
        numColumns={numColumns}
        extraData={selectedItem}
        data={DATA}
        renderItem={({item, index, separators}) => (
          <View style={{backgroundColor: 'transparent'}}>
            <Card
              style={{
                borderColor: 'gray',
                marginTop: 1,
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
                width: '90%',
              }}>
              <CardItem
                button
                onPress={() => _onPress(item, index)}
                style={
                  selectedItem === item.id
                    ? {
                        backgroundColor: '#116cb3',
                        marginTop: 2,
                        borderRadius: 5,
                      }
                    : {
                        backgroundColor: '#fff',
                        marginTop: 2,
                        borderRadius: 5,
                      }
                }>
                 <Image source={item.resim} style={{width:100,height:200}} />
              </CardItem>
            </Card>
          </View>
        )}
        keyExtractor={item => item.id}
      />
*/
//#endregion
