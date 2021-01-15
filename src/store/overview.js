// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from "./common";

//to handle state
const state = {
  posts: [],
  failure: [],
  actFailureList: [],
  fireFailureList: [],
  doorFailureList: [],
  emerFailureList: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getPosts({ commit }) {
    console.log(common.define.DEST)
    axios.get(common.define.DEST+'/gateways/count').then((Response)=>{
      commit('SET_POSTS', Response.data)
    })
  },
  getFailure({ commit }) {
    axios.get(common.define.DEST+'/gateways/fail').then((Response)=>{
      commit('SET_FAILURE', Response.data)
    })
  },
  getSensorFailure({ commit }) {
    axios.get(common.define.DEST+'/sensors/fail').then((Response)=>{
      commit('SET_SENSOR_FAILURE', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  SET_POSTS(state, posts){
    state.posts = posts
  },
  SET_FAILURE(state, failure){
    state.failure = []
    for (let i=0 ; i<failure.length ;i++ ){
      let gatewayFailureStatus = failure[i].gatewayFailureStatus;
      let level;

      if(gatewayFailureStatus === "Unplug"){
        gatewayFailureStatus = "차단"
        level = "warning"
      } else if(gatewayFailureStatus === "Non_Receive"){
        gatewayFailureStatus = "미수신"
        level = "danger"
      }

      let data = {
        시각: failure[i].regDate,
        번호: failure[i].phone,
        장애: gatewayFailureStatus,
        경과시간: failure[i].elapsed_time,
        인지: failure[i].aware==true?"예":"아니오",
        처리: failure[i].closed==true?"처리":"미처리",
        _cellVariants: { 장애: level}
      }
      state.failure.push(data);
    }
  },
  SET_SENSOR_FAILURE(state, sensorFailure){
    state.actFailureList = []
    state.fireFailureList = []
    state.doorFailureList = []
    state.emerFailureList = []

    for (let i=0 ; i<sensorFailure.length ;i++ ) {
      let sensorBatteryStatus = sensorFailure[i].sensorState

      let level
      let batteryData = 0
      let networkData = 0
      if(sensorBatteryStatus == 'BATTERY_LOWEST'){
        level="danger"
        batteryData = {
          시각: sensorFailure[i].regDate,
          번호: sensorFailure[i].phone,
          센서상태: "배터리교체",
          _cellVariants: { 센서상태: level}
        }
      }

      if(sensorBatteryStatus == 'NETWORK_BAD'){
        level="danger"
        networkData = {
          시각: sensorFailure[i].regDate,
          번호: sensorFailure[i].phone,
          센서상태: "통신차단",
          _cellVariants: { 센서상태: level}
        }
      }

      let sensorType = sensorFailure[i].devType

      switch (sensorType) {
        case 2:
          if(batteryData != 0){
            state.actFailureList.push(batteryData)
          }
          if(networkData != 0){
            state.actFailureList.push(networkData)
          }
          break;

        case 11:
          if(batteryData != 0){
            state.fireFailureList.push(batteryData)
          }
          if(networkData != 0){
            state.fireFailureList.push(networkData)
          }
          break;

        case 18:
          if(batteryData != 0){
            state.doorFailureList.push(batteryData)
          }
          if(networkData != 0){
            state.doorFailureList.push(networkData)
          }
          break;

        case 10:
          if(batteryData != 0){
            state.emerFailureList.push(batteryData)
          }
          if(networkData != 0){
            state.emerFailureList.push(networkData)
          }
          break;
      }
    }
  }
}

//export store module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
