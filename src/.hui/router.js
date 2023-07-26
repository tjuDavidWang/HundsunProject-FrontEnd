import { initRouter, initRouterLayout } from '@hsui/core'
function Index() {
  return import(/* webpackChunkName: "index" */ '@/views/index.vue')
}

function IndexHome() {
  return import(/* webpackChunkName: "index-home" */ '@/views/index/home.vue')
}

function TestA() {
  return import(/* webpackChunkName: "TestA" */ '@/components/TestA.vue')
}

function TestB() {
  return import(/* webpackChunkName: "TestB" */ '@/components/TestB.vue')
}

function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}

export default initRouter(
  [
    {
      path: '/',
      component: initRouterLayout((layout) => {
        return import('@/layouts/' + layout + '.vue')
      }),
      children: [
        {
          name: 'index',
          path: '',
          component: Index,
          children: [
            {
              name: 'homepage',
              path: 'homepage',
              component: IndexHome,
            },
            {
              name: 'purchase',
              path: 'purchase',
              component: TestA,
            },
            {
              name: 'redeem',
              path: 'redeem',
              component: TestB,
            },
            {
              name: 'list-customer',
              path: 'list-customer',
              component: TestB,
            },
            {
              name: 'add-customer',
              path: 'add-customer',
              component: TestB,
            },
            {
              name: 'product-management',
              path: 'product-management',
              component: TestB,
            }
          ],
        },
        {
          name: '__404__',
          path: '*',
          component: __404__,
        },
      ],
    },
  ],
  { base: '/', mode: 'history' }
)

