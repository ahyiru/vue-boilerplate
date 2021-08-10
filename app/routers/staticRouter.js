import { createRouter, createWebHashHistory } from 'vue-router';

import Fragment from '@app/components/fragment';
import Empty from '@app/components/empty';

export const routes = [
  {
    path: '/',
    redirect: '/home',
    name:'home',
    component:()=>import('@common/layout'),
    children:[
      {
        path: '/home',
        name:'home',
        icon:'ChatLineSquare',
        component:()=>import('@app/views/table'),
      },
      {
        path: '/tree',
        name:'tree',
        icon:'Dessert',
        component:()=>import('@app/views/tree'),
      },
      {
        path: '/form',
        name:'form',
        icon:'Grid',
        component:()=>import('@app/views/form'),
      },
      {
        path: '/menu',
        name:'menu',
        icon:'Menu',
        redirect: '/menu/menu-1',
        component: Fragment,
        children:[
          {
            path: '/menu/menu-1',
            name:'menu-1',
            icon:'Menu',
            component:Empty,
          },
          {
            path: '/menu/menu-2',
            name:'menu-2',
            icon:'Menu',
            redirect: '/menu/menu-2/menu-2-1',
            component:Fragment,
            children:[
              {
                path: '/menu/menu-2/menu-2-1',
                name:'menu-2-1',
                icon:'Menu',
                component:Empty,
              },
              {
                path: '/menu/menu-2/menu-2-2',
                name:'menu-2-2',
                icon:'Menu',
                component:Empty,
              },
            ],
          },
        ],
      },
      {
        path: '/collapse',
        name:'collapse',
        icon:'Monitor',
        component:()=>import('@app/views/collapse'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@app/404'),
    hidden: true,
  },
  { path: '/:catchAll(.*)', redirect: '/404' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/* router.beforeEach(async (to, from, next) => {
  const token = getToken();
  // const userInfo = store.state.user.userInfo;
  document.title = to.meta.title;
  if (to.path === '/login') {
    if (token) {
      next('/');
    } else {
      next();
    }
  } else {
    if (token) {
      next();
    } else {
      next('/login');
    }
  }
}); */

export default router;

