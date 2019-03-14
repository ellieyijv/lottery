
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/shoppingcart',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/shoppingcart.vue') }
    ]
  },
  {
    path: '/checkout',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/checkout.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
