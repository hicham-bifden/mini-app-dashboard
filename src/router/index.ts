import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DashboardPage from '../views/DashboardPage.vue';
import AjouterAventures from '../views/AjouterAventures.vue';
 import ListeAventures from '../views/ListeAventures.vue';

import DetailsAventure from '../views/DetailAventures.vue';
import Parametres from '../views/Parametres.vue';


 


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },

    {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/ajouter-aventure',
    name: 'AjouterAventures',
    component: AjouterAventures
  },
  {
    path: '/liste-aventures',
    name: 'ListeAventures',
    component: ListeAventures
  },

    { path: '/details/:id', 
      name: 'DetailsAventure', 
      component: DetailsAventure 
    },

    {
      path: '/params',
      name: 'Params',
      component: Parametres
    }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
