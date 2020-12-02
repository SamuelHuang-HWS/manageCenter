
import Vue from "vue";
import Cookie from './cookie'
// methods新增方法 exportTable

export const lockMaskScroll = (bodyCls => {
    let scrollTop
    return {
        afterOpen: function () {
            scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop
            document.body.classList.add(bodyCls)
            document.body.style.top = -scrollTop + 'px'
        },
        beforeClose: function () {
            if (document.body.classList.contains(bodyCls)) {
                document.body.classList.remove(bodyCls)
                document.body.style = '';
                document.scrollingElement.scrollTop = scrollTop
            }
        }
    }
})('c-fixed')


/**
 * @param url
 * @param callback
 */
export const loadJS = (url, callback) => {
  let node = document.createElement('script')
  node.src = url
  node.onload = () => {
    callback && callback()
  }
  document.body.appendChild(node)
}

/**
 * @param obj
 * @returns {string}
 */
export const queryParams = obj => {
  let qs = Object.keys(obj)
    .map(key => {
      let val = obj[key]
      if (val) {
        if (typeof val === 'object') {
          val = JSON.stringify(val)
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val)
      }
    }).filter(Boolean)
    .join('&')

  return qs
}

/**
 * 跳转登录方法
 * @param loginUrl
 */

export const goLogin = function (loginUrl = '') {
  let url='//jdh-content.jd.com'+window.location.pathname+window.location.search;
  window.location.href = '//passport.jd.com/new/login.aspx?ReturnUrl='+encodeURIComponent(url);
}
export const quit = function(){
  let url='//jdh-content.jd.com'+window.location.pathname+window.location.search;
  window.location.href = '//passport.jd.com/uc/login?ltype=logout&ReturnUrl='+encodeURIComponent(url);
}

export const login = function(body){
  Cookie.setCookie('storeId', body.storeId||'');
  Cookie.setCookie('storeName', body.storeName||'');
  Cookie.setCookie('vendorId', body.vendorId||'');
  Cookie.setCookie('pinType', body.pinType||'');
  Cookie.setCookie('vendorName', body.vendorName||'');

}

export const islogined = function(){
  let storeId = Cookie.getCookie('storeId')
  let storeName = Cookie.getCookie('storeName')
  let vendorId = Cookie.getCookie('vendorId')
  let pinType = Cookie.getCookie('pinType')
  let vendorName = Cookie.getCookie('vendorName')
  if(vendorId && pinType){
    return {
      storeId,
      storeName,
      vendorId,
      pinType,
      vendorName
    }
  }else{
    return false
  }
}

export const errTips = (errorMsg, type = 'warning') => {
  if (Vue.prototype.$notify && errorMsg) {
    Vue.prototype.$alert(errorMsg,'提示',{
      showClose:false
    }).then(()=>{
      if(errorMsg=='登录异常，请稍后重试'){
        quit();
        return
      }
    })
  }
}
export const loadScripts=(urls, callback)=> {
  callback = callback || function () {};
  var loader = function (src, handler) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = function () {
      script.onload = null;
      script.onerror = null;
      handler();
    };
    script.onerror = function () {
      script.onload = null;
      script.onerror = null;
      callback({
        message: src + 'load fail'
      });
    };
    var head = document.getElementsByTagName('head')[0];
    (head || document.body).appendChild(script);
  };
  (function run() {
    if (urls.length > 0) {
      loader(urls.shift(), run);
    } else {
      callback();
    }
  })();
};

/**
 * @description: 加载压缩文件所需文件
 */
export const loadExportFileJS = () => {
  let urls = ['./jszip.js', './jszip-utils.js', './FileSaver.js']
  loadScripts(urls)
}

/**
 * @description: 导出并合并压缩包
 * @param urlArr
 */
export const exportZip = (urlArr) => {
  try {
    let reponceZips = []
    urlArr.forEach((url)=>{
      JSZipUtils.getBinaryContent(url, function (err, data) {
        // if (err) {
        //   resolve(url)
        //   throw err; // or handle err
        // }
        JSZip.loadAsync(data).then(function (zip) {
          reponceZips.push(zip);
          if(reponceZips.length === urlArr.length){
            console.log("可以下载！", reponceZips)
            //触发下载：
            concatAndDownload(reponceZips)
          }
        })
      })
    })
  } catch (e) {
    throw Error(e)
  }

  function concatAndDownload(arr){
    if(arr.length){
      let cancatFile = arr.reduce((a,b)=>{
        a.files = Object.assign(a.files, b.files)
        return a
      })
      cancatFile.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "finerly.zip")
      })
    }
  }
}

export const scrollToDom=(dom)=>{
  if(!dom)return false
  let top = dom.getBoundingClientRect().top+document.scrollingElement.scrollTop
  if(top>0&&top<1000){
    document.scrollingElement.scrollTo(0,top)
  }
}

export const getQueryString=(name)=>{
  var urlParams = window.location.search.substr(1).split('&');
  for (var i = 0; i < urlParams.length; i++) {
    if(name == urlParams[i].split('=')[0]){
      // 返回当前参数的值 同时转码
      return decodeURI(urlParams[i].split('=')[1]);
    }
  }
}

