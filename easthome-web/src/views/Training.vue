<!-- 静态页面 -->
<template>
    <div class="trainNew">
        <div class="banner">
            <div class="banner_button">
                <span>获取定制方案</span>
            </div>
            <div class="banner_dis">
                <div class="every">
                    <div><span class="bigFont">1998</span><span class="normalFont">年</span></div>
                    <div class="litFont">成立</div>
                </div>
                <div class="every">
                    <div><span class="bigFont">10000</span><span class="normalFont">+</span></div>
                    <div class="litFont">头部企业的选择</div>
                </div>
                <div class="every">
                    <div><span class="bigFont">全国</span></div>
                    <div class="litFont">无地域限制交付</div>
                </div>
            </div>
        </div>
        <div class="outside xuexixuqiu">
            <div class="content xuexixuqiu_content">
                <div class="title">满足企业人才培养全生命周期的学习需求</div>
                <div class="main"><img src="@/assets/training/train03.png">
                </div>
            </div>
        </div>
        <div class="outside fuwutese">
            <div class="content fuwutese_content">
                <div class="title">企业培训服务特色</div>
                <div class="main">
                    <div class="every">
                        <div class="tit">600门精品课程</div>
                        <div class="dis">提供IT技术领域的工程师、项目经理、产品经理、管理人才的全生命周期课程。</div>
                        <div class="image"><img src="@/assets/training/train04.png"></div>
                    </div>
                    <div class="every">
                        <div class="tit">课程专业定制化 专为企业打造</div>
                        <div class="dis">为企业提供人才发展服务、定制内训、企业外派培训、课程开发、课件制作、国际认证考试等一站式服务。</div>
                        <div class="image"><img src="@/assets/training/train05.png"></div>
                    </div>
                    <div class="every">
                        <div class="tit">终身学习生态圈</div>
                        <div class="dis">定制培训、公开课、公益讲堂、优质视频、学习社群、研讨会全方位打造学习环境氛围。</div>
                        <div class="image"><img src="@/assets/training/train06.png"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="outside fuwunengli">
            <div class="content fuwunengli_content">
                <div class="title">全流程服务能力</div>
                <div class="main">
                    <img src="@/assets/training/006.png">
                </div>
            </div>
        </div>
        <div class="outside wenti">
            <div class="content wenti_content">
                <div class="title">企业培训负责人面临的问题</div>
                <div class="main">
                    <img src="@/assets/training/007.png">
                </div>
            </div>
        </div>
        <div class="outside tiaozhan">
            <div class="content tiaozhan_content">
                <div class="title">业务leader的挑战</div>
                <div class="main">
                    <img src="@/assets/training/008.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.trainNew {
    width: 100vw;
}

.banner {
    background: url(~@/assets/training/banner.png) no-repeat 50%;
    background-size: cover;
    height: 606px;
    min-width: 100vw;
    position: relative;
}

.banner_button {
    background-color: #ffcb16;
    border-radius: 29px;
    bottom: 100px;
    cursor: pointer;
    height: 57px;
    left: 50%;
    line-height: 57px;
    position: absolute;
    text-align: center;
    transform: translate(-155px);
    width: 309px;
}

.banner_button>span {
    color: #000;
    font-family: SourceHanSansCN-Regular;
    font-size: 30px;
}

.banner_dis {
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    bottom: -48px;
    box-shadow: 0 0 29px 0 rgba(33, 33, 33, .06);
    display: flex;
    flex-wrap: nowrap;
    height: 96px;
    justify-content: space-between;
    left: 50%;
    position: absolute;
    transform: translate(-500px);
    width: 999px;
}

.every {
    align-items: center;
    border-right: 1px solid #cecfd1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 64px;
    justify-content: space-between;
    padding: 5px 0;
    width: 320px;
}

.bigFont {
    color: #25297b;
    font-family: SourceHanSansCN-Medium;
    font-size: 24px;
}

.normalFont {
    color: #25297b;
    font-family: SourceHanSansCN-Regular;
    font-size: 18px;
}

.litFont {
    color: #475164;
    font-family: SourceHanSansCN-Regular;
    font-size: 16px;
}

.xuexixuqiu {
    background-color: #f9f8fd;
    padding: 104px 0 55px;
}

.outside {
    width: 100%;
}

.content {
    margin: 0 auto;
    width: 1205px;
}

.title {
    color: #050b20;
    font-family: MicrosoftYaHei-Bold;
    font-size: 35px;
    font-weight: 700;
    letter-spacing: 1px;
    text-align: center;
}

.title:before,
.title:after {
    content: "";
    display: inline-block;
    height: 14px;
    margin-bottom: 5px;
    width: 58px;
}

.title:before {
    background: url(~@/assets/training/title1.png) no-repeat;
    margin-right: 10px;
}

.title:after {
    background: url(~@/assets/training/title2.png) no-repeat;
    margin-left: 10px;
}

.xuexixuqiu .main {
    margin-top: 50px;
    width: 1205px;
}

.xuexixuqiu .main img {
    height: 100%;
    width: 100%;
}

.fuwutese {
    padding: 45px 0 55px;
}

.fuwutese .main {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 40px;
    width: 1205px;
}

.fuwutese .main .every {
    align-items: center;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 413px;
    justify-content: space-between;
    padding: 40px 20px 14px 28px;
    width: 383px;
}

.fuwutese .main .every:hover {
    cursor: pointer;
    box-shadow: 0 0 9px 0 rgba(37, 41, 123, .14);
}

.fuwutese .main .every .tit {
    color: #050b20;
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    font-weight: 700;
}

.fuwutese .main .every .dis {
    color: #475164;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    text-align: center;
}

.fuwutese .main .every .image {
    height: 221px;
    width: 224px;
}

.fuwunengli {
    background: url(~@/assets/training/005.png) no-repeat 50%;
    background-size: 1920px 767px;
    height: 767px;
    overflow: hidden;
    padding: 50px 0;
}

.fuwunengli .main {
    height: 768px;
    margin: 50px auto 0;
    width: 875px;
}

.fuwunengli .main img {
    height: 100%;
    width: 100%;
}
</style>