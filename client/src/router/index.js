import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/Shop'
import HomePage from '@/components/HomePage'
import Cart from '@/components/Cart'
import Profile from '@/components/Profile'
import Product from '@/components/Product'
import Category from '@/components/Category'
import History from '@/components/History'

Vue.use(Router)

//set a router for rendering
export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop,
      children:[
        {
          path:'/',
          name:'home-page',
          component:HomePage
        },
        {
          path:'/profile',
          name:'profile',
          component:Profile
        },
        {
          path:'/cart',
          name:'cart',
          component:Cart
        },
        {
          path:'/product/:id',
          name:'product',
          component:Product
        },
        {
          path:'/category/:name',
          name:'category',
          component:Category
        },
        {
          path:'/history',
          name:'history',
          component:History
        }
      ]
    },
   
  ]
})
