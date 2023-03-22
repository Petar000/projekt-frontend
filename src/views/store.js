import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    odgovori: {}
  },
  mutations: {
    postaviOdgovor(state, payload) {
      state.odgovori[payload.pitanjeId] = payload.odgovor;
    }
  },
  getters: {
    odgovorNaPitanje: (state) => (pitanjeId) => {
      return state.odgovori[pitanjeId] || null;
    }
  }
});
