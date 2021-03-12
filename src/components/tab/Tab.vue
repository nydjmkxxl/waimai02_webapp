<template>
  <div>
      <div class="tab"><!--  border-bottom -->

        <!-- shop -->
        <router-link
          @hover="handleMoveover($event)"
          class="point"
          ref="shop"
          :class="[classList.shop]"
          to="/"
        >
          商品
        </router-link>

        <!-- rating -->
        <router-link
          @hover="handleMoveover($event)"
          class="point"
          ref="rating"
          :class="[classList.rating]"
          to="/rating"
        >
          评论
        </router-link>

        <!-- seller -->
        <router-link
          @hover="handleMoveover($event)"
          class="point"
          ref="seller"
          :class="[classList.seller]"
          to="/seller"
        >
          商家
        </router-link>
        <span ref="redLine" class="move-line"></span>
    </div>
  </div>
</template>

<script>
// @click.native="move('shop', $event)"
// @click.native="move('rating', $event)"
// @click.native="move('seller', $event)"
export default {
  name: 'Tab',
  data () {
    return {
      classList: {
        shop: '',
        rating: '',
        seller: ''
      },
      AddWindowEvent: false,
      isSame: ''
    }
  },
  methods: {
    handleMoveover (e) {
      alert(1)
    },
    // 滑动条移动
    move (name) {
      // 防止出错
      if (this.isSame === name) return
      this.isSame = name
      if (!this.$refs[name]) return
      const elem = this.$refs[name].$el
      const left = elem.offsetLeft
      const target = this.DomRedLine.style
      target.left = left + 'px'
      target.width = elem.offsetWidth + 'px'
    }
  },
  computed: {
    // 缓存滑动条的DOM元素
    DomRedLine () {
      return (
        this.$refs.redLine
      )
    }
  },
  mounted () {
    const _this = this
    // 获取当先显示的内容名字 shop seller rating
    // 先看看缓存中是否存储当前显示的元素
    if (localStorage.curShow) {
      this.classList[localStorage.curShow] = 'cur'
    } else {
      this.classList.shop = 'cur'
    }

    // 接受来将当前显示的内容名字存储在 localStorage.curShow
    // 并给当前显示 【导航】 加上 cur 类名显示字体颜色
    this.bus.$on('app-emit-tab', function (name) {
      // 将所有导航的样式去除
      for (let prop in _this.classList) {
        _this.classList[prop] = ''
      }
      // 显示当前选项
      _this.classList[name] = 'cur'
      _this.move(name)
      // 更新本地选项的缓存
      localStorage.curShow = name
      this.AddWindowEvent = true
      // 滚动条动态跟随当前选中元素
      window.addEventListener('resize', () => {
        _this.move(name)
      })
    })
  },
  destroy () {
    // window.addEventListener('resize', this.move)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'my-assets/css/private/private.scss';

  .tab {
    position: relative;
    display: flex;
    justify-content: space-around;// 1
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #e5e5e5;
    .cur {
      color: #f01414;
    }
    // .point {
    //   position: relative;
    // }
    // .point:after {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   transform: scaleX(0);
    //   height: 2px;
    //   background: #f01414;
    //   transition: all .3s;
    // }
    // .point:hover.point:after {
    //   transform: scaleX(1);
    // }
    .move-line {
      transition: all .3s;
      position: absolute;
      bottom: -2px;
      background-color:#f01414;
      height: 2px;
      border-radius: 2px/1px;
      // overflow: hidden;
    }
  }
  .border-bottom::before {
    // border-bottom: 1px solid #e5e5e5;
  }
</style>
