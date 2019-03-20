<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <!-- Header AD-->
      <el-row type="flex" class="ad-box header-ad-box">
        <img src="../../static/img/ad/header_banner.png" class="ad-img header-ad-img"/>
        <el-row class="ad-tips"><a href="#">广告</a></el-row>
      </el-row>
      <!-- BaoBao Name Container -->
      <el-row>
        <el-col :span="19" class="left-box">
          <!-- BaoBao Name Title -->
          <el-row class="title-wrapper">
            <div class="title-left-container">
              <i :class="name.gender" class="name-icon"></i>
              <el-row>
                <h1 class="title-content">{{ nameLabel }}</h1>
                <div class="title-details">
                  <el-button type="primary" size="mini" :disabled="liked" @click="liked = true">
                    <div class="like-button-content">
                      <i class="like-icon"></i>
                      <span>{{ liked ? '已赞' : '赞' }}</span>
                    </div>
                  </el-button>
                  <span class="like-details">{{ name.liked }} 位用户赞了</span>
                </div>
              </el-row>
            </div>
            <div class="title-right-container">
              <span :class="{
                'popularity-percent-up': name.popularityPercent > 0,
                'popularity-percent-down': name.popularityPercent < 0,
                'popularity-percent-hold': name.popularityPercent === 0
              }">
                <i class="el-icon-caret-top popularity-percent-icon"></i>
                <span>{{ name.popularityPercent > 0 ? '上升' : name.popularityPercent === 0 ? '持平' : '下降' }} {{ Math.abs(name.popularityPercent) }} %</span>
              </span>
              <span class="popularity-percent-hint">本周排名趋势</span>
            </div>
          </el-row>
          <hr class="line-split"/>
          <!-- BaoBao Name Information -->
          <el-row class="name-information-container">
            <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
              <el-tab-pane name="first">
                <span slot="label"><i class="el-icon-info"></i> {{ `${nameLabel} 的含义` }}</span>
                <div class="information-container">
                  <p class="information-content">{{ name.information.common }}</p>
                  <h3 class="information-section">From the experts:</h3>
                  <p class="information-content">{{ name.information.experts }}</p>
                </div>
                <div class="section-ad-container">
                  <div class="section-ad" v-for="i in 3" :key="i">
                    <img src="../../static/img/ad/section-ad.png"/>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="second">
                <span slot="label"><i class="el-icon-star-on"></i> 相似的名字</span>
                <h3 class="similar-section">{{ similarNames.length }} names similar to {{ nameLabel }}:</h3>
                <el-row class="similar-list-wrapper">
                  <el-col :span="12">
                    <ul class="name-list">
                      <li class="name-item" v-for="(similarName, index) in similarNamesLeft" :key="index">
                    <span :class="{
                      'boy-icon': similarName.gender === 'MALE',
                      'girl-icon': similarName.gender === 'FEMALE',
                    }"></span>
                        <span class="name">{{ similarName.name }}</span>
                      </li>
                    </ul>
                  </el-col>
                  <el-col :span="12">
                    <ul class="name-list">
                      <li class="name-item" v-for="(similarName, index) in similarNamesRight" :key="index">
                    <span :class="{
                      'boy-icon': similarName.gender === 'MALE',
                      'girl-icon': similarName.gender === 'FEMALE',
                    }"></span>
                        <span class="name">{{ similarName.name }}</span>
                      </li>
                    </ul>
                  </el-col>
                </el-row>
                <div class="section-ad-container">
                  <div class="section-ad" v-for="i in 3" :key="i">
                    <img src="../../static/img/ad/section-ad.png"/>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="third">
                <el-row class="popularity-table">
                  <el-row class="header">{{ nameLabel }} 当前在 BaoBaoNames 的排名为 #{{ name.rank }}</el-row>
                  <el-row class="header-history">历史排名信息</el-row>
                  <el-table :data="name.historyRank" border style="width: 100%">
                    <el-table-column prop="area" label="区域"></el-table-column>
                    <el-table-column prop="year" label="年份"></el-table-column>
                    <el-table-column prop="rank" label="排名"></el-table-column>
                  </el-table>
                </el-row>
                <h3 class="popular-section">近10年 {{ nameLabel }} 的热度趋势</h3>
                <span slot="label"><i class="el-icon-d-caret"></i> 流行趋势</span>
                <ve-line :data="chartData" ref="popularChart"></ve-line>
                <div class="section-ad-container">
                  <div class="section-ad" v-for="i in 2" :key="i">
                    <img src="../../static/img/ad/section-ad.png"/>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="fourth">
                <span slot="label"><i class="el-icon-share"></i> 评论</span>
              </el-tab-pane>
            </el-tabs>
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
  name: 'baobao-name',
  data () {
    return {
      activeName: 'first',
      name: {
        label: '',
        gender: 'MALE',
        liked: 115,
        popularityPercent: 25,
        rank: 556,
        historyRank: [
          { area: 'US', year: 2018, rank: 429 },
          { area: 'BaoBaoNames', year: 2018, rank: 559 },
          { area: 'CN', year: 2017, rank: 832 },
        ],
        information: {
          common: 'The name Lance is a boy\'s name meaning "servant". Lance is ranked #635 on our popularity charts and is often added to lists like Names That Mean Trouble and discussed in our forums with posts like "Olivia and Ian: A Brother - Sister Name Chain".',
          experts: 'Though the full name Lancelot has for the most part been shunned as a \'too-much-name\' name, the short form Lance has been consistently in or around the Top 500 since 1938, climbing as high as Number 76 in 1970. It was used as a character name by Walter Scott as far back as 1823. Lance is also the name of a medieval weapon, making this name all boy. '
        }
      },
      liked: false,
      similarNames: [
        { name: 'Mace', gender: 'MALE' },
        { name: 'Rem', gender: 'MALE' },
        { name: 'Lancelot', gender: 'MALE' },
        { name: 'Saxon', gender: 'MALE' },
        { name: 'Brona', gender: 'FEMALE' },
        { name: 'Lex', gender: 'MALE' },
        { name: 'Rowen', gender: 'MALE' },
        { name: 'Misha', gender: 'FEMALE' },
        { name: 'Damien', gender: 'MALE' },
        { name: 'Mica', gender: 'MALE' },
        { name: 'Carmine', gender: 'FEMALE' },
        { name: 'Zeno', gender: 'MALE' },
        { name: 'Vega', gender: 'MALE' }
      ],
      chartData: {
        columns: ['年份', '热度'],
        rows: []
      }
    }
  },
  mounted () {
    this.name.label = this.$route.params.name
    for (let year = 2009; year <= 2019; year++) {
      this.chartData.rows.push({
        '年份': year.toString(),
        '热度': Math.random() * 100000
      })
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  computed: {
    nameLabel () {
      return this.name.label.trim().length > 0 ? this.name.label.trim().substr(0, 1).toUpperCase() + this.name.label.trim().substr(1).toLowerCase() : ''
    },
    similarNamesLeft () {
      return this.similarNames.filter(name => this.similarNames.indexOf(name) % 2 === 0)
    },
    similarNamesRight () {
      return this.similarNames.filter(name => this.similarNames.indexOf(name) % 2 !== 0)
    }
  },
  watch: {
    activeName (v) {
      if (v === 'third') {
        this.$nextTick(_ => {
          this.$refs['popularChart'].echarts.resize()
        })
      }
    }
  }
};
</script>

<style scoped>
  .ad-box {
    overflow: hidden;
    flex-direction: column;
    border-radius: 4px;
  }
  .header-ad-box {
    margin: 20px 0;
  }
  .ad-tips {
    background-color: #ededed;
    text-align: center;
    font-size: 10px;
    padding: 1px;
    letter-spacing: 2px;
  }
  .left-box {
    padding-right: 20px;
    margin-bottom: 30px;
    border-right: 1px solid rgba(0,0,0,.2);
  }
  .ad-img {
    object-fit: cover;
    width: 100%;
  }
  .right-ad-img {
    height: 640px;
  }
  .right-ad-box {
    padding-left: 20px;
    margin-bottom: 40px;
  }
  .title-wrapper {
    display: flex;
  }
  .title-left-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .title-right-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
  .title-content, .section-title {
    margin-top: 0 !important;
    margin-bottom: 8px !important;
    font-weight: 500;
  }
  .title-content {
    font-size: 38px;
  }
  .section-title {
    font-size: 26px;
  }
  .name-icon {
    width: 62px;
    height: 62px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: block;
    margin-right: 26px;
  }
  .MALE {
    background-image:url('data:image/png;base64,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');
  }
  .FEMALE {
    background-image:url('data:image/png;base64,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');
  }
  .title-details {
    display: flex;
    align-items: center;
  }
  .like-details {
    margin-left: 12px;
    font-size: 14px;
    color: rgba(0, 0, 0, .5)
  }
  .like-button-content {
    display: flex;
    align-items: center;
  }
  .like-icon {
    display: block;
    width: 18px;
    height: 18px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADYElEQVRYR82Ya+jeYxjHPx/l0BaJbHOcw7xQ2wstjSbyiuZcxAtSJiZrrZY3EqGsxDRynhTJ4cUYyuGFEF7IK0KZ2MFmhgnlULh0rfv3uLee03/P83v63+/u53ff9/X5fa/Dff0emWbDacbD2IAi4kLgOuAQYAvwHvCs+udUXnosQBHxCLCsi+EvgDPVXcNCjQwUEdcCT/Yx+JSaa4Ya4wD6HDgFCGAp8CJwNPAacDLwNzB7WJVGAoqI3P8P7I7FDeoljQwRsRx4sMzPVd8aRqJRgQ4A/iqGnlCvr4AWAJ+U+Sp1zaSBHldvqICOAHaW+W3qXZMAOhLYXgytVm+pgI4t6Z8/TQzoCuD5AnGN+nQFtBh4v9uzfkrtcwyVgP4AOAP4F5il/lQBrQTuL/PF6oetuSwiDgQeAJogzop8VW0wIj4GFgK/Z/VWMxsHjikpVFS5GrgTmFtO3wGcrm6u1LkSeK7MX1YvHUhSFnSAirE7gMyUWUMekAF9tvpVBTMHyPnMPmdsBT4C1qlv1OtqoEFXQL3vN+AZ4G51216umg98OuQLZXW/Wb2vWV8DvQRkpc1Sn8HajIOARWXyGbAaWK/+0ctoRFwMnNoHKq+Uy4H9y5pFair2f/sREe+k/MDP6mGVC04qLsifblczfkYeEZFxtb4c9Kh6Yy+gXerhEwBK7/wCHAy8qZ7XC+hHNcv+7hERbSmUpSNLwn7AC2pmZleX/aB2sqxFoGxV1pX3XqY+1gtopzp7Ago1fVSqNEfNzO2q0Pdq1pLWXBYR5wBvFxMPqzc19uq0b7Jsh5q3eJtAG4CLSpc5T/26H9B36lFtAUXEiaWMpBid7OoHtF3NnrgVhSIiO4DsBHIsUV9vbPWKoW3qMW0ARcQMIC/jrD3ppnRXXh+d0S2GtqrHtQS0Alhbzl6uPlTD9FJoi9q0FmMrjKWbyC4gYyhTPFM9U36P0U2hzerx41YoIi4AXi3nrlFX7Q3TS6FN6gktAL0LnFXa3bnqt4OAXgHyD4N+Y6W6NiKWANnQdy7hAfvqx307yNpl2Zp2vhq6GEh/z1e/iYj8TD5/ChDN0oydherGXnv36Kkj4jIgm/VDqw2Zll8C9zYHRcRpwD311TME3K/ArWrzNdt1y5Sa/CGMjrxk2gH9B1exkDQvDfNjAAAAAElFTkSuQmCC');
    margin-right: 8px;
  }
  .line-split {
    margin: 22px 0 !important;
    border-top: 1px solid rgba(0 ,0, 0, .1);
  }
  .popularity-percent-icon {
    font-size: 14px;
    margin-right: 8px;
  }
  .popularity-percent-up {
    color: #67C23A;
  }
  .popularity-percent-down {
    color: #F56C6C;
  }
  .popularity-percent-hold {
    color: #909399;
  }
  .popularity-percent-hint {
    font-size: 14px;
    color: rgba(0, 0, 0, .5);
    margin-top: 8px;
  }
  .information-content {
    font-size: 16px;
    color: rgba(0, 0, 0, .7);
    line-height: 32px;
  }
  .information-section {
    font-size: 18px;
    font-weight: 600;
  }
  .section-ad-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 0;
  }
  .section-ad + .section-ad {
    margin-top: 12px;
  }
  .name-list {
    margin: 0 !important;
  }
  .name-item {
    margin-top: 18px;
    padding-bottom: 6px;
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cfcfcf;
    cursor: pointer;
  }
  .name-item:first-child {
    margin-top: 0 !important;
  }
  .name-item .boy-icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ4MjU5NDYxNzQyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTg5NS41NDc0NzUgOTguMTMzMzMzSDU4NS41MDMwM2MtMTYuNjc4Nzg4IDAtMzAuMTI1MjUzIDEzLjQ0NjQ2NS0zMC4xMjUyNTIgMzAuMTI1MjUzczEzLjQ0NjQ2NSAzMC4xMjUyNTMgMzAuMTI1MjUyIDMwLjEyNTI1MmgyMzguMjg2ODY5TDY4MC42NjI2MjYgMzAxLjUxMTExMWMtNjMuODcwNzA3LTU0LjMwMzAzLTE0NC4xNjE2MTYtODQuMDQwNDA0LTIyOC45Nzc3NzgtODQuMDQwNDA0LTk0LjUxMzEzMSAwLTE4My40NjY2NjcgMzYuNzE5MTkyLTI1MC4zMTExMTEgMTAzLjY5MjkyOUMxMzQuNCAzODguMTM3Mzc0IDk3LjY4MDgwOCA0NzYuOTYxNjE2IDk3LjY4MDgwOCA1NzEuNDc0NzQ3czM2LjcxOTE5MiAxODMuMzM3Mzc0IDEwMy42OTI5MjkgMjUwLjMxMTExMiAxNTUuNzk3OTggMTAzLjY5MjkyOSAyNTAuMzExMTExIDEwMy42OTI5MjkgMTgzLjMzNzM3NC0zNi43MTkxOTIgMjUwLjMxMTExMi0xMDMuNjkyOTI5YzY2Ljg0NDQ0NC02Ni45NzM3MzcgMTAzLjY5MjkyOS0xNTUuNzk3OTggMTAzLjY5MjkyOS0yNTAuMzExMTEyIDAtODQuMTY5Njk3LTI5LjA5MDkwOS0xNjMuNjg0ODQ4LTgyLjYxODE4Mi0yMjcuMjk2OTY5bDE0Mi4zNTE1MTUtMTQyLjM1MTUxNVY0MzguMzAzMDNjMCAxNi42Nzg3ODggMTMuNDQ2NDY1IDMwLjEyNTI1MyAzMC4xMjUyNTMgMzAuMTI1MjUzczMwLjEyNTI1My0xMy40NDY0NjUgMzAuMTI1MjUyLTMwLjEyNTI1M1YxMjguMjU4NTg2YzAtMTYuNjc4Nzg4LTEzLjU3NTc1OC0zMC4xMjUyNTMtMzAuMTI1MjUyLTMwLjEyNTI1M3pNNDUxLjY4NDg0OCA4NjUuMjI4MjgzQzI4OS42ODA4MDggODY1LjIyODI4MyAxNTcuOTMxMzEzIDczMy40Nzg3ODggMTU3LjkzMTMxMyA1NzEuNDc0NzQ3czEzMS43NDk0OTUtMjkzLjc1MzUzNSAyOTMuNzUzNTM1LTI5My43NTM1MzVjNzkuOTAzMDMgMCAxNTIuMzA3MDcxIDMyLjA2NDY0NiAyMDUuMTg3ODc5IDgzLjkxMTExMSAwLjkwNTA1MSAxLjE2MzYzNiAxLjgxMDEwMSAyLjMyNzI3MyAyLjg0NDQ0NSAzLjIzMjMyMyAxLjAzNDM0MyAxLjAzNDM0MyAyLjE5Nzk4IDEuOTM5Mzk0IDMuMTAzMDMgMi43MTUxNTIgNTAuOTQxNDE0IDUyLjg4MDgwOCA4Mi40ODg4ODkgMTI0Ljc2NzY3NyA4Mi40ODg4ODkgMjAzLjg5NDk0OSAwLjEyOTI5MyAxNjIuMDA0MDQtMTMxLjc0OTQ5NSAyOTMuNzUzNTM1LTI5My42MjQyNDMgMjkzLjc1MzUzNnogbTAgMCIgZmlsbD0iIzEyOTZkYiIgcC1pZD0iMTEwNiI+PC9wYXRoPjwvc3ZnPg==');
  }
  .name-item .girl-icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    background-image:url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ4MjU5NDc0MDYxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTgyNi41Njk2OTcgMTk3LjA0MjQyNEM3NTkuNTk1OTYgMTMwLjE5Nzk4IDY3MC43NzE3MTcgOTMuMzQ5NDk1IDU3Ni4yNTg1ODYgOTMuMzQ5NDk1cy0xODMuNDY2NjY3IDM2LjcxOTE5Mi0yNTAuMzExMTExIDEwMy42OTI5MjlDMjU5LjEwMzAzIDI2My44ODY4NjkgMjIyLjI1NDU0NSAzNTIuNzExMTExIDIyMi4yNTQ1NDUgNDQ3LjM1MzUzNWMwIDg0LjQyODI4MyAyOS4zNDk0OTUgMTY0LjMzMTMxMyA4My4yNjQ2NDcgMjI4LjA3MjcyOEwyNDUuMDEwMTAxIDczNS45MzUzNTRsLTEwMS42MjQyNDItMTAxLjYyNDI0M2MtMTEuMjQ4NDg1LTExLjI0ODQ4NS0yOS45OTU5Ni0xMC44NjA2MDYtNDEuNzYxNjE3IDAuOTA1MDUxLTExLjc2NTY1NyAxMS43NjU2NTctMTIuMTUzNTM1IDMwLjUxMzEzMS0wLjkwNTA1IDQxLjc2MTYxNkwyMDIuMzQzNDM0IDc3OC42MDIwMmwtOTEuNjY4Njg3IDkxLjc5Nzk4Yy0xMS43NjU2NTcgMTEuNzY1NjU3LTExLjc2NTY1NyAzMC45MDEwMSAwIDQyLjUzNzM3NCAxMS43NjU2NTcgMTEuNzY1NjU3IDMwLjkwMTAxIDExLjc2NTY1NyA0Mi41MzczNzQgMEwyNDUuMTM5Mzk0IDgyMS4wMTAxMDFsMTAxLjYyNDI0MiAxMDEuNjI0MjQyYzExLjI0ODQ4NSAxMS4yNDg0ODUgMjkuOTk1OTYgMTAuODYwNjA2IDQxLjc2MTYxNy0wLjkwNTA1IDExLjc2NTY1Ny0xMS43NjU2NTcgMTIuMTUzNTM1LTMwLjUxMzEzMSAwLjkwNTA1LTQxLjc2MTYxNkwyODcuODA2MDYxIDc3OC4zNDM0MzRsNjAuNTA5MDkxLTYwLjUwOTA5MWM2My43NDE0MTQgNTMuOTE1MTUyIDE0My42NDQ0NDQgODMuMjY0NjQ2IDIyOC4wNzI3MjcgODMuMjY0NjQ3IDk0LjUxMzEzMSAwIDE4My4zMzczNzQtMzYuNzE5MTkyIDI1MC4zMTExMTEtMTAzLjY5MjkyOXMxMDMuNjkyOTI5LTE1NS43OTc5OCAxMDMuNjkyOTI5LTI1MC4zMTExMTJjLTAuMTI5MjkzLTk0LjUxMzEzMS0zNi44NDg0ODUtMTgzLjMzNzM3NC0xMDMuODIyMjIyLTI1MC4wNTI1MjV6TTU3Ni4yNTg1ODYgNzQwLjk3Nzc3OEM0MTQuMzgzODM4IDc0MC45Nzc3NzggMjgyLjYzNDM0MyA2MDkuMjI4MjgzIDI4Mi42MzQzNDMgNDQ3LjM1MzUzNWMwLTE2Mi4wMDQwNCAxMzEuNzQ5NDk1LTI5My43NTM1MzUgMjkzLjc1MzUzNi0yOTMuNzUzNTM1Uzg3MC4wMTIxMjEgMjg1LjM0OTQ5NSA4NzAuMDEyMTIxIDQ0Ny4zNTM1MzVjMCAxNjEuODc0NzQ3LTEzMS43NDk0OTUgMjkzLjYyNDI0Mi0yOTMuNzUzNTM1IDI5My42MjQyNDN6IG0wIDAiIGZpbGw9IiNkNDIzN2EiIHAtaWQ9IjEzNDciPjwvcGF0aD48L3N2Zz4=');
  }
  .similar-section, .popular-section {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
  .similar-list-wrapper {
    padding: 20px 0 !important;
  }
  .popularity-table {
    padding: 20px 0;
  }
  .popularity-table .header, .popularity-table .header-history {
    font-size: 22px;
    text-align: center;
    padding: 8px 0;
  }
  .popularity-table .header {
    background-color: #719398;
    color: white;
  }
  .popularity-table .header-history {
    background-color: rgba(0, 0, 0, .1);
    color: black;
  }
</style>

<style>
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 !important;
    height: 56px !important;
    color: white;
    font-size: 16px;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item.is-active {
    background-color: white !important;
    color: black;
    font-size: 22px;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav #tab-first {
    background-color: #b8cc7a;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav #tab-second {
    background-color: #80bdbb;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav #tab-third {
    background-color: #f48d25;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav #tab-fourth {
    background-color: #6aaf56;
  }
  .name-information-container .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .el-tabs__active-bar {
    background-color: white !important;
    height: 2px;
    margin-bottom: 8px !important;
    margin-top: 100px ;
  }
</style>
