<template>
  <!-- 有关商品的 -->
  <div class="shop">
    <!-- 菜单类别 -->
    <div class="menu" ref="menu" >
      <ul>
        <li class="menu-item"
          v-for="(item, index) of goods"
          :key="index"
          :class="{'cur': curIndex===index}"
          @click="handleMenu(index, $event)"
        >
          <span class="shops-name">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            <span class="menu-text">{{item.name}}</span>
          </span>
          <!-- 选择的数量 -->
          <span class="menu-count" v-show="menuSelfCount[index]>0">{{menuSelfCount[index]}}</span>
        </li>
      </ul>
    </div>
    <!-- 商品类目 -->
    <div class="detail" ref="detail">
      <div class="detail-content-scroll">
        <ul class="detail-content detail-content-hook" v-for="(item, index) of goods" :key="index" >
          <h1 class="detail-title border-left">{{item.name}}</h1>
          <li class="detail-item" v-for="(food, index) of item.foods" :key="index">
            <div class="detail-item-content border-bottom">
              <div class="food-img-container" @click="handleFoodDetail(food)">
                <img class="food-img" :src="food.icon"/>
              </div>
              <div class="food-info">
                <h2 class="food-name" @click="handleFoodDetail(food)">{{food.name}}</h2>
                <p class="food-desc" v-show="food.description">{{food.description}}</p>
                <div class="say">
                  <span class="food-order">月售{{food.sellCount}}份</span>
                  <span class="food-rating">好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="food-price">￥{{food.price}}</span>
                  <span class="food-oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  <!-- 监听Count组件数量增加事件 -->
                  <Count @count-emit="countEmit" :food="food" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <Cart
      ref="Cart"
      :selectedFoods="selectedFoods"
      :deliveryPrice="deliveryPrice"
      :minPrice="minPrice"
    />
    <!-- 单个商品的详细情况 -->
    <transition name="shopDetail">
      <div class="shop-detail" v-show="showFoodDetail">
        <!-- 监听Detail组件数量增加事件，Detail并将Count组件的el元素传进来，进行抛物线动画 -->
        <Detail ref="Detail" :detailFood="detailFood" @detail-emit="countEmit" @DetailEmitShop="hideFoodDetail"/>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Cart from './Cart'
import Detail from './Detail'
import Count from '../../../common/Count'
import axios from 'axios'

const OK_STATUS = 0

