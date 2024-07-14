<template>
    <div>
        <!-- 头部 -->
        <el-page-header @back="() => this.$router.back()" :content="this.course.id ? '编辑课程' : '新增课程'">
        </el-page-header>
        <!-- 表单 -->
        <el-form ref="form" :model="course" :rules="rules" label-width="80px">
            <!-- 卡片组件 -->
            <el-card shadow="never">
                <header slot="header">基本信息</header>
                <el-form-item label="课程名称" prop="courseName">
                    <el-input v-model="course.courseName"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="课程方向" prop="direction">
                            <el-select v-model="course.direction">
                                <el-option value="项目管理"></el-option>
                                <el-option value="IT管理"></el-option>
                                <el-option value="数字安全"></el-option>
                                <el-option value="软考"></el-option>
                                <el-option value="运维"></el-option>
                                <el-option value="云计算"></el-option>
                                <el-option value="数据库"></el-option>
                                <el-option value="软件开发"></el-option>
                                <el-option value="办公应用"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="岗位" prop="post">
                            <el-select v-model="course.post">
                                <el-option value="网络工程师"></el-option>
                                <el-option value="系统工程师"></el-option>
                                <el-option value="安全工程师"></el-option>
                                <el-option value="运维工程师"></el-option>
                                <el-option value="技术经理"></el-option>
                                <el-option value="项目经理"></el-option>
                                <el-option value="产品经理"></el-option>
                                <el-option value="软件开发"></el-option>
                                <el-option value="开发工程师"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="授课方式" prop="mode">
                            <el-select v-model="course.mode">
                                <el-option value="直播"></el-option>
                                <el-option value="面授"></el-option>
                                <el-option value="录播"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="培训课时" prop="hours">
                            <el-input v-model="course.hours"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开课时间" prop="startDate">
                            <el-date-picker type="date" v-model="course.startDate"
                                value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="显示顺序" prop="sortNum">
                            <el-input-number v-model="course.sortNum" :min="1"
                                controls-position="right"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="课程简介" prop="intro">
                    <el-input type="textarea" v-model="course.intro"></el-input>
                </el-form-item>
                <el-form-item label="主图" prop="mainImg">
                    <!-- el-upload 上传组件
                     name 上传文件的参数名
                     action 上传路径
                     accept 接受上传的文件类型 选择文件时的过滤
                     limit 最大允许上传文件个数
                     list-type 组件的样式
                     flie-list 上传文件之后的文件对象（组件自己创建的）数组 值是数组 必须要配
                     :before-upload 上传之前的处理函数，它可以阻止文件上传 功能：校验文件格式
                     on-success 上传成功之后的处理
                     on-exceed 超出文件个数限制之后的处理
                     on-remove 删除文件之后的处理
                     -->
                    <el-upload action="http://localhost:3000/upload" accept="image/*" :limit="1"
                        list-type="picture-card" :file-list="mainFileList" :before-upload="beforeUploadHandle"
                        :on-success="onSuccessHandle" :on-exceed="onExceedHandle" :on-remove="onRemoveHandle">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-card>

            <el-card shadow="never">
                <header slot="header">价格信息</header>
                <el-form-item label="课程价格" prop="price">
                    <el-input v-model="course.price">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="活动标签" prop="tag">
                    <el-input v-model="course.tag"></el-input>
                </el-form-item>
            </el-card>

            <el-card shadow="never">
                <header slot="header">讲师信息</header>
                <el-form-item label="讲师姓名" prop="teacherName">
                    <el-input v-model="course.teacherName"></el-input>
                </el-form-item>
                <el-form-item label="讲师简介" prop="teacherIntro">
                    <el-input type="textarea" v-model="course.teacherIntro"></el-input>
                </el-form-item>
            </el-card>

            <el-card shadow="never">
                <header slot="header" prop="description">课程介绍</header>
                <el-form-item prop="description">
                    <el-upload action="http://localhost:3000/upload" accept="image/*" list-type="picture-card"
                        :file-list="descFileList" :before-upload="beforeUploadHandle" :on-success="onSuccessHandle2"
                        :on-remove="onRemoveHandle2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-card>

            <div class="submit-btn">
                <el-button type="primary" round @click="submitCourse">保 存</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'CourseAddUpdate',
    data() {
        return {
            // 课程
            course: {
                id: undefined,
                courseName: undefined,
                direction: undefined,
                post: undefined,
                mode: undefined,
                mainImg: undefined,
                hours: undefined,
                startDate: undefined,
                tag: undefined,
                intro: undefined,
                price: undefined,
                teacherName: undefined,
                teacherIntro: undefined,
                description: [],
                sortNum: 1,
                status: 0
            },
            // 校验
            rules: {
                courseName: [
                    { required: true, message: '课程名称不能为空', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
                ],
                direction: [
                    { required: true, message: '请选择课程方向', trigger: 'change' }
                ],
                post: [
                    { required: true, message: '请选择岗位', trigger: 'change' }
                ],
                mode: [
                    { required: true, message: '请选择授课方式', trigger: 'change' }
                ],
                logo: [
                    { required: true, message: '请上传主图照片', trigger: 'blur' }
                ],
                hours: [
                    { required: true, message: '培训课时不能为空', trigger: 'blur' }
                ],
                startDate: [
                    { required: true, message: '开课时间不能为空', trigger: 'blur' }
                ],
                intro: [
                    { required: true, message: '课程简介不能为空', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '课程售价不能为空', trigger: 'blur' }
                ],
                teacherName: [
                    { required: true, message: '讲师姓名不能为空', trigger: 'blur' }
                ],
                teacherIntro: [
                    { required: true, message: '讲师简介不能为空', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请上传课程介绍', trigger: 'blur' }
                ]
            },
            // 上传文件数组
            mainFileList: [],
            descFileList: []
        };
    },
    methods: {
        // 单查数据回显课程
        getCourse(id) {
            this.$axios.get(`/courses/${id}`).then(response => {
                this.course = response.data;
                // 回显图片: 手动维护fileList,在数组中添加一个模拟的文件对象
                this.mainFileList.push({
                    // 文件对象属性: 文件名称name,文件路径url,response上传之后的响应数据
                    url: 'http://localhost:8080/' + this.course.mainImg,
                    response: {
                        msg: this.course.mainImg
                    }
                });
                this.course.description.forEach(item => {
                    this.descFileList.push({
                        url: 'http://localhost:8080/' + item,
                        response: {
                            msg: item
                        }
                    });
                });
            });
        },
        submitCourse() {
            // 先进行数据校验
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    if (this.course.id) {
                        this.$axios.patch(`/courses/${this.course.id}`, this.course).then(response => {
                            // 提示用户
                            this.$message.success('编辑成功');
                            // 回到列表页
                            this.$router.push({ name: 'Course' });
                        });
                    }
                    else {
                        this.$axios.post('/courses', this.course).then(response => {
                            // 提示用户
                            this.$message.success('新增成功');
                            // 回到列表页
                            this.$router.push({ name: 'Course' });
                        });
                    }
                }
            });
        },
        // 文件类型校验
        beforeUploadHandle(file) {
            // file参数为组件创建的将要上传的文件对象
            const fileType = file.type;
            if (fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/gif') {
                // 可以上传
                return true;
            }
            this.$message.error('上传文件只能是png,jpg或者gif格式!');
            return false;
        },
        // 上传之后的处理
        onSuccessHandle(response) {
            // 上传成功后服务器响应回来的数据
            console.log(response);
            this.course.mainImg = response.msg;
            this.$message.success('图片上传成功');
        },
        // 超出限制之后的处理
        onExceedHandle() {
            this.$message.warning('仅能上传一张主图');
        },
        // 文件删除之后的处理
        onRemoveHandle() {
            this.course.mainImg = undefined;
        },
        // 上传之后的处理
        onSuccessHandle2(response) {
            // 上传成功后服务器响应回来的数据
            console.log(response);
            this.course.description.push(response.msg);
            this.$message.success('图片上传成功');
        },
        // 文件删除之后的处理
        onRemoveHandle2(file) {
            // 满足条件的被保留，返回新的数组，重新赋值
            this.course.description = this.course.description.filter(item => item != file.response.msg);
        }
    },
    mounted() {
        // 从路由中获取传递的课程id
        this.course.id = this.$route.params.id;
        // 判断id是否有值
        if (this.course.id) {
            // 有值就是编辑
            this.getCourse(this.course.id);
        }
    }
};
</script>

<style scoped>
.el-page-header {
    margin: 10px 0 30px;
}

.el-card {
    margin-bottom: 20px;
}

.el-select {
    display: block;
}

.el-input-number {
    width: 100%;
}

.el-date-editor.el-input {
    width: 100%;
}

.submit-btn {
    text-align: center;
}
</style>
