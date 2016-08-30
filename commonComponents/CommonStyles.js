const React = require('react-native');
const Colors = require('./Colors');

const {
  StyleSheet,
} = React;

// app 整体风格样式统一
const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowLine: {
    shadowColor: '#999999',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 1
    },
  },

  sepLine: {
    backgroundColor: Colors.backGray,
    height: 0.5,
  },
});

module.exports = commonStyles;
