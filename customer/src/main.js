import { createApp, resolveDirective } from 'vue'
import App from './App.vue'
import './index.css'

//Router
import {createWebHistory,createRouter} from 'vue-router'
import Order from './views/Order.vue'
import Socket from './views/Socket.vue'
// import Authenticator from './views/Authenticator.vue'
const routes = [
    { path: "/",   component: Order },
    // { path: "/Login",   component: Login },
    // { path: "/Order",   component: Order },
    { path: "/Socket",   component: Socket },
    // { path: "/Authenticator",   component: Authenticator },
    { path: "/scroll",   component: scroll }
];
const Router = createRouter({
     history: createWebHistory(),
     routes
})

//Vuex 
import store from "./store";


const app = createApp(App)
app.use(Router);
app.use(store);
app.mount('#app')
