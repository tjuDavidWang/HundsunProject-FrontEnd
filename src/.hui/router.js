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
function ListCustomers() {
  return import(/* webpackChunkName: "CustomerTable" */ '@/components/CustomerTable.vue')
}
function Liquidate() {
  return import(/* webpackChunkName: "Liquidate" */ '@/components/Liquidate.vue')
}
function AddCustomer() {
  return import(/* webpackChunkName: "UserCreate" */ '@/components/UserCreate.vue')

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
              name: 'ListCustomers',
              path: 'ListCustomers',
              component: ListCustomers,
            },
            {
              name: 'AddCustomer',
              path: 'AddCustomer',
              component: AddCustomer,
            },
            {
              name: 'ListFunds',
              path: 'ListFunds',
              component: ListProducts,
            },
            {
              name: 'Liquidate',
              path: 'Liquidate',
              component: Liquidate,
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

