// import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    dateChosed: '-6',
    contentLoading:true
  },
  getters: {
    getDateChosed(state) {
      return state.dateChosed
    },
    getContentLoading(state) {
      return state.contentLoading
    },
  },
  mutations: {
    setDateChosed(state, value) {
      state.dateChosed = value;
    },
    setContentLoading(state, value) {
      state.contentLoading = value;
    },
  },
  actions: {
    selectDateChosed(context, params) {
      // context.commit('setCityID', params.cityID);
      context.commit('setDateChosed', params);
    },
    contentLoadingEvent(context, params) {
      context.commit('setContentLoading', params);
    },
  }
});
//获取state的方法: this.$store.state 
//修改state的方法：1.用this.$store.commit执行mutation里的方法 2.用 this.$store.dispatch执行actions里的方法
// this.$store.commit("setCityID", 6);
// this.$store.dispatch("selectCity", { id: 110 });
export default store;
