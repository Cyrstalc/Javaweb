<template>
    <div>
        <!-- 
        查询表单
        所有表单项都在一行内出现 inline	行内表单模式	boolean	—	默认值false 
        在element-ui框架中，如果组件的属性类型为boolean
        赋予flase时，:属性名="false"
        赋予true时，:属性名="true" ===> 简化 仅编写属性名称
        -->
        <el-form inline>
            <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，
             表单域中可以放置各种类型的表单控件，包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker
            -->
            <el-form-item>
                <!-- 
                clearable 提供一个清空此组件的功能 clearable	是否可清空	boolean	—	默认值:false
                -->
                <!-- 
                Input 为受控组件，它总会显示 Vue 绑定值。
                通常情况下，应当处理 input 事件，并更新组件的绑定值（或使用v-model）。
                否则，输入框内显示的值将不会改变。
                不支持 v-model 修饰符。当不支持使用 v-model的简写时(:model),使用v-model
                placeholder 初始文本
                -->
                <el-input v-model="searchForm.username" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchForm.nickName" placeholder="昵称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchForm.mobile" placeholder="手机号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 
                Select 选择器 当选项过多时，使用下拉菜单展示并选择内容
                placeholder 初始文本
                clearable	是否可以清空选项	boolean	—	默认：false
                v-model的值为当前被选中的el-option的 value 属性值
                label	选项的标签，若不设置则默认与 value 相同	
                -->
                <el-select v-model="searchForm.gender" placeholder="性别" clearable>
                    <el-option label="男性" value="1"></el-option>
                    <el-option label="女性" value="2"></el-option>
                    <el-option label="未知" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="queryUser">查询</el-button>
                <!-- 新增用户 打开新增编辑页面 -->
                <el-button type="primary" @click="addUpdateUser()">新增用户</el-button>
            </el-form-item>
        </el-form>
        <!-- 数据表格 -->
        <!-- border 是否带有纵向边框   stripe	是否为斑马纹 -->
        <el-table :data="tableData" border stripe>
            <!-- id和用户名固定在页面左侧，操作固定在页面右侧 表头对齐方式为居中对齐 -->
            <el-table-column prop="id" label="ID" header-align="center" width="70" fixed></el-table-column>
            <el-table-column prop="username" label="用户名" header-align="center" fixed></el-table-column>
            <el-table-column prop="nickName" label="昵称" header-align="center"></el-table-column>
            <el-table-column prop="mobile" label="手机号" header-align="center"></el-table-column>
            <!-- formatter	用来格式化内容 值是函数 -->
            <el-table-column prop="gender" label="性别" header-align="center"
                :formatter="genderFormatter"></el-table-column>
            <el-table-column label="操作" header-align="center" align="center" width="150" fixed="right">
                <!-- 通过slot-scope作用域插槽可获取表格的当前行数据 -->
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="addUpdateUser(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- 
        current-change 自定义事件，当页面变化时自动触发的事件 
        size-change	自定义事件，每页条数改变时会触发-->
        <!-- 
            设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，
            pager表示页码列表，除此以外还提供了jumper和total，sizes和特殊的布局符号->，->后的元素会靠右显示，
            jumper表示跳页元素，total表示总条目数，sizes用于设置每页显示的页码数量。 
            page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项
            page-size	每页显示条目个数
            -->
        <el-pagination :current-page="pageData.current" :page-size="pageData.size" :total="pageData.total"
            :page-sizes="[5, 10, 20, 50]" layout="sizes, prev, pager, next, ->, total, jumper"
            @current-change="currentChangeHandle" @size-change="sizeChangeHandle">
        </el-pagination>
        <!-- 新增编辑页 -->
        <user-add-update ref="addUpdate" @refreshTable="queryUser"></user-add-update>
    </div>
</template>

<script>
// 导入用户新增编辑页面
import UserAddUpdate from "./UserAddUpdate.vue";
export default {
    name: "User",
    data() {
        return {
            // 查询表单数据
            searchForm: {
                username: undefined,
                nickName: undefined,
                mobile: undefined,
                gender: undefined
            },
            // 表格数据
            tableData: [],
            // 分页数据
            pageData: {
                current: 1,
                size: 5,
                total: 0,
            },
        };
    },
    methods: {
        // 页面变化事件函数，参数page:变化之后的新页码
        currentChangeHandle(page) {
            // 将页码赋予data中的数据current
            this.pageData.current = page;
            // 重新查询数据
            this.queryUser();
        },
        // 每页条数变化 参数size 变化之后的新条数
        sizeChangeHandle(size) {
            // 将新条数赋予data中的数据size
            this.pageData.size = size;
            // 重置页码为1
            this.pageData.current = 1;
            // 重新查询
            this.queryUser();
        },
        // 查询用户
        queryUser() {
            this.$axios
                .get("/users", {
                    params: {
                        // 分页相关参数
                        _page: this.pageData.current,
                        _limit: this.pageData.size,
                        // 当username参数的值为undefined，null时，在请求中是不会携带此参数
                        // 实现条件查询 当username参数的值为空字符串，请求中还会携带此参数
                        // username:this.searchForm.username?this.searchForm.username:undefined
                        username: this.searchForm.username || undefined,
                        nickName: this.searchForm.nickName || undefined,
                        mobile: this.searchForm.mobile || undefined,
                        gender: this.searchForm.gender || undefined
                    }
                })
                .then((response) => {
                    // 将从后台拿到的数据的值赋给tableData
                    this.tableData = response.data;
                    // 分页时总记录数是在响应头中携带的 x-total-count
                    // console.log(response.headers['x-total-count']);
                    this.pageData.total = parseInt(response.headers['x-total-count']);
                });
        },
        // 性别列数据格式化
        genderFormatter(row, column, cellValue) {
            // 必须有返回值
            if (cellValue == "1") {
                return "男性";
            } else if (cellValue == "2") {
                return "女性";
            } else if (cellValue == "3") {
                return "未知";
            } else return "性别错误";
        },
        // 打开新增编辑页面
        addUpdateUser(id) {
            // 父调用子方法
            this.$refs.addUpdate.initDialog(id);
        },
        deleteUser(id) {
            this.$confirm('确定要删除该条数据吗？', '提示', {
                type: 'warning'
            }).then(() => {
                // this.$message.success(id);
                this.$axios.delete(`/users/${id}`).then(response => {
                    // 提示用户
                    this.$message.success('删除成功');
                    // 刷新页面 
                    this.queryUser();
                });
            }).catch(() => { });

        }
    },
    mounted() {
        // 实现一打开用户管理页面就把后台数据显示出来
        this.queryUser();
    },
    components: {
        // 配置组件
        UserAddUpdate
    }
};
</script>

<style scoped></style>