<template>
    <div>
        <!-- close	Dialog 关闭的回调
         :title 动态传参，根据用户id判断是新增页面还是修改页面
          @close 关闭的回调	
        -->
        <el-dialog :title="user.id ? '编辑' : '新增'" :visible.sync="visible" width="600px" :close-on-click-modal="false"
            @close="closeHandle">
            <el-form ref="form" :model="user" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickName">
                    <el-input v-model="user.nickName" placeholder="用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user.password" placeholder="密码" show-password></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="user.mobile" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="user.gender" placeholder="性别">
                        <el-option label="男性" value="1"></el-option>
                        <el-option label="女性" value="2"></el-option>
                        <el-option label="未知" value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="submitUser">确 定</el-button>
                <!-- 点击取消新增用户弹窗消失 -->
                <el-button @click="visible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserAddUpdate',
    data() {
        return {
            visible: false,
            // 用户
            user: {
                id: undefined,
                username: undefined,
                nickName: undefined,
                password: undefined,
                mobile: undefined,
                gender: undefined
            },
            // 校验
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度为 2 到 15 个字符', trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '用户昵称不能为空', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 初始化弹窗
        initDialog(id) {
            // 将列表页传递过来的id赋予user
            this.user.id = id;
            // 打开窗体
            this.visible = true;
            // 根据ID获取用户给表单设置初始数据  {data}从响应中解构出data
            if (this.user.id) {
                this.$axios.get(`/users/${this.user.id}`).then(({ data }) => {
                    this.user = data;
                });
            }
        },
        // 提交表单
        submitUser() {
            // 先进行数据校验
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    if (this.user.id) {
                        this.$axios.patch(`/users/${this.user.id}`, this.user).then(response => {
                            // 提示用户
                            this.$message.success('编辑成功');
                            // 关闭窗体
                            this.visible = false;
                            // 刷新表格
                            this.$emit('refreshTable');
                        });
                    }
                    else {
                        this.$axios.post('/users', this.user).then(response => {
                            // 提示用户
                            this.$message.success('新增成功');
                            // 关闭窗体
                            this.visible = false;
                            // 刷新表格 触发自定义事件执行，从而刷新表格
                            this.$emit('refreshTable');
                        });
                    }
                }
            });

        },
        closeHandle() {
            // 清理表单
            this.$refs.form.resetFields();
        }
    }
}
</script>

<style scoped>
.el-select {
    display: block;
}
</style>