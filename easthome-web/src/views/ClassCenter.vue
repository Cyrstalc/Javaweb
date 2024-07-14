<template>
    <div class="choose-class-center">
        <div class="classify">
            <div class="direction">
                <span class="title">方向</span>
                <div class="filterContent">
                    <span class="filterItem" v-for="(item, index) in directions" :key="index"
                        @click="selectLink('dir', item, index)" :class="{ activeStyle: index === dirActiveIndex }">
                        {{ item }}
                    </span>
                </div>
            </div>
            <div>
                <div class="technology">
                    <span class="title">岗位</span>
                    <div class="filterContent">
                        <span class="filterItem" v-for="(item, index) in technologys" :key="index"
                            @click="selectLink('tech', item, index)"
                            :class="{ activeStyle: index === techActiveIndex }">
                            {{ item }}
                        </span>
                    </div>
                </div>
                <div class="way"><span class="title">方式</span>
                    <div class="filterContent">
                        <span class="filterItem" v-for="(item, index) in ways" :key="index"
                            @click="selectLink('way', item, index)" :class="{ activeStyle: index === wayActiveIndex }">
                            {{ item }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="class-area">
            <div class="class-area-wait">
                <div class="class-card">
                    <!-- 循环遍历  c 代表课程对象 -->
                    <div class="card-item" v-for="c in courses" :key="c.id" @click="showDetail(c.id)">
                        <!-- 页面主图 -->
                        <img :src="'http://localhost:8080/' + c.mainImg" class="courseImage">
                        <div class="class-text">
                            <!-- 课程名称 -->
                            <div class="class-name">
                                {{ c.courseName }}
                            </div>
                            <div class="begin-time">
                                <span>开课时间：{{ c.startDate }}</span>
                            </div>
                            <div class="class-sign">
                                <span class="type">{{ c.mode }}</span>
                                <!-- 循环 课程对象中的tag字符串 标签 -->
                                <span class="sign-item" v-for="s in c.tag.split(',')" :key="s">{{ s }}</span>
                            </div>
                            <div class="class-price fr">
                                <span class="num">
                                    <span>
                                        <span class="pricePrefix">¥</span>
                                        <span>{{ c.price }}</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="class-pagination">
                    <el-pagination :current-page="pageData.current" :page-size="pageData.size" :total="pageData.total"
                        background layout="prev, pager, next" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            directions: ['全部', '项目管理', 'IT管理', '数字安全', '软考', '运维', '云计算', '数据库', '软件开发', '办公应用'],
            dirActiveIndex: 0,
            technologys: ['全部', '网络工程师', '系统工程师', '安全工程师', '运维工程师', '技术经理', '项目经理', '产品经理', '开发工程师'],
            techActiveIndex: 0,
            ways: ['全部', '直播', '面授', '录播'],
            wayActiveIndex: 0,
            pageData: {
                current: 1,
                size: 16,
                total: 253
            },
            search: {
                direction: undefined,
                technology: undefined,
                way: undefined
            },
            courses: []
        }
    },
    methods: {
        selectLink(type, name, index) {
            if (type == 'dir') {
                this.dirActiveIndex = index;
                this.techActiveIndex = 0;
                this.wayActiveIndex = 0;
                this.search = {
                    direction: name == '全部' ? undefined : name,
                    technology: undefined,
                    way: undefined
                };
            } else if (type == 'tech') {
                this.dirActiveIndex = 0;
                this.techActiveIndex = index;
                this.wayActiveIndex = 0;
                this.search = {
                    direction: undefined,
                    technology: name == '全部' ? undefined : name,
                    way: undefined
                };
            } else if (type == 'way') {
                this.dirActiveIndex = 0;
                this.techActiveIndex = 0;
                this.wayActiveIndex = index;
                this.search = {
                    direction: undefined,
                    technology: undefined,
                    way: name == '全部' ? undefined : name
                };
            }
            this.queryCourse();
        },
        handleCurrentChange(page) {
            this.pageData.current = page;
            this.queryCourse();
        },
        queryCourse() {
            // 查询课程列表，带分页功能，排序，条件
            this.$axios.get('/courses',{
                params:{
                    _page:this.pageData.current,
                    _limit:this.pageData.size,
                    _sore:'sortNum',
                    // 仅查询已发布
                    status:'1',
                    direction:this.search.direction,
                    post:this.search.technology,
                    mode:this.search.way
                }
            }).then(response => {
                this.courses=response.data;
                this.pageData.total=parseInt(response.headers['x-total-count']);
            });
        },
        showDetail(id) {
            // this.$router.push({ name: 'ClassDetail' });
            // 路径传值
            this.$router.push(`/classDetail/${id}`);
        }
    },
    mounted() {
        this.queryCourse();
    }
}
</script>

<style scoped>
.classify {
    background-color: #f5f7fa;
    padding: 24px 0 10px;
}

.direction,
.technology,
.way {
    align-items: flex-start;
    display: flex;
    margin: 8px auto 0;
    min-height: 44px;
    width: 1200px;
}

.title {
    color: #202226;
    display: inline-block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    margin-right: 30px;
}

.filterContent {
    width: 1054px;
}

.filterItem {
    color: #202226;
    cursor: pointer;
    display: inline-block;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    margin-bottom: 10px;
    margin-right: 7px;
    padding: 4px 15px 5.8px;
}

.filterItem:hover {
    color: #05f;
}

.activeStyle {
    background: #dee9ff;
    border-radius: 14px;
    color: #05f;
}

.class-area {
    max-height: 1620px;
    padding-bottom: 28px;
}

.class-area-wait {
    margin: 29px auto 0;
    width: 1226px;
}

.class-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.card-item {
    background: url(~@/assets/class/card.png) no-repeat 50%;
    background-size: contain;
    cursor: pointer;
    /* height: 346px; */
    height: 322px;
    padding: 0 13px 24px;
    position: relative;
    /* width: 306px; */
    width: 280px;
}

.card-item:hover {
    background: url(~@/assets/class/card-selected.png) no-repeat 50%;
    background-size: contain;
    transform: translateY(-12px);
    transition: all .2s;
}

.courseImage {
    border-radius: 8px 8px 0 0;
    height: 157px;
    width: 100%;
}

.class-text {
    padding: 11px 16px 12px;
}

.class-name {
    color: #202226;
    display: -webkit-box;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}

.begin-time {
    color: #5a606c;
    font-size: 14px;
    line-height: 19px;
    margin-top: 10px;
    min-height: 19px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
}

.class-sign {
    margin-top: 12px;
    min-height: 20px;
}

.class-sign .type {
    background-color: #d0f9f0;
    border-radius: 4px;
    color: #37c09d;
    font-size: 12px;
    margin-right: 5px;
    padding: 3px 6px;
}

.class-sign .sign-item {
    background-color: #edeff2;
    border-radius: 4px;
    color: #85909b;
    font-size: 12px;
    margin-right: 5px;
    padding: 3px 6px;
}

.class-price {
    bottom: 35px;
    color: #ff7800;
    position: absolute;
    right: 29px;
}

.class-pagination {
    margin-bottom: 20px;
    text-align: center;
}
</style>