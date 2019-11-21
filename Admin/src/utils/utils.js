export default {
    setCookie(cname, cvalue, exminutes) {
        var d = new Date();
        d.setTime(d.getTime() + (exminutes * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    clearCookie(cname) {  
        this.setCookie(cname, "", -1);  
    },
    getLocalTime(timestamp) {
        // 如果以秒为单位
        // var dateObj = new Date(timestamp * 1000);
        // 如果以毫秒为单位
        var dateObj = new Date(timestamp);
        return dateObj.getFullYear() + '-' +
          (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-' +
          ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ' +
          ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':' +
          ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':' +
          ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
      }

}