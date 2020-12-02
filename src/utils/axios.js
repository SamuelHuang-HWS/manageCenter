import axios from 'axios'
import axiosRetry from 'axios-retry'
import Cookie from '../utils/cookie'
import {
  queryParams,
  goLogin,
  errTips,
  getQueryString
} from '@/utils/tools'
import CRC32 from "crc-32";

const baseUrl = process.env.VUE_APP_BASEURL;
const appId = process.env.VUE_APP_APPID;

/**
 * 京东 图片系统 上传
 */
export function uploadFile(file, onUploadProgress) {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = async (event) => {
      const crc = CRC32.bstr(event.target.result);
      const keycode = `${crc.toString(16)}${file.size}_`;
      axios({
        method: "POST",
        url:"/imageUpload.action",
        data: file,
        headers: {
          "content-type": file.type,
          keycode: keycode
        },
        onUploadProgress: onUploadProgress,
      })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    };
  });

  return promise;
}

class HttpRequest {
  constructor (baseUrl, appId) {
    this.baseUrl = baseUrl
    this.appId = appId
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      timeout: 6000,
      withCredentials: true
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      var ticket = Cookie.getCookie("sso.jd.com");
      Cookie.setCookie("ticket",ticket);
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      let {
        data: result
      } = res
      if (result.code === '1023') { // 未登录
        goLogin() // 跳转到登录页
        return false
      }else if (result.code === '0000') { // 请求成功
        return result.data || result
      } else { // 请求失败
        return Promise.reject(result)
      }
    }, error => {
      this.destroy(url)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    // 请求失败重新请求
    axiosRetry(instance, {
      retries: 4, // 重新请求四次
      retryDelay: (retryCount) => { // 重新请求延迟
        return retryCount * 1000
      }
    })



    options = Object.assign(this.getInsideConfig(), options)
    options.params && this.appId && (options.params.appid = this.appId)
    options.params && (options.params._t = new Date().getTime())
    options.params && (options.params.loginType = 3)

    options.data && this.appId && (options.data.appid = this.appId)
    options.data && (options.data._t = new Date().getTime())
    options.data && (options.data.loginType = sessionStorage.getItem("loginType")||3)

    options.data && options.data.body && (options.data.body.channelId=sessionStorage.getItem("channelId")||process.env.CHANNELID)//渠道ID
    options.data && options.data.body && (options.data.body.tenantAppId=sessionStorage.getItem("tenantAppId")||null)//租户所属应用id
    options.data && options.data.body && (options.data.body.tenantUnid=sessionStorage.getItem("tenantUnid")||null)//租户唯一标识

    options.data && (options.data = queryParams(options.data))
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl, appId)
