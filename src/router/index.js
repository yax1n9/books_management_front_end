import {createRouter, createWebHashHistory} from "vue-router";
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
