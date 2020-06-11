/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
const closeBtn = require('../../assets/overlay-close.png');
const overlayBg = require('../../assets/overlay-bg.png');
const logoSrc = require('../../assets/logo.png');

const OverlayView = props => {
  return (
    <View style={styles.background}>
      <View style={styles.closeBtnWrapper}>
        <TouchableOpacity onPress={() => props.closeAction()}>
          <Image source={closeBtn} style={styles.closeBtn} />
        </TouchableOpacity>
      </View>
      <View style={styles.overlay}>
        <View
          style={{
            position: 'absolute',
            overflow: 'hidden',
            height: 300,
            top: -62,
            left: 0,
            right: 0,
          }}>
          <Image
            source={overlayBg}
            style={{
              width: '100%',
              height: 300,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              resizeMode: 'contain',
            }}
          />
        </View>
        {props.hasLogo && (
          <Image
            source={logoSrc}
            style={{
              width: 80,
              height: 20,
              resizeMode: 'contain',
              marginTop: 10,
              marginBottom: 35,
            }}
          />
        )}
        {props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(100,100,100,.75)',
    zIndex: 99,
  },
  overlay: {
    alignItems: 'center',
    position: 'absolute',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 25,
    paddingLeft: 25,
    left: 15,
    right: 15,
    top: 100,
    bottom: 60,
    borderRadius: 30,
    backgroundColor: 'rgb(255,255,255)',
  },
  closeBtnWrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: 55,
  },
  closeBtn: {
    width: 32,
    height: 32,
  },
});

export default OverlayView;
