import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import PersonView from '../views/PersonView.vue'
import ProductView from '../views/ProductView.vue'
import OrderView from '../views/OrderView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/person',
            name: 'Person',
            component: PersonView
        },
        {
            path: '/product',
            name: 'Product',
            component: ProductView
        },
        {
            path: '/order',
            name: 'Order',
            component: OrderView
        }
    ]
})

export default router