import Vue from 'vue' //Imports the Vue dependencies
import App from './App.vue' //Imports the App component from the router
import router from './router' //Imports the router which roots the compontents in the Vue Appplication
import Vuetify from 'vuetify' //Imports the Vuetify dependencies
import vuetify from './plugins/vuetify' //Imports the path to vutify from plugins folder allowing to export the vuetify components
import BootstrapVue from 'bootstrap-vue' //Imports the BootstrapVue dependencies
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue); // Tells the Vue Application to use BootstrapVue
Vue.use(Vuetify); // Tells the Vue Application to use Veutify

Vue.config.productionTip = false

new Vue({ //Standard syntax for instantiating an object that has been defined.
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
