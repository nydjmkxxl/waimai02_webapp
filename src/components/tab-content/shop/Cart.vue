<template>
  <!-- 购物车 -->
  <div class="cart">
    <!-- 内容 -->
    <div class="cart-content">
      <!-- 内容左侧 - logo 配送费-->
      <div class="content-left">
        <div class="logo" @click="handleLogo">
          <div class="logo-content" :class="{'icon-font':Boolean(totalCount)}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-show="totalCount" class="total-count seller-count">{{totalCount}}</div>
        </div>
        <div class="price ellipsis">
          ￥<span class="computed-price" :class="{'total-price-color':Boolean(totalCount)}">{{totalPrice}}</span>
          </div>
        <div class="fee ellipsis">另需配送费￥
          <span class="computed-fee">{{deliveryPrice}}</span>
          </div>
      </div>
      <!-- 内容右侧 - 结算-->
      <div class="content-right ellipsis" :class="{pay: diff.val === 'pay'}">
        <span v-show="diff.val === 'qiSong' ">{{minPrice}}元起送</span>
        <span v-show="diff.val === 'haiCha' ">还差{{diff.diff}}起送</span>
        <!-- @click="handlePay"  -->
        <div  v-show="diff.val === 'pay'" @click="confirm" class="over-pay">去结算
        </div>
      </div>
    </div>
    <!-- 小球 -->
    <div class="ball">
      <div v-for="(ball, index) of balls" v-show="ball.show" :key="index.id">
        <transition
          name="drop"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="ball-container" v-show="ball.show">
            <div class="ball-content ball-content-hook"></div><!-- 用JS选择的类名都加 hook 并没有真实的意义 -->
          </div>
        </transition>
      </div>
    </div>
    <!-- 购物车展开 -->
    <transition name="rise">
      <div class="cart-list" v-show="showCartShop">
        <div class="cart-list-content">
          <!-- 顶部内容 -->
          <div class="list-header border-bottom">
            <!-- 左侧 -->
            <h1 class="title">购物车</h1>
            <!-- 右侧 -->
            <template >
              <Button class="empty" @click="handleGoPay">清空</Button>
            </template>
          </div>
          <!-- 列表部分 -->
          <div class="list-content" ref="listContent" @click="handleListContent" @touchmove="handleListContent">
            <ul class="food-item-container">
              <!-- 商品列表每项 -->
              <li class="food-item border-bottom" v-for="(food, index) of selectedFoods" :key="index">
                <div class="shop-info">
                  <span class="name">{{food.name}}</span>
                  <span class="price-content">￥{{food.price*food.count}}</span>
                </div>
                <!-- 在使用这个组件，每次都会刷新 shop 里面的 Count 组件，导致组件都不能使用，解决- if(!this.food.count) {//把值置为1} -->
                <Count @count-emit="countEmit" :food="food" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <!-- 遮罩层 -->
    <transition name="fade">
      <div class="cart-list-layer" v-show="showCartShop" @click="handleLayer" @touchmove="handleTouchMove"></div>
    </transition>
    <!-- 支付提交页面 -->
    <div class="go-pay" v-show="pay">
      <!-- <span>需要支付{{totalPrice}}</span> -->
      <!-- <div class="say"> -->
        <!-- say -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Count from '../../../common/Count'
const ballContentHook = 'ball-content-hook'
export default {
  name: 'Cart',
  components: {
    Count
  },
  data () {
    return {
      // 5个小球 都未显示
      balls: [{
        show: false,
        id: 0
      }, {
        show: false,
        id: 1
      }, {
        show: false,
        id: 2
      }, {
        show: false,
        id: 3
      }, {
        show: false,
        id: 4
      }],
      // 运动到底了的小球
      downBalls: [],
      // 购物车显示商品列表页面
      showCartShop: false,
      // 显示结算页面
      pay: false
    }
  },
  props: {
    // 选择的商品列表
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    },
    // 配送费
    deliveryPrice: {
      type: Number,
      default () {
        return 0
      }
    },
    // 最低起送费
    minPrice: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  mounted () {
    // 挂载完成创建cartScroll对象
    this.cartScroll = new BScroll(this.$refs.listContent, {
      click: true
    })
  },
  methods: {
    handleListContent (e) {
      // e.stopPropagation()
      // console.log('======')
    },
    confirm () {
      this.$Modal.confirm({
        // title: 'Title',
        content: '<p>确认支付' + this.totalPrice + '元</p>',
        onOk: () => {
          this.$Message.info('即将进入支付页面')
        },
        onCancel: () => {
          this.$Message.info('取消支付成功')
        }
      })
    },
    handleGoPay () {
      this.$Modal.confirm({
        // title: 'Title',
        content: '<p>确定清空购物车吗？</p>',
        onOk: () => {
          this.selectedFoods.forEach(food => {
            food.count = 0
          })
          this.$Message.info('清空成功')
          this.$emit('scrollCanMove')
        },
        onCancel: () => {
          this.$Message.info('取消清空成功')
        }
      })
    },
    /* async () {
      this.$Modal.confirm({
        // title: 'Title',
        content: '<p>The dialog box will be closed after 2 seconds</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove()
            this.$Message.info('Asynchronously close the dialog box')
          }, 2000)
        }
      })
    }, */
    // 去结算
    handlePay () {
      // this.pay = true
    },
    // 隐藏购物车产品列表
    handleLayer () {
      this.showCartShop = false
      this.$emit('scrollCanMove')
    },
    handleTouchMove (e) {
      // e.stopPropagation()
    },
    // 点击清空按钮事件
    /* handleEmpty () {
      this.selectedFoods.forEach(food => {
        food.count = 0
      })
    }, */
    // 进制地页面滚动
    handleNotTouch (e) {
    },
    // 显示购物车列表页面
    handleLogo () {
      if (this.totalCount) this.showCartShop = !this.showCartShop
      this.$nextTick(() => {
        this.cartScroll.refresh()
      })
      // console.log(this)
      if (this.showCartShop) {
        this.$emit('scrollNotMove')
      } else {
        this.$emit('scrollCanMove')
      }
      // this.cartScroll.enabled = true
    },
    // 接受子组件count的countEmit事件，然后执行自己的方法【这个事件是由 加 操作出发的，并携带自己的dom元素】
    countEmit (el) {
      // ----- LOOK 【Count.vue】 L36
      // if (!this.totalCount) {
      // this.showCartShop = false
      // }
      console.log('Cart')
      this.$nextTick(() => { /* $nextTick是异步方法，是等到dom更新完成了，才执行本方法， 动画优化 - 让每次DOM渲染成功后在执行小球运动 */
        this.ballOverdrop(el)
      })
    },
    ballOverdrop (el) { /* 遍历小球集合， 取出小球，如果小球的show值为false，那么就把他设置成true，因为要让他显示了 */
    /* 将 加 操作的dom元素放入ball中，然后让放入下降小球队列，然后return 触发一次执行一次 */
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.downBalls.push(ball)
          return
        }
      }
    },
    // 进入之前的预备动作
    beforeEnter (el) { /* 这里的el是transition的内部父元素 */
      let count = this.balls.length
      // 遍历每个小球，判断小球show为true的拿来用，
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          // el ball-container 元素执行y值操作
          el.style.display = ''
          el.style.webkitTransform = `translate3D(0, ${y}px, 0`
          el.style.transform = `translate3D(0, ${y}px, 0`
          let ballContent = el.getElementsByClassName(ballContentHook)[0]
          // 在选择内部元素 ball-content来执行x值操作
          ballContent.style.webkitTransform = `translate3D(${x}px, 0, 0`
          ballContent.style.transform = `translate3D(${x}px, 0, 0`
          // 此外还要加上 贝塞尔曲线的 transition all .5s linear
        }
      }
    },
    // 进入过程中-抛物线运动
    enter (el) {
      /* eslint-disable no-unused-vars */ /* 然eslint不检测下面的rf */
      let refresh = el.offsetHeight /* 主动触发浏览器重绘，如果不加这个会导致，开始没有小球动画 */
      this.$nextTick(() => {
        // 都回到底位置
        el.style.webkitTransform = 'translate3D(0, 0, 0)'
        el.style.transform = 'translate3D(0, 0, 0)'
        let ballContent = el.getElementsByClassName(ballContentHook)[0]
        ballContent.style.webkitTransform = 'translate3D(0, 0, 0)'
        ballContent.style.transform = 'translate3D(0, 0, 0)'
      })
    },
    // 结束进入
    afterEnter (el) {
      // 将从数组中截取出来然后赋值隐藏
      // 回归初始化
      let ball = this.downBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  watch: {
    totalCount () {
      // 仅当没有数量就要隐藏
      if (!this.totalCount) this.showCartShop = false
      this.$nextTick(() => {
        // 刷新计算高度代码
        this.cartScroll.refresh()
      })
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      console.log('开始')
      let count = 0
      this.selectedFoods.forEach(food => {
        count += food.count
      })
      console.log('触发')
      this.$store.commit('changeSelectData', this.selectedFoods)
      console.log(count)
      return count
    },
    diff () { /* 计算出差值，然后判断当前要显示的内容 */
      let diff = this.minPrice - this.totalPrice
      if (this.totalPrice === 0) {
        return {val: 'qiSong'}
      } else if (diff > 0) {
        return {
          val: 'haiCha', diff}
      } else {
        return {val: 'pay'}
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.cart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  height: 48px;
  width: 100%;
  .rise-enter,
  .rise-leave-to {
    transform: translateY(100%);
    // opacity: 0;
  }
  .rise-enter-active,
  .rise-leave-active {
    transition: all .4s
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .4s;
  }
  .cart-list-layer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    // filter: blur(30px);
    backdrop-filter: blur(10px);
    background: rgba(7,17,47,.7);
  }
  .go-pay {
    width: 70%;
    height: 25%;
    text-align: center;
    border-radius: 20px;
    font-size: 20px;
    color: #fff;
    background: rgb(76, 76, 77);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .cart-content {
    position: relative;
    z-index: 20;
    display: flex;
    background: #141d27;
    font-size: 0;
    .content-left {
      flex: 1;
      // border: 1px solid red;
      height: 48px;
      .logo {
        display: inline-block;
        position: relative;
        top: -10px;
        z-index: 10;
        margin: 0 12px;
        padding: 6px;
        box-sizing: border-box;
        background: #141d27;
        width: 56px;
        height: 56px;
        vertical-align: top;
        border-radius: 50%;
        .logo-content {
          width: 100%;
          height: 100%;
          background: #2a333b;
          border-radius: 50%;
          text-align: center;
        }
        .logo-content.icon-font {
          background: #00a0dc;
        }
        .total-count {
          color: #fff;
          width: 19px;
          height: 16px;
          padding: 0 6px;
          // font-weight: 600;
          border-radius: 8px/8px;
          line-height: 16px;
          text-align: center;
          background: linear-gradient(to right, #fc9153, #f01414);
          position: absolute;
          top: 1px;
          right: -6px;
          z-index: 88;
          font-size: 12px;
        }
        .icon-shopping_cart {
          font-size: 24px !important;
          line-height: 44px;
        }
        .logo .icon-shopping_cart:before {
            color: #80858a
          }
        .icon-font .icon-shopping_cart:before {
            color: #fff;
        }
      }
      .price {
        display: inline-block;
        width: 55px;
        height: 24px;
        // vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        border-right: 1px solid rgba(255,255,255,.1);
        color: rgba(255,255,255,.4);
        font-size: 12px;
        font-weight: 700;
        box-sizing: border-box;
        .total-price-color {
          color: #fff;
        }
      }
      .fee {
        display: inline-block;
        color: rgba(255,255,255,.4);
        width: 130px;
        height: 24px;
        font-size: 12px;
        line-height: 24px;
        margin-left: 12px;
        // vertical-align: middle;
        .computed-fee {
        }
      }

    }
    .content-right {
      flex: 0 0 70px;
      width: 70px;
      // padding: 0 5px;
      font-size: 12px;
      font-weight: 800;
      color: rgba(255,255,255,.4);
      background: #2a333b;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
    .pay {
      background: green;
      color: #fff;
      font-size: 16px;
      &.over-pay {
        font-weight: normal;
        font-size: 16px;
      }
      & >>> * {
        border: none;
      }
    }
  }
  .ball {
    .drop-enter,
    .drop-leave-to {
    }
    .drop-enter-active,
    .drop-leave-active {
      transition: all .4s cubic-bezier(.55,-0.35,.79,.43);/* 贝塞尔曲线 */
    }
    .ball-container {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      .ball-content {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0,160,220);
        transition: all .4s linear;
      }
    }
  }
  .cart-list {
    width: 100%;
    position: absolute;
    bottom: 48px;
    left: 0;
    z-index: 0;
    background: #fff;
    // .cart-list-layer {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   background: red;
    // }
    .cart-list-content {
      width: 100%;
      .list-header {
        display: flex;
        height: 40px;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        padding: 0 28px;
        background: #f3f5f7;
        &.border-bottom::before {
          border-bottom: 1px solid #dbdee1;
        }
        .empty {
          color: rgb(0,160,220)
        }
      }
      .list-content {
        max-height: 218px;
        overflow: hidden;
        .food-item-container {
          padding: 0 28px;
          .food-item {
            height: 48px;
            padding-right: 82px;
            position: relative;
            &.border-bottom::before {
              border-bottom: 1px solid #dbdee1;
            }
            .shop-info {
              display: flex;
              width: 100%;
              height: 100%;
              justify-content: space-between;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
