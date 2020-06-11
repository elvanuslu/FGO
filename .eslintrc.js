module.exports = {
  root: true,
  extends: '@react-native-community',
  "rules": {
    "react-hooks/rules-of-hooks": "error",  //Hooks kurallarını kontrol eder
    "react-hooks/exhaustive-deps": "warn" //Efekt bağımlılıklarını kontrol eder
  }
};
