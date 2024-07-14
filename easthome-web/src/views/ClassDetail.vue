<template>
    <div class="class-detail">
        <el-breadcrumb class="class-nav" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: '1' }">选课中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{ course.courseName }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="class-top">
            <img class="class-top-img" :src="'http://localhost:8080/'+course.mainImg">
            <div class="class-top-info">
                <div :title="course.courseName" class="class-title">
                    {{ course.courseName }}
                </div>
                <div class="class-zxj">
                    <img src="@/assets/detail/money.png">报名课程可获赠300.0元助学金
                </div>
                <div class="class-intro">
                    <img src="@/assets/detail/refund.png" style="margin-right: 4px; margin-top: 2px">
                    <span>{{ course.intro }}</span>
                </div>
                <div class="class-datetime">
                    <div class="class-date">
                        <img src="@/assets/detail/class.png">
                        <span class="classColor">开班时间：{{ course.startDate }}</span>
                    </div>
                    <div class="class-time">
                        <img src="@/assets/detail/time.png">
                        <span class="tooltip">培训课时：{{ course.hours }}</span>
                    </div>
                </div>
                <div class="class-price">
                    <div class="price-box">
                        <img src="@/assets/detail/tag-btn.png">
                        <span>{{ course.mode }}</span>
                        <div class="price1">
                            ￥{{ course.price }}
                        </div>
                        <div class="littleFont">统一销售价</div>
                    </div>
                    <img class="find-btn" src="@/assets/detail/findBtn.png">
                </div>
            </div>
        </div>
        <div class="class-content">
            <div class="class-content-left">
                <!-- el-tabs标签页 value 默认打开第一个内容 -->
                <el-tabs value="first">
                    <el-tab-pane label="课程介绍" name="first">
                        <!-- 循环 d表示图片名称 -->
                        <div class="content-img" v-for="d  in course.description" :key="d">
                            <img :src="'http://localhost:8080/'+d">
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="课程章节" name="second">
                        <div class="class-chapter">
                            <div class="chapter-title">
                                <img src="@/assets/detail/icon1.png" class="icon1">
                                <span class="classTit">课程章节</span>
                                <img src="@/assets/detail/icon2.png" class="icon2">
                            </div>
                            <div class="chatper-name">
                                <el-collapse>
                                    <el-collapse-item v-for="chapter in chapters" :key="chapter.id"
                                        :title="chapter.chapterName"></el-collapse-item>
                                </el-collapse>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="class-content-right">
                <div class="class-teacher">
                    <div class="class-teacher-title">授课讲师</div>
                    <div class="class-teacher-name">{{ course.teacherName }}</div>
                    <div class="class-teacher-intro">
                        {{ course.teacherIntro }}
                    </div>
                </div>
                <div class="hot-course">
                    <div class="hot-course-title">
                        热门课程
                        <img src="@/assets/detail/classDicon3.png">
                    </div>
                    <div class="hot-course-item">
                        <i class="item-one el-icon-star-on"></i>
                        PMP®项目管理
                    </div>
                    <div class="hot-course-item">
                        <i class="item-two el-icon-star-on"></i>
                        CISSP注册信息系统安全认证专家
                    </div>
                    <div class="hot-course-item">
                        <i class="item-three el-icon-star-on"></i>
                        软考高级-信息系统项目管理师
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        Excel VBA——设计与开发实战
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        PeopleCert ITIL® 4 Foundation认证
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        华为存储 HCIP-Storage V5.0
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        CISP注册信息安全专业人员
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        Excel商务数据处理与综合应用
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        VCP-DCV VMware vSphere
                    </div>
                    <div class="hot-course-item">
                        <i class="el-icon-star-on"></i>
                        红帽RHCE 8.0
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'CISP注册信息安全专业人员',
            // 课程对象
            course:{},
            chapters: [
                {
                    "id": 1,
                    "chapterName": "Vuejs基础",
                    "description": "基础语法",
                    "sortNum": 1,
                    "courseId": 1
                },
                {
                    "id": 2,
                    "chapterName": "Vuejs组件",
                    "description": "组件组件组件",
                    "sortNum": 2,
                    "courseId": 1
                },
                {
                    "id": 3,
                    "chapterName": "Vuejs路由",
                    "description": "路由路由路由",
                    "sortNum": 3,
                    "courseId": 1
                },
                {
                    "id": 4,
                    "chapterName": "Nodejs",
                    "description": "js开发环境",
                    "sortNum": 4,
                    "courseId": 1
                },
                {
                    "id": 5,
                    "chapterName": "SPA",
                    "description": "单页面应用程序",
                    "sortNum": 5,
                    "courseId": 1
                },
                {
                    "id": 6,
                    "chapterName": "UI",
                    "description": "ElementUI",
                    "sortNum": 6,
                    "courseId": 1
                }
            ]
        }
    },
    methods: {

    },
    mounted() {
        // 获取路由传递的参数
        let id=this.$route.params.id;
        // 根据id查询课程
        this.$axios.get(`/courses/${id}`).then(({data})=>{
            this.course=data;
        });
        // 根据课程id查询课程下的所有章节
        this.$axios.get(`/chapters?courseId=${id}`).then(({data})=>{
            this.chapters=data;
        });
    }
}
</script>

<style scoped>
.class-detail {
    background-color: #f5f6f6;
}

.class-nav {
    color: #666;
    font-size: 14px;
    height: 62px;
    line-height: 62px;
    margin: 0 auto;
    width: 1200px;
}

