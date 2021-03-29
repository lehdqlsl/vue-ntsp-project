// import dependency to handle HTTP request to our back end
import axios from 'axios'
import common from './common'
import history from 'src/pages/HistoryList.vue'

//to handle state
const state = {
  failureList: [],
  emergencyList: [],
  searchLoading: false
}

//to handle state
const getters = {}

//to handle actions
const actions = {
  getSearch({commit}, params) {
    state.searchLoading = true
    axios.get(common.define.DEST + '/history/search/', {
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
        phone: params.phone,
        searchType: params.searchType,
        failureType: params.failureType,
        closeType: params.closeType,
        eventValue: params.eventValue
      }
    }).then((Response) => {

      if (Response.data.length == 0) {
        params.vm.$alert('검색 결과가 없습니다.', '검색', {
          confirmButtonText: '확인',
        });
      }

      if(params.searchType == 0){
        commit('GET_FAILURE_SEARCH', Response.data)
      }else if(params.searchType == 1) {
        commit('GET_EMERGENCY_SEARCH', Response.data)
      }

    })
  },
  postFailureAction({commit}, params) {
    axios.post(common.define.DEST + '/history/search', params).then((Response) => {
      commit('getSearch')
    })
  },
}

//to handle mutations
const mutations = {
  SET_RESET(state) {
    state.failureList = []
    state.emergencyList = []
  },
  GET_EMERGENCY_SEARCH(state, emergency) {

    for (let i = 0; i < emergency.length; i++) {
      emergency[i].eventId.phone = common.FormatNumber(emergency[i].eventId.phone)
    }
    state.emergencyList = emergency

    state.searchLoading = false
  },
  GET_FAILURE_SEARCH(state, failure) {
    for (let i = 0; i < failure.length; i++) {
      failure[i].phone = common.FormatNumber(failure[i].phone)
      failure[i].elapsedTime = common.elapsedTime(failure[i].regDate)
    }
    state.failureList = failure
    state.searchLoading = false
  },
  //----------------- 응급처리 관련 함수 START -----------------//
  GET_EMERGENCY(state, get) {
    let closed = get.closed
    get.closed = (closed == true) ? "해결됨" : "미처리"

    state.emergency = get

    state.emergency.phone = get.eventId.phone
    state.emergency.eventType = common.tranEventType(get.eventId.eventType)
    state.emergency.regDate = get.eventId.gwRegDate

    state.emergency.eventId = get.eventId.eventId

  },
  GET_EMERGENCY_ACTION_LIST(state, list) {
    state.emerActionList = []

    for (let i = 0; i < list.length; i++) {
      let data = {
        응급번호: list[i].emergencyId.emergencyId,
        처리시각: list[i].svRegDate,
        처리자: list[i].user,
        내용: list[i].text,
        처리: list[i].emergencyId.closed == true ? "처리" : "미처리"
      }
      state.emerActionList.push(data)
    }
  },
  GET_EMERGENCY_LIST(state, list) {
    state.emergencyList = []

    for (let i = 0; i < list.length; i++) {
      let data = {
        이벤트번호: list[i].emergencyId,
        이벤트: common.tranEventType(list[i].eventId.eventType),
        발생시각: list[i].eventId.gwRegDate,
        처리시각: list[i].closedDate,
        처리자: list[i].user,
        상태: list[i].closed == true ? "해결됨" : "미처리"
      }
      state.emergencyList.push(data)
    }
  },
  //----------------- 응급처리 관련 함수 END -----------------//
  GET_FAILURE_ACTION_LIST(state, list) {
    state.actionList = []

    for (let i = 0; i < list.length; i++) {
      let data = {
        장애번호: list[i].failureId.failureId,
        처리시각: list[i].svRegDate,
        처리자: list[i].user,
        내용: list[i].text,
        //처리: list[i].failureId.aware == true ? "처리" : "미처리",
        //상태: list[i].failureId.close == true ? "처리" : "미처리"
        처리상태: list[i].title
      }
      state.actionList.push(data)
    }
  },
  GET_FAILURE(state, get) {
    let closed = get.closed
    get.closed = closed == true ? "해결됨" : "미처리"
    get.aware = get.aware == true ? "처리완료" : "미처리"

    let status = get.gatewayFailureStatus

    if (status == "Unplug") {
      get.gatewayFailureStatus = "전원 차단"
    } else {
      get.gatewayFailureStatus = "데이터 미수신"
    }

    state.failure = get
  },
  GET_FAILURE_LIST(state, list) {
    state.failureList = []

    for (let i = 0; i < list.length; i++) {
      let status = list[i].gatewayFailureStatus

      let data = {
        장애번호: list[i].failureId,
        이벤트: common.failureType(status),
        발생시각: list[i].regDate,
        처리시각: list[i].closedDate,
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
