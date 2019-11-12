import Vue from 'vue'

Vue.filter('timeFilter', function (value) {
  if (!value) return ''
  value = value.toString()
  var a = parseInt(value / 60);
  var b = value % 60;
  a > 9 ? a = a : a = '0' + a;
  b > 9 ? b = b : b = '0' + b;
  return a + ":" + b;
})
