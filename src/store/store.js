// store.js
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import OverView from './overview'
import Emergency from './emergency'
import RecipientList from "../components/UserDetail/RecipientList";
import userdetail from "./userdetail";
import auth from "./auth"
import failure from "./failure";
import Search from "./search";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    overview: OverView,
    emergency: Emergency,
    recipient: userdetail,
    failure: failure,
    auth: auth,
    search: Search
  }
});
