/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, Button} from 'native-base';
import RemoveAdds from './RemoveAdds';
const coinTier1 = require('../../../assets/Profile/coin-tier1.png');
const coinTier2 = require('../../../assets/Profile/coin-tier2.png');
const coinTier3 = require('../../../assets/Profile/coin-tier3.png');

class PurchaseCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      selectedPackage: null,
    };
  }

  componentDidMount = () => {
    console.log('mounted');
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flexGrow: 1}}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Raleway-Regular',
              textAlign: 'center',
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo est,
            tempus at ligula non
          </Text>
          <View style={styles.purchaseWrapper}>
            <TouchableOpacity style={styles.purchaseTier}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={coinTier1}
                  style={StyleSheet.flatten([
                    styles.coinImage,
                    {width: 20, height: 20},
                  ])}
                />
                <Text style={styles.coinCount}>10</Text>
                <Text style={styles.discount}>&nbsp;</Text>
              </View>
              <Text style={styles.price}>₺ 29</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={StyleSheet.flatten([
                styles.purchaseTier,
                styles.tierActive,
              ])}>
              <View style={styles.popularBg}>
                <Text style={styles.popularText}>POPÜLER</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={coinTier2}
                  style={StyleSheet.flatten([
                    styles.coinImage,
                    {width: 44, height: 20},
                  ])}
                />
                <Text style={styles.coinCount}>50</Text>
                <Text style={styles.discount}>%22 indirimli</Text>
              </View>
              <Text style={styles.price}>₺ 99</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.purchaseTier}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={coinTier3}
                  style={StyleSheet.flatten([
                    styles.coinImage,
                    {width: 63, height: 20},
                  ])}
                />
                <Text style={styles.coinCount}>500</Text>
                <Text style={styles.discount}>%30 indirimli</Text>
              </View>
              <Text style={styles.price}>₺ 399</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <RemoveAdds />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Raleway-Regular',
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo est,
            tempus at ligula non, bibendum lacinia ante. Suspendisse vulputate
            ipsum id ligula mollis sagittis.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Button
              rounded
              danger
              style={{
                width: 120,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text>Devam</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  purchaseWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  purchaseTier: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgb(130,130,130)',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 25,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  tierActive: {
    borderColor: 'rgb(248, 94, 97)',
    paddingTop: 23,
    paddingBottom: 20,
  },
  coinImage: {
    marginTop: 15,
  },
  coinCount: {
    fontSize: 18,
    marginTop: 2,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
  discount: {
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    color: 'rgb(248, 94, 97)',
    marginTop: 6,
  },
  price: {
    fontSize: 13,
    fontFamily: 'Raleway-Regular',
    fontWeight: '700',
    color: 'rgb(130, 130, 130)',
    marginTop: 10,
  },
  popularBg: {
    backgroundColor: 'rgb(248, 94, 97)',
    height: 30,
    position: 'absolute',
    left: -1,
    right: -1,
    top: -1,
    borderColor: 'rgb(248, 94, 97)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  popularText: {
    fontSize: 11,
    marginTop: 8,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    color: 'rgb(255,255,255)',
  },
});

export default PurchaseCoin;
