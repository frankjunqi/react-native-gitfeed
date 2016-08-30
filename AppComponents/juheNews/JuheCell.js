const React = require('react-native');
const Colors = require('../../commonComponents/Colors');
const CommonComponents = require('../../commonComponents/CommonComponents');
const DXRNUtils = require('../../iosComponents/DXRNUtils');
const Routes = require('../Routes');

const {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} = React;

const JuheCell = React.createClass({

  propTypes:{
    juheCellEvent: React.PropTypes.object,
  },

  cellAction(){
    let juheCellEvent = this.props.juheCellEvent;
    const blog = {
       html: juheCellEvent.url,
       title: juheCellEvent.title
     }
     return this.props.navigator.push(
       {
         id: 'web',
         obj: blog,
       });
  },

  render(){
    const juheCellEvent = this.props.juheCellEvent;
    return (
      <TouchableHighlight underlayColor = {'lightGray'} onPress={this.cellAction}>
        <View style={styles.cellContentView} >
          <View style={styles.cellUp}>
            <TouchableOpacity>
              <Image
                source={{uri: juheCellEvent.thumbnail_pic_s}}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text numberOfLines = {2} style={styles.newsTitle}>{juheCellEvent.title}</Text>
            <Text style={styles.subDesc}>{juheCellEvent.type}{juheCellEvent.realtype}{'. '}{juheCellEvent.author_name}</Text>
            <Text style={styles.subDesc}>{juheCellEvent.date}</Text>
          </View>
          {CommonComponents.renderSepLine()}
        </View>
      </TouchableHighlight>
    );
  }

});

const styles = StyleSheet.create({
  // Row Cell ContentView
  cellContentView:{
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch',
  },

  cellUp: {
    margin: 10,
    height: 80,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 1,
  },

  avatar: {
    width: 70,
    height: 70,
    backgroundColor: Colors.backGray
  },

  newsTitle: {
    marginLeft: 10,
    marginRight: 70,
    color: '#4078C0',
    fontSize: 14,
  },

  subDesc: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 11,
    color: '#BFBFBF',
  },

  cellText: {
    marginTop: 20,
    padding: 2,
  },

  errorCellText: {
    borderColor: 'lightGray',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 20,
    padding: 2,
    backgroundColor: Colors.green,
  }
}
);

module.exports = JuheCell;
