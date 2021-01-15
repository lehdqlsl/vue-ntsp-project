// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from './common'

//to handle state
const state = {
  count: [],
  emerList: [],
  noActList: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getEmerCount({ commit }) {
    axios.get(common.define.DEST+'/emergency/count').then((Response)=>{
      commit('SET_COUNT', Response.data)
    })
  },
  getEmerList({ commit }) {
    axios.get(common.define.DEST+'/emergencies').then((Response)=>{
      commit('SET_LIST', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  SET_COUNT(state, count){
    state.count = count;
  },
  SET_LIST(state, list){
    state.emerList = []
    state.noActList = []

    for(let i=0 ; i<list.emergency.length ; i++){
      let emerList = list.emergency[i];

      let data = {
        발생시각: emerList.event_id.send_reg_date,
        장비번호: emerList.event_id.phone,
        이벤트: common.tranEventType(emerList.event_id.eventType),
        처리: emerList.closed==true?"처리":"미처리"
      }
      state.emerList.push(data)
    }

    for(let i=0 ; i<list.no_activity.length ; i++){
      let noActList = list.no_activity[i];

      let ret = common.noActTime(noActList.event_id.send_reg_date)

      let data = {
        발생시각: noActList.event_id.send_reg_date,
        장비번호: noActList.event_id.phone,
        심각도: ret.level,
        경과시간: ret.time,
        이벤트: common.tranEventType(noActList.event_id.eventType),
        처리: noActList.closed == true ? "처리" : "미처리",
        _cellVariants: ret.label
      }
      state.noActList.push(data)
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
