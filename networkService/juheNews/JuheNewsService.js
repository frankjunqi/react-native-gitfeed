const JuheNewsConfig = require('./JuheNewsConfig');
const React = require('react-native');
const base64 = require('base-64');
const {EventEmitter} = require('events');

const {
  AsyncStorage,
  Navigator
} = React;

class JuheNewsService extends EventEmitter{

  constructor(){
    super();
  }

  getJuheNewsUrl(type){
    let requestUrl = JuheNewsConfig.JUHE_NEWS_HOST + "?type=" + type + "&key=" + JuheNewsConfig.JUHE_NEWS_KEY;
    return requestUrl;
  }

  requestJuheNewsDateFromNetwork(type){
    let requestUrl = JuheNewsConfig.JUHE_NEWS_HOST + "?type=" + type + "&key=" + JuheNewsConfig.JUHE_NEWS_KEY;
    return (
      fetch(requestUrl,{method: "GET"})
      .then( (response) => {
        console.log(requestUrl + ": \n" + response);
      })
      .catch( (error) => {
        console.log(error);
      })
    );
  }

}

// 感觉有点单例
const juheNewsService = new JuheNewsService();

module.exports = juheNewsService;
