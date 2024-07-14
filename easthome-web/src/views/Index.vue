<template>
    <div>
        <div class="header">
            <div class="shengDanCla">
                <div class="clearfix headerWrap headerTop">
                    <span class="headerLogo fl"></span>
                    <div class="headerTopMid clearfix fl">
                        <span class="search-icon"></span>
                        <el-input class="headerTopInput" size="medium" v-model="searchTxt" clearable placeholder="搜索课程">
                            <!-- <el-button type="primary" size="small" slot="append"> 搜索</el-button> -->
                        </el-input>
                        <div class="blue-enter-search">搜索</div>
                    </div>
                </div>
                <div class="clearfix headerNavs">
                    <div class="headerWrap clearfix">
                        <a v-for="(nav, index) in navs" class="fl headerNav" @click="selectLink(nav, index)"
                            :key="index" :class="{ 'headerWrapActive': index === activeIndex }">{{ nav.label }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="routerView">
            <router-view></router-view>
        </div>
        <div class="footer">
            <div>
                Copyright<sup>©</sup> 2006-2020
                东方瑞通（北京）咨询服务有限公司版权所有
            </div>
            <div>
                京ICP备 13009094号-4
                <img src="http://www.beian.gov.cn/img/new/gongan.png">
                京公网安备 11010802031185号
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTxt: '',
            navs: [
                { url: '/main', label: '首页' },
                { url: '/classCenter', label: '选课中心' },
                { url: '/training', label: '企业培训' },
                { url: '/exam', label: '考试认证' }
            ],
            activeIndex: parseInt(this.$route.name)
        }
    },
    methods: {
        selectLink(nav, index) {
            this.activeIndex = index;
            this.$router.push(nav.url);
        }
}
}
</script>

<style scoped>
.header {
    box-shadow: 0 8px 16px rgba(55, 99, 170, .1);
    position: fixed;
    top: 0;
    width: 100%
}

.header-one,
.header {
    background-color: #fff;
    height: 108px;
    padding: 10px 0 0;
    z-index: 100;
}

.headerWrap {
    margin: 0 auto;
    width: 1200px;
}

.headerTop {
    overflow: hidden;
}

.headerLogo {
    background: url(~@/assets/logo.png) no-repeat;
    background-size: contain;
    height: 39px;
    width: 226px;
}

.fl {
    float: left;
}

.headerTopMid {
    border: 1px solid #05f;
    border-radius: 8px;
    height: 40px;
    margin: 0 0 0 213px;
    position: relative;
    width: 440px;
}

.headerTopMid /deep/ .el-input__inner {
    border: 0;
    width: 100%;
}

.el-input--medium /deep/ .el-input__inner {
    height: 40px;
    line-height: 40px;
}

.search-icon {
    background: url(~@/assets/search.png) no-repeat 50%;
    background-size: contain;
    height: 21px;
    left: 6px;
    position: absolute;
    top: 8px;
    width: 21px;
    z-index: 1
}

.headerTopInput {
    margin-left: 20px;
    width: 360px;
}

.blue-enter-search {
    background-color: #05f;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    position: absolute;
    right: 2px;
    text-align: center;
    top: 3px;
    width: 60px
}

.headerNavs {
    height: 54px;
    margin: 4px 0 0;
}

.headerNav {
    cursor: pointer;
    display: inline-block;
    line-height: 54px;
    margin-right: 56px;
    position: relative;
    vertical-align: top;
}

.headerWrap a {
    border: 0;
}

.headerWrap a {
    color: #000;
}

.headerWrap a,
.headerWrap a:link {
    -webkit-text-decoration: none;
    text-decoration: none;
}

.headerWrap .headerWrapActive {
    font-weight: 700;
}

.headerWrap .headerWrapActive:after {
    background-color: #05f;
    border-radius: 2px;
    bottom: 6px;
    content: "";
    height: 4px;
    left: 50%;
    position: absolute;
    transform: translateX(-14px);
    width: 28px;
}

.routerView {
    margin-top: 120px;
    margin-bottom: 20px;
}

.footer {
    position: fixed;
    bottom: 0;
    background-color: #e7e7e7;
    height: 50px;
    width: 100%;
}

.footer > div {
    color: #b4b4b4;
    font-size: 12px;
    text-align: center;
}
</style>