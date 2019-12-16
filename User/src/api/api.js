import axios from 'axios';
import qs from 'qs';
import utils from '../utils/utils.js'
import router from '../router/index.js'
import {
  MessageBox
} from 'element-ui'


if (process.env.NODE_ENV === "development") {
  var base = 'http://ads1.g3user.com';
} else {
  var base = '//' + document.domain;
}


let baseUrl = base + '/api';

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
    // console.log(utils.getCookie('auth'), 'auth');
    if (response.config.url == baseUrl + '/login' || response.config.url == baseUrl + '/logout') {
      isLogin = true;
      return response;
    } else if ((response.data != "" && response.data.msg == 'FAILED_LOGIN') || (process.env.NODE_ENV === "production" ? utils.getCookie('auth') == "" : false)) {
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
    return axios.post('/space/putin', qs.stringify(params), {
      timeout: 30000
    }).then(res => res.data).catch(err => err);
  },
  spaceReputin: params => {
    return axios.post('/space/reputin', qs.stringify(params), {
      timeout: 30000
    }).then(res => res.data).catch(err => err);
  },
  spaceList: params => {
    return axios.post('/space/list', qs.stringify(params), {
      timeout: 30000
    }).then(res => res.data).catch(err => err);
  },
  spaceRefund: params => {
    return axios.post('/space/refund', qs.stringify(params), {
      timeout: 30000
    }).then(res => res.data).catch(err => err);
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
