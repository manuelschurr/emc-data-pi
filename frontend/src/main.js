import Vue from 'vue'
import App from './App.vue'
// Bootstrap Import
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// Font Awesome (Icons) Import and Usage
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')