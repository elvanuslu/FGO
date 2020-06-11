/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {List, Card, CardItem} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
const sendbuton = require('../../assets/talk/sendbuton.png');
export default function Sorular(props, data, pressSendCevap) {
  const [Soru, setSoru] = useState([
    {
      id: 1,
      question_id: '',
      step: 1,
      type: 'one_to_many',
      content: '',
      options: [
        {
          id: '',
          value: '',
          label: '',
          content: '',
        },
      ],
    },
  ]);
  const [sira, setSira] = useState(0);
  const [secilen, setSecilen] = useState(null);
  useEffect(() => {
    if (props.data.status === true) {
      console.log('Array: ', props.data);
      let Sorulst = [
        {
          id: createGuid(),
          question_id: props.data.data.question.question_id,
          step: props.data.data.question.step,
          type: props.data.data.question.type,
          content: props.data.data.question.content,
          // options: [],
        },
      ];
      props.data.data.question.options.map((p, i) => {
        //console.log('pp: ', p);
        Sorulst.push(p);
      });
      setSoru(Sorulst);
    }
  }, [props]);

  const createGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const _onPress = (item, index) => {
    console.log('item: ', item);
    setSecilen(item.value);
  };
  const Options = (p, i, press) => {
    return (
      <View>
        <View>
          {p.question_id ? null : (
            <View style={{backgroundColor: 'transparent', width: 320}}>
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
                  onPress={() => _onPress(p)}
                  style={
                    secilen === p.value
                      ? {
                          backgroundColor: '#116cb3',
                          marginTop: 0,
                          borderRadius: 5,
                        }
                      : {
                          backgroundColor: '#fff',
                          marginTop: 0,
                          borderRadius: 5,
                        }
                  }>
                  <Text
                    style={
                      secilen === p.value
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
                    {p.label ? p.label.toUpperCase() + '-' : p.label}{' '}
                    {p.content}
                  </Text>
                </CardItem>
              </Card>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 5,
          }}>
          <TouchableOpacity onPress={() => press(p.value)}>
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
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <List
          dataArray={Soru}
          keyExtractor={id => id.value}
          renderRow={(item, index) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 30,
                marginRight: 30,
                marginBottom: 1,
                marginTop: 10,
                backgroundColor: 'transparent',
              }}>
              {item.question_id ? (
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
                    {item.question_id ? item.content : null}
                  </Text>
                </Text>
              ) : null}
              {Options(item, index, pressSendCevap)}
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 30,
  },
  list: {
    margin: 10,
    backgroundColor: 'transparent',
  },
});
