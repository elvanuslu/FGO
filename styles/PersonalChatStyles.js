import {Platform, StyleSheet, Dimensions} from 'react-native';

// Screen Styles
const {width, height} = Dimensions.get('window');
import theme from '../Themes';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    height: 65,
    width: width,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        paddingTop: 5,
      },
      android: {
        paddingTop: 5,
      },
    }),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftMsg: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: 'white',
  },

  body: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  right: {
    flex: 1.1,
    alignItems: 'center',
    marginRight: width * 0.02,
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
  },

  headerTitle: {
    color: '#fff',
    fontFamily: 'Raleway-Regular',
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
    fontSize: 17,
    letterSpacing: 0.7,
  },

  content: {
    backgroundColor: 'white',
    paddingTop: height * 0.04,
  },

  rowMain: {
    marginHorizontal: width * 0.03,
  },

  iconSize: {
    width: height * 0.03,
    fontSize: 30,
    color: 'white',
  },

  iconSizeFooter: {
    height: height * 0.04,
    width: height * 0.04,
    resizeMode: 'contain',
  },

  footerStyle: {
    borderTopWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
  },

  footerLeft: {
    flex: 0.6,
    alignItems: 'center',
  },

  footerLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageBox: {
    height: height * 0.045,
    width: width * 0.69,
    borderWidth: 1,
    borderColor: '#c7c7cc',
    borderRadius: 4,
  },

  footerRight: {
    flex: 0.6,
    alignItems: 'center',
  },

  footerRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightChatMain: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginRight: width * 0.03,
    marginLeft: width * 0.08,
  },

  leftChatMain: {
    flexDirection: 'row',
    marginRight: width * 0.35,
    marginLeft: -30,
  },

  rightChatBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.055,
    borderRadius: 10,
    marginRight: height * 0.001,
    zIndex: 10,
  },

  leftChatBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff', //'#e5e5ea',
    borderRadius: 10,
    zIndex: 10,
  },

  rightIndicatorMain: {
    alignSelf: 'flex-end',
    height: height * 0.025,
    width: height * 0.025,
    position: 'absolute',
    right: -18,
    flexDirection: 'row',
  },

  leftIndicatorMain: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },

  rightIndicator: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    height: height * 0.025,
    width: height * 0.025,
    marginRight: height * 0.019,
    position: 'absolute',
    zIndex: 5,
    right: 0,
    bottom: 1,
  },

  leftIndicator: {
    resizeMode: 'contain',
    height: height * 0.025,
    width: height * 0.025,
    marginLeft: Platform.OS === 'ios' ? height * 0.036 : width * 0.061,
    position: 'absolute',
    zIndex: 5,
    bottom: 1,
  },

  profile: {
    resizeMode: 'cover',
    height: height * 0.04,
    width: height * 0.04,
    borderRadius: height * 0.02,
    margin: 1,
  },
  separator: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'red',
  },
  SoruMain: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginRight: width * 0.03,
    marginLeft: width * 0.08,
  },
});

export default styles;
