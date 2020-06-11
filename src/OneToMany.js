/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import {getNextQuestion, sendAnswer} from '../service/service';
import OneToManyItem from '../Component/OneToManyItem';

const createGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const sendCevap = async (soruId, item) => {
  console.log('sendCevap: ', soruId, item);
  try {
    await sendAnswer(soruId, item).then(res => {
      console.log('Cevap: ', JSON.stringify(res));
    });
  } catch (error) {
    Alert.alert('Error', error, [{text: 'Tamam', onPress: () => ''}], {
      cancelable: true,
    });
  }
};
export default function OneToMany(props) {
  const [Soru, setSoru] = useState(null);
  const [todos, setTodos] = useState([
    {
      id: 1,
      key: createGuid(),
      type: '',
      Soru: '',
      button: false,
      step: 1,
      options: [
        {
          value: '',
          label: '',
          content: '',
        },
      ],
    },
  ]);
  const [secilen, setSecilen] = useState(null);
  const [options, setOptions] = useState([
    {
      value: '',
      label: '',
      content: '',
    },
  ]);
  const [currentText, setCurrentText] = useState(null);

  useEffect(() => {
    console.log('useEfect', props.props);
    options.sort();
    getMessages();
    GetSoru();
  }, [GetSoru, todos.Soru, options.value]);
  // Get Socket Message
  const getMessages = () => {
    props.props.Ws.onmessage = e => {
      console.log('oneToMany Message : ', e.data);
      if (JSON.parse(e.data).key === 'party_answered_question') {
        console.log('party answer');
      }
      if (JSON.parse(e.data).key === 'incoming_message') {
        setCurrentText(JSON.parse(e.data).data.message);
      }
    };
  };
  const pressHandler = id => {
    console.log('ida is: ', id, 'Soru: ', Soru);
    setSecilen(id);
    // sendCevap(Soru, id);
    /* setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
    */
  };
  const pressSendCevap = async result => {
    console.log('secilen: ', secilen);
    sendCevap(Soru, secilen);
    await GetSoru();
  };
  //TODO: Soru Getir
  const GetSoru = async () => {
    try {
      console.log('Sorular: ', options);
      setTodos([
        {
          id: 1,
          key: createGuid(),
          type: '',
          Soru: '',
          button: false,
          step: 1,
          options: [
            {
              value: '',
              label: '',
              content: '',
            },
          ],
        },
      ]);
      setOptions([
        {
          value: '',
          label: '',
          content: '',
        },
      ]);
      await getNextQuestion().then((p, i) => {
        console.log('getNextQuestiom() ', p);
        if (p.status === true) {
          if (p.data.conversation_status === 'questionnaire') {
            setSoru(p.data.question.question_id);

            setTodos(prevTodos => {
              return [
                {
                  id: p.data.question.question_id,
                  key: createGuid(),
                  type: p.data.question.type,
                  Soru: p.data.question.content,
                  button: false,
                  step: p.data.question.step,
                },
                ...prevTodos,
              ];
            });

            if (p.data.question.options !== null) {
              const dat = p.data.question.options.reverse();
              dat.map((res, index) => {
                // console.log('pit: ', res);
                /*
                setOptions([
                  {
                    key: res.value,
                    value: res.value,
                    label: res.label,
                    content: res.content,
                    options: true,
                  },
                ]);
                */
                setOptions(prevOptions => {
                  return [
                    {
                      key: res.value,
                      value: res.value,
                      label: res.label,
                      content: res.content,
                      options: true,
                    },
                    ...prevOptions,
                  ];
                });
              });
            }
          }
        }
      });
    } catch (error) {
      Alert.alert(
        'Question Error',
        error,
        [{text: 'Tamam', onPress: () => ''}],
        {
          cancelable: true,
        },
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          keyExtractor={item => item.question_id}
          data={todos}
          renderItem={({item}) => (
            <OneToManyItem
              item={item}
              options={options.reverse()}
              pressHandler={pressHandler}
              pressSendCevap={pressSendCevap}
            />
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
  },
});
