import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
//import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
//import BootstrapVue3 from '../node_modules/bootstrap-vue-3'
import App from './App.vue'
import router from './router'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

//import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
//import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(VuePlyr, {
  plyr: {}
})

//app.use(BootstrapVue3)

authentication.install().then(() => {
  app.use(router)
  app.mount('#app')
})
