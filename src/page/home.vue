<template>
  <el-row>
    <el-col :span="16" :offset="4">

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

