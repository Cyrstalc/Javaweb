<template>
    <div>
        <!-- 头部 动态显示课程名称 -->
        <el-page-header @back="() => this.$router.back()" :content="course.courseName">
        </el-page-header>
        <!-- 添加章节按钮 -->
        <div class="add-btn">
            <el-button type="primary" @click="addUpdateChapter()">添加章节</el-button>
        </div>
        <!-- 树形控件:展示课程对应的章节信息 -->
        <el-tree :data="chapters">
            <!-- slot-scope（作用域插槽）：代表当前树节点内容，有两个参数 data表示当前树节点的数据, node表示当前节点 -->
            <div class="custom-tree-node" slot-scope="{ data }">
                <span>{{ data.chapterName }}</span>
                <span>
                    <el-button type="warning" size="small" icon="el-icon-edit" @click="addUpdateChapter(data.id)"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteChapter(data.id)"></el-button>
                </span>
            </div>
        </el-tree>

        <chapter-add-update ref="addUpdate" @refreshData="queryChapter"></chapter-add-update>
    </div>
</template>

<script>
// 导入新增修改页
import ChapterAddUpdate from './ChapterAddUpdate.vue';
export default {
    name: 'Chapter',
    data() {
        return {
            // 课程
            course: {
                id: undefined,
                courseName: undefined
            },
            // 课程章节数组
            chapters: []
        };
    },
    methods: {
        // 获取课程对应的章节列表 courseId是课程id，是查询课程列表的必带条件 
        // 没有courseId,就会显示所有课程的所有章节，而不是对应课程的所有章节
        queryChapter(courseId) {
            this.$axios.get('/chapters', {
                params: {
                    courseId: courseId,
                    _sort: 'sortNum'
                }
            }).then(({ data }) => {
                this.chapters = data;
            });
        },
        addUpdateChapter(id) {
            // 课程id（新增），课程名称（新增和编辑），章节id(章节编辑)
            // 此函数参数id指的是章节id
            // 父调用子方法
            this.$refs.addUpdate.initDialog(this.course,id);
        },
        deleteChapter(id) {
            this.$confirm('确定要删除该条数据吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/chapters/${id}`).then(response => {
                    this.$message.success('删除成功');
                    this.queryChapter(this.course.id);
                });
            }).catch(() => { });

        }

    },
    mounted() {
        // 从路由中获取传递的参数
        let params = this.$route.params;
        if (params.courseName && params.courseId) {
            this.course.courseName = params.courseName;
            this.course.id = params.courseId;
            // 查询章节
            this.queryChapter(this.course.id);
        }
    },
    components: {
        ChapterAddUpdate
    }
};
</script>

<style scoped>
.el-page-header {
    margin: 10px 0 30px;
}

.add-btn {
    margin: 20px 0;
}

/*
 el-tree是一个组件名称 在element-ui中组件名称在组件被解析后，就是一个样式
/deep/ 使自定义样式能够在第三方ui框架的组件中生效 
*/
.el-tree /deep/ .el-tree-node__content {
    /* 内部高度有多大，外部高度就有多大 */
    height: auto;
}

.custom-tree-node {
    display: flex;
    /* 两端对齐 */
    justify-content: space-between;
    align-items: center;
    flex: auto;
    /* 内边距 */
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
}
</style>
