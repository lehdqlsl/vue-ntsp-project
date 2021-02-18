// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from "./common";
import moment from "moment"

//to handle state
const state = {
  posts: [],
  failure: [],
  actFailureList: [],
  fireFailureList: [],
  doorFailureList: [],
  emerFailureList: [],
  actCount: [],
  fireCount: [],
  doorCount: [],
  emerCount: [],
  isFetching: false,
  qrcheck: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getPosts({commit}) {
    axios.get(common.define.DEST + '/gateways/count').then((Response) => {
      commit('SET_POSTS', Response.data)
    })
  },
  getFailure({commit}) {
    axios.get(common.define.DEST + '/gateways/fail').then((Response) => {
      commit('SET_FAILURE', Response.data)
    })
  },
  getSensorFailure({commit}) {
    axios.get(common.define.DEST + '/sensors/fail').then((Response) => {
      commit('SET_SENSOR_FAILURE', Response.data)
    })
  },
  getQRCheck({commit}) {
    axios.get(common.define.DEST + '/recipient/qrchecks').then((Response) => {
      commit('GET_QRCHECK', Response.data)
    })
  },
  async getSensorCount({commit}) {
    axios.get(common.define.DEST + '/sensors/count').then((Response) => {
      commit('SET_SENSOR_COUNT', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  GET_QRCHECK(state, list) {
    state.qrcheck = []
    console.log(list)
    for (let i = 0; i < list.length; i++) {
      let data = {
        방문번호: list[i].id,
        장비번호: common.FormatNumber(list[i].phone),
        방문시각: list[i].regDate,
        ID: list[i].userId,
        방문자: '오진세',
        전화번호: common.FormatNumber(list[i].mobile),
      }
      state.qrcheck.push(data);
    }
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_FAILURE(state, failure) {
    state.failure = []
    for (let i = 0; i < failure.length; i++) {
      let gatewayFailureStatus = failure[i].gatewayFailureStatus;
      let level;

      if (gatewayFailureStatus === "Unplug") {
        gatewayFailureStatus = "차단"
        level = "warning"
      } else if (gatewayFailureStatus === "Non_Receive") {
        gatewayFailureStatus = "미수신"
        level = "danger"
      }

      let data = {
        장애번호: failure[i].failureId,
        발생시각: failure[i].regDate,
        장비번호: common.FormatNumber(failure[i].phone),
        장애: gatewayFailureStatus,
        경과시간: common.elapsedTime(failure[i].regDate),
        /*인지: failure[i].aware==true?"예":"아니오",*/
        처리: failure[i].aware == true ? "처리" : "미처리",
        _cellVariants: {장애: level},
      }
      state.failure.push(data);
    }
  },
  SET_SENSOR_FAILURE(state, sensorFailure) {
    state.actFailureList = []
    state.fireFailureList = []
    state.doorFailureList = []
    state.emerFailureList = []

    for (let i = 0; i < sensorFailure.length; i++) {
      let sensorBatteryStatus = sensorFailure[i].sensorState
      /*console.log(sensorBatteryStatus)*/
      let level
      let batteryData = 0
      let networkData = 0
      if (sensorBatteryStatus == 'BATTERY_LOWEST') {
        level = "danger"
        batteryData = {
          시각: sensorFailure[i].regDate,
          장비번호: common.FormatNumber(sensorFailure[i].phone),
          센서상태: "배터리교체",
          _cellVariants: {센서상태: level}
        }
      }

      if (sensorBatteryStatus == 'NETWORK_BAD') {
        level = "danger"
        networkData = {
          시각: sensorFailure[i].regDate,
          장비번호: common.FormatNumber(sensorFailure[i].phone),
          센서상태: "통신차단",
          _cellVariants: {센서상태: level}
        }
      }

      let sensorType = sensorFailure[i].devType

      switch (sensorType) {
        case 2:
          if (batteryData != 0) {
            state.actFailureList.push(batteryData)
          }
          if (networkData != 0) {
            state.actFailureList.push(networkData)
          }
          break;

        case 11:
          if (batteryData != 0) {
            state.fireFailureList.push(batteryData)
          }
          if (networkData != 0) {
            state.fireFailureList.push(networkData)
          }
          break;

        case 18:
          if (batteryData != 0) {
            state.doorFailureList.push(batteryData)
          }
          if (networkData != 0) {
            state.doorFailureList.push(networkData)
          }
          break;

        case 10:
          if (batteryData != 0) {
            state.emerFailureList.push(batteryData)
          }
          if (networkData != 0) {
            state.emerFailureList.push(networkData)
          }
          break;
      }
    }
  },
  SET_SENSOR_COUNT(state, count) {
    state.actCount = []
    state.fireCount = []
    state.doorCount = []
    state.emerCount = []

    state.actCount.push(count[2].normal)
    state.actCount.push(count[2].low_battery)
    state.actCount.push(count[2].lowest_battery)
    state.actCount.push(count[2].bad_network)

    state.fireCount.push(count[11].normal)
    state.fireCount.push(count[11].low_battery)
    state.fireCount.push(count[11].lowest_battery)
    state.fireCount.push(count[11].bad_network)

    state.doorCount.push(count[18].normal)
    state.doorCount.push(count[18].low_battery)
    state.doorCount.push(count[18].lowest_battery)
    state.doorCount.push(count[18].bad_network)

    state.emerCount.push(count[10].normal)
    state.emerCount.push(count[10].low_battery)
    state.emerCount.push(count[10].lowest_battery)
    state.emerCount.push(count[10].bad_network)

    state.isFetching = true
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
