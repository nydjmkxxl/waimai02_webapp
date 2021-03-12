import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'shop',
    path: '/',
    component: () =>
    import('my-tab-content/shop/Shop')
  }, {
    name: 'rating',
    path: '/rating',
    component: () =>
    import('my-tab-content/rating/Rating')
  }, {
    name: 'seller',
    path: '/seller',
    component: () =>
      import('my-tab-content/seller/Seller')
  }]
})
