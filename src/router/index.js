import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : '/connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path : '/Inscription',
    component: () => import('../views/Inscription.vue')
  },
  {
    path : '/home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/conversation/:id',
    name: 'Conversation',
    component: () => import('../views/Conversation.vue')
  },
  {
    path : '/membres',
    component: () => import('../views/Membres.vue')
  },
  {
		path: "/profil/:membre_id",
		name: "Profil",
		component: () => import("../views/Profil.vue"),
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
