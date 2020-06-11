import { StyleSheet } from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  exampleContainer: {
    paddingVertical: 0,
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    paddingVertical: 50,
    paddingHorizontal: 80,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 30,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exampleContainerDark: {
    backgroundColor: colors.black
  },
  exampleContainerLight: {
    backgroundColor: 'white'
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleDark: {
    color: colors.black
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
});
