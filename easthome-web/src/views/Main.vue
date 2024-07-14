<template>
    <div class="static-banner-center">
        <el-card class="course-classifiy">
            <div class="course-classifiy-name">项目管理</div>
            <div class="course-classifiy-name">IT管理</div>
            <div class="course-classifiy-name">数字安全</div>
            <div class="course-classifiy-name">软考</div>
            <div class="course-classifiy-name">信创</div>
            <div class="course-classifiy-name">虚拟化</div>
            <div class="course-classifiy-name"><span>更多</span> <i class="el-icon-arrow-down"></i></div>
        </el-card>
        <!-- 走马灯 -->
        <el-carousel class="swiper-box" height="380px">
            <el-carousel-item class="swiper-container">
                <div class="swiper-container-d1"></div>
            </el-carousel-item>
            <el-carousel-item>
                <div class="swiper-container-d2"></div>
            </el-carousel-item>
            <el-carousel-item>
                <div class="swiper-container-d3"></div>
            </el-carousel-item>
        </el-carousel>
        <el-card class="grants-courseInfo">
            <div class="new-user-hint">
                <div class="introA">即刻登录</div>
                <div class="introB">探索海量优质课程</div>
                <div class="introC">
                    <img class="image" src="@/assets/main/user.png">
                </div>
                <div class="introD-btn">登录/注册</div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.static-banner-center {
    margin-bottom: 32px;
    padding-top: 14px;
    display: flex;
    margin: 0 auto;
    position: relative;
    width: 1224px;
}

.course-classifiy {
    width: 276px;
    border-radius: 8px;
}

.course-classifiy-name {
    border-radius: 8px;
    color: #202226;
    cursor: pointer;
    font-size: 14px;
    height: 38px;
    line-height: 38px;
    margin-bottom: 8px;
    padding: 0 8px;
}

.course-classifiy-name:hover {
    background: #ecf2ff;
    color: #05f;
}

.swiper-box {
    margin-left: 10px;
    position: relative;
    width: 664px;
    border-radius: 8px;
}

.swiper-container-d1 {
    width: 100%;
    height: 100%;
    background: url(~@/assets/main/carousel1.png) center center / 100% 100% no-repeat;
}

.swiper-container-d2 {
    width: 100%;
    height: 100%;
    background: url(~@/assets/main/carousel2.jpg) center center / 100% 100% no-repeat;
}

.swiper-container-d3 {
    width: 100%;
    height: 100%;
    background: url(~@/assets/main/carousel3.png) center center / 100% 100% no-repeat;
}

.grants-courseInfo {
    margin-left: 10px;
    width: 276px;
    border-radius: 8px;
    text-align: center;
}

.new-user-hint {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

.introA {
    color: #202226;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
}

.introB {
    color: #999;
    font-size: 14px;
    line-height: 19px;
    margin-top: 10px;
}

.introC {
    height: 156px;
    margin: 25px 0;
}

.image {
    height: 100%;
    width: 100%;
    border-radius: 8px;
}

.introD-btn {
    background: #05f;
    border-radius: 19px;
    color: #fff;
    cursor: pointer;
    height: 37px;
    line-height: 37px;
    margin: 26px auto;
    width: 100%;
}
</style>