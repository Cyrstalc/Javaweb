<template>
    <div class="card" style="margin: 100px 350px">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>
            <el-form ref="person" :model="user" label-width="80px" style="padding-right: 20px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username"  disabled></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickName">
                    <el-input v-model="user.nickName" placeholder="用户昵称" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user.password" placeholder="密码" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="user.mobile" placeholder="手机号" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-input v-model="user.gender" placeholder="性别" disabled></el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Person",
    data() {
        return {
            user: {
                id: undefined,
                username: undefined,
                nickName: undefined,
                password: undefined,
                mobile: undefined,
                gender: undefined
            },

        };
    },
    methods: {
        getUser() {
            let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
            this.$axios.get(`/users?username=${loginUser.username}`).then(response => {
                this.user = response.data[0];
                if (this.user.gender == '1'){
                    this.user.gender = '男性';
                } 
                if(this.user.gender == '2'){
                    this.user.gender = '女性';
                }
                if(this.user.gender == '3'){
                    this.user.gender = '未知';
                }
            });

        }
    },
    mounted() {
        this.getUser();
    }

}
</script>

<style scoped>

.el-form-item {
    height: 70px;
    margin: 20px 30px;
}

:deep(.el-form-item__label) {
    font-weight: bold;
}

.box-card {
    justify-content: center;
    align-items: center;

   
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
}


/* ::v-deep .el-input {
    border:0;
    background: transparent !important;
} */

.clearfix {
    height: 50px;
    text-align: center;
    line-height: 60px;
    font-size: 35px;
    font-family: STFangsong,STKaiti;
    font-style: oblique;
    font-weight: bold;
}

</style>