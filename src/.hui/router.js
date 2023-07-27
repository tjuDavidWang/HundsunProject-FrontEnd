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
function ListProducts() {
  return import(/* webpackChunkName: "NavGraph" */ '@/components/NavGraph.vue')
}
function Purchase() {
  return import(/* webpackChunkName: "Subscription" */ '@/components/Subscription.vue')
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
              name: 'home',
              path: 'home',
              component: IndexHome,
            },
            {
              name: 'purchase',
              path: 'purchase',
              component: Purchase,
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
              name: 'list-product',
              path: 'list-product',
              component: ListProducts,
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

