<template>
    <el-row>
        <el-col :span="24" class="global-nav">
            <el-row>
                <el-col :md="{span: 20, offset: 2}" :lg="{span: 18, offset: 3}" :xl="{span: 16, offset: 4}"
                        class="hidden-sm-and-down">
                    <el-row :gutter="20" align="middle">
                        <el-col :span="18">
                            <el-tooltip class="logo-box" content="babynames.com" effect="light" placement="bottom">
                                <span class="logo">Baby<span class="logo-primary">Names</span></span>
                            </el-tooltip>
                            <template v-for="nav in navs">
                                <el-button @click="handleSelected(nav)" class="nav-button" type="text"
                                           :class="{ 'nav-button-selected': value === nav.key }"
                                           v-if="nav.text && (nav.subNavs === undefined || nav.subNavs === null || nav.subNavs.length ===0)">
                                    {{ nav.text }}
                                </el-button>
                                <el-dropdown v-else @command="handleCommand">
                            <span class="el-dropdown-link nav-button">{{ nav.text }}<i
                                    class="el-icon-arrow-down el-icon--right"></i></span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="subNav in nav.subNavs" :key="subNav.key"
                                                          :class="{ 'nav-button-selected': value === subNav.key }"
                                                          :command="subNav">{{ subNav.text }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-col>
                        <el-col :span="6" class="nav-right nav-right-un-login" v-if="!user">
                            <el-button type="text">立即登录</el-button>
                            <el-button type="primary">免费注册</el-button>
                        </el-col>
                        <el-col :span="6" class="nav-right nav-right-login" v-else>
                            <el-tooltip content="通知" placement="bottom" effect="light">
                                <el-button icon="el-icon-bell" circle size="small"></el-button>
                            </el-tooltip>
                            <el-tooltip content="私信" placement="bottom" effect="light">
                                <el-button icon="el-icon-message" circle size="small"></el-button>
                            </el-tooltip>
                            <el-dropdown @command="handleUserNav" trigger="click">
                                <span class="el-dropdown-link">
                                    <avatar :src="user.icon"/>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="userNav in userNavs" :key="userNav.key" :command="userNav">
                                        {{ userNav.text }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :xs="{span: 22, offset: 1}" :sm="{span: 20, offset: 2}" class="hidden-md-and-up">
                    <div style="display: flex; justify-content: space-between; align-items: center">
                        <div class="menu-mobile" @click="mobileNavIsVisible = !mobileNavIsVisible">
                            <i class="el-icon-menu menu-mobile-icon"
                               :class="{ 'menu-mobile-icon-selected': mobileNavIsVisible }"></i>
                        </div>
                        <span class="logo-mobile">Baby<span class="logo-primary">Names</span></span>
                        <el-dropdown @command="handleUserNav" trigger="click">
                        <span class="el-dropdown-link">
                            <avatar :src="user.icon" mobile/>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="userNav in userNavs" :key="userNav.key" :command="userNav">{{
                                    userNav.text }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="24">
            <el-row>
                <el-col :span="24" class="hidden-md-and-up">
                    <transition name="el-zoom-in-top">
                        <ul class="nav-group-mobile" v-show="mobileNavIsVisible">
                            <template v-for="nav in navs">
                                <li class="nav-mobile" :class="{ 'nav-mobile-selected': value === nav.key }"
                                    v-if="nav.text && (nav.subNavs === undefined || nav.subNavs === null || nav.subNavs.length ===0)"
                                    @click="handleSelected(nav)">{{ nav.text }}
                                </li>
                                <li class="nav-mobile nav-mobile-multiple" v-else @click="spreadNavGroup(nav)">
                                        <span class="nav-mobile-multiple-text">
                                            {{ nav.text }}
                                            <i class="el-icon-arrow-down el-icon-arrow-right"
                                               v-show="navGroupSpreads.indexOf(nav.key) === -1"></i>
                                            <i class="el-icon-arrow-down el-icon-arrow-down"
                                               v-show="navGroupSpreads.indexOf(nav.key) !== -1"></i>
                                        </span>
                                    <el-collapse-transition>
                                        <ul class="nav-group-mobile nav-group-mobile-multiple"
                                            v-show="navGroupSpreads.indexOf(nav.key) !== -1">
                                            <li class="nav-mobile"
                                                :class="{ 'nav-mobile-selected': value === subNav.key }"
                                                v-for="subNav in nav.subNavs" :key="subNav.key"
                                                @click="handleSelectedForGroup(subNav, nav)">{{ subNav.text }}
                                            </li>
                                        </ul>
                                    </el-collapse-transition>
                                </li>
                            </template>
                        </ul>
                    </transition>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
  import Avatar from './avatar';

  export default {
    name: 'global-nav',
    components: { Avatar },
    data() {
      return {
        mobileNavIsVisible: false,
        navGroupSpreads: []
      };
    },
    props: {
      navs: {
        type: Array,
        default: () => []
      },
      value: {
        type: String
      },
      user: {
        type: Object,
        default: null
      },
      userNavs: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleSelected(nav) {
        if (this.value !== nav.key) {
          this.mobileNavIsVisible = false;
          this.navGroupSpreads = [];
          this.$emit('input', nav.key);
        }
      },
      handleSelectedForGroup(subNav, nav) {
        if (this.value !== subNav.key) {
          this.mobileNavIsVisible = false;
          this.navGroupSpreads.splice(this.navGroupSpreads.length, 0, nav.key);
          this.$emit('input', subNav.key);
        }
      },
      handleCommand(command) {
        if (this.value !== command.key) {
          this.$emit('input', command.key);
        }
      },
      handleUserNav(command) {
        this.$emit('handleUserNav', command.key);
      },
      spreadNavGroup(nav) {
        if (this.navGroupSpreads.indexOf(nav.key) !== -1) {
          this.navGroupSpreads.splice(this.navGroupSpreads.indexOf(nav.key), 1);
        } else {
          this.navGroupSpreads.splice(this.navGroupSpreads.length, 0, nav.key);
        }
      }
    }
  };
</script>

<style>
    * {
        transition: all .12s ease-in-out;
    }

    .global-nav {
        background-color: white;
        box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
    }

    .nav-button {
        margin: 0 6px !important;
        padding-left: 13px !important;
        padding-right: 13px !important;
        border: none !important;
        letter-spacing: .5px;
        font-size: 15px !important;
        color: #409EFF;
    }

    .nav-button.el-button:hover {
        background-color: rgba(0, 0, 0, 0.05) !important;
    }

    .nav-button .el-button-group .el-button {
        border: none !important;
    }

    .nav-button-selected {
        font-weight: bold !important;
    }

    .nav-button-selected.el-button:hover {
        background-color: transparent !important;
    }

    .nav-left, .nav-right {
        text-align: center;
        white-space: nowrap;
    }

    .nav-right-un-login button {
        margin: 0 10px !important;
    }

    .nav-right-login button {
        margin: 0 6px !important;
    }

    .logo-box {
        margin-right: 22px;
        float: left
    }

    .logo {
        font-size: 23px;
        font-weight: bold;
        letter-spacing: .4px;
        color: rgba(0, 0, 0, 0.74);
        cursor: pointer;
    }

    .logo-mobile {
        font-size: 20px;
    }

    .logo-primary {
        color: #409EFF !important;
    }

    .menu-mobile {
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: left;
        align-items: center;
        cursor: pointer;
    }

    .menu-mobile-icon {
        font-size: 30px;
        color: rgba(0, 0, 0, 0.2)
    }

    .menu-mobile-icon-selected {
        color: rgba(0, 0, 0, 0.55)
    }

    .nav-group-mobile {
        width: 100%;
        margin: 0 !important;
        padding: 8px 32px 16px 32px;
        box-sizing: border-box;
        background-color: white;
        position: absolute;
        left: 0;
        top: 0;
        box-shadow: 0 24px 24px 0 rgba(0, 0, 0, .22);
        z-index: 9999;
    }

    .nav-group-mobile-multiple {
        position: relative !important;
        box-shadow: none;
        padding: 8px 32px 12px 32px !important;
    }

    .nav-mobile {
        width: 100%;
        padding: 6px 0;
        text-align: center;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.55);
        list-style: none;
        line-height: 16px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.55);
        margin-top: 8px;
        box-sizing: border-box;
    }

    .nav-mobile:first-child {
        margin-top: 0 !important;
    }

    .nav-mobile:hover, .nav-mobile-selected {
        color: white;
        background-color: rgba(0, 0, 0, 0.55);
        border-color: transparent;
    }

    .nav-mobile-multiple {
        padding: 0 !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .nav-mobile-multiple:hover {
        background-color: transparent !important;
        border-color: rgba(0, 0, 0, 0.55);
    }

    .nav-mobile-multiple-text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.55);
        padding: 6px 0;
    }
</style>
