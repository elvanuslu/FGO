/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
const removeAddsIconSrc = require('../../../assets/Profile/block-icon.png');

class RemoveAdds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 20,
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 18,
          borderWidth: 2,
          borderColor: 'rgb(231,231,231)',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={removeAddsIconSrc} style={{height: 25, width: 25}} />
          <Text style={{marginLeft: 15, fontWeight: '700'}}>REKLAMSIZ</Text>
        </View>
        <Text style={{color: 'rgb(137,137,137)', fontSize: 13}}>₺ 89</Text>
      </TouchableOpacity>
    );
  }
}

export default RemoveAdds;
