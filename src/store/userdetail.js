// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from "./common";
import auth from "./auth"

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
  noticeList: [],
  env: {
    temperature: [],
    humidity: [],
    illuminance: []
  },
  loading: false,
  statLoading: false,
  act: [],
  inact: [],
  goout: [],
  remoteList: [],
  radar: {
    am: [],
    pm: [],
    activity: [],
    breath: [],
    heart: [],
  },
  numbersList: {
    phone: "",
    _119: "",
    care1: "",
    care2: "",
    center: "",
    helper: "",
    etc1: "",
    etc2: "",
    etc3: "",
    etc4: "",
    etc5: "",
    etc6: "",
    etc7: "",
    etc8: "",
    etc9: "",
    etc10: "",
  }
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getNumbers({commit}, params) {
    axios.get(common.define.DEST + '/recipients/' + params + '/numbers').then((Response) => {
      commit('SET_NUMBERS', Response.data)
    })
  },
  deleteNotice({commit}, params) {
    axios.delete(common.define.DEST + '/recipient/notices/' + params).then((Response) => {
      location.reload()
    })
  },
  postNotice({commit}, params) {
    axios.post(common.define.DEST + '/recipient/notices', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((Response) => {
      location.reload()
    })
  },
  getNoticeList({commit}, params) {
    axios.get(common.define.DEST + '/recipient/notices', {params}).then((Response) => {
      commit('GET_NOTICE_LIST', Response.data)
    })
  },
  getSensorPeriod({commit}, params) {
    axios.get(common.define.DEST + '/sensors/cycles/' + params).then((Response) => {
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
  getRefreshTestEventList({commit}, params) {
    state.eventLoading = true
    axios.get(common.define.DEST + '/gateways/' + params + '/events/0/testmode').then((Response) => {
      commit('GET_NEW_TEST_EVENT_LIST', Response.data)
    })
  },
  getTestEventList({commit}, params) {
    state.eventLoading = true
    if (params.param2 == 0) {
      state.event = []
    }
    axios.get(common.define.DEST + '/gateways/' + params.param1 + '/events/' + params.param2 + '/testmode').then((Response) => {
      commit('GET_TEST_EVENT_LIST', Response.data)
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
      if (Response.data == '') {
        alert("존재하지 않는 대상자입니다.")
      } else {
        commit('GET_RECIPIENT_DATA', Response.data)
      }
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
    axios.get(common.define.DEST + '/open/v1/gateways/' + params + '/logs').then((Response) => {
      commit('GET_LOG_LIST', Response.data)
    })
  },
  getRequestHistory({commit}, params) {
    axios.get(common.define.DEST + '/open/v1/gateways/' + params + '/remotes').then((Response) => {
      commit('GET_REMOTE_LIST', Response.data)
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
  getTemp({commit}, parameter) {
    state.loading = false
    axios.get(common.define.DEST + '/gateways/' + parameter.phone + '/sensors/4/data', {
      params: {
        dateType: parameter.dateType
      }
    }).then((Response) => {
      commit('SET_ENV', Response.data)
    })
  },
  getRadar({commit}, parameter) {
    state.statLoading = false
    axios.get(common.define.DEST + '/gateways/' + parameter.phone + '/sensors/3/data', {
      params: {
        dateType: parameter.dateType
      }
    }).then((Response) => {
      commit('SET_RADAR', Response.data)
    })
  },
  getAct({commit}, parameter) {
    state.statLoading = false
    axios.get(common.define.DEST + '/gateways/' + parameter.phone + '/sensors/2/data', {
      params: {
        dateType: parameter.dateType
      }
    }).then((Response) => {
      commit('SET_ACT', Response.data)
    })
  },
  getStat({commit}, parameter) {
    state.statLoading = false
    axios.get(common.define.DEST + '/gateways/' + parameter.phone + '/stats/' + parameter.eventType, {
      params: {
        dateType: parameter.dateType
      }
    }).then((Response) => {
      if (parameter.eventType == 7) {
        commit('SET_INACT', Response.data)
      } else if (parameter.eventType == 17) {
        commit('SET_GOOUT', Response.data)
      }
    })
  }
}

//to handle mutations
const mutations = {
  SET_NUMBERS(state, data) {
    state.numbersList = data
  },
  SET_RADAR(state, data) {
    state.radar.am = data.radar.am
    state.radar.pm = data.radar.pm
    state.radar.activity = data.activity
    state.radar.breath = data.breath
    state.radar.heart = data.heart
    state.statLoading = true
  },
  GET_REMOTE_LIST(state, list) {
    state.remoteList = list
  },
  SET_RESET(state) {
    state.gateways = []
    state.sensors = []
  },
  SET_RECIPIENT_RESET(state) {
    state.recipient = []
  },
  GET_TEST_EVENT_LIST(state, list) {
    for (let i = 0; i < list.length; i++) {
      let eventType = list[i].eventType
      list[i].eventType = common.tranEventType(eventType)
      list[i].type = 'info'
      state.event.push(list[i])
    }
    state.eventLoading = false

  },
  SET_GOOUT(state, act) {
    state.goout = act.inactivity
    state.statLoading = true
  },
  SET_INACT(state, act) {
    state.inact = act.inactivity
    state.statLoading = true
  },
  SET_ACT(state, act) {
    state.act = act.activity
    state.statLoading = true
  },
  SET_ENV(state, env) {
    state.env = env
    state.loading = true
  },
  GET_NOTICE_LIST(state, list) {
    state.noticeList = list
  },
  GET_SENSOR_CYCLE(state, list) {
    state.sensorCycle = list
  },
  GET_DEVICES(state, list) {
    state.devices = []
    state.gateway = ''

    for (let i = 0; i < list.length; i++) {
      if (list[i].devType == 0) {
        state.gateway = list[i]
        state.gateway.macAddr = common.FormatNumber(list[i].macAddr)
      } else {
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
    data.image = common.define.DEST + '/open/v1/recipients/' + data.phone + '/profile'
    data.phone = common.FormatNumber(data.phone)
    state.recipientInfo = data
  },
  GET_RECIPIENT_LIST(state, list) {
    state.recipient = []
    for (let i = 0; i < list.length; i++) {
      let phone = list[i].recipientInfo.phone
      let regDate = list[i].recipientInfo.regDate
      list[i].recipientInfo.phone = common.FormatNumber(phone)
      list[i].regDate = regDate
    }
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
      list[i].type = common.eventTagColor(eventType)
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
        list[i].type = common.eventTagColor(eventType)
        tmp.push(list[i])
      } else {
        break;
      }
    }

    for (let i = 0; i < tmp.length; i++) {
      state.event.unshift(tmp[i])
    }

    state.eventLoading = false
  },
  GET_NEW_TEST_EVENT_LIST(state, list) {
    //state.event = []
    let tmp = []
    for (let i = 0; i < list.length; i++) {
      if (state.event[0].eventId != list[i].eventId) {
        let eventType = list[i].eventType

        list[i].eventType = common.tranEventType(eventType)
        list[i].type = common.eventTagColor(eventType)
        tmp.push(list[i])
      } else {
        break;
      }
    }

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
        fw_ver: list[i].fw_ver,
        gatewayStatus: common.failureType(list[i].gatewayStatus),
        network: list[i].network == 1 ? "정상" : "불량",
        power: list[i].power == 1 ? "연결" : "차단",
        battery: list[i].battery,
        send_reg_date: list[i].send_reg_date,
        mac_addr: common.FormatNumber(list[i].mac_addr),
        phone: common.FormatNumber(list[i].phone),
        sensitivity: list[i].sensitivity
      }
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
