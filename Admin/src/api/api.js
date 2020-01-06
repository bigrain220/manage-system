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
  engineList: params => {
    return axios.post('/engine/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  engineEdit: params => {
    return axios.post('/engine/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  engineAdd: params => {
    return axios.post('/engine/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  engineDelete: params => {
    return axios.post('/engine/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  // site
  siteGet: params => {
    return axios.post('/site/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  siteList: params => {
    return axios.post('/site/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  siteEdit: params => {
    return axios.post('/site/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  siteAdd: params => {
    return axios.post('/site/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  siteDelete: params => {
    return axios.post('/site/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  // type
  typeGet: params => {
    return axios.post('/type/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  typeList: params => {
    return axios.post('/type/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  typeDelete: params => {
    return axios.post('/type/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  typeAdd: params => {
    return axios.post('/type/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  typeEdit: params => {
    return axios.post('/type/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  // size
  sizeGet: params => {
    return axios.post('/size/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  sizeList: params => {
    return axios.post('/size/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  sizeDelete: params => {
    return axios.post('/size/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  sizeAdd: params => {
    return axios.post('/size/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  sizeEdit: params => {
    return axios.post('/size/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  // style
  styleGet: params => {
    return axios.post('/style/get', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  styleList: params => {
    return axios.post('/style/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  styleDelete: params => {
    return axios.post('/style/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  styleAdd: params => {
    return axios.post('/style/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  styleEdit: params => {
    return axios.post('/style/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  // unit
  unitList: params => {
    return axios.post('/unit/list', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  unitDelete: params => {
    return axios.post('/unit/delete', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  unitAdd: params => {
    return axios.post('/unit/add', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
  unitEdit: params => {
    return axios.post('/unit/edit', qs.stringify(params)).then(res => res.data).catch(err => err);
  },
}
