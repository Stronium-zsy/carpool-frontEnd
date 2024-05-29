import {createRouter,createWebHistory} from 'vue-router';
import App from '/src/App.vue';
import SignInSignUp from '@/components/SignInSignUp.vue';
import Home from '@/views/Home.vue';
import Trips from "@/views/Trips.vue";
import User from "@/views/User.vue";
import Friends from "@/views/Friends.vue";
import {UserStore} from "@/store/index.js";
import MyTrip from "@/components/MyTrip.vue";
import EditUserInfo from "@/components/EditUserInfo.vue";
import Search from '@/views/Search.vue'
const routes=[
    {path:'/',component:Home},
    {path:'/signinsignup',component:SignInSignUp},
    {path:'/home',component:Home},
    {path:'/trips',component:Trips,meta:{requiresAuth:true}},
    {path:'/user',component:User,meta:{requiresAuth:true}},
    {path:'/edituser',component:EditUserInfo,meta:{requiresAuth:true} },
    {path:'/search',component: Search,meta:{requiresAuth: true}},
    {path:'/friends',component:Friends,meta:{requiresAuth:true}},
]
const router=createRouter({
    history:createWebHistory(),
    routes,
})
router.beforeEach((to,from,next)=>{
    const UseStore=UserStore();
    const requriresAuth=to.matched.some(record=>record.meta.requiresAuth);
    if(requriresAuth&&!UseStore.loggedIn){
        next('/signinsignup');
    }else{
        next();
    }
})
export default router;