import Platform from 'react-native';

export default {
  webClientId:
    Platform.OS === 'ios'
      ? 'com.googleusercontent.apps.599660645349-oag9cvlcbgdmepjm1ifirjfu7m2ci72d' //'599660645349-oag9cvlcbgdmepjm1ifirjfu7m2ci72d.apps.googleusercontent.com'
      : '599660645349-0g422bvmc3cctt52rtfasjhu8a1lb9vo.apps.googleusercontent.com',
};
