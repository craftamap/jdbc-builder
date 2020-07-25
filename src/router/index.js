import Vue from 'vue';
import Router from 'vue-router';
import builder from '@/components/builder';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'builder',
      component: builder,
    },
  ],
});
