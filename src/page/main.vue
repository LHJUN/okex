<template>
  <el-container>
    <el-header>
      <global-nav :navs="navs" v-model="currentSelectedNav" :user="loginUser" :user-navs="userNavs" @handleUserNav="handleUserNav" ref="nav"></global-nav>
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
export default {
  components: { GlobalFooter, GlobalNav },
  data() {
    return {
      navHeight: 0,
      windowHeight: 0,
      footerHeight: 0,
      test: '',
      navs: [
        { key: '1-1', text: '首页' },
        { key: '2-1', text: '男孩名字' },
        { key: '3-1', text: '女孩名字' },
        { key: '4-1', text: '种族' },
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
      currentSelectedNav: '1-1',
      loginUser: {
        username: 'Administrator',
        icon: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1934949823,4245377060&fm=26&gp=0.jpg'
      },
      userNavs: [
        { key: 'u-1', text: '我的主页' },
        { key: 'u-2', text: '个人设置' },
        { key: 'u-3', text: '退出' }
      ]
    };
  },
  methods: {
    handleUserNav(key) {
      this.$message({
        message: 'click : ' + key,
        type: 'success',
        duration: 500
      })
    }
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
    currentSelectedNav(current, last) {
      this.$message({
        message: 'current : ' + current + ', last: ' + last,
        type: 'success',
        duration: 500
      })
    }
  },
  computed: {
    bodyHeight() {
      return (this.windowHeight - this.navHeight) + 'px';
    },
    routeViewHeight() {
      return (this.windowHeight - this.navHeight - this.footerHeight) + 'px';
    }
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
