/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Container, Text, Left, List, ListItem} from 'native-base';
const blockIcon = require('../../../assets/Profile/block-icon.png');

class CommunityRules extends Component {
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
      <View style={{flex: 1, marginTop: 30}}>
        <Text style={styles.textDefault}>
          Fogo TALK kullanıcılarının kendini rahat hissedebileceği eğlenerek
          tanışabileceği bir uygulama olmayı hedefliyoruz. Bu nedenle tüm
          topluluğun uyması zorunlu bazı kurallarımız var.
          <Text style={styles.textBold}> Uyanlar ödüllendirilir</Text>,
          <Text style={styles.textBold}> uymayanlar cezalandırılır</Text>.
        </Text>
        <List style={styles.listWrapper}>
          <ListItem noBorder icon style={styles.listItem}>
            <Left>
              <Image source={blockIcon} style={{width: 20, height: 20}} />
            </Left>
            <Text style={StyleSheet.flatten([styles.textBold])}>
              Sorulara alakasız ve tacizkar cevaplar verme
            </Text>
          </ListItem>
          <ListItem noBorder icon style={styles.listItem}>
            <Left>
              <Image source={blockIcon} style={{width: 20, height: 20}} />
            </Left>
            <Text style={StyleSheet.flatten([styles.textBold])}>
              Kimseyi taciz etme
            </Text>
          </ListItem>
          <ListItem noBorder icon style={styles.listItem}>
            <Left>
              <Image source={blockIcon} style={{width: 20, height: 20}} />
            </Left>
            <Text style={StyleSheet.flatten([styles.textBold])}>
              Resim veya iletişim bilgileri için ısrar etme
            </Text>
          </ListItem>
          <ListItem noBorder icon style={styles.listItem}>
            <Left>
              <Image source={blockIcon} style={{width: 20, height: 20}} />
            </Left>
            <Text style={StyleSheet.flatten([styles.textBold])}>
              Spam yapma
            </Text>
          </ListItem>
        </List>
        <Text style={styles.textDefault}>
          Gördüğün gibi kurallarımız çok basit kurallar. Kurallarımız konusunda
          son derece katıyız. İyi eğlenceler.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textDefault: {
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    textAlign: 'left',
  },
  textBold: {
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  listItem: {
    justifyContent: 'flex-start',
    marginLeft: 0,
  },
});

export default CommunityRules;
