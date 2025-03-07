import VTooltip from 'v-tooltip'
// Notifications plugin
import Notifications from 'src/components/NotificationPlugin'
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents'
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './components/SidebarPlugin'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// asset imports
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/light-bootstrap-dashboard.scss'
import './assets/css/demo.css'
import './assets/css/custom.css'
import './assets/css/custom.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/**
 * This is the main Light Bootstrap Dashboard Vue plugin where dashboard related plugins are registerd.
 */
export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(Notifications)
    Vue.use(VTooltip)
    // Install BootstrapVue
    Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
    Vue.use(IconsPlugin)
  }
}
