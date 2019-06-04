import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'

import WorkOrder from '@/components/WorkOrder'
import CreateWorkOrder from '@/components/CreateWorkOrder'
import PurchaseOrder from '@/components/PurchaseOrder'
import MaterialOrder from '@/components/MaterialOrder'
import CreateMaterialOrder from '@/components/CreateMaterialOrder'
import MaterialStorage from '@/components/MaterialStorage'
import ProductStorage from '@/components/ProductStorage'
import Import from '@/components/Import'
import CreateImport from '@/components/CreateImport'
import Export from '@/components/Export'
import CreateExport from '@/components/CreateExport'
import StaffList from '@/components/StaffList'
import Login from '@/components/Login'
import Analysis from '@/components/Analysis'
import store from '@/store/store'
import { SIGABRT } from 'constants';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
      children: [
        {
          path: '/work-order',
          name: 'work-order',
          component: WorkOrder,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/create-work-order',
          name: 'create-work-order',
          component: CreateWorkOrder,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:true},
        },
        {
          path: '/purchase-order',
          name: 'purchase-order',
          component: PurchaseOrder,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
          },
        {
          path: '/material-order',
          name: 'material-order',
          component: MaterialOrder,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/create-material-order',
          name: 'create-material-order',
          component: CreateMaterialOrder,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:true},
        },
        {
          path: '/material-storage',
          name: 'material-storage',
          component: MaterialStorage,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/product-storage',
          name: 'product-storage',
          component: ProductStorage,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/import',
          name: 'import',
          component: Import,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/create-import',
          name: 'create-import',
          component: CreateImport,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:true},
        },
        {
          path: '/export',
          name: 'export',
          component: Export,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/create-export',
          name: 'create-export',
          component: CreateExport,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/staff-list',
          name: 'staff-list',
          component: StaffList,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        },
        {
          path: '/analysis',
          name: 'analysis',
          component: Analysis,
          meta:{requiresAuth:true,adminAuth:false,managerAuth:false},
        }
      ]
    }
  ]
})
router.beforeEach((to,from,next) => {
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('staff'))
    if(!authUser){
      next({name:'login'})
    }else if(to.meta.adminAuth){
      const authUser = JSON.parse(window.localStorage.getItem('staff'))
      if(authUser.PositionID === 1){
        next()
      }else{
        next(false)
      }
    }else if(to.meta.managerAuth){
      const authUser = JSON.parse(window.localStorage.getItem('staff'))
      if(authUser.PositionID === 2 || authUser.PositionID ===1){
        next()
      }else{
        next(false)
      }
    }else{
      next()
    }
  }else{
    console.log('else');
    
    next()
  }
})
export default router