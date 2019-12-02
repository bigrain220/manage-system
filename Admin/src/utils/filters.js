import Vue from 'vue'

Vue.filter('timeFilter', function (value) {
  if (!value) return ''
  var dateObj = new Date(value * 1000);
  // var dateObj = new Date(value);
  return dateObj.getFullYear() + '-' +
    (((dateObj.getMonth() + 1) > 9) ? (dateObj.getMonth() + 1) : '0' + (dateObj.getMonth() + 1)) + '-' +
    ((dateObj.getDate() > 9) ? dateObj.getDate() : '0' + dateObj.getDate()) + ' ' +
    ((dateObj.getHours() > 9) ? dateObj.getHours() : '0' + dateObj.getHours()) + ':' +
    ((dateObj.getMinutes() > 9) ? dateObj.getMinutes() : '0' + dateObj.getMinutes()) + ':' +
    ((dateObj.getSeconds() > 9) ? dateObj.getSeconds() : '0' + dateObj.getSeconds());
})
