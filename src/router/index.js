import { createRouter, createWebHistory } from '@ionic/vue-router';
import inicioPage from '../views/InicioPage.vue'
import busquedadPage from '../views/BusquedadPage.vue'
import clientesPage from '../views/ClientesPage.vue'
import abonosPage from '../views/AbonosPage.vue'
import ajustesPage from '../views/AjustesPage.vue'
import notificacionPage from '../views/notificacionPage.vue'





const routes = [ 
  {
    path: '/',
    redirect: '/inicio',

  },
  {
    path: '/inicio',
    name: 'inicio',
    component: inicioPage,
  
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: clientesPage,
 
  },
  {
    path: '/abonos',
    name: 'abonos',
    component: abonosPage,
  
  },
  {
    path: '/busquedad',
    name: 'busquedad',
    component: busquedadPage
  },
  {
    path: '/ajustes',
    name: 'ajustes',
    component: ajustesPage
  },
  {
    path: '/notificacion',
    name: 'notificacion',
    component: notificacionPage,

  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
