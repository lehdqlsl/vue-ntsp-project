// import dependency to handle HTTP request to our back end

//to handle state
import axios from "axios";
import common from "./common";

const state = {
  token: '',
}

//to handle state
const getters = {
  getToken(){
    return this.$store.getters.token
  }
}

//to handle actions
const actions = {

}

//to handle mutations
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
}

//export store module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
