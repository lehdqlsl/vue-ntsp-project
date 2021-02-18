// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from './common'

//to handle state
const state = {
  failure: "",
  actionList: [],
  failureList: [],
  emergency: "",
  emerActionList: [],
  emergencyList: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getFailure({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/failure/' + params).then((Response)=>{
      commit('GET_FAILURE', Response.data)
    })
  },
  postFailureAction({ commit }, params) {
    axios.post(common.define.DEST+'/gateways/failure/action',params).then((Response)=>{

    })
  },
  getFailureAction({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/failure/actions/'+params).then((Response)=>{
      commit('GET_FAILURE_ACTION_LIST', Response.data)
    })
  },
  getFailureList({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/failures/'+params).then((Response)=>{
      commit('GET_FAILURE_LIST', Response.data)
    })
  },
  ////////////////////
  getEmerEvent({ commit }, params) {
    axios.get(common.define.DEST+'/events/emergency/' + params).then((Response)=>{
      commit('GET_EMERGENCY', Response.data)
    })
  },
  postEmerEventAction({ commit }, params) {
    axios.post(common.define.DEST+'/events/emergency/action',params).then((Response)=>{

    })
  },
  getEmerActionList({ commit }, params) {
    axios.get(common.define.DEST+'/events/emergency/actions/'+params).then((Response)=>{
      commit('GET_EMERGENCY_ACTION_LIST', Response.data)
    })
  },
  getEmergencyList({ commit }, params) {
    axios.get(common.define.DEST+'/events/emergencies/'+params).then((Response)=>{
      commit('GET_EMERGENCY_LIST', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  //----------------- 응급처리 관련 함수 START -----------------//
  GET_EMERGENCY(state, get){
    let closed = get.closed
    get.closed = (closed == true) ? "해결됨" : "미처리"

    state.emergency = get

    state.emergency.phone = get.eventId.phone
    state.emergency.eventType = common.tranEventType(get.eventId.eventType)
    state.emergency.regDate = get.eventId.gwRegDate

    state.emergency.eventId = get.eventId.eventId

  },
  GET_EMERGENCY_ACTION_LIST(state, list){
    state.emerActionList = []

    for(let i=0 ; i<list.length ; i++){
      let data = {
        응급번호: list[i].emergencyId.emergencyId,
        처리시각: list[i].svRegDate,
        처리자: "이동빈",
        내용: list[i].text,
        처리: list[i].emergencyId.closed == true ? "처리" : "미처리"
      }
      state.emerActionList.push(data)
    }
  },
  GET_EMERGENCY_LIST(state, list){
    state.emergencyList = []

    for(let i=0 ; i<list.length ; i++){
      let data = {
        이벤트번호: list[i].emergencyId,
        이벤트: common.tranEventType(list[i].eventId.eventType),
        발생시각: list[i].eventId.gwRegDate,
        처리시각: list[i].closedDate,
        처리자: "이동빈",
        상태: list[i].closed == true ? "해결됨" : "미처리"
      }
      state.emergencyList.push(data)
    }
  },
  //----------------- 응급처리 관련 함수 END -----------------//
  GET_FAILURE_ACTION_LIST(state, list){
    state.actionList = []

    for(let i=0 ; i<list.length ; i++){
      let data = {
        장애번호: list[i].failureId.failureId,
        처리시각: list[i].svRegDate,
        처리자: "이동빈",
        내용: list[i].text,
        //처리: list[i].failureId.aware == true ? "처리" : "미처리",
        //상태: list[i].failureId.close == true ? "처리" : "미처리"
        처리상태: list[i].title
      }
      state.actionList.push(data)
    }
  },
  GET_FAILURE(state, get){
    let closed = get.closed
    get.closed = closed == true ? "해결됨" : "미처리"
    get.aware = get.aware == true ? "처리완료" : "미처리"

    let status = get.gatewayFailureStatus

    if(status == "Unplug"){
      get.gatewayFailureStatus = "전원 차단"
    }else{
      get.gatewayFailureStatus = "데이터 미수신"
    }

    state.failure = get
  },
  GET_FAILURE_LIST(state, list){
    state.failureList = []

    for(let i=0 ; i<list.length ; i++){
      let status = list[i].gatewayFailureStatus

      let data = {
        장애번호: list[i].failureId,
        이벤트: common.failureType(status),
        발생시각: list[i].regDate,
        처리시각: list[i].closedDate,
        처리자: "이동빈",
        상태: list[i].closed == true ? "해결됨" : "미처리"
      }
      state.failureList.push(data)
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