.class-top {
    margin: 0 auto;
    width: 1200px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}

.class-top-img {
    position: relative;
    width: 640px;
    height: 362px;
    border-radius: 10px;
}

.class-top-info {
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 362px;
    justify-content: space-around;
    padding: 10px 0;
    width: 535px;
}

.class-title {
    display: block;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    width: 500px;
}

.class-zxj {
    color: #576a95;
    display: block;
    font-size: 14px;
    height: 18px;
    line-height: 18px;
    margin: 8px 0 12px;
}

.class-zxj img,
.class-intro img,
.class-date img,
.class-time img {
    display: inline-block;
    line-height: 18px;
    margin: 1px 4px 0 0;
    border: 0;
    vertical-align: top;
}

.class-intro {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    width: 480px;
}

.class-datetime {
    color: #666;
    display: flex;
    margin-top: 12px
}

.class-date,
.class-time {
    line-height: 18px;
    margin: 0 30px 10px 0;
}

.class-price {
    background-color: #fdfaef;
    border: 1px solid #feecac;
    border-radius: 4px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    height: 103px;
    margin-top: 6px;
    padding: 4px 10px 10px;
    width: 509px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
}

.price-box {
    height: 103px;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.price-box img,
.price-box span {
    height: 36px;
    width: 63px;
}

.price-box span {
    color: #fff;
    font-size: 18px;
    line-height: 36px;
    position: absolute;
    text-align: center;
}

.price-box .price1 {
    align-items: center;
    color: #ff8100;
    display: flex;
    font-size: 22px;
    font-weight: 700;
    margin-left: 10px;
}

.price-box .littleFont {
    color: #8b9298;
    font-size: 14px;
    margin-left: 10px;
}

.find-btn {
    cursor: pointer;
    height: 116px;
    position: absolute;
    right: 0;
    top: 1px;
    width: 167px;
}

.class-content {
    margin: 20px auto 0;
    padding-bottom: 30px;
    width: 1200px;
    display: flex;
    justify-content: space-between;
}

.class-content-left {
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    width: 830px;
    border-radius: 10px;
    height: auto;
    /* min-height: 800px; */
}

.class-content-left /deep/ .el-tabs__nav-wrap {
    padding: 0 20px;
}

.class-content-left /deep/ .el-tabs__active-bar {
    background-color: #0064b8;
    border-radius: 4px 4px 0 0;
    height: 4px;
    width: 33px;
}

.class-content-left /deep/ .is-active {
    color: #0064b8;
    font-weight: 700;
}

.class-content-left /deep/ .el-tabs__item {
    border-radius: 10px;
    font-size: 17px;
    font-weight: 700;
    margin: 10px 0;
    text-align: center;
    width: 140px;
}

.class-content-left /deep/ .el-tabs__item:hover {
    color: #2f67a6;
    cursor: pointer;
}

.content-img img {
    width: 100%;
}

.class-chapter {
    padding: 0 30px;
}

.chapter-title {
    color: #333;
    font-size: 17px;
    font-weight: 700;
    height: 42px;
    line-height: 22px;
    margin: 15px 0 10px;
    padding: 10px 0;
    text-align: center;
}

.chapter-title>span {
    font-size: 18px;
}

.chatper-name {
    width: 600px;
    margin: 0 auto;
}

.chatper-name /deep/ .el-collapse-item__header {
    font-size: 18px;
}

.class-content-right {
    width: 350px;
}

.class-teacher {
    background: #fff;
    border-radius: 6px;
    margin: 0 0 10px;
    padding: 30px 20px;
}

.class-teacher-title,
.hot-course-title {
    color: #333;
    font-size: 24px;
    font-weight: 700;
    height: 22px;
    line-height: 22px;
    margin-bottom: 20px;
    width: 100%;
}

.class-teacher-title:before,
.hot-course-title:before {
    background: #2f67a6;
    border-radius: 5px;
    content: "";
    display: inline-block;
    height: 16px;
    margin-right: 6px;
    width: 6px;
}

.class-teacher-name {
    color: #333;
    font-size: 17px;
    font-weight: 700;
    line-height: 26px;
}

.class-teacher-intro {
    margin-top: 5px;
    color: #666;
    font-size: 14px;
    line-height: 21px;
}

.hot-course {
    background: #fff;
    border-radius: 6px;
    margin: 0 0 10px;
    padding: 30px 20px;
}

.hot-course-item {
    color: #333;
    cursor: pointer;
    font-size: 14px;
    line-height: 22px;
    padding: 5px 0 10px;
}

.hot-course-item:hover {
    background: #f0f7ff;
    color: #2f67a6;
}

.hot-course-item>i {
    color: #ccc;
    display: inline-block;
    font-size: 21px;
    height: 22px;
    line-height: 22px;
    margin: 0 6px 0 0;
    text-align: center;
    width: 22px;
}

.item-one {
    background-image: linear-gradient(135deg, #ffd200, #ffb400);
    border-radius: 50% 50%;
    color: #fff !important;
    font-size: 16px;
}

.item-two {
    background-image: linear-gradient(135deg, #e0dcdc, #a9a2a2);
    border-radius: 50% 50%;
    color: #fff !important;
    font-size: 16px;
}

.item-three {
    background-image: linear-gradient(135deg, #c6a069, #dfcbad);
    border-radius: 50% 50%;
    color: #fff !important;
    font-size: 16px;
}
</style>