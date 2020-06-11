/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimensions} from 'react-native';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Left,
  Body,
  Text,
  Content,
  ListItem,
  Separator,
  Input,
  Textarea,
  Item,
  DatePicker,
  List,
} from 'native-base';
import moment from 'moment';
import uuid from '../../../Component/Tools/uid';
import ImagePicker from 'react-native-image-crop-picker';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {headerRenkli} from '../../../Component/header';
import {
  updateBirthday,
  updateLocation,
  updateAboutMe,
  updateOccupation,
  addGalleryPhoto,
  removeGalleryPhoto,
  selectGalleryPhoto,
} from '../../redux/actions/profileA';
import {searchCities} from '../../../service/service';
const logoGraySrc = require('../../../assets/Profile/profile_logo.png');

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationString: props.locationString,
      aboutMe: props.aboutMe,
      occupation: props.occupation,
      isEditable: {
        location: false,
      },
      autoCompleteList: [],
    };

    this.state.gallery = [
      ...this.props.gallery,
      ...new Array(6 - this.props.gallery.length).fill({
        id: null,
        isProfilePhoto: false,
      }),
    ];
  }

  _editBirthday = () => {
    this.birthdayInput.showDatePicker();
  };

  _blurBirthday = value => {
    const birthday = moment(value).format('YYYY/MM/DD');
    this.props.updateBirthday(birthday);
  };

  _changeOccupation = value => {
    this.setState({occupation: value});
  };

  _blurOccupation = () => {
    this.props.updateOccupation(this.state.occupation);
  };

  _changeAboutMe = value => {
    this.setState({aboutMe: value});
  };

  _blurAboutMe = () => {
    this.props.updateAboutMe(this.state.aboutMe);
  };

  _changeLocation = value => {
    this.setState({
      locationString: value,
    });
    if (value.length >= 3) {
      searchCities(value).then(res => {
        if (res.status) {
          this.setState({
            autoCompleteList: res.data.splice(0, 5).map(city => {
              return {
                id: city.id,
                name: city.name,
                country_code: city.country_code,
              };
            }),
          });
        }
      });
    } else {
      this.setState({autoCompleteList: []});
    }
  };

  _editLocation = () => {
    this.setState(
      {
        isEditable: {location: true},
      },
      () => this.locationInput._root.focus(),
    );
  };

  _selectLocation = id => {
    const location = this.state.autoCompleteList.filter(item => item.id === id);
    if (location.length > 0) {
      this.props.updateLocation({
        city_id: location[0].id,
        lat: null,
        long: null,
      });
      this.setState({
        isEditable: {location: false},
        locationString: `${location[0].name}, ${location[0].country_code}`,
        autoCompleteList: [],
      });
    }
  };

  renderItemWithImage = item => {
    console.log('SRC', item.medium);
    return (
      <View style={styles.galleryItemContainer} key={item.id}>
        <View
          style={
            item.isProfilePhoto
              ? styles.galleryItemSelected
              : styles.galleryItem
          }>
          <TouchableOpacity
            style={styles.galleryItemContent}
            onPress={() => !item.isProfilePhoto && this._selectMainPhoto(item)}>
            <Image style={styles.galleryPhoto} source={{uri: item.medium}} />
          </TouchableOpacity>
        </View>
        {this.props.gallery.length > 1 && (
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => this._removePhoto(item)}>
            <AntIcon name="closecircle" size={25} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderItemPlaceholder = item => {
    return (
      <View style={styles.galleryItemContainer} key={uuid()}>
        <TouchableOpacity
          style={styles.galleryItem}
          onPress={() => this._addPhoto()}>
          <View style={styles.galleryItemContent}>
            <AntIcon
              name="pluscircle"
              size={25}
              color="#cccccc"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _addPhoto = () => {
    ImagePicker.openPicker({
      width: 450,
      height: 560,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      this.props.addGalleryPhoto(image.data);
    });
  };

  _removePhoto = item => {
    this.props.removeGalleryPhoto(item.id);
  };

  _selectMainPhoto = item => {
    this.props.selectGalleryPhoto(item.id);
  };

  render() {
    const populatedGallery = [
      ...this.props.gallery,
      ...new Array(6 - this.props.gallery.length).fill({
        id: null,
        isProfilePhoto: false,
      }),
    ];
    return (
      <Container style={{backgroundColor: '#ffffff'}}>
        {headerRenkli('Profil Ayarları', 'profile', this.props, '#f5326f')}
        <View
          style={{
            flex: 2,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Content>
            <View style={styles.galleryWrapper}>
              {populatedGallery.map(item => {
                if (item.id === null) {
                  return this.renderItemPlaceholder(item);
                } else {
                  return this.renderItemWithImage(item);
                }
              })}
            </View>
            <View style={styles.galleryInfo}>
              <Text style={styles.galleryInfoText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut leo est, tempus at ligula non
              </Text>
            </View>
            <Separator style={styles.separator} />
            <ListItem icon noBorder style={styles.listSideBySide}>
              <Left style={styles.sbsHeaderContainer}>
                <Text style={styles.headerText}>Cinsiyet</Text>
              </Left>
              <Body style={styles.itemContainer}>
                <Item regular style={styles.item}>
                  <Input
                    style={styles.input}
                    editable={false}
                    autoCorrect={false}
                    placeholderTextColor="#808080"
                    value={this.props.gender}
                    underlineColorAndroid="transparent"
                  />
                </Item>
              </Body>
              <View style={styles.iconContainer} />
            </ListItem>
            <Separator style={styles.separator} />
            <ListItem icon noBorder style={styles.listSideBySide}>
              <Left style={styles.sbsHeaderContainer}>
                <Text style={styles.headerText}>Yaş</Text>
              </Left>
              <Body style={styles.preItemContainer}>
                {this.props.age !== null && (
                  <View style={styles.preTextContainer}>
                    <Text style={styles.preText}>{this.props.age}</Text>
                  </View>
                )}
                <Item regular style={styles.dateItem}>
                  <DatePicker
                    defaultDate={this.props.birthday}
                    style={styles.inputDate}
                    ref={x => (this.birthdayInput = x)}
                    minimumDate={new Date(1940, 1, 1)}
                    maximumDate={new Date(2010, 12, 31)}
                    locale="tr"
                    timeZoneOffsetInMinutes={0}
                    modalTransparent={false}
                    animationType="fade"
                    androidMode="default"
                    placeHolderText={this.props.birthday !== null ? false : "Doğum tarihiniz"}
                    textStyle={styles.inputDateText}
                    placeHolderTextStyle={styles.inputDatePText}
                    onDateChange={value => this._blurBirthday(value)}
                    disabled={true}
                  />
                </Item>
              </Body>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => this._editBirthday()}>
                <View style={{justifyContent: 'center'}}>
                  <LineIcon
                    name="pencil"
                    size={17}
                    color="#000000"
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </ListItem>
            <Separator style={styles.separator} />
            <ListItem icon noBorder style={styles.listSideBySide}>
              <Left style={styles.sbsHeaderContainer}>
                <Text style={styles.headerText}>Şehir, Ülke</Text>
              </Left>
              <Body style={styles.itemContainer}>
                <Item regular style={styles.item}>
                  <Input
                    style={styles.input}
                    ref={x => (this.locationInput = x)}
                    editable={this.state.isEditable.location}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#808080"
                    onChangeText={value => this._changeLocation(value)}
                    value={this.state.locationString}
                    underlineColorAndroid="transparent"
                  />
                </Item>
              </Body>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => this._editLocation()}>
                <View style={{justifyContent: 'center'}}>
                  <LineIcon
                    name="pencil"
                    size={17}
                    color="#000000"
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            </ListItem>
            {this.state.autoCompleteList.length !== 0 && (
              <View
                style={{
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <View style={{flex: 2}} />
                <List style={{flex: 4, backgroundColor: '#efefef'}}>
                  {this.state.autoCompleteList.map(item => (
                    <ListItem
                      id={item.id}
                      style={{
                        paddingTop: 11,
                        paddingBottom: 11,
                        paddingLeft: 0,
                        paddingRight: 0,
                        marginLeft: 4,
                      }}>
                      <Body>
                        <TouchableOpacity onPress={() => this._selectLocation(item.id)}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'Raleway-Regular',
                              textAlign: 'left',
                            }}>
                            {item.name}, {item.country_code}
                          </Text>
                        </TouchableOpacity>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </View>
            )}
            <Separator style={styles.separator} />
            <ListItem noBorder style={styles.listUpsideDown}>
              <View style={styles.udHeaderContainer}>
                <Text style={styles.headerText}>İş & Okul</Text>
              </View>
              <Body style={styles.itemContainer}>
                <Item regular style={styles.itemArea}>
                  <Textarea
                    style={styles.inputArea}
                    ref={x => (this.occupationInput = x)}
                    editable={true}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="İşin veya okulun hakkında bilgi ver..."
                    placeholderTextColor="#808080"
                    onChangeText={value => this._changeOccupation(value)}
                    onBlur={() => this._blurOccupation()}
                    blurOnSubmit={true}
                    value={this.state.occupation}
                    underlineColorAndroid="transparent"
                    rowSpan={2}
                  />
                </Item>
              </Body>
            </ListItem>
            <Separator style={styles.separator} />
            <ListItem noBorder style={styles.listUpsideDown}>
              <View style={styles.udHeaderContainer}>
                <Text style={styles.headerText}>Hakkında</Text>
              </View>
              <Body style={styles.itemContainer}>
                <Item regular style={styles.itemArea}>
                  <Textarea
                    style={styles.inputArea}
                    ref={x => (this.aboutMeInput = x)}
                    editable={true}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Kendinden bahset..."
                    placeholderTextColor="#808080"
                    onChangeText={value => this._changeAboutMe(value)}
                    onBlur={() => this._blurAboutMe()}
                    blurOnSubmit={true}
                    value={this.state.aboutMe}
                    underlineColorAndroid="transparent"
                    rowSpan={2}
                  />
                </Item>
              </Body>
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
  listSideBySide: {
    flexDirection: 'row',
    height: 29,
  },
  listUpsideDown: {
    flexDirection: 'column',
  },
  sbsHeaderContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  udHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontFamily: 'Raleway-Regular',
    flex: 1,
    textAlign: 'left',
    color: '#f85e61',
    fontSize: 13,
    fontWeight: '700',
  },
  itemContainer: {
    flex: 4,
    flexGrow: 4,
    width: '100%',
  },
  item: {
    height: 24,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  preItemContainer: {
    flex: 4,
    flexGrow: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  preText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 2,
    marginRight: 0,
  },
  preTextItem: {
    height: 24,
    flexGrow: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: 'transparent',
  },
  input: {
    fontFamily: 'Raleway-Regular',
    width: '100%',
    height: 24,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 13,
  },
  dateItem: {
    flexGrow: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: 'transparent',
  },
  inputDate: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 13,
  },
  inputDateText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    textAlign: 'left',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  inputDatePText: {
    color: '#808080',
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    textAlign: 'left',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  itemArea: {
    borderColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    flex: 1,
  },
  inputArea: {
    width: '100%',
    fontFamily: 'Raleway-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 13,
  },
  iconContainer: {
    flex: 0.5,
  },
  separator: {
    height: 2,
    marginTop: 8,
    marginBottom: 8,
  },
  galleryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  galleryItemContainer: {
    width: '33%',
    aspectRatio: 0.8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  galleryItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderRadius: 28,
    overflow: 'hidden',
  },
  galleryItemSelected: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#f85e61',
  },
  galleryItemContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  galleryPhoto: {
    height: '100%',
    width: undefined,
    aspectRatio: 0.8,
    resizeMode: 'cover',
  },
  galleryInfo: {
    marginTop: 15,
    marginBottom: 15,
  },
  galleryInfoText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    left: 4,
    top: 4,
  },
});

const mapStateToProps = state => ({
  gender: state.profile.gender === 'm' ? 'Erkek' : 'Kadın',
  age: state.profile.age,
  birthday: state.profile.birthday !== null ? moment(state.profile.birthday, 'X').toDate() : null,
  city: state.profile.city,
  countryCode: state.profile.countryCode,
  locationString: state.profile.city && state.profile.countryCode ? `${state.profile.city}, ${state.profile.countryCode}` : null,
  aboutMe: state.profile.aboutMe,
  occupation: state.profile.occupation,
  gallery: state.profile.gallery,
});

const mapDispatchToProps = {
  updateBirthday: val => updateBirthday(val),
  updateLocation: payload => updateLocation(payload),
  updateOccupation: val => updateOccupation(val),
  updateAboutMe: val => updateAboutMe(val),
  addGalleryPhoto: val => addGalleryPhoto(val),
  removeGalleryPhoto: val => removeGalleryPhoto(val),
  selectGalleryPhoto: val => selectGalleryPhoto(val),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettings);
