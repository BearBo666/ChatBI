import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'chat',
    component: Chat
  },
]

const router = new VueRouter({
  routes
})

export default router
