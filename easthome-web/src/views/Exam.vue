<!-- 静态页面 -->
<template>
    <div class="registration pageCenter">
        <div class="head"></div>
        <div class="content">
            <img src="@/assets/exam/title.png">
            <div class="activeImg">
                <img src="@/assets/exam/exam1.png" class="hoverImg">
                <img src="@/assets/exam/exam2.png" class="hoverImg">
                <img src="@/assets/exam/exam3.png" class="hoverImg">
                <img src="@/assets/exam/exam4.png" class="hoverImg">
            </div>
            <img src="@/assets/exam/img.png">
        </div>
        <div class="service">
            <img src="@/assets/exam/main.png">
        </div>
        <div class="bottomContent">
            <img src="@/assets/exam/distribution.png">
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.head {
    width: 100%;
    height: 385px;
    background: url(~@/assets/exam/head.png) no-repeat 50%;
}

.content {
    text-align: center;
    background: #fff;
    padding-bottom: 30px;
}

.activeImg {
    display: flex;
    width: 1200px;
    margin: 30px auto;
    justify-content: space-between;
}
.activeImg img {
    cursor: pointer;
    box-shadow: -1px 0 15px #e6e6e6;
    border-radius: 20px;
}

.hoverImg {
    box-sizing: border-box;
}
.service {
    width: 100%;
    background: url(~@/assets/exam/backgroundBj.png) no-repeat 50%;
    height: 763px;
    text-align: center;
}
.bottomContent {
    width: 100%;
    background-color: #fff;
    padding-bottom: 40px;
    text-align: center;
}
</style>