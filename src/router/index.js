import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import LoginPage from '@/page/login';
import MainPage from '@/page/main';
import HomePage from '@/page/home';
import UserListPage from '@/page/userList';
import NameListPage from '@/page/name-list';
import ArticlePage from '@/page/article';
import BaoBaoName from '@/page/baobao-name'

Vue.use(Router);

const routes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: '/userList',
        component: UserListPage
      },
      {
        path: '/name/:name',
        component: BaoBaoName
      },
      {
        path: '/nameList',
        component: NameListPage
      },
      {
        path: '/article/:id',
        component: ArticlePage
      }
    ]
  }
];

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

export default router;
