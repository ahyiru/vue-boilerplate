import {ref} from 'vue';
import {clone} from '@huxy/utils';
import { createRouter, createWebHashHistory } from 'vue-router';

import Fragment from '@app/components/fragment';

export const routes = [
  {
    path: '/',
    redirect: '/test1',
    name:'home',
    component:()=>import('@common/layout'),
    children:[
      {
        path: '/test1',
        name:'test1',
        icon:'ChatLineSquare',
        component:()=>import('./views/test1'),
      },
      {
        path: '/events',
        name:'events',
        icon:'Dessert',
        component:()=>import('./views/events'),
      },
      {
        path: '/demo1',
        name:'demo1',
        icon:'Grid',
        component:()=>import('./views/Demo1'),
      },
      {
        path: '/demo2',
        name:'demo2',
        icon:'Menu',
        redirect: '/demo2/demo2-1',
        component: Fragment,
        children:[
          {
            path: '/demo2/demo2-1',
            name:'demo2-1',
            icon:'Menu',
            component:()=>import('./views/Demo1'),
          },
          {
            path: '/demo2/demo2-2',
            name:'demo2-2',
            icon:'Menu',
            redirect: '/demo2/demo2-2/demo2-2-1',
            component:Fragment,
            children:[
              {
                path: '/demo2/demo2-2/demo2-2-1',
                name:'demo2-2-1',
                icon:'Menu',
                component:()=>import('./views/Demo1'),
              },
              {
                path: '/demo2/demo2-2/demo2-2-2',
                name:'demo2-2-2',
                icon:'Menu',
                component:()=>import('./views/Demo1'),
              },
            ],
          },
        ],
      },
      {
        path: '/composition',
        name:'composition',
        icon:'Monitor',
        component:()=>import('./views/composition'),
      },
    ],
  },
  /* {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }, */
];

export const routers=clone(routes);

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes,
});

export default router;
