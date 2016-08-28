const React = require('react-native');
const Colors = require('../../commonComponents/Colors');

const {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} = React;

// 组建 Usercell
const UserCell = React.createClass({
  // 属性
  propTypes: {
    user: React.PropTypes.object,
  },

  // 操作事件
  openTargetUser() {
    const user = this.props.user;
    const type = user.type;
    if (type == 'User') {
      this.props.navigator.push({id: 'user', obj: user});
    } else {
      this.props.navigator.push({id: 'org', obj: user});
    }
  },

  // 渲染
  render() {
    const user = this.props.user;
    return (
      <TouchableHighlight onPress={this.openTargetUser} underlayColor={'lightGray'}>
        <View style={styles.cellContentView}>
          <Image style={styles.avatar} source={{uri: user.avatar_url}}/>
          <Text style={styles.userName}>{user.login}</Text>
        </View>
      </TouchableHighlight>
    )
  },
});

// 样式表
const styles = StyleSheet.create({
  cellContentView: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: 0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    marginLeft: 15,
    backgroundColor: 'lightGray',
  },
  userName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
  },

});

module.exports = UserCell;
