import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('src/pages/Overview.vue')
      },
      {
        path: 'emer-overview',
        name: 'Emer Overview',
        component: () => import('src/pages/EmerOverview.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('src/pages/UserProfile.vue')
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('src/pages/Test.vue')
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('src/pages/Test2.vue')
      },
      {
        path: 'device-detail',
        name: 'DeviceDetail',
        component: () => import('src/pages/DeviceDetail.vue')
      },
      {
        path: 'event-renew',
        name: 'EventRenew',
        component: () => import('src/pages/EventRenew.vue')
      },
      {
        path: 'recipient-list',
        name: 'RecipientList',
        props: true,
        component: () => import('src/pages/UserDetail')
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
