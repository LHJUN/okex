import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import LoginPage from '@/page/login';
import MainPage from '@/page/main';
import HomePage from '@/page/home';
import UserListPage from '@/page/userList';

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
      }
    ]
  }
];

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

export default router;
