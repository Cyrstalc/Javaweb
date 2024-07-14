<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">请登录</div>
            <el-form class="ms-content" ref="login" :model="dataForm" :rules="rules" label-width="0px">
                <el-form-item prop="username">
                    <el-input v-model="dataForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="dataForm.password" show-password
                        @keyup.enter.native="submitForm()" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            // 表单校验
            this.$refs.login.validate(valid => {
                if (valid) {
                    // 校验通过，进行登录:查询用户
                    this.$axios.get('/users', {
                        params: {
                            username: this.dataForm.username.trim(),
                            password: this.dataForm.password
                        }
                    }).then(({ data }) => {
                        // 密码和用户名正确
                        if (data.length != 0) {
                            // replace方法，不会回退到登录页面
                            // 登录成功之后的操作
                            // 1.记录用户信息 共享数据 浏览器存储空间 sessionStorage
                            // value为字符串
                            // setItem(key,value) 存储value
                            // getItem(key,value) 返回值value
                            // removeItem(key,value) 删除value
                            sessionStorage.setItem('loginUser',JSON.stringify(data[0]));
                            // 2.导航到首页
                            this.$router.replace('/');
                        } else {
                            this.$message.error('用户名或密码有误!');
                        }
                    });
                }
            })
        }
    }
}
</script>

<style scoped>
.login-wrap {
    height: 100vh;
    background-image: url(~@/assets/img2.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ms-login {
    width: 450px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-title {
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    color:#ddd;
    border-bottom: 1px solid #ddd;
    letter-spacing: 10px;
}

.ms-content {
    padding: 30px 30px 10px;
}

.el-button {
    width: 100%;
    background-color:rgba(15, 15, 231, 0.689);
    border: none;
}
</style>
