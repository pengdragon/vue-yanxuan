// 商品详情数据
export default {
  path: '/itemdetail/:id',
  components: {
    detail: () => import('@pages/common/goods-detail')
  },
  //如果是单个组件component则props：true则就可以将id映射到局部组件了，如果是
  //多个组件components则props为一个对象，里面的属性为组件名称detail或者其他组件名称
  props: {
    detail: true
  },
  children: [
    {
      path: 'buy',
      component: () => import('@pages/common/handle-buy')
    }
  ]
}