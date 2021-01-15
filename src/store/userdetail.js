// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from "./common";

//to handle state
const state = {
  recipient: [],
  period: [],
  event: [],
  phone: ""
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getRecipientList({ commit }, params) {
    axios.get(common.define.DEST+'/recipients/search', { params }).then((Response)=>{
      commit('GET_RECIPIENT_LIST', Response.data)
    })
  },
  getPeriodList({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/'+params+'/cycles').then((Response)=>{
      commit('GET_PERIOD_LIST', Response.data)
    })
  },
  getEventList({ commit }, params) {
    axios.get(common.define.DEST+'/gateways/'+params+'/events').then((Response)=>{
      commit('GET_EVENT_LIST', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  GET_RECIPIENT_LIST(state, list){
    state.recipient = list
  },
  GET_PERIOD_LIST(state, list){
    state.period = list
  },
  SET_PHONE(state, phone){
    state.phone = phone
  },
  GET_EVENT_LIST(state, list){
    for(let i=0 ; i<list.length ; i++){
      let eventType = list[i].eventType

      list[i].eventType = common.tranEventType(eventType)

      if(eventType == 11 || eventType == 15 || eventType == 2){
        list[i].danger = true
      }

      if(eventType == 7 || eventType == 4){
        list[i].warning = true
      }

      if(eventType == 100){
        list[i].info = true
      }
    }
    state.event = list
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
