// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from './common'

//to handle state
const state = {
  count: [],
  lastCount: [],
  emerList: [],
  noActList: [],
  statistics: [],
  statisticsFire: [],
  statistics119: [],
  statisticsEmer: [],
  statisticsNoAct: [],
  isFetching: false
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
  getLastEmerCount({ commit }) {
    axios.get(common.define.DEST+'/emergency/count/last').then((Response)=>{
      commit('SET_COUNT_LAST', Response.data)
    })
  },
  getEmerList({ commit }) {
    axios.get(common.define.DEST+'/emergencies').then((Response)=>{
      commit('SET_LIST', Response.data)
    })
  },
  getStatistics({ commit }) {
    axios.get(common.define.DEST+'/statistics/emergencies').then((Response)=>{
      commit('GET_STATISTICS', Response.data)
    })
  }
}

//to handle mutations
const mutations = {
  GET_STATISTICS(state, get) {
    state.statisticsFire = []
    state.statistics119 = []
    state.statisticsEmer = []
    state.statisticsNoAct = []

    for(let i=0 ; i<get.length ; i++){

      let fireData = {
        x: get[i].regDate,
        y: get[i].fire
      }
      let _119Data = {
        x: get[i].regDate,
        y: get[i]._119
      }
      let noActData = {
        x: get[i].regDate,
        y: get[i].noActivity
      }
      let emerData = {
        x: get[i].regDate,
        y: get[i].emergency
      }

      state.statisticsFire.push(fireData)
      state.statistics119.push(_119Data)
      state.statisticsEmer.push(emerData)
      state.statisticsNoAct.push(noActData)
    }
    state.isFetching = true
  },
  SET_COUNT_LAST(state, count){
    state.lastCount = count
  },
  SET_COUNT(state, count){
    state.count = count
  },
  SET_LIST(state, list){
    state.emerList = []
    state.noActList = []

    for(let i=0 ; i<list.emergency.length ; i++){
      let emerList = list.emergency[i];

      let data = {
        응급번호: emerList.emergencyId,
        발생시각: emerList.eventId.gwRegDate,
        장비번호: common.FormatNumber(emerList.eventId.phone),
        이벤트: common.tranEventType(emerList.eventId.eventType),
        처리: emerList.closed==true?"처리":"미처리"
      }
      state.emerList.push(data)
    }

    for(let i=0 ; i<list.no_activity.length ; i++){
      let noActList = list.no_activity[i];

      let ret = common.noActTime(noActList.eventId.gwRegDate)

      let data = {
        응급번호: noActList.emergencyId,
        발생시각: noActList.eventId.gwRegDate,
        장비번호: common.FormatNumber(noActList.eventId.phone),
        심각도: ret.level,
        경과시간: ret.time,
        이벤트: common.tranEventType(noActList.eventId.eventType),
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
