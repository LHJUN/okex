<template>
    <el-row class="global-footer">
        <el-col :span="22" :offset="1" class="global-footer-content hidden-sm-and-down">
            <p class="global-footer-line">
                <a target="_blank" href="#">关于BabyNames</a> -
                <a target="_blank" href="#">联系我们</a> -
                <a target="_blank" href="#">广告服务</a> -
                <a target="_blank" href="#">友情链接</a> -
                <a target="_blank" href="#">版权声明</a> -
                <a target="_blank" href="#">人才招聘</a> -
                <a target="_blank" href="#">网站动态</a> -
                <a target="_blank" href="#">帮助</a>
            </p>
            <div>
                <p class="global-footer-line global-footer-line-shadow">沪ICP备 09007032 | ©CopyRight 2002-2018 BABYNAMES.COM Inc All Rights Reserved. | BabyNames 版权所有</p>
            </div>
        </el-col>
        <el-col :span="24" class="global-footer-content hidden-md-and-up">
            <p class="global-footer-line">
                <a target="_blank" href="#">关于BabyNames</a> -
                <a target="_blank" href="#">联系我们</a> -
                <a target="_blank" href="#">广告服务</a> -
                <a target="_blank" href="#">友情链接</a>
            </p>
            <p class="global-footer-line">
                <a target="_blank" href="#">版权声明</a> -
                <a target="_blank" href="#">人才招聘</a> -
                <a target="_blank" href="#">网站动态</a> -
                <a target="_blank" href="#">帮助</a>
            </p>
            <div>
                <p class="global-footer-line global-footer-line-shadow">粤ICP备12345678号-1</p>
                <p class="global-footer-line global-footer-line-shadow">©CopyRight 2002-2018 BABYNAMES.COM</p>
                <p class="global-footer-line global-footer-line-shadow">BabyNames 版权所有</p>
            </div>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    name: 'global-footer'
  };
</script>

<style scoped>
    .global-footer {
        background-color: white;
        padding: 0 !important;
    }
    .global-footer-content {
        text-align: center;
        padding: 10px 0;
    }
    .global-footer-line {
        white-space:nowrap;
        margin: 8px 0 !important;
        font-size: 13px;
        color: rgba(0,0,0,0.55)
    }
    .global-footer-line a {
        color: rgba(0,0,0,0.55);
        text-decoration: none;
        cursor: pointer;
        margin: 0 2px;
    }
    .global-footer-line a:hover {
        color:#409EFF;
    }
    .global-footer-line-shadow {
        font-size: 12px !important;
        color: rgba(0,0,0,0.25);
    }
    .global-footer-line-shadow:nth-of-type(1) {
        margin-top: 16px !important;
    }
</style>
