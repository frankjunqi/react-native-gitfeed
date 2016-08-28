const React = require('react-native');
const CommonComponents = require('../commonComponents/CommonComponents');
const Config = require('../networkService/GHConfig');
const PropTypes = React.PropTypes;

// 读取 LanguageList.json 文件中的list
const Languages = require('../commonComponents/LanguageList');

const Colors = require('../commonComponents/Colors');
const DXRNUtils = require('../commonComponents/DXRNUtils');
const Platform = require('Platform');

const {
  ListView,
  View,
  ActivityIndicatorIOS,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Picker,
} = React;

const LISTVIEWREF = 'listview';
const CONTAINERREF = 'container';

const FloorListView = React.createClass({
  // 此组件涉及的属性 4个
  propTypes: {
    toggleOn: React.PropTypes.bool,
    languageList: React.PropTypes.array,
    onSelectLanguage: React.PropTypes.func,
    currentLanguage: React.PropTypes.string,
  },

  // 设置默认的属性的值，除func类型
  getDefaultProps() {
    return {
      languageList: Languages,
      toggleOn: false,
      currentLanguage: 'All Languages',
    }
  },

  // 初始化此组件涉及到的 state的状态:  toggleon currentLanguage 这2个状态
  getInitialState() {
    return {
      toggleOn: this.props.toggleOn,
      currentLanguage: this.props.currentLanguage,
    }
  },

  // 初始化此组件的，属性的func类型
  onSelectLanguage(selectedLanguage) {
    DXRNUtils.trackClick('clickLan', {name: 'Explore 打开语言选择'});
    if (this.state.currentLanguage == selectedLanguage) {
      // 设置组件状态
      this.setState({
        toggleOn: false,
      });
      return;
    }
    // 设置组件状态
    this.setState({
      toggleOn: false,
      currentLanguage: selectedLanguage,
    });
    this.props.onSelectLanguage(selectedLanguage);
  },

  // 状态改变 回进行render函数的执行，即：刷新页面，dom节点的更新
  render() {
    const languageList = this.props.languageList;
    const selectedLanguage = this.state.currentLanguage || languageList[0];

    if (Platform.OS == 'ios') {
      if (!this.state.toggleOn) {
        return (
          <TouchableOpacity
            style={styles.chooseLan}
            onPress={() => this.setState({
              toggleOn: true,
            })}>
            <Text style={styles.lan}>
              {selectedLanguage}
            </Text>
          </TouchableOpacity>
        );
      } else {
        const pickerHeight = require('NativeModules').UIManager.RCTPicker.Constants.height;
        return (
          <View style={{height: pickerHeight}} ref={CONTAINERREF}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={this.onSelectLanguage}
              mode={'dropdown'}
              >
              {this.props.languageList.map((obj, index) => {
                return (
                  <Picker.Item key={index} label={obj} value={obj}/>
                );
              })}
            </Picker>
            <TouchableOpacity
              style={styles.chooseLan}
              onPress={() => this.setState({
                toggleOn: false,
              })}>
              <Text style={styles.lan}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else if (Platform.OS == 'android') {
      return (
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={this.onSelectLanguage}
          mode={'dropdown'}
          style={{width: 150, alignSelf: 'center', height: 40}}
          >
          {this.props.languageList.map((obj, index) => {
            return (
              <Picker.Item key={index} label={obj} value={obj}/>
            );
          })}
        </Picker>
      )
    }
  },
});

const ICON_SIZE = 20;

// languageList 中的cell的样式组件
const LanguageCell = React.createClass({
  // 2个属性
  propTypes: {
    name: React.PropTypes.string,
    onSelectCell: React.PropTypes.func,
  },

  onSelectCell() {
    this.props.onSelectCell && this.props.onSelectCell(this.props.name);
  },

  render() {
    return (
      <TouchableHighlight onPress={this.onSelectCell} underlayColor={'lightGray'}>
        <View style={styles.cellContentView}>
          <Text style={styles.userName}>{this.props.name}</Text>
        </View>
      </TouchableHighlight>
    );
  },
});

const styles = StyleSheet.create({
  cellContentView: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderBottomWidth: 0.5,
  },
  userName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    flex: 1,
  },
  cellLeftRepoIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 8,
  },
  lan: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chooseLan: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: Colors.backGray,
  },
});

module.exports = FloorListView;
