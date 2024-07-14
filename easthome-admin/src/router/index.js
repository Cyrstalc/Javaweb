import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/Index.vue'),
        redirect: '/welcome', //路由重定向
        children: [
            { path: 'welcome', name: 'Welcome', component: () => import('@/views/page/Welcome.vue')},
            { path: 'user', name: 'User', component: () => import('@/views/page/User.vue') },
            { path: 'course', name: 'Course', component: () => import('@/views/page/Course.vue')},
            { path: 'courseAddUpdate', name: 'CourseAddUpdate', component: () => import('@/views/page/CourseAddUpdate.vue') },
            { path: 'chapter', name: 'Chapter', component: () => import('@/views/page/Chapter.vue') },
            { path: 'person', name: 'Person', component: () => import('@/views/page/Person.vue') }, 
            { path: 'passwordChange', name: 'PasswordChange', component: () => import('@/views/page/PasswordChange.vue') }, 
        ],
        // 导航守卫 
        beforeEnter: (to, from, next) => {
            // 使用浏览器存储判断是否登录
            let loginUser=sessionStorage.getItem('loginUser');
            if(loginUser){
                // 已登录
                next();
            }else{
                // 未登录
                next('/login');
            }
        }
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 解决路由重复点击问题
const originalPush=router.push;
router.push=function push(location,onReslove,onReject){
    return originalPush.call(this,location).catch(err => err);
}

export default router
