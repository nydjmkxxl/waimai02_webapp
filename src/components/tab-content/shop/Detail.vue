<template>
  <div class="food-detail" ref="foodDetail">
     <div class="food-detail-content">
        <i class="icon icon-arrow_lift" @click="handleArrow"></i>
        <!-- <transition name="fade"> -->
          <div class="food-img-container"> <!-- v-show="!preventClick"  -->
            <img  class="food-img" :src="detailFood.image" alt="food">
          </div>
        <!-- </transition> -->
        <div class="top">
          <div class="top-content">
            <h2 class="food-name">{{detailFood.name}}</h2>
            <p class="food-sell-container">
              <span class="seller">月售{{detailFood.sellCount}}份</span>
              <span class="rating" >好评率{{detailFood.rating}}%</span>
            </p>
            <div class="price">
              <span class="newPrice">￥{{detailFood.price}}</span>
              <span class="oldPrice">{{detailFood.oldPrice}}</span>
              <div class="del-add-container">
                <div v-show="detailFood.count>0">
                  <!-- 监听Count组件数量增加事件 -->
                  <Count ref="count" @count-emit="countEmit" :food="detailFood"/>
                </div>
                <span class="add-cart" v-show="!detailFood.count" @click="handleAddCart">加入购物车</span>
              </div>
            </div>
          </div>
        </div>
        <div class="dividing border-topbottom"></div>
        <div class="introduce">
        <!-- <div class="introduce-content"> -->
          <h2 class="introduce-title">商品介绍</h2>
          <p class="introduce-info" v-show="!detailFood.description">商家很懒，没有写什么</p>
          <p class="introduce-info" v-show="detailFood.description">{{detailFood.description}}</p>
        <!-- </div> -->
        </div>
        <Category @change-ratings="changeRatings" @refreshPage="refreshPage" @changeFlag="changeFlag" :detailFood="selfDetailFood"/>
        <ShowRatings :flag="flag" :ratings="ratings"/>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Count from '../../../common/Count'
import ShowRatings from './Show-ratings'
import Category from '../../../common/Category'
export default {
  name: 'Detail',
  data () {
    return {
      isShow: [],
      ratings: [],
      flag: false,
      selfDetailFood: {}
    }
  },
  components: {
    Count,
    ShowRatings,
    Category
  },
  props: {
    detailFood: Object
  },
  mounted () {
    // this.detailFood.ratings
    console.log(this)
    this.$nextTick(() => {
      this.detailScroll = new BScroll(this.$refs.foodDetail, {
        click: true
      })
    })
  },
  created () {
  },
  computed: {
  },
  methods: {
    changeRatings (ratings) {
      this.ratings = ratings
    },
    changeFlag (bool) {
      console.log(bool)
      this.flag = bool
    },
    // 更改count值
    countEmit (el) {
      this.$emit('detail-emit', el)
    },
    // count值为1
    handleAddCart () {
      this.$set(this.detailFood, 'count', 1)
      // this.$store.commit('changeSelectData', this.detailFood)
    },
    // 给shop组件触发关闭页面标识
    handleArrow () {
      this.$emit('DetailEmitShop')
      this.flag = false
    },
    refreshPage () {
      this.$nextTick(() => {
        this.detailScroll.refresh()
      })
    }
  },
  watch: {
    detailFood () {
      this.detailFood.$tit = {
        o: '全部',
        t: '推荐',
        th: '吐槽',
        show: true
      }
      this.selfDetailFood = this.detailFood
      // 该操作会引起点击事件的成倍增加
      /* this.$nextTick(() => {
        this.detailScroll = new BScroll(this.$refs.foodDetail, {
          click: true
        })
      }) */
    }
  }
}
</script>

<style lang="scss" scoped>
.food-detail {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  max-width: 100%;
  .food-detail-content {
    position: relative;
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      padding: 10px;
      color: #fff;
      font-size: 20px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
    }
    .food-img-container {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      .food-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    /* .fade-enter,
    .fade-leave-to {
      opacity: 1;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: all .8s
    } */
    .top {
      width: 100%;
      height: 109px;
      .top-content {
        padding: 18px 18px 0;
        .food-sell-container {
          margin-top: 8px;
          font-size: 0px;
          color: rgb(147,153,159)
          line-height：10px;
          .seller {
            font-size: 10px;
          }
          .rating {
            font-size: 10px;
            margin-left: 12px;
          }
        }
        .price {
          padding: 18px 0;
          font-size: 0;
          font-weight: 700;
          line-height: 24px;
          position: relative;
          .newPrice {
            color: rgb(240,20,20);
            font-size: 14px;
          }
          .oldPrice {
            text-decoration: line-through;
            color: rgb(147,153,159);
            font-size: 10px;
            margin-left: 12px;
          }
          .del-add-container {
            width: 74px;
            height: 24px;
            font-size: 10px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            .add-cart {
              display: inline-block;
              width: 100%;
              height: 100%;
              color: #fff;
              // padding: 6px 12px;
              line-height: 24px;
              text-align: center;
              vertical-align: middle;
              border-radius: 12px;
              background: rgb(0,160,220);
            }
          }
        }
      }
      .food-name {
        font-weight: 700;
        font-size: 14px;
        line-height: 14px;
        color: #07111b;
      }
    }
    .dividing {
      width: 100%;
      height: 16px;
      background: #f3f5f7;
      &.border-topbottom::before {
        border-top: 1px solid rgba(7,17,27,.1)
      }
      &.border-topbottom::after {
        border-bottom: 1px solid rgba(7,17,27,.1)
      }
    }
    .introduce {
      padding: 18px 18px 0;
      min-height: 125px;
      // .introduce-content {
      .introduce-title {
        // width: 100%;
      }
      .introduce-info {
        padding: 8px;
        text-align: justify;
        font-size: 12px;
        font-weight: 200;
        color: rgb(77,85,93);
        line-height: 24px;
      }
    }
  }
}
</style>
