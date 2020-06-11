/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Right,
  Body,
  Text,
  Icon,
  Content,
  ListItem,
  Separator,
} from 'native-base';
import {logout} from '../../redux/actions/authA';
import RemoveAdds from './RemoveAdds';
import {headerRenkli} from '../../../Component/header';
const logoGraySrc = require('../../../assets/Profile/profile_logo.png');

class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  _logout = () => {
    this.props.logout().then(() => this.props.navigation.push('landing'));
  };

  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        {headerRenkli('Ayarlar', 'profile', this.props, '#f5326f')}
        <View
          style={{
            flex: 2,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 20,
          }}>
          <View style={{marginLeft: 10, marginBottom: 20}}>
            <RemoveAdds />
          </View>
          <Content>
            <ListItem itemHeader style={styles.headerWrapper}>
              <Text style={styles.headerText}>Uygulama Ayarları</Text>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Dil Ayarları</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Uzaklık Birimi</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Bağlı Uygulamalar</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Yardım Merkezi</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Bizi Deperlendir</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Geri Bildirim Paylaş</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>

            <Separator style={styles.separator} />

            <ListItem itemHeader style={styles.headerWrapper}>
              <Text style={styles.headerText}>Bildirim Ayarları</Text>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>E-Posta Bildirim Ayarları</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Anlık Bildirim Ayarları</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>

            <Separator style={styles.separator} />

            <ListItem itemHeader style={styles.headerWrapper}>
              <Text style={styles.headerText}>Yasal Uyarılar</Text>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Genel Kullanım Koşulları</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Gizlilik Politikası</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Çerez Kullanımı</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon noBorder>
              <Body>
                <TouchableOpacity onPress={() => false}>
                  <Text style={styles.listText}>Verilerim</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>

            <Separator style={styles.separator} />

            <ListItem noBorder style={styles.listTextRedWrapper}>
              <TouchableOpacity onPress={() => this._logout()}>
                <Text style={styles.listTextRed}>OTURUMU KAPAT</Text>
              </TouchableOpacity>
            </ListItem>

            <Separator style={styles.separator} />

            <ListItem noBorder style={styles.listTextRedWrapper}>
              <TouchableOpacity onPress={() => false}>
                <Text style={styles.listTextRed}>Hesabımı Askıya Al</Text>
              </TouchableOpacity>
            </ListItem>

            <Separator style={styles.separator} />
          </Content>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={logoGraySrc}
            style={{
              width: 80,
              height: 20,
              resizeMode: 'contain',
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Raleway-Bold',
              textAlign: 'center',
              color: 'lightgray',
            }}>
            fogotalk v1.0.0 #1
          </Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listText: {
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    textAlign: 'left',
  },
  listTextRedWrapper: {
    justifyContent: 'center',
  },
  listTextRed: {
    color: 'rgb(248,94,97)',
    textAlign: 'center',
  },
  headerWrapper: {
    paddingBottom: 8,
    paddingTop: 12,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgb(248,94,97)',
  },
  separator: {
    height: 2,
    marginTop: 8,
    marginBottom: 8,
  },
});

const mapStateToProps = (state, ownProps) => ({
  username: state.auth.username,
  name: state.profile.name,
  profilePhoto: state.profile.profilePhoto,
});

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSettings);
