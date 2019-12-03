import axios from 'axios';
import qs from 'qs';
import utils from '../utils/utils.js'
import router from '../router/index.js'
import { MessageBox } from 'element-ui'


if (utils.changHost() == 'offLine') {
  var base = 'http://ads1.g3user.com'; //测试环境
} else {
  var base = '//' + document.domain; //线上
}
let baseUrl = base + '/admin';

// utils.setCookie('ad_auth','npi9qweNl7x0XvLNlEPaSgOx9qXx1gQz1cl27JvPHedcpub93T8AeF3JwWNxLz1sutX7yA.DauTnaAPhtL5XN9Cdyx1Z424tWA8-S6tSFXQh73g5fPrnKRpWNZ7E3-M2e9.KeFETJYR-U3xQXnM5dw__',60)

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
  materialList: params => {
    return axios.post('/material/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialSave: params => {
    return axios.post('/material/save', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
}