<template>
    <div class="card" style="margin: 100px 350px">
        <el-card class="box">
            <div slot="header" class="clrfix">
                <span>修改密码</span>
                </div>
            <el-form ref="pwd" :model="user" :rules="rules" label-width="80px" style="padding-right: 20px">               
                <el-form-item label="用户名">
                    <el-input v-model="user.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="password">
                    <el-input v-model="user.password" placeholder="密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="user.newPassword" placeholder="新密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="user.confirmPassword" placeholder="确认密码" show-password></el-input>
                </el-form-item>
                <div class="submit-btn">
                    <el-button type="primary" round @click="submitPwd">保 存</el-button>
                </div>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
    name: "Password",
    data() {
        return {
            user: {
                id: undefined,
                username: undefined,
                nickName: undefined,
                password: undefined,
                mobile: undefined,
                gender: undefined,
                newPassword: undefined,
                confirmPassword: undefined,
            },

            rules: {
                password: [
                    { required: true, message: '请输入原始密码', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度为 2 到 15 个字符', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入原始密码', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度为 2 到 15 个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请输入原始密码', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度为 2 到 15 个字符', trigger: 'blur' }
                ]

            }

        };
    },
    methods: {
        getUser() {
            let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
            console.log(loginUser);
            this.$axios.get(`/users?username=${loginUser.username}`).then(response => {
                this.user.username = response.data[0].username;
            });
        },
        submitPwd() {
            this.$refs.pwd.validate(valid => {
                if (valid) {
                    //验证密码
                    this.$axios.get('/users', {
                        params: {
                            username: this.user.username.trim(),
                            password: this.user.password
                        }
                    }).then(({ data }) => {
                        if (data.length != 0) {
                            if (this.user.newPassword == this.user.confirmPassword) {
                                let User = JSON.parse(sessionStorage.getItem('loginUser'));
                                User.password = this.user.newPassword;
                                this.$axios.patch(`/users/${User.id}`, User);
                                sessionStorage.setItem('loginUser', JSON.stringify(data[0]));
                                //2.提交成功，导航到首页
                                this.$router.replace('/');
                            } else {
                                this.$message.error('两次密码不一致');
                            }
                        }
                        else {
                            this.$message('原密码输入错误');
                        }
                    });
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

:deep(.el-form-item__label) {
    font-weight: bold;
}

.box {
    justify-content: center;
    align-items: center;
    height: 450px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

.clrfix {
    height: 50px;
    text-align: center;
    line-height: 60px;
    font-size: 35px;
    font-family:  STKaiti;
    font-style: oblique;
    font-weight: bold;
}

.submit-btn {
    text-align: center;
}

</style>