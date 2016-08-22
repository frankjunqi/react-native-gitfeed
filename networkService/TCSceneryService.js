
const config = require('../TCConfig');
const React = require('react-native');
const base64 = require('base-64');
const scenerySearchListReqBody = require('./scenerySearchListReqBody')

const {EventEmitter} = require('events');

const{
  AsyncStorage,
  Navigator,
} = React;

class TCSceneryService extends EventEmitter {
  // 默认构造函数
  constructor() {
    super();
  }

  //  读取缓存
  readDataFromCache(dateKey){
    return (
      AsyncStorage.getItem(dateKey)
      .then( result => {
          if (result) {
            console.log('Cache Key:'+dateKey+'; Cache Date:'+result+'.');
            return result;
          }
        }
      )
      .catch(err => {
          console.log('[Error] readDataFromCache is: '+err);
      })
    );
  }

  // 设置缓存
  saveDateToCache(dateKey,dateValue){
    if (dateKey == '') {
      console.log('saveDateToCache\'s dateKey is null.');
      return "Error";
    }
    return AsyncStorage.setItem(dateKey,dateValue);
  }

  // 移除缓存
  removeDateFromCache(dateKey){
    return AsyncStorage.removeItem(dateKey);
  }

  // 请求网络
  requestDateFromNetwork(){
    return(
      fetch(config.JUHE_NEWS+"?type=top&key="+config.JUHE_NEWS_KEY,{
        method: "GET"
      }).then( response =>{
          const httpStatus = response.status;
          const strBody = response._bodyInit;
          const objBody  = JSON.parse(strBody);
          console.log('requestDateFromNetwork: strBody'+httpStatus+'; objBody.reason='+objBody.reason);
          if (httpStatus < 400) {
            return strBody;
          }else{
            return "this is null.";
          }
      }).then( value => {

      })
    )}

}
const TCSingleService = new TCSceneryService();

module.exports = TCSingleService;
