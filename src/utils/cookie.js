var Cookie = {
  //获取cookie、
  getCookie (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return (decodeURIComponent(arr[2]));
    }
    else
      return null;
  },

  //设置cookie
  setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURIComponent(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+";path=/;domain=.jd.com";
  },

  //删除cookie
  delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = Cookie.getCookie(name);
    document.cookie = name + "=" +cval + ";expires=" + exp.toGMTString()+";path=/";
  }
}

export default Cookie
