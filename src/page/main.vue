<template>
  <el-container>
    <el-header>
      <global-nav :navs="navs" v-model="selectedNav" :user="loginUser" :user-navs="userNavs" ref="nav"></global-nav>
    </el-header>
    <el-main :style="{minHeight: bodyHeight}">
      <router-view :style="{minHeight: routeViewHeight}"></router-view>
      <global-footer ref="footer"></global-footer>
    </el-main>
  </el-container>
</template>

<script>
import GlobalNav from '../components/nav/global_nav'
import GlobalFooter from '../components/global_footer';
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { GlobalFooter, GlobalNav },
  data() {
    return {
      navHeight: 0,
      windowHeight: 0,
      footerHeight: 0,
      test: '',
      navs: [
        { key: '1-1', text: '首页', routePath: '/'  },
        { key: '2-1', text: '男孩名字', routePath: '/nameList'  },
        { key: '3-1', text: '女孩名字', routePath: '/nameList'  },
        {
          key: '5',
          text: '分类',
          subNavs: [
            { key: '5-1', text: 'SUB 1' },
            { key: '5-2', text: 'SUB 2' },
            { key: '5-3', text: 'SUB 3' },
            { key: '5-4', text: 'SUB 4' }
          ]
        }
      ],
      loginUser: undefined,
      userNavs: [
        { key: 'u-1', text: '我的主页' },
        { key: 'u-2', text: '个人设置' },
        { key: 'u-3', text: '退出' }
      ]
    };
  },
  methods: {
    ...mapMutations(['updateCurrentSelectedNav'])
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    this.footerHeight = this.$refs.footer.$el.offsetHeight;
    this.navHeight = this.$refs.nav.$el.offsetHeight;
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
      this.footerHeight = this.$refs.footer.$el.offsetHeight;
      this.navHeight = this.$refs.nav.$el.offsetHeight;
    });
  },
  watch: {
    // currentSelectedNav(current, last) {
    //   this.$router.push(this.navs.find(nav => nav.key === current).routePath)
    // }
  },
  computed: {
    selectedNav: {
      get () {
        return this.currentSelectedNav
      },
      set (selectedNav) {
        this.$router.push(this.navs.find(nav => nav.key === selectedNav).routePath)
        this.updateCurrentSelectedNav(selectedNav)
      }
    },
    bodyHeight() {
      return (this.windowHeight - this.navHeight) + 'px';
    },
    routeViewHeight() {
      return (this.windowHeight - this.navHeight - this.footerHeight) + 'px';
    },
    ...mapGetters(['currentSelectedNav'])
  }
};
</script>


<style scoped>
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-header {
  line-height: 60px;
  padding: 0!important;
}

.el-main {
  background-color: rgba(235, 235, 235, 0.2);
  color: #333;
  overflow-y: auto;
  padding: 0 !important;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
