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
          <el-row class="search-container">
            <h1>搜索一个适合您宝宝的名字吧！</h1>
            <el-row>
              <el-col :span="18" :offset="3">
                <el-autocomplete :fetch-suggestions="querySearchAsync" placeholder="搜索宝宝名字" class="search-auto-complete" v-model="search.searchContent" @select="handleSelect">
                  <el-select slot="prepend" placeholder="选择性别" v-model="search.gender" style="width: 130px;">
                    <el-option label="全部性别" value="1"></el-option>
                    <el-option label="男孩" value="2"></el-option>
                    <el-option label="女孩" value="3"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-autocomplete>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :offset="7">
                <el-row class="search-all-words">
                  <el-button v-for="word in allWords.substr(0, 13)" :key="word" size="mini" class="search-all-word">{{ word }}</el-button>
                </el-row>
                <el-row class="search-all-words">
                  <el-button v-for="word in allWords.substr(13, 26)" :key="word" size="mini" class="search-all-word">{{ word }}</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-row class="home-article">
                <el-col :span="24">
                  <h1>宝宝名字 - 独特的想法和流行的2019年趋势</h1>
                </el-col>
                <el-col :span="24">
                  <p>欢迎来到BaoBaoNames，这是专注于婴儿名字的网站。在这里，您可以找到女孩和男孩的宝宝名字。您可以搜索70,000个含有含义，来源和描述的名称; 浏览流行的婴儿名字和独特的婴儿名字，并与其他准父母和名字专家讨论名称。在BaoBaoNames，您将获得2019年婴儿名称的最佳建议，并选择适合您和您孩子的名字。</p>
                </el-col>
                <el-col :span="24">
                  <el-row type="flex" class="article-content">
                    <el-col :span="12" class="article-img-box">
                      <img :src="articleList[0].imgSrc"/>
                      <p class="article-img-title"><a href="#" @click="toArticle">{{ articleList[0].title }}</a></p>
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
              <el-row class="popular-name-cloud-box">
                <el-col :span="4">
                  <img src="../../static/img/home/popular_name_cloud.jpg"/>
                </el-col>
                <el-col :span="20" class="popular-name-cloud-flex">
                  <div class="popular-name-cloud">
                    <vue-word-cloud
                            :words="hotWordClouds"
                            :color="getWordCloudColor"
                            font-family="Roboto"
                            :font-size-ratio="1/5"
                            :spacing="0.6"
                    />
                  </div>
                </el-col>
              </el-row>
              <el-row class="month-popular-name">
                <el-row>
                  <h1>本月最佳宝宝名字</h1>
                </el-row>
                <el-row>
                  <p>跟踪Nameberry上最受欢迎的名字，这是达到尤里卡的另一个工具！您自己的女婴或男孩的名字选择。每个月都有五个顶级男性和女性名字的新的更新表格，吸引了我们访客的最多观点。</p>
                </el-row>
                <el-row :gutter="12">
                  <el-col :span="12">
                    <h3>Top Girl Names</h3>
                    <p>The 5 top girl names on Nameberry this month</p>
                    <el-row>
                      <el-col :span="20" :offset="2">
                        <ul class="name-list">
                          <li class="name-item" v-for="(girlName, index) in monthPopularBaoBaoNames.girlNames" :key="girlName">
                            <span class="girl-icon"></span>
                            <span class="name-index">{{ index + 1 }}</span>
                            <span class="name">{{ girlName }}</span>
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <h3>Top Boy Names</h3>
                    <p>The 5 top boy names on Nameberry this month</p>
                    <el-row>
                      <el-col :span="20" :offset="2">
                        <ul class="name-list">
                          <li class="name-item" v-for="(boyName, index) in monthPopularBaoBaoNames.boyNames" :key="boyName">
                            <span class="boy-icon"></span>
                            <span class="name-index">{{ index + 1 }}</span>
                            <span class="name">{{ boyName }}</span>
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
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
import { findAllByNameLike } from '@/api/name.client.gw'
import { mapMutations } from 'vuex'
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
      ],
      wordCloudColors: [
        '#719398',
        '#f48d25',
        '#d6455d'
      ],
      hotWordClouds: [
        ['Althea', 4],
        ['Annie', 2],
        ['Asma', 6],
        ['Bronte', 10],
        ['Crew', 3],
        ['Elva', 11],
        ['Emmeline', 9],
        ['Lou', 11],
        ['Posie', 5],
        ['Red', 5],
        ['Tana', 5],
        ['Lance', 5],
        ['Kevin', 5],
        ['Burgess', 5],
        ['Woolf', 5],
        ['Yoshi', 5],
        ['Olla', 5],
        ['Liane', 5],
        ['Fay', 5],
        ['Gemal', 5]
      ],
      search: {
        gender: '1',
        searchContent: ''
      },
      allWords: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      monthPopularBaoBaoNames: {
        boyNames: [
          'Asher',
          'Jasper',
          'Jack',
          'Atticus',
          'Kevin'
        ],
        girlNames: [
          'Asher',
          'Jasper',
          'Jack',
          'Atticus',
          'Kevin'
        ]
      }
    };
  },
  components: {},
  mounted() {},
  computed: {},
  methods: {
    ...mapMutations(['updateCurrentSelectedNav']),
    articleItemImgStyle (index) {
      return this.articleListStyles[index].darken
    },
    articleItemContentStyle (index) {
      return this.articleListStyles[index].lighten
    },
    articleItemImgUrl(url) {
      return `url("${url}")`
    },
    getWordCloudColor([, weight]) {
      return this.wordCloudColors[weight > 10 ? 2 : weight > 6 ? 1 : 0]
    },
    async querySearchAsync (queryString, cb) {
      if (queryString.trim()){
        const result = await findAllByNameLike(queryString);
        cb(result.data.content.names.reduce((pre, cur) => {
          pre.push({ value: cur.label })
          return pre
        }, []))
      } else {
        cb([])
      }
    },
    handleSelect(selected) {
      this.updateCurrentSelectedNav('')
      this.$router.push(`/name/${selected.value}`)
    },
    toArticle () {
      this.updateCurrentSelectedNav('')
      this.$router.push('/article/test')
    }
  }
};
</script>

