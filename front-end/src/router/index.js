import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/keys',
    name: 'GenerateKeys',
    component: () => import(/* webpackChunkName: "about" */ '../views/GenerateKeysView.vue')
  },
  {
    path: '/files',
    name: 'FilesView',
    component: () => import(/* webpackChunkName: "about" */ '../views/FilesView.vue')
  },
  {
    path: '/list-files',
    name: 'SearchInformationView',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchInformationView.vue')
  },



  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