export default {
  name: 'Shop',
  components: {
    Cart,
    Count,
    Detail
  },
  data () {
    return {
      goods: [], /* 所有商品信息 */
      listHeight: [], /* 存储商品类别的detail页面h1位置到滚动条0的位置 */
      scrollY: 0, /* 滚动条当前的y值 */
      deliveryPrice: 0, /* 配送费 */
      minPrice: 0, /* 起送价 */
      // menuSelfCount: [] /* menu位置的各个类别选中的商品个数 */
      value: [20, 50],
      showFoodDetail: false,
      detailFood: {}
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios.get('/api/data.json').then((res) => {
      if (res.data.errno === OK_STATUS) {
        this.goods = res.data.goods
        this.deliveryPrice = res.data.seller.deliveryPrice
        this.minPrice = res.data.seller.minPrice
        this.$nextTick(() => { /* dom更新完成在执行初始化插件和获取高度集合 */
          this.initScroll()
          this.detailTypeHeightCollect()
        })
      }
    })
  },
  methods: {
    // 隐藏商品详情页
    hideFoodDetail () {
      this.showFoodDetail = false
    },
    // 显示商品详情页
    handleFoodDetail (food) {
      this.detailFood = food
      this.showFoodDetail = true
      this.$refs.Detail.refreshPage()
    },
    // 接受有关子组件count的事件，然后调用子组件cart方法，执行cart组件中的ballStartDrop抛物线动画
    countEmit (el) {
      console.log('Shop-->Cart')
      this.$nextTick(() => {
        // 因为执行的事件是在 Cart 组件里
        this.$refs.Cart.countEmit(el)
      })
    },
    handleMenu (index, e) {
      this.detailScroll.scrollTo(0, -this.listHeight[index], 300)
    },
    initScroll () { /* 当DOM更新完成后，初始化滚动条 */
      this.detailScroll = new BScroll(this.$refs.detail, {
        probeType: 3,
        click: true
      })
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      // 监听滚动事件，如 +0.5 在向最近的数取整，赋给scrolly，然后根据scrolly在范围确定索引，然后给对应的menu-item加cur类名
      this.detailScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    detailTypeHeightCollect () {
      // 获取detail页面的所有JS选择的dom元素
      let foodList = this.$refs.detail.getElementsByClassName('detail-content-hook')
      // let height = 0
      let height
      // this.listHeight.push(height)
      // 遍历累加获取各自的高度
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height = item.offsetTop
        // height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  updated () {
    // console.log(this)
  },
  computed: {
    menuSelfCount () {
      let menuSelfCount = []
      this.goods.forEach(food => {
        let num = 0
        food.foods.forEach(food => {
          // console.log(food.count)
          num += food.count ? food.count : 0
        })
        menuSelfCount.push(num)
      })
      // console.log(menuSelfCount)
      return menuSelfCount
    },
    // 确定cur是哪项
    curIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
        // if (i + 1 === this.listHeight.length) return 0
        // 根据scrolly在范围确定索引，然后给对应的menu-item加cur类名
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      // return 0
    },
    // 通过遍历商品中的count值只要大于0说明被选中，然后给selectedFoods放入新的对象集合
    selectedFoods () {
      let selectedFoods = []
      this.goods.forEach(food => {
        food.foods.forEach(food => {
          if (food.count) {
            selectedFoods.push(food)
          }
        })
      })
      return selectedFoods
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'my-assets/css/private/private.scss';
$baseUrl: '../../../assets/img/';
 .shop >>> * {
  box-sizing: content-box;
}
.shop {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 48px;
  width: 100%;
  overflow: hidden;
  .shopDetail-enter,
  .shopDetail-leave-to {
    transform: translateX(100%);
  }
  .shopDetail-enter-active,
  .shopDetail-leave-active {
    transition: all .5s;
  }
  .shop-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
  }
  .menu {
    flex: 0 0 80px; //第一个是等分， 第二是缩放情况，第三个占位空间
    width: 80px;
    // height: 493px;
    overflow: hidden;
    // padding: 0 12px;
    background: #f3f5f7;
    .cur {
        // position: relative;
        // z-index: 10;
        // margin-top: -1px;
        background: #fff;
      .menu-text {
        font-weight: 700;
      }
    }
    .menu-item {
      display: flex;
      align-items: center;
      height: 54px;
      line-height: 14px;
      padding: 0 12px;
      position: relative;
      &.border-bottom::before {
        border-bottom: 1px solid rgba(7,17,27,.1);
      }
      .shops-name {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          vertical-align: middle;
        }
        .menu-text {
          font-size: 12px;
          line-height: 12px;
          // display: table-cell;
          // vertical-align: middle;
        }
        .decrease {
          @include bg-img($baseUrl + 'discount_3');/* 倒序，加一个是防止第一站图片有误 */
        }
        .discount {
          @include bg-img($baseUrl + 'decrease_3');
        }
        .special {
          @include bg-img($baseUrl + 'special_3');
        }
        .invoice {
          @include bg-img($baseUrl + 'invoice_3');
        }
        .guarantee {
          @include bg-img($baseUrl + 'guarantee_3');
        }
      }
      .menu-count {
        display: inline-block;
        width: 20px;
        height: 12px;
        line-height: 12px;
        text-align: center;
        font-size: 12px;
        border-radius: 4px;
        position: absolute;
        top: 6px;
        right: 8px;
        color: #fff;
        background: linear-gradient(to right, #fc9153, #f01414);
      }
    }
  }
  .detail {
    flex: 1;
    width: 100%;
    // height: 500px;
    overflow: hidden;
    .detail-content {
      .detail-title {
        height: 26px;
        line-height: 26px;
        background: #f3f5f7;
        padding-left: 14px;
        &.border-left::before {
          border-left: 2px solid #d9dde1;
        }
      }
      .detail-item {
        padding: 0 18px;
        .detail-item-content {
          &.border-bottom::before {
            border-bottom: 1px solid rgba(7,17,27,.1);
            // border-bottom: 1px solid red;
          }
          display: flex;
          height: 92px;
          padding-top: 18px;
          // border:1px solid red;
          position: relative;
          .food-img-container {
            width: 57px;
            // margin-left: 18px;
            // border:1px solid red;
            .food-img {
              width: 57px;
              height: 57px;
            }
          }
          .food-info {
            flex: 1;
            margin-left: 10px;
            overflow: hidden;
            margin-top: 4px;
            .food-name{
              font-size: 14px;
              color: rgb(7,17,27);
              line-height: 14px;
            }
            .food-desc{
              margin-top: 8px;
              font-size: 10px;
              color: rgb(147,153,159);
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .say {
              font-size: 0;
              margin-top: 8px;
              .food-order{
                font-size: 10px;
                color: rgb(147,153,159);
              }
              .food-rating{
                margin-left: 12px;
                font-size: 10px;
                color: rgb(147,153,159);
              }
            }
            .price {
              font-size: 0;
              margin-top: 8px;
              display: flex;
              align-items: center;
              position: relative;
              .food-price {
                font-size: 14px;
                color: #f01414;
                font-weight: 700;
                line-height: 24px;
              }
              .food-oldPrice {
                font-size: 10px;
                padding-left: 8px;
                color: rgb(147,153,159);
                line-height: 24px;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
    .detail-content .detail-item:last-child .border-bottom::before{
      border-bottom: none;
    }
  }
}
</style>
