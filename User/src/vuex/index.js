import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    title: '',
  },
  getters:{
    getTitle(state) {  //方法名随意,主要是来承载变化的city的值
        return state.city
     },
    //  getCityId(){  //方法名随意,主要是用来承载变化的cityID的值
    //     return state.cityID
    //  }
  },
  mutations: {
    setTitle(state, value) {
      state.city = value;
    },
    // setCityID(state, value) {
    //   state.cityID = value;
    // }
  },
  actions: {
    selectTitle(context, params) {
      // context.commit('setCity', params.city);
      context.commit('setTitle', params);
    }
  }
});
//获取state的方法: this.$store.state 
//修改state的方法：1.用this.$store.commit执行mutation里的方法 2.用 this.$store.dispatch执行actions里的方法
// this.$store.commit("setCityID", 6);
// this.$store.dispatch("selectCity", { id: 110 });
export default store;
