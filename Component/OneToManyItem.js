/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import {Card, CardItem, Right} from 'native-base';

const sendbuton = require('../assets/talk/sendbuton.png');

export default function OneToManyItem({
  pressHandler,
  pressSendCevap,
  item,
  options,
}) {
  const [items, setItems] = useState(null);
  //console.log('items: ', options);
  if (item.type === 'one_of_many' || item.type === 'true_false') {
    
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: '#e53935',
            fontFamily: 'Raleway-Regular',
            textAlign: 'center',
          }}>
          Q{item.step}:
          <Text
            style={{
              color: '#424242',
              fontWeight: 'normal',
              fontFamily: 'Raleway-Regular',
            }}>
            {' '}
            {item.Soru}
          </Text>
        </Text>
      </View>
    );
    /*
    <TouchableOpacity onPress={() => pressHandler(p.value)}>
          <Text style={styles.item}>{p.content}</Text>
        </TouchableOpacity>
    */
  } else {
    return options.map((p, i) => {
      return i !== options.length - 1 ? (
        p.value !== '' ? (
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
                onPress={() => {
                  setItems(p.value);
                  // sendAnswer(items);
                  pressHandler(p.value);
                }}
                style={
                  items === p.value
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
                {
                  //<Icon active name="logo-googleplus" />
                }
                <Text
                  style={
                    items === p.value
                      ? {
                          fontFamily: 'Raleway-Regular',
                          textAlign: 'center',
                          fontSize: 12,
                          color: '#fff',
                          alignSelf: 'center',
                        }
                      : {
                          fontFamily: 'Raleway-Regular',
                          textAlign: 'center',
                          fontSize: 12,
                          alignSelf: 'center',
                        }
                  }>
                  {p.label !== null ? p.label.toUpperCase() : p.label} -{' '}
                  {p.content}
                </Text>
                <Right>
                  {
                    //<Icon name="arrow-forward" />
                  }
                </Right>
              </CardItem>
            </Card>
          </View>
        ) : null
      ) : i === options.length - 1 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 5,
          }}>
          <TouchableOpacity onPress={() => pressSendCevap(p.value)}>
            <View>
              <Image
                source={sendbuton}
                style={{width: 120, height: 120 / 2.3}}
              />
              <Text
                style={{
                  color: '#ef5350',
                  marginTop: -36,
                  fontSize: 16,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}>
                SEND
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null;
    });
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#000',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
});
