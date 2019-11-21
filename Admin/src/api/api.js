import axios from 'axios';
import qs from 'qs';
import utils from '../utils/utils.js'
import router from '../router/index.js'
import { MessageBox } from 'element-ui'


axios.defaults.timeout = 6000;
axios.defaults.baseURL = 'https://apilightmv.aoscdn.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("response66",response)
    if(response.config.url.indexOf('/api/sessions')>0){
        return response;
    }else if(utils.getCookie("session_val")==""){
        MessageBox.alert('您已下线，请重新登录', '下线提示', {
            confirmButtonText: '确定',
            callback: action => {
              router.push({ path:'/index'})
            }
          });
    }else{
        return response;
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export const tagsAPI = params=>{
    return  axios.get('/api/theme/tags/',{"params":params}).then(res=>res.data).catch(err=>err);
}

export const sessionAPI = params=>{
    return  axios.post('/api/sessions',qs.stringify(params)).then(res=>res.data).catch(err=>err);
}