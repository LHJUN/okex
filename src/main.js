import Vue from 'vue';
import VCharts from 'v-charts'
import App from './App';
import router from './router';
import store from './store/';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en';
import VueWordCloud from 'vuewordcloud';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.component(VueWordCloud.name, VueWordCloud);
Vue.use(VCharts)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
