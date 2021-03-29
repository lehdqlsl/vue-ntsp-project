import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/layout/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '/login',
    component: Login,
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
        path: 'test2/:id',
        name: 'Test2',
        component: () => import('src/pages/Test2.vue')
      },
      {
        path: 'device-detail/:id',
        name: 'DeviceDetail',
        props: true,
        component: () => import('src/pages/DeviceDetail.vue')
      },
      {
        path: 'event-renew',
        name: 'EventRenew',
        component: () => import('src/pages/EventRenew.vue')
      },
      {
        path: 'gateway-list',
        name: 'GatewayList',
        props: true,
        component: () => import('src/pages/GatewayList')
      },
      {
        path: 'recipient-list',
        name: 'RecipientList',
        props: true,
        component: () => import('src/pages/RecipientList')
      },
      {
        path: 'user-info/:id',
        name: 'UserInfoOne',
        component: () => import('src/components/UserDetail/UserInfo'),
      },
      {
        path: 'sensor-list',
        name: 'SensorList',
        component: () => import('src/pages/SensorList')
      },
      {
        path: 'notice-list',
        name: 'NoticeList',
        component: () => import('src/pages/NoticeList')
      },
      {
        path: 'remote-manager',
        name: 'RemoteManager',
        component: () => import('src/pages/RemoteManager')
      },
      {
        path: 'history-list',
        name: 'HistoryList',
        component: () => import('src/pages/HistoryList')
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  {path: '*', component: NotFound}
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
