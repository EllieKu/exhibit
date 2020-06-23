import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/activitylist',
    name: 'activitylist',
    component: () => import('../views/ActivityList.vue')
  },
  {
    path: '/MyFavorite',
    name: 'MyFavorite',
    component: () => import('../views/MyFavorite.vue')
  },
  {
    path: '/activitylist/:uid',
    name: 'Activity',
    component: () => import('../components/Activity.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.activityLists) {
        store.dispatch('getApiData')
          .then(() => {
            next()
          })
      } else {
        next()
      }
    }
  },
  {
    path: '*',
    redirect: '/MyFavorite'
  }
]

const router = new VueRouter({
  routes
})

export default router
