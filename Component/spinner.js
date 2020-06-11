import React from 'react';
import {StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export const spinner = val => {
  return (
    <View>
      <Spinner
        animation="slide"
        visible={val}
        textContent={'Yükleniyor...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  spinnerTextStyle: {
    color: '#fff',
  },
});

