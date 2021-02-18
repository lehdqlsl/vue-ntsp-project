// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from "./common";

//to handle state
const state = {
  recipient: [],
  period: [],
  event: [],
  phone: "",
  gateways: [],
  sensors: [],
  recipientInfo: "",
  cycleLoading: true,
  eventLoading: true,
  logList: [],
  devices: [],
  gateway: '',
  sensorCycle: [],
  noticeList: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  deleteNotice({commit}, params){
    axios.delete(common.define.DEST + '/recipient/notices/'+ params).then((Response) => {
      location.reload()
    })
  },
  postNotice({commit}, params){
    axios.post(common.define.DEST + '/recipient/notices', params).then((Response) => {
      location.reload()
    })
  },
  getNoticeList({commit}, params){
    axios.get(common.define.DEST + '/recipient/notices', {params}).then((Response) => {
      commit('GET_NOTICE_LIST', Response.data)
    })
  },
  getSensorPeriod({commit}, params) {
    axios.get(common.define.DEST + '/sensors/cycles/'+ params).then((Response) => {
      commit('GET_SENSOR_CYCLE', Response.data)
    })
  },
  getRecipientList({commit}, params) {
    axios.get(common.define.DEST + '/recipients/search', {params}).then((Response) => {
      commit('GET_RECIPIENT_LIST', Response.data)
    })
  },
  getPeriodList({commit}, params) {
    state.cycleLoading = true
    axios.get(common.define.DEST + '/gateways/' + params.phone + '/cycles', {params}).then((Response) => {
      commit('GET_PERIOD_LIST', Response.data)
    })
  },
  getRefreshEventList({commit}, params) {
    state.eventLoading = true
    axios.get(common.define.DEST + '/gateways/' + params + '/events/0').then((Response) => {
      commit('GET_NEW_EVENT_LIST', Response.data)
    })
  },
  getEventList2({commit}, params) {
    state.eventLoading = true
    if (params.param2 == 0) {
      state.event = []
    }
    axios.get(common.define.DEST + '/gateways/' + params.param1 + '/events/' + params.param2).then((Response) => {
      commit('GET_EVENT_LIST', Response.data)
    })
  },
  postRecipient({commit}, params) {
    axios.post(common.define.DEST + '/recipients', params).then((Response) => {
      commit('GET_RECIPIENT_DATA', Response.data)
    })
  },
  getRecipientInfo({commit}, params) {
    axios.get(common.define.DEST + '/recipients/' + params).then((Response) => {
      commit('GET_RECIPIENT_DATA', Response.data)
    })
  },
  getGatewayList({commit}, params) {
    axios.get(common.define.DEST + '/gateways/search', {params}).then((Response) => {
      commit('GET_GATEWAY_LIST', Response.data)
    })
  },
  getSensorList({commit}, params) {
    axios.get(common.define.DEST + '/sensors/search', {params}).then((Response) => {
      commit('GET_SENSOR_LIST', Response.data)
    })
  },
  postRequestLog({commit}, params) {
    axios.post(common.define.DEST + '/gateways/' + params.phone + '/request-log', params.parameter).then((Response) => {

    })
  },
  getRequestLog({commit}, params) {
    axios.get(common.define.DEST + '/gateways/' + params + '/logs').then((Response) => {
      commit('GET_LOG_LIST', Response.data)
    })
  },
  postImageUpload({commit}, formData) {

    axios.post(common.define.DEST + '/gateways/' + formData.get('phone') + '/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((Response) => {
      location.reload()
    })
  },
  getDevices({commit}, params) {
    axios.get(common.define.DEST + '/gateways/' + params + '/devices').then((Response) => {
      commit('GET_DEVICES', Response.data)
    })
  },
}

//to handle mutations
const mutations = {
  GET_NOTICE_LIST(state, list){
    state.noticeList = list
  },
  GET_SENSOR_CYCLE(state, list){
    state.sensorCycle = list
  },
  GET_DEVICES(state, list) {
    state.devices = []
    state.gateway = ''

    for(let i=0;i<list.length;i++){
      if(list[i].devType == 0){
        state.gateway = list[i]
        state.gateway.macAddr = common.FormatNumber(list[i].macAddr)
      }else{
        list[i].devType = common.tranDevType(list[i].devType)
        list[i].macAddr = common.FormatNumber(list[i].macAddr)
        state.devices.push(list[i])
      }
    }
  },
  GET_LOG_LIST(state, list) {
    state.logList = []
    state.logList = list
  },
  GET_RECIPIENT_DATA(state, data) {
    data.image = 'http://14.47.229.122:8443/gateways/' + data.phone + '/profile'
    data.phone = common.FormatNumber(data.phone)
    state.recipientInfo = data
  },
  GET_RECIPIENT_LIST(state, list) {
    state.recipient = list
  },
  GET_PERIOD_LIST(state, list) {
    state.period = list
    state.cycleLoading = false
  },
  SET_PHONE(state, phone) {
    state.phone = phone
  },
  GET_EVENT_LIST(state, list) {

    for (let i = 0; i < list.length; i++) {
      let eventType = list[i].eventType

      list[i].eventType = common.tranEventType(eventType)

      if (eventType == 11 || eventType == 15 || eventType == 2) {
        list[i].type = 'danger'
      } else if (eventType == 7 || eventType == 5) {
        list[i].type = 'warning'
      } else if (eventType == 100) {
        list[i].type = 'success'
      } else {
        list[i].type = 'primary'
      }
      state.event.push(list[i])
    }

    state.eventLoading = false
  },
  GET_NEW_EVENT_LIST(state, list) {
    //state.event = []
    let tmp = []
    for (let i = 0; i < list.length; i++) {
      if (state.event[0].eventId != list[i].eventId) {
        let eventType = list[i].eventType

        list[i].eventType = common.tranEventType(eventType)
        if (eventType == 11 || eventType == 15 || eventType == 2) {
          list[i].type = 'danger'
        } else if (eventType == 7 || eventType == 5) {
          list[i].type = 'warning'
        } else if (eventType == 100) {
          list[i].type = 'success'
        } else {
          list[i].type = 'primary'
        }
        console.log("새로운이벤트:")
        console.log(list[i])

        tmp.push(list[i])
      } else {
        break;
      }
    }
    console.log("***********")
    console.log(tmp)
    console.log("***********")
    for (let i = 0; i < tmp.length; i++) {
      state.event.unshift(tmp[i])
    }

    state.eventLoading = false
  },
  GET_GATEWAY_LIST(state, list) {
    state.gateways = []
    for (let i = 0; i < list.length; i++) {
      let data = {
        app_ver: list[i].app_ver,
        gatewayStatus: common.failureType(list[i].gatewayStatus),
        network: list[i].network == 1 ? "정상" : "불량",
        power: list[i].power == 1 ? "연결" : "차단",
        send_reg_date: list[i].send_reg_date,
        mac_addr: list[i].mac_addr,
        phone: list[i].phone
      }
      data.network = data.network + "(" + list[i].sensitivity + ")"
      state.gateways.push(data)
    }
    //state.gateways = list
  },
  GET_SENSOR_LIST(state, list) {
    state.sensors = []
    for (let i = 0; i < list.length; i++) {
      let data = {
        network: list[i].network == 1 ? "정상" : "차단",
        battery: common.batteryStatus(list[i].battery),
        macAddr: common.FormatNumber(list[i].macAddr),
        devType: common.tranDevType(list[i].devType),
        phone: common.FormatNumber(list[i].phone),
        sendRegDate: list[i].send_reg_date,
        sensitivity: list[i].sensitivity
      }
      state.sensors.push(data)
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
