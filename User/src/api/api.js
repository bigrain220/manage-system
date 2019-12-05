import axios from 'axios';
import qs from 'qs';
import utils from '../utils/utils.js'
import router from '../router/index.js'
import {
  MessageBox
} from 'element-ui'

if (utils.changHost() == 'offLine') {
  var base = 'http://ads1.g3user.com'; //测试环境
} else {
  var base = '//' + document.domain; //线上
}
let baseUrl = base + '/api';
// utils.setCookie('auth','LiveWSPFT16631328=c807865eb09b4c56860a9e20c76561ad',60)
axios.defaults.timeout = 6000;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
axios.defaults.withCredentials = true; //用axios发送post请求自动set cookie


// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     // console.log("response66",response)
//     if(response.config.url.indexOf('/api/sessions')>0){
//         return response;
//     }else if(utils.getCookie("session_val")==""){
//         MessageBox.alert('您已下线，请重新登录', '下线提示', {
//             confirmButtonText: '确定',
//             callback: action => {
//               router.push({ path:'/index'})
//             }
//           });
//     }else{
//         return response;
//     }
//   }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });


export default {
  login: params => {
    return axios.post('/login', qs.stringify(params)).then(rs => rs.data).catch(err => err);
  },
  loginOut: params => {
    return axios.post('/logout', qs.stringify(params)).then(rs => rs.data).catch(err => err);
  },
  start: params => {
    return axios.post('/overview/start', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  //物料
  materialList: params => {
    return axios.post('/material/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialGet: params => {
    return axios.post('/material/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialDelete: params => {
    return axios.post('/material/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialSign: params => {
    return axios.post('/material/sign', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialAdd: params => {
    return axios.post('/material/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialEdit: params => {
    return axios.post('/material/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  //媒体
  mediaList: params => {
    return axios.post('/media/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  mediaAdd: params => {
    return axios.post('/media/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  mediaEdit: params => {
    return axios.post('/media/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  mediaDelete: params => {
    return axios.post('/media/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  spaceSearch: params => {
    return axios.post('/space/search', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  spacePutin: params => {
    return axios.post('/space/putin', qs.stringify(params),{timeout: 30000}).then(res => res.data).catch(err => err);
  },
  spaceReputin: params => {
    return axios.post('/space/reputin', qs.stringify(params),{timeout: 30000}).then(res => res.data).catch(err => err);
  },
  spaceList: params => {
    return axios.post('/space/list', qs.stringify(params),{timeout: 30000}).then(res => res.data).catch(err => err);
  },
  textGet: params => {
    return axios.post('/text/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  textSave: params => {
    return axios.post('/text/save', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  //订单
  orderList: params => {
    return axios.post('/order/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  //效果查看
  trendTime: params => {
    return axios.post('/trend/time', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  sourceWord: params => {
    return axios.post('/source/word', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  visitPage: params => {
    return axios.post('/visit/page', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
}
