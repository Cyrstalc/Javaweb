<template>
    <div>
        <el-dialog :title="chapter.id ? '编辑' : '新增'" :visible.sync="visible" width="600px" :close-on-click-modal="false"
            @close="closeHandle">
            <el-form ref="form" :model="chapter" :rules="rules" label-width="80px">
                <el-form-item label="课程名称">
                    <!-- readonly文本框只能看不能编辑 -->
                    <el-input v-model="course.courseName" readonly></el-input>
                </el-form-item>
                <el-form-item label="章节名称" prop="chapterName">
                    <el-input v-model="chapter.chapterName"></el-input>
                </el-form-item>
                <el-form-item label="章节描述" prop="description">
                    <el-input type="textarea" v-model="chapter.description"></el-input>
                </el-form-item>
                <el-form-item label="章节排序" prop="sortNum">
                    <el-input-number v-model="chapter.sortNum" :min="1" controls-position="right"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="submitChapter">确 定</el-button>
                <el-button @click="visible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ChapterAddUpdate',
    data() {
        return {
            visible: false,
            // 课程
            course: {},
            // 章节
            chapter: {
                id: undefined,
                chapterName: undefined,
                description: undefined,
                sortNum: 1,
                courseId: undefined
            },
            // 校验
            rules: {
                chapterName: [
                    { required: true, message: '章节名称不能为空', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度为 2 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
         // 初始化弹窗
         initDialog(course,chapterId) {
            // 将列表页传递过来的id赋值给data数据
            this.course=course;
            this.chapter.id=chapterId;
            this.chapter.courseId=course.id;
            // 打开窗体
            this.visible = true;
            // 根据ID获取章节给表单设置初始数据  {data}从响应中解构出data
            if (this.chapter.id) {
                this.$axios.get(`/chapters/${this.chapter.id}`).then(({ data }) => {
                    this.chapter = data;
                });
            }
        },
        // 提交表单
        submitChapter() {
            // 先进行数据校验
            this.$refs.form.validate(vaild => {
                if (vaild) {
                    if (this.chapter.id) {
                        this.$axios.patch(`/chapters/${this.chapter.id}`, this.chapter).then(response => {
                            // 提示用户
                            this.$message.success('编辑成功');
                            // 关闭窗体
                            this.visible = false;
                            // 刷新章节列表
                            this.$emit('refreshData',this.course.id);
                        });
                    }
                    else {
                        this.$axios.post('/chapters', this.chapter).then(response => {
                            // 提示用户
                            this.$message.success('新增成功');
                            // 关闭窗体
                            this.visible = false;
                            // 刷新章节列表
                            this.$emit('refreshData',this.course.id);
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
.el-input-number {
    width: 100%;
}
</style>