// store/index.js
import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
      counter: 10,
      title : 'Powerd by sord vuex',
      id:'',
      jwt:'',
      tableNo:'',

    },
    getters: {
      time2(state) {
        return state.counter * 2;
      }
    },
    mutations: {
      setCounter(state, value) {
        state.counter = value;
      },
      SET_ID(state, value) {
        state.id = value
      },
      SET_TOKEN(state, value) {
        state.jwt = value
      },
      SET_TABLE_NO(state, value) {
        state.tableNo = value
      }
    },
    plugins:[
      createPersistedState()
    ]
  }
)

;