<style scoped>
  * {
    transition: all .3s ease-in-out;
  }
  h1 {
    font-weight: bold;
    font-size: 2em;
    text-align: center;
  }
  h3 {
    font-weight: bold;
    font-size: 1em;
    text-align: center;
  }
  p {
    text-align: center;
    line-height: 28px;
    color: #888;
    margin-bottom: 30px;
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
    margin-bottom: 30px;
    border-right: 1px solid rgba(0,0,0,.2);
  }
  /* Home Article */
  .home-article p {
    text-align: center;
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
    padding: 8px 0;
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
  /* Popular Name Cloud */
  .popular-name-cloud-box {
    margin: 20px 0;
  }
  .popular-name-cloud-flex {
    height: 222px;
  }
  .popular-name-cloud {
    padding: 50px 0;
    height: 120px;
  }
  /* search */
  .search-container {
    width: 100%;
    background-color: #E5EEF0;
    border-radius: 6px;
    padding: 20px 0;
  }
  .search-container h1 {
    margin: 0 !important;
    color: #53727C;
  }
  .search-container .search-auto-complete {
    width: 100%;
    margin: 20px 0;
  }
  .search-container .search-all-words {
    display: flex;
    margin-bottom: 8px;
  }
  .search-container .search-all-words:last-child {
    margin-bottom: 0 !important;
  }
  .search-container .search-all-word {
    flex-grow: 1;
    font-family: "museo-sans-webfont", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
    font-size: 0.813em;
    font-weight: 600;
    color: #53727C;
    padding: 5px 0 !important;
    width: 100%;
  }
  .el-button.search-all-word {
      margin-left: 5px;
  }
  /* month popular */
  .month-popular-name p {
    text-align: center;
    line-height: 28px;
    color: #888;
    margin-bottom: 30px;
  }
  .month-popular-name .name-list {
    margin: 0 !important;
  }
  .month-popular-name .name-item {
    margin-top: 18px;
    padding-bottom: 6px;
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cfcfcf;
    cursor: pointer;
  }
  .month-popular-name .name-item .name-index {
    margin-right: 16px;
  }
  .month-popular-name .name-item:first-child {
    margin-top: 0 !important;
  }
  .month-popular-name .name-item .boy-icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ4MjU5NDYxNzQyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTg5NS41NDc0NzUgOTguMTMzMzMzSDU4NS41MDMwM2MtMTYuNjc4Nzg4IDAtMzAuMTI1MjUzIDEzLjQ0NjQ2NS0zMC4xMjUyNTIgMzAuMTI1MjUzczEzLjQ0NjQ2NSAzMC4xMjUyNTMgMzAuMTI1MjUyIDMwLjEyNTI1MmgyMzguMjg2ODY5TDY4MC42NjI2MjYgMzAxLjUxMTExMWMtNjMuODcwNzA3LTU0LjMwMzAzLTE0NC4xNjE2MTYtODQuMDQwNDA0LTIyOC45Nzc3NzgtODQuMDQwNDA0LTk0LjUxMzEzMSAwLTE4My40NjY2NjcgMzYuNzE5MTkyLTI1MC4zMTExMTEgMTAzLjY5MjkyOUMxMzQuNCAzODguMTM3Mzc0IDk3LjY4MDgwOCA0NzYuOTYxNjE2IDk3LjY4MDgwOCA1NzEuNDc0NzQ3czM2LjcxOTE5MiAxODMuMzM3Mzc0IDEwMy42OTI5MjkgMjUwLjMxMTExMiAxNTUuNzk3OTggMTAzLjY5MjkyOSAyNTAuMzExMTExIDEwMy42OTI5MjkgMTgzLjMzNzM3NC0zNi43MTkxOTIgMjUwLjMxMTExMi0xMDMuNjkyOTI5YzY2Ljg0NDQ0NC02Ni45NzM3MzcgMTAzLjY5MjkyOS0xNTUuNzk3OTggMTAzLjY5MjkyOS0yNTAuMzExMTEyIDAtODQuMTY5Njk3LTI5LjA5MDkwOS0xNjMuNjg0ODQ4LTgyLjYxODE4Mi0yMjcuMjk2OTY5bDE0Mi4zNTE1MTUtMTQyLjM1MTUxNVY0MzguMzAzMDNjMCAxNi42Nzg3ODggMTMuNDQ2NDY1IDMwLjEyNTI1MyAzMC4xMjUyNTMgMzAuMTI1MjUzczMwLjEyNTI1My0xMy40NDY0NjUgMzAuMTI1MjUyLTMwLjEyNTI1M1YxMjguMjU4NTg2YzAtMTYuNjc4Nzg4LTEzLjU3NTc1OC0zMC4xMjUyNTMtMzAuMTI1MjUyLTMwLjEyNTI1M3pNNDUxLjY4NDg0OCA4NjUuMjI4MjgzQzI4OS42ODA4MDggODY1LjIyODI4MyAxNTcuOTMxMzEzIDczMy40Nzg3ODggMTU3LjkzMTMxMyA1NzEuNDc0NzQ3czEzMS43NDk0OTUtMjkzLjc1MzUzNSAyOTMuNzUzNTM1LTI5My43NTM1MzVjNzkuOTAzMDMgMCAxNTIuMzA3MDcxIDMyLjA2NDY0NiAyMDUuMTg3ODc5IDgzLjkxMTExMSAwLjkwNTA1MSAxLjE2MzYzNiAxLjgxMDEwMSAyLjMyNzI3MyAyLjg0NDQ0NSAzLjIzMjMyMyAxLjAzNDM0MyAxLjAzNDM0MyAyLjE5Nzk4IDEuOTM5Mzk0IDMuMTAzMDMgMi43MTUxNTIgNTAuOTQxNDE0IDUyLjg4MDgwOCA4Mi40ODg4ODkgMTI0Ljc2NzY3NyA4Mi40ODg4ODkgMjAzLjg5NDk0OSAwLjEyOTI5MyAxNjIuMDA0MDQtMTMxLjc0OTQ5NSAyOTMuNzUzNTM1LTI5My42MjQyNDMgMjkzLjc1MzUzNnogbTAgMCIgZmlsbD0iIzEyOTZkYiIgcC1pZD0iMTEwNiI+PC9wYXRoPjwvc3ZnPg==');
  }
  .month-popular-name .name-item .girl-icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ4MjU5NDc0MDYxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTgyNi41Njk2OTcgMTk3LjA0MjQyNEM3NTkuNTk1OTYgMTMwLjE5Nzk4IDY3MC43NzE3MTcgOTMuMzQ5NDk1IDU3Ni4yNTg1ODYgOTMuMzQ5NDk1cy0xODMuNDY2NjY3IDM2LjcxOTE5Mi0yNTAuMzExMTExIDEwMy42OTI5MjlDMjU5LjEwMzAzIDI2My44ODY4NjkgMjIyLjI1NDU0NSAzNTIuNzExMTExIDIyMi4yNTQ1NDUgNDQ3LjM1MzUzNWMwIDg0LjQyODI4MyAyOS4zNDk0OTUgMTY0LjMzMTMxMyA4My4yNjQ2NDcgMjI4LjA3MjcyOEwyNDUuMDEwMTAxIDczNS45MzUzNTRsLTEwMS42MjQyNDItMTAxLjYyNDI0M2MtMTEuMjQ4NDg1LTExLjI0ODQ4NS0yOS45OTU5Ni0xMC44NjA2MDYtNDEuNzYxNjE3IDAuOTA1MDUxLTExLjc2NTY1NyAxMS43NjU2NTctMTIuMTUzNTM1IDMwLjUxMzEzMS0wLjkwNTA1IDQxLjc2MTYxNkwyMDIuMzQzNDM0IDc3OC42MDIwMmwtOTEuNjY4Njg3IDkxLjc5Nzk4Yy0xMS43NjU2NTcgMTEuNzY1NjU3LTExLjc2NTY1NyAzMC45MDEwMSAwIDQyLjUzNzM3NCAxMS43NjU2NTcgMTEuNzY1NjU3IDMwLjkwMTAxIDExLjc2NTY1NyA0Mi41MzczNzQgMEwyNDUuMTM5Mzk0IDgyMS4wMTAxMDFsMTAxLjYyNDI0MiAxMDEuNjI0MjQyYzExLjI0ODQ4NSAxMS4yNDg0ODUgMjkuOTk1OTYgMTAuODYwNjA2IDQxLjc2MTYxNy0wLjkwNTA1IDExLjc2NTY1Ny0xMS43NjU2NTcgMTIuMTUzNTM1LTMwLjUxMzEzMSAwLjkwNTA1LTQxLjc2MTYxNkwyODcuODA2MDYxIDc3OC4zNDM0MzRsNjAuNTA5MDkxLTYwLjUwOTA5MWM2My43NDE0MTQgNTMuOTE1MTUyIDE0My42NDQ0NDQgODMuMjY0NjQ2IDIyOC4wNzI3MjcgODMuMjY0NjQ3IDk0LjUxMzEzMSAwIDE4My4zMzczNzQtMzYuNzE5MTkyIDI1MC4zMTExMTEtMTAzLjY5MjkyOXMxMDMuNjkyOTI5LTE1NS43OTc5OCAxMDMuNjkyOTI5LTI1MC4zMTExMTJjLTAuMTI5MjkzLTk0LjUxMzEzMS0zNi44NDg0ODUtMTgzLjMzNzM3NC0xMDMuODIyMjIyLTI1MC4wNTI1MjV6TTU3Ni4yNTg1ODYgNzQwLjk3Nzc3OEM0MTQuMzgzODM4IDc0MC45Nzc3NzggMjgyLjYzNDM0MyA2MDkuMjI4MjgzIDI4Mi42MzQzNDMgNDQ3LjM1MzUzNWMwLTE2Mi4wMDQwNCAxMzEuNzQ5NDk1LTI5My43NTM1MzUgMjkzLjc1MzUzNi0yOTMuNzUzNTM1Uzg3MC4wMTIxMjEgMjg1LjM0OTQ5NSA4NzAuMDEyMTIxIDQ0Ny4zNTM1MzVjMCAxNjEuODc0NzQ3LTEzMS43NDk0OTUgMjkzLjYyNDI0Mi0yOTMuNzUzNTM1IDI5My42MjQyNDN6IG0wIDAiIGZpbGw9IiNkNDIzN2EiIHAtaWQ9IjEzNDciPjwvcGF0aD48L3N2Zz4=');
  }
</style>

<style>
  .el-input__inner::placeholder, .el-icon-search {
    color: #8E8E8E !important;
  }
  .el-input-group__append {
    width: 30px !important;
    text-align: center;
  }
</style>

