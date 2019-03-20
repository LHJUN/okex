<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <!-- Header AD-->
      <el-row type="flex" class="ad-box header-ad-box">
        <img src="../../static/img/ad/header_banner.png" class="ad-img header-ad-img"/>
        <el-row class="ad-tips"><a href="#">广告</a></el-row>
      </el-row>
      <!-- Main -->
      <el-row>
        <el-col :span="19" class="left-box">
          <el-row class="home-article">
            <el-col :span="24">
              <h1>宝贝名字 - 独特的想法和流行的2019年趋势</h1>
            </el-col>
            <el-col :span="24">
              <p>欢迎来到Nameberry，这是世界上最大的专注于婴儿名字的网站。在这里，您可以找到女孩和男孩的宝宝名字。您可以搜索70,000个含有含义，来源和描述的名称; 浏览流行的婴儿名字和独特的婴儿名字，并与其他准父母和名字专家讨论名称。在Nameberry，您将获得2019年婴儿名称的最佳建议，并选择适合您和您孩子的名字。</p>
            </el-col>
            <el-col :span="24">
              <el-row type="flex" class="article-content">
                <el-col :span="12" class="article-img-box">
                  <img :src="articleList[0].imgSrc"/>
                  <p class="article-img-title"><a href="#">{{ articleList[0].title }}</a></p>
                </el-col>
                <el-col :span="12" class="article-list">
                  <el-row type="flex" class="article-list-item" v-for="(article, articleIndex) in articleList.filter(a => articleList.indexOf(a) !== 0)" :key="article.title">
                    <div class="article-list-item-img" :style="{ borderColor: articleItemImgStyle(articleIndex), backgroundImage: articleItemImgUrl(article.imgSrc) }"></div>
                    <div class="article-list-item-content" :style="{ backgroundColor: articleItemContentStyle(articleIndex) }">
                      <p class="article-list-item-title">{{ article.title }}</p>
                    </div>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5" class="right-box">
          <el-row type="flex" class="ad-box right-ad-box">
            <img src="../../static/img/ad/right_banner.jpg" class="ad-img right-ad-img"/>
            <el-row class="ad-tips"><a href="#">广告</a></el-row>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      articleList: [
        {
          title: '2019年热门宝贝名字',
          imgSrc: '../../static/img/home/home_article.jpg'
        },
        {
          title: '2019年热门宝贝名字1',
          imgSrc: '../../static/img/home/home_article.jpg'
        },
        {
          title: '2019年热门宝贝名字2',
          imgSrc: '../../static/img/home/home_article.jpg'
        },
        {
          title: '2019年热门宝贝名字3',
          imgSrc: '../../static/img/home/home_article.jpg'
        }
      ],
      articleListStyles: [
        {
          lighten: '#F8BBD0',
          darken: '#E91E63'
        },
        {
          lighten: '#DCEDC8',
          darken: '#8BC34A'
        },
        {
          lighten: '#FFECB3',
          darken: '#FFC107'
        }
      ]
    };
  },
  components: {},
  mounted() {},
  computed: {},
  methods: {
    articleItemImgStyle (index) {
      return this.articleListStyles[index].darken
    },
    articleItemContentStyle (index) {
      return this.articleListStyles[index].lighten
    },
    articleItemImgUrl(url) {
      return `url("${url}")`
    }
  }
};
</script>

<style scoped>
  * {
    transition: all .3s ease-in-out;
  }
  .ad-tips {
    background-color: #ededed;
    text-align: center;
    font-size: 10px;
    padding: 1px;
    letter-spacing: 2px;
  }
  .ad-tips a:active, .ad-tips a:link, .ad-tips a:visited {
    color: #333;
    text-decoration: none;
  }
  .ad-tips a:hover {
    text-decoration: underline;
  }
  .ad-box {
    overflow: hidden;
    flex-direction: column;
    border-radius: 4px;
  }
  .header-ad-box {
    margin: 20px 0;
  }
  .right-ad-box {
    padding-left: 20px;
    margin-bottom: 40px;
  }
  .header-ad-img {
    height: 120px;
  }
  .ad-img {
    object-fit: cover;
    width: 100%;
  }
  .right-ad-img {
    height: 640px;
  }
  .left-box {
    padding-right: 20px;
    border-right: 1px solid rgba(0,0,0,.2);
  }
  /* Home Article */
  .home-article h1 {
    font-weight: bold;
    font-size: 2em;
  }
  .home-article p {
    line-height: 28px;
    color: #888;
    margin-bottom: 30px;
  }
  .home-article .article-content img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  .home-article .article-img-box {
    position: relative;
    display: flex;
    border-radius: 6px;
    overflow: hidden;
  }
  .home-article .article-img-title {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 8px 28px;
    background-color: rgba(252,252,252,0.75);
  }
  .article-img-title a {
    letter-spacing: 1px;
    font-weight: bold;
    font-size: 1.1em;
  }
  .article-img-title a:active, .article-img-title a:link, .article-img-title a:visited {
    color: #373737;
    text-decoration: none;
  }
  .article-img-title:hover {
    text-decoration: underline;
  }
  /* Article List */
  .article-list {
    padding-left: 20px;
    position: relative;
  }
  .article-list .article-list-item {
    width: 100%;
    height: 90px;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    cursor: pointer;
    top: 0;
  }
  .article-list .article-list-item:hover {
    top: -6px;
  }
  .article-list .article-list-item:last-child {
    margin-bottom: 0;
  }
  .article-list-item-img {
    width: 90px;
    height: 100%;
    border-radius: 50%;
    border: 2px solid;
    box-sizing: border-box;
    z-index: 20;
    background-size: cover;
  }
  .article-list-item-content {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 45px;
    top: 0;
    z-index: 10;
    padding-right: 23px;
  }
  .article-list-item-title {
    height: 100%;
    color: #373737 !important;
    font-size: 17px !important;
    font-weight: bold;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
  }
</style>

