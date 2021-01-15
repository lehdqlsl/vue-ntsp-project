// store.js
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import OverView from './overview'
import Emergency from './emergency'
import RecipientList from "../components/UserDetail/RecipientList";
import userdetail from "./userdetail";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    overview: OverView,
    emergency: Emergency,
    recipient: userdetail
  }
});
