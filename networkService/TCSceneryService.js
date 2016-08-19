
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
            return = result;
          }
        }
      )
      .catch(err => {
          console.log('[Error] readDataFromCache is: '+err);
      }
      )
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

  /* Accept-Encoding: gzip
  User-Agent: okhttp/2.5.0
  Content-Type: application/json
  alisign: 7d135d263fe6a299fddcbf36069da13e5f2524e9
  reqdata: bdf9daa5d1652b64a9a6752e23d4e182
  secver: 5
  sxx: fb96bc8be348bdbdf16860dbfc545c02
  Connection: Keep-Alive
  Host: 61.155.197.173:8008*/
  // 请求网络
  requestDateFromNetwork(){
    return(
      fetch(config.HOST_DEBUG,{
        method: "POST",
        headers:{
          'Content-Type':'application/json',
          'alisign':'7d135d263fe6a299fddcbf36069da13e5f2524e9',
          'reqdata':'bdf9daa5d1652b64a9a6752e23d4e182',
          'secver':'5',
          'sxx':'fb96bc8be348bdbdf16860dbfc545c02',
          'Connection':'Keep-Alive',
          'Accept-Encoding':'gzip'
        },
        body: JSON.stringify({
          'request': JSOn.stringify({
            'body': JSON.stringify({
              'appKey':'1',
              'deviceId':'eeb6c8a6b60590e1',
              'lon':'120.736491',
              'typeid':'1',
              'destCityName':'上海',
              'localCityId':'226',
              'memberId':'I0_d98625b70d78aaa0aaa60562fb4bad46',
              'searchFrom':'0',
              'page':'1',
              'cityId':'321',
              'isbanner':'0',
              'fromType':'1',
              'topfilters':[],
              'pageSize':'10',
              'residentBigDataCity':'苏州',
              'filters':[],
              'sessionId':'2137664092',
              'cs':'2',
              'sceneryType':'20301',
              'countyId':'0',
              'residentCity':'苏州',
              'lat':'31.25754',
              'sessionCount':'4',
              'clientInfo':JSON.stringify({
                'clientId':'5c2dbcb0f41e4c4d2e65b91b2b7229ad32db35205011',
                'clientIp':'10.101.168.214',
                'device':'eeb6c8a6b60590e1|arm64-v8a|1080*1794*420|Nexus 5X|00eeddbb3770acf3',
                'deviceId':'eeb6c8a6b60590e1',
                'extend':'4^6.0.1,5^Nexus 5X,6^-1',
                'mac':'02:00:00:00:00:00',
                'manufacturer':'LGE',
                'networkType':'wifi',
                'pushInfo':'129b7509fc6e8bee462d9fbadf9d478197c48885',
                'refId':'5866720',
                'systemCode':'tc',
                'tag':'|^2017^226^|v300v13.2814.2814.1v',
                'versionNumber':'8.1.5',
                'versionType':'android'
              })
            }),
            'header':JSON.stringify({
              'accountID':'c26b007f-c89e-431a-b8cc-493becbdd8a2',
              'digitalSign':'6c377d656e45e3ca1318130980e68f11',
              'reqTime':'1471594919543',
              'serviceName':'getscenerysearchlist',
              'version':'20111128102912'
            })
          })
        })
      }).then( response =>{
          const httpStatus = response.status;
          const strBody = response._bodyInit;
          const objBody  = JSON.parse(strBody);
          console.log('requestDateFromNetwork: strBody'+strBody);
          if (httpStatus < 400) {
            return objBody;
          }else{
            throw new Error(json.message);
          }
      })
    )

  }

}
