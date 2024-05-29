
import {createPinia} from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import { far } from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
library.add(far,fas,faMapLocationDot)
const Pinia=createPinia()
Pinia.use(createPersistPlugin())
import {UserStore} from "@/store/index.js";
import {createPersistPlugin} from "pinia-persist";


const app=createApp(App)
app.component('font-awesome-icon',FontAwesomeIcon)
app.use(router)
app.use(Pinia)
const User=UserStore();
User.loadUserFromLocalStorage();
app.mount('#app')