/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Right,
  Left,
  Body,
  Text,
  Icon,
  Content,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';
import OverlayView from '../../../Component/Shared/OverlayView';
import RemoveAdds from './RemoveAdds';
import PurchaseCoin from './PurchaseCoin';
import {headerRenkli} from '../../../Component/header';
import CommunityRules from './CommunityRules';
const logoGraySrc = require('../../../assets/Profile/profile_logo.png');
const coinStatusSrc = require('../../../assets/Profile/coin-status-button.png');
const watchVideoSrc = require('../../../assets/Profile/watch-video-button.png');
const settingsIconSrc = require('../../../assets/Profile/settings-icon.png');
const communityRulesIconSrc = require('../../../assets/Profile/rules-icon.png');
const shareIconSrc = require('../../../assets/Profile/share-icon.png');
const inviteIconSrc = require('../../../assets/Profile/invite-icon.png');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showPurchaseOverlay: false,
      showCommunityRulesOverlay: false,
      //resim: null,
      //imageData: null,
      //userId: null,
    };
  }
  componentDidMount = async () => {
    //this.UserProfile();
    //console.log('Dimensions: ', width, 'x', height);
    // const profiles = await getStorage('profilImage');
    // const uid = await getStorage('uids');
    // console.log('prifles: ', this.props.userId, ' uid: ', uid);
    /*
    if (this.props.userId === uid) {
      if (profiles === null) {
        this.setState({resim: profileResim});
      } else {
        this.setState({resim: profiles});
      }
    }
    */
  };

  // SendPhoto = async val => {
  //   try {
  //     this.setState({loading: true});
  //     await sendPhoto(val).then(res => {
  //       console.log(JSON.stringify(res));
  //       if (res.status === true) {
  //         console.log('image Path: ', res.data.profile_photo);
  //         this.setState({resim: res.data.profile_photo});
  //         setStorage('uids', this.props.userId);
  //         setStorage('profilImage', res.data.profile_photo);
  //       }
  //       this.setState({loading: false});
  //     });
  //   } catch (error) {
  //     this.setState({loading: false});
  //     Alert.alert('Send Error', error, [{text: 'Tamam', onPress: () => ''}], {
  //       cancelable: true,
  //     });
  //   }
  // };
  // resimSec = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //     includeBase64: true,
  //     includeExif: true,
  //   }).then(image => {
  //     console.log(image);
  //     console.log('Mime: ', image.mime);
  //     console.log('my Data: ', image.data);
  //     //this.setState({resim: image.path});
  //     this.setState({imageData: image.data});
  //     this.SendPhoto(image.data);
  //     if (Platform.OS === 'ios') {
  //     }
  //   });
  // };

  purchaseOverlayClose = () => {
    this.setState({showPurchaseOverlay: false});
  };

  communityRulesOverlayClose = () => {
    this.setState({showCommunityRulesOverlay: false});
  };

  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        {this.state.showPurchaseOverlay && (
          <OverlayView hasLogo closeAction={this.purchaseOverlayClose}>
            <PurchaseCoin />
          </OverlayView>
        )}
        {this.state.showCommunityRulesOverlay && (
          <OverlayView hasLogo closeAction={this.communityRulesOverlayClose}>
            <CommunityRules />
          </OverlayView>
        )}
        {headerRenkli('Hesabım', 'SearchMain', this.props, '#f5326f')}
        <View style={{flex: 1.8, backgroundColor: 'transparent'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#d1d1d1',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 113,
                height: 113,
              }}>
              <Thumbnail
                style={{
                  width: 113,
                  height: 113,
                  borderRadius: 113 / 2,
                  borderWidth: 3,
                }}
                borderColor="white"
                source={{uri: this.props.profilePhoto}}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 113 / 2 - 20,
                  right: -20,
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.push('profileSettings')}>
                  <View
                    style={{
                      backgroundColor: '#ffffff',
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                    }}
                    importantForAccessibility="yes">
                    <LineIcon
                      name="pencil"
                      size={17}
                      color="#000000"
                      style={{
                        marginLeft: 11,
                        marginTop: 11,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: 5, marginTop: 10, paddingBottom: 10}}>
              <Text
                style={{
                  fontSize: 21,
                  fontFamily: 'Raleway-Bold',
                  textAlign: 'center',
                }}>
                {this.props.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 39,
              marginTop: -20,
            }}>
            <TouchableOpacity
              onPress={() => this.setState({showPurchaseOverlay: true})}>
              <Image source={coinStatusSrc} style={{height: 39, width: 120}} />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Raleway-Bold',
                  position: 'absolute',
                  left: 36,
                  top: 6,
                  color: '#fff',
                }}>
                999+
              </Text>
            </TouchableOpacity>
            <Image
              source={watchVideoSrc}
              style={{height: 39, width: 39, marginLeft: 3}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: 'transparent',
            marginTop: 30,
            paddingBottom: 30,
          }}>
          <Content style={{marginLeft: 10, marginRight: 20}}>
            <List>
              <ListItem icon>
                <Left>
                  <Image
                    source={settingsIconSrc}
                    style={{height: 20, width: 20}}
                  />
                </Left>
                <Body>
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => this.props.navigation.push('appSettings')}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Raleway-Regular',
                        textAlign: 'left',
                      }}>
                      Ayarlar
                    </Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Image
                    source={communityRulesIconSrc}
                    style={{height: 20, width: 20}}
                  />
                </Left>
                <Body>
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() =>
                      this.setState({showCommunityRulesOverlay: true})
                    }>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Raleway-Regular',
                        textAlign: 'left',
                      }}>
                      Topluluk Kuralları
                    </Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Image
                    source={shareIconSrc}
                    style={{height: 20, width: 20}}
                  />
                </Left>
                <Body>
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => false}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Raleway-Regular',
                        textAlign: 'left',
                      }}>
                      FogoTalk'u Paylaş
                    </Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Image
                    source={inviteIconSrc}
                    style={{height: 20, width: 20}}
                  />
                </Left>
                <Body>
                  <TouchableOpacity
                    style={{width: '100%'}}
                    onPress={() => false}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Raleway-Regular',
                        textAlign: 'left',
                      }}>
                      Arkadaşlarını Davet Et
                    </Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
            <View style={{marginLeft: 10}}>
              <RemoveAdds />
            </View>
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
const mapStateToProps = (state, ownProps) => ({
  username: state.auth.username,
  name: state.profile.name,
  profilePhoto: state.profile.profilePhoto,
});

export default connect(mapStateToProps)(Profile);
