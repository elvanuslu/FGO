/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Container, Text, Input, Item, List, ListItem, Body} from 'native-base';
import {requestLocationPermission} from '../../../Component/Tools/Permissions';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import {detectCityLocation, searchCities, userRegister} from '../../../service/service';
import {validateBetween, validatePasswordChars} from '../../../Component/Tools/Validation';
import {setAutoLogin} from '../../redux/actions/authA';
import {getProfile} from '../../redux/actions/profileA';
import Button from '../../../Component/Shared/Button';
import {header} from '../../../Component/header';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

class RegisterWithEmailDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: this.props.navigation.getParam('email'),
      name: null,
      password: null,
      gender: null,
      location: {
        id: null,
        string: null,
        lat: null,
        long: null,
      },
      deviceId: null,
      deviceDetails: {},
      errorMessages: {
        name: null,
        password: null,
        location: null,
        gender: null,
      },
      inputValidate: {
        name: false,
        gender: false,
        password: false,
        location: false,
      },
      autoCompleteList: [],
      inputDisabled: true,
    };

    this.state.deviceId = DeviceInfo.getUniqueId();
    this.state.deviceDetails = {
      brand: DeviceInfo.getBrand(),
      buildNumber: DeviceInfo.getBuildNumber(),
      deviceId: DeviceInfo.getDeviceId(),
      systemVersion: DeviceInfo.getSystemVersion(),
    };
    DeviceInfo.getInstallReferrer().then(
      ir => (this.state.deviceDetails.installReferer = ir),
    );
  }

  componentDidMount() {
    requestLocationPermission().then(hasPermission => {
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            detectCityLocation(lat, long).then(locResult => {
              if (locResult.status) {
                this.setState(
                  {
                    location: {
                      id: locResult.data.id,
                      string: `${locResult.data.name}, ${locResult.data.country_code}`,
                      lat: lat,
                      long: long,
                    },
                    inputValidate: {
                      ...this.state.inputValidate,
                      location: true,
                    },
                  },
                  () => this.checkForm(),
                );
              }
            });
          },
          error => {},
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 20000,
          },
        );
      }
    });
  }

  _changeName = value => {
    const isValid = value.length >= 3;
    this.setState(
      {
        name: value,
        inputValidate: {
          ...this.state.inputValidate,
          name: isValid,
        },
      },
      () => this.checkForm(),
    );
  };

  _changePassword = value => {
    const isValid = validateBetween(value, 6, 8) && validatePasswordChars(value);
    this.setState(
      {
        password: value,
        inputValidate: {
          ...this.state.inputValidate,
          password: isValid,
        },
      },
      () => this.checkForm(),
    );
  };

  _changeLocation = value => {
    this.setState({
      location: {
        ...this.state.location,
        string: value,
      },
      inputValidate: {
        ...this.state.inputValidate,
        location: false,
      },
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

  _selectLocation = id => {
    const location = this.state.autoCompleteList.filter(item => item.id === id);
    if (location.length > 0) {
      this.setState(
        {
          location: {
            id: location[0].id,
            lat: null,
            long: null,
            string: `${location[0].name}, ${location[0].country_code}`,
          },
          inputValidate: {
            ...this.state.inputValidate,
            location: true,
          },
          autoCompleteList: [],
        },
        () => this.checkForm(),
      );
    }
  };

  _changeGender = value => {
    this.setState(
      {
        gender: value,
        inputValidate: {
          ...this.state.inputValidate,
          gender: true,
        },
      },
      () => this.checkForm(),
    );
  };

  checkForm = () => {
    // form check
    const result = Object.values(this.state.inputValidate).filter(val => !val);
    this.setState({
      inputDisabled: result.length !== 0,
    });
  };

  _submitForm = () => {
    if (!this.state.inputDisabled) {
      this.setState({isLoading: true});
      userRegister({
        email: this.state.email,
        full_name: this.state.name,
        password: this.state.password,
        gender: this.state.gender,
        city_id: this.state.location.id,
        device_id: this.state.deviceId,
        device_details: this.state.deviceDetails,
        lat: this.state.location.lat,
        long: this.state.location.long,
      })
        .then(result => {
          if (result.status) {
            this.props
              .setAutoLogin(
                {
                  uid: result.data.payload.id,
                  username: result.data.payload.username,
                },
                result.data.token,
              )
              .then(loginResult => {
                if (loginResult) {
                  this.props.getProfile().then(() => {
                    this.props.navigation.push('welcomeTutorial');
                  });
                }
              });
          } else {
            // TODO handle fail, small chance
          }
          this.setState({isLoading: false});
        })
        .catch(error => {
          // TODO there may be error(s). handle this
          console.log('REGISTER ERROR', error);
          this.setState({isLoading: false});
        });
    }
  };

  render() {
    return (
      <Container style={{backgroundColor: '#f1f0f0'}}>
        {header('', 'registerWithEmail', this.props, {email: this.state.email})}
        <View
          style={{
            marginLeft: 30,
            marginRight: 30,
            marginTop: 40,
          }}>
          <Item
            regular
            style={{
              borderRadius: 20,
              backgroundColor: 'white',
              marginBottom: 5,
            }}>
            <Input
              style={{color: 'black', marginLeft: 10}}
              placeholder="Ad - Soyad"
              placeholderTextColor="#808080"
              onChangeText={value => this._changeName(value)}
              value={this.state.name}
              underlineColorAndroid="transparent"
            />
            {this.state.inputValidate.name ? (
              <AntIcon
                name="check"
                size={20}
                color="#28edaa"
                style={{marginRight: 15}}
              />
            ) : (
              <AntIcon
                name="close"
                size={20}
                color="#fd1313"
                style={{marginRight: 15}}
              />
            )}
          </Item>
          <Text style={{color: 'gray', fontSize: 11, textAlign: 'left', paddingLeft: 10}}>
            En az 3 karakter olmalıdır
          </Text>
          {this.state.errorMessages.name && (
            <Text style={{color: '#fd4e4e', fontSize: 13, textAlign: 'center'}}>
              {this.state.errorMessages.name}
            </Text>
          )}

          <Item
            regular
            style={{
              borderRadius: 20,
              backgroundColor: 'white',
              marginBottom: 5,
              marginTop: 15,
            }}>
            <Input
              style={{color: 'black', marginLeft: 10}}
              placeholder="Şifre"
              placeholderTextColor="#808080"
              onChangeText={value => this._changePassword(value)}
              value={this.state.password}
              underlineColorAndroid="transparent"
            />
            {this.state.inputValidate.password ? (
              <AntIcon
                name="check"
                size={20}
                color="#28edaa"
                style={{marginRight: 15}}
              />
            ) : (
              <AntIcon
                name="close"
                size={20}
                color="#fd1313"
                style={{marginRight: 15}}
              />
            )}
          </Item>
          <Text style={{color: 'gray', fontSize: 11, textAlign: 'left', paddingLeft: 10}}>
            6-8 karakter uzunluğunda olmalıdır
          </Text>
          {this.state.errorMessages.password && (
            <Text style={{color: '#fd4e4e', fontSize: 13, textAlign: 'center'}}>
              {this.state.errorMessages.password}
            </Text>
          )}

          <Item
            regular
            style={{
              borderRadius: 20,
              backgroundColor: 'white',
              marginBottom: 5,
              marginTop: 15,
            }}>
            <Input
              style={{color: 'black', marginLeft: 10}}
              placeholder="Bulunduğun Yer"
              placeholderTextColor="#808080"
              onChangeText={value => this._changeLocation(value)}
              value={this.state.location.string}
              underlineColorAndroid="transparent"
            />
            {this.state.inputValidate.location ? (
              <AntIcon
                name="check"
                size={20}
                color="#28edaa"
                style={{marginRight: 15}}
              />
            ) : (
              <AntIcon
                name="close"
                size={20}
                color="#fd1313"
                style={{marginRight: 15}}
              />
            )}
          </Item>
          <Text style={{color: 'gray', fontSize: 11, textAlign: 'left', paddingLeft: 10}}>
            Arama yapıp listeden seçebilirsiniz
          </Text>

          <View
            style={{
              marginTop: -20,
              marginLeft: 15,
              marginRight: 15,
              backgroundColor: '#ffffff',
            }}>
            <List>
              {this.state.autoCompleteList.map(item => (
                <ListItem
                  id={item.id}
                  style={{
                    paddingTop: 14,
                    paddingBottom: 14,
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginLeft: 4,
                  }}>
                  <Body>
                    <TouchableOpacity onPress={() => this._selectLocation(item.id)}>
                      <Text
                        style={{
                          fontSize: 14,
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

          {this.state.errorMessages.location && (
            <Text style={{color: '#fd4e4e', fontSize: 13, textAlign: 'center'}}>
              {this.state.errorMessages.location}
            </Text>
          )}

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 5,
              marginTop: 35,
            }}>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyItems: 'center'}}>
              <View style={{flex: 1, flexDirection: 'column', justifyItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  Cinsiyetin
                </Text>
              </View>
            </View>
            <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity onPress={() => this._changeGender('m')}>
                <View
                  style={{
                    marginTop: 0,
                    marginLeft: 0,
                    paddingTop: 14,
                    paddingBottom: 14,
                    paddingLeft: 32,
                    paddingRight: 32,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: this.state.gender === 'm' ? '#fd1313' : '#dedede',
                    borderRadius: 28,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginTop: 0,
                      fontSize: 14,
                      alignSelf: 'center',
                    }}>
                    Erkek
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._changeGender('f')}>
                <View
                  style={{
                    marginTop: 0,
                    marginLeft: 10,
                    paddingTop: 14,
                    paddingBottom: 14,
                    paddingLeft: 32,
                    paddingRight: 32,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: this.state.gender === 'f' ? '#fd1313' : '#dedede',
                    borderRadius: 28,
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      marginTop: 0,
                      fontSize: 14,
                      alignSelf: 'center',
                    }}>
                    Kadın
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.errorMessages.gender && (
            <Text style={{color: '#fd4e4e', fontSize: 13, textAlign: 'center'}}>
              {this.state.errorMessages.gender}
            </Text>
          )}

          <View style={{marginTop: 40}}>
            <Button
              disabled={this.state.inputDisabled}
              isLoading={this.state.isLoading}
              action={() => this._submitForm()}>
              TAMAMLA
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = {
  setAutoLogin: (payload, token) => setAutoLogin(payload, token),
  getProfile: () => getProfile(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterWithEmailDetails);
