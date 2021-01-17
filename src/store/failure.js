// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from './common'

//to handle state
const state = {
  failure: "",
  actionList: [],
  failureList: []
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
      //commit('SAVE_FAILURE_ACTION', Response.data)
    })
  },
  getFailureAction({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/failure/actions/'+params).then((Response)=>{
      commit('SAVE_FAILURE_ACTION', Response.data)
    })
  },
  getFailureList({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/failures/'+params).then((Response)=>{
      commit('GET_FAILURE_LIST', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  GET_FAILURE(state, get){

    let closed = get.closed
    get.closed = closed == true ? "해결됨" : "미처리"

    let status = get.gatewayFailureStatus

    if(status == "Unplug"){
      get.gatewayFailureStatus = "전원 차단"
    }else{
      get.gatewayFailureStatus = "데이터 미수신"
    }

    state.failure = get
  },
  SAVE_FAILURE_ACTION(state, list){
    state.actionList = []
    for(let i=0 ; i<list.length ; i++){
      let data = {
        장애번호: list[i].failureId.failureId,
        처리시각: list[i].svRegDate,
        처리자: "이동빈",
        내용: list[i].text,
        처리: list[i].failureId.closed == true ? "처리" : "미처리"
      }
      state.actionList.push(data)
    }
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
