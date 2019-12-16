import axios from 'axios';
import qs from 'qs';
import utils from '../utils/utils.js'
import router from '../router/index.js'
import { MessageBox } from 'element-ui'



if (process.env.NODE_ENV === "development") {
  var base = 'http://ads1.g3user.com';
} else {
  var base = '//' + document.domain;
}

let baseUrl = base + '/admin';



axios.defaults.timeout = 6000;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
axios.defaults.withCredentials = true; //用axios发送post请求自动set cookie


let isLogin = true; //让弹窗只弹一次；
// respone拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // console.log(response, 'response')
    if (response.config.url == baseUrl + '/login' || response.config.url == baseUrl + '/logout') {
      isLogin = true;
      return response;
    } else if ((response.data != "" && response.data.msg == 'FAILED_LOGIN') || (process.env.NODE_ENV === "production" ? utils.getCookie('ad_auth') == "" : false)) {
      if (isLogin == true) {
        isLogin = false;
        MessageBox.alert('您已下线，请重新登录', '下线提示', {
          confirmButtonText: '确定',
          callback: action => {
            router.push({
              path: '/login'
            })
          }
        });
      }
    } else {
      isLogin = true;
      return response;
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)



export default {
  login: params => {
    return axios.post('/login', qs.stringify(params)).then(rs => rs.data).catch(err => err);
  },
  logOut: params => {
    return axios.get('/logout', {
      "params": params
    }).then(res => res.data).catch(err => err);
  },
  materialList: params => {
    return axios.post('/material/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  materialSave: params => {
    return axios.post('/material/save', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
}