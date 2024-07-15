<template>
    <div>
        <!-- 
        <el-container>：外层容器。
        当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。
        <el-aside>：侧边栏容器
        auto表示子元素的 宽度+内边距+外边距+边框 才等于父元素的宽度
        一个元素设置height:100vh，那么该元素会被撑开与屏幕高度一致
        -->
        <el-container style="height: 100vh">
            <el-aside width="auto">
                <!-- logo  -->
                <div :class="{ logo: !sidebarCollapse, 'logo-collapse': sidebarCollapse }">
                    <img src="../assets/logo.png">
                    <div class="title" v-if="!sidebarCollapse">后台管理</div>
                </div>
                <!-- 导航菜单 -->
                <!-- 
                router 开启路由模式 以index的名称来进行路由导航
                default-active	当前激活菜单的 index
                default-active需要传进去的值就是子导航的index值（也就是其路由值）	
                collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
                mode	模式	string	horizontal / vertical	默认值为vertical
                unique-opened	是否只保持一个子菜单的展开	
                -->
                <el-menu :default-active="activeIndex" @select="setCurrentRoute" :collapse="sidebarCollapse" unique-opened router>
                    <el-menu-item index="Welcome" route="/welcome">
                        <!-- 设置图标 -->
                        <i class="el-icon-s-home"></i>
                        <!-- 插槽 分组名可以通过title属性直接设定，也可以通过具名 slot 来设定 -->
                        <span slot="title">欢迎</span>
                    </el-menu-item>
                    <el-submenu index="System" route="/system">
                        <template slot="title">
                            <i class="el-icon-s-tools"></i>
                            <span>系统中心</span>
                        </template>
                        <el-menu-item index="User" route="/user">用户管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="clazz">
                        <template slot="title">
                            <i class="el-icon-s-management"></i>
                            <span>选课中心</span>
                        </template>
                        <el-menu-item index="Course" route="/course">课程管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- <el-header>: 顶部导航栏，包含了用于切换侧边栏可见性的图标和用户信息 -->
                <el-header height="61px" class="nav">
                    <!-- 实现菜单折叠功能的图标 -->
                    <i :class="['icon', sidebarCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
                        @click="sidebarCollapse = !sidebarCollapse"></i>
                    <!-- el-dropdown 下拉菜单 command	点击菜单项触发的事件回调 -->
                    <el-dropdown @command="handleCommand">
                        <div class="el-dropdown-link user">
                            <i class="el-icon-s-custom"></i>&emsp;
                            <span>{{ nickName }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided command = "person">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="logout">退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main class="main">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            sidebarCollapse: false,
            nickName: '未登录',
            activeIndex: "Welcome"
        }
    },
    watch: {
    $route() {
      this.setCurrentRoute();
    }
  },
    methods: {
        setCurrentRoute() {
      this.activeIndex= this.$route.name; // 通过他就可以监听到当前路由状态并激活当前菜单
    },
        // 点击下拉菜单触发函数 command：点击的下拉菜单项的command属性值
        handleCommand(command) {
            if (command == 'person') {
                this.$router.push({ name: 'Person'});
            }
            if (command == 'changePassword'){
                this.$router.push({ name: 'PasswordChange'});
            }
            if (command == 'logout') {
                this.$confirm('确定退出系统吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    // 登出操作: 1.清除登录信息 2.路由导航到登录页
                    sessionStorage.removeItem('loginUser');
                    this.$router.push('/login');
                }).catch(() => { });
            }

        }
    },
    created() {
    this.setCurrentRoute();
  },
    mounted() {
        let loginUser=JSON.parse(sessionStorage.getItem('loginUser'));
        if (loginUser) {
             this.nickName=loginUser.nickName||'用户';
        }
    }
}
</script>
<!-- <style>部分包含了组件的样式，使用了scoped属性限制样式仅在当前组件内部生效 -->
<style scoped>
.logo {
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
}

.logo-collapse {
    height: 60px;
    border-bottom: 1px solid #e6e6e6;
}

.logo .title {
    color: #409eff;
    font: bold 30px "楷体";
}

.logo-collapse .title {
    width: 0;
}

.logo img,
.logo-collapse img {
    margin: 5px;
    width: 50px;
}

.el-menu {
    border-right: 0 !important;
    
}


.el-menu:not(.el-menu--collapse) {
    width: 200px;
}

.nav {
    /* border-bottom: 1px solid #e6e6e6; */
    display: flex;
    /*弹性盒子*/
    justify-content: space-between;
    /*两端对齐，子元素之间有间隙*/
}

.nav .icon {
    font-size: 30px;
    color: #409eff;
    line-height: 61px;
    cursor: pointer;
}

.nav .user {
    color: #409eff;
    line-height: 61px;
    cursor: pointer;
}

.main {
    background-color: #e9eef3;
}
</style>