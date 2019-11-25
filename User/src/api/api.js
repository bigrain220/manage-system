import axios from 'axios';
import qs from 'qs';
import utils from '../utils/utils.js'
import router from '../router/index.js'
import {
  MessageBox
} from 'element-ui'

if (utils.changHost() == 'offLine') {
  var base = 'http://ads.g4user.com'; //测试环境
} else {
  var base = '//' + document.domain; //线上
}
let baseUrl = base + '/api';

utils.setCookie('auth','vtAxrZEjYJW3uY0m5iDyKDoj3V.kIJVcCTpARnMxi6dnqTQqbKYcX8c.9Bn.uAqP9aTKN6DcfjHBGiiO1cit.YCwhrqI0qhysm-aOg7q4Uhl7E7XQ3LEEmC5Ro43NU2of8NRET6HQ6i2EPY-pyOk1w__',60)

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

// export const tagsAPI = params=>{
//     return  axios.get('/api/theme/tags/',{"params":params}).then(res=>res.data).catch(err=>err);
// }
// export const IndexAPI = params=>{
//     return  axios.post('/index',qs.stringify(params)).then(res=>res.data).catch(err=>err);
// }

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
  materialList: params => {
    return axios.post('/material/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialGet: params => {
    return axios.post('/material/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  mediaList: params => {
    return axios.post('/media/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  mediaAdd: params => {
    return axios.post('/media/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  mediaDelete: params => {
    return axios.post('/media/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  textGet: params => {
    return axios.post('/text/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  textSave: params => {
    return axios.post('/text/save', qs.stringify(params)).then(res => res.data).catch(err => err);
  },

}
