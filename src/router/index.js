import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/page/home';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '',
        component: HomePage
      }
    ]
  }
];

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

export default router;
