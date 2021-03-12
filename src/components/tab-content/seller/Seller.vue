<template>
  <div class="seller-wrapper">
    <div class="seller" ref="Seller">
      <div class="seller-content">
        <div class="seller-name">
          <h2>{{seller.name}}</h2>
          <div class="seller-star">
            <Star :size="36" :score="seller.score"/>
          </div>
        </div>
        <div class="seller-send border-top">
          <div class="min-price border-right">
            <p class="title">起送价</p>
            <p class="money">{{seller.minPrice}}<span class="title">元</span></p>
          </div>
          <div class="delivery-price border-right">
            <p class="send-title">商家配送</p>
            <p class="money">{{seller.deliveryPrice}}<span class="title">元</span></p>
          </div>
          <div class="delivery-time">
            <p class="send-title">平均配送时间</p>
            <p class="money">{{seller.deliveryTime}}<span class="title">元</span></p>
          </div>
        </div>
        <div class="dividing border-topbottom"></div>
        <div class="bulletin">
          <h3 class="bulletin-title">公告与活动</h3>
          <p class="bulletin-text">{{seller.bulletin}}</p>
        </div>
        <ul class="seller-tag">
          <li class="tag-item border-top" v-for="(item, index) in seller.supports" :key="index">
            <i class="tag-icon" :class="iconClassList[item.type]"></i>
            <span class="tag-text">{{item.description}}</span>
          </li>
        </ul>
        <div class="dividing border-topbottom"></div>
        <div class="seller-img"><!-- ref="swiper" -->
          <h2 class="bulletin-title">商家实景</h2>
          <swiper ref="mySwiper" :options="swiperOptions" @click.stop>
            <swiper-slide class="img-item swiper-slide" v-for="(item, index) of seller.pics" :key="index">
              <img class="pic" :src="item" alt="pic">
            </swiper-slide>
          </swiper>
        </div>
        <div class="dividing border-topbottom"></div>
        <ul class="seller-infos"><!-- ref="swiper" -->
          <h2 class="info-title">商家信息</h2>
          <li class="info-item border-top" v-for="(item, index) in seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
    <Cart @scrollCanMove="scrollCanMove" @scrollNotMove="scrollNotMove" :selectedFoods="selfData" :deliveryPrice="deliveryPrice" :minPrice="minPrice" />
  </div>
</template>

<script>
// import 'swiper/dist/js/swiper.js'
import BScroll from 'better-scroll'
import Star from '../../../common/Star'
import Cart from '../shop/Cart'
export default {
  name: 'Seller',
  data () {
    return {
      seller: {},
      deliveryPrice: 0,
      minPrice: 0,
      iconClassList: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: false
      }
    }
  },
  props: {
    Seller: Object
  },
  components: {
    Star,
    Cart
  },
  methods: {
    scrollNotMove () {
      this.sellerScroll.enabled = false
      // console.log(this)
    },
    scrollCanMove () {
      this.sellerScroll.enabled = true
    }
  },
  created () {
    this.seller = this.Seller
    this.deliveryPrice = this.seller.deliveryPrice
    this.minPrice = this.seller.minPrice
    // console.log(this.seller)
  },
  mounted () {
    this.sellerScroll = new BScroll(this.$refs.Seller, {
      click: true
    })
    // this.$nextTick(() => {
    // this.sellerScroll.refresh()
    // })
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    // console.log(this)
  },
  computed: {
    selfData () {
      return this.$store.state.selectFoods
    }
    // swiper () {
    // return this.$refs.mySwiper.$swiper
    // }
  },
  destroy () {
    console.log('des')
  }
}
</script>

<style lang="scss" scoped>
@import 'my-assets/css/flex-img.scss';
@import 'swiper/dist/css/swiper.min.css';
$baseUrl: '../../../assets/img/';
.seller-wrapper >>> .seller-count {
  width: 31px !important;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.8);
  }
  .swiper-slide-active,
  .swiper-slide-duplicate-active{
    transform: scale(1);
}
.seller {
  position: fixed;
  top: 173px;
  left: 0;
  right: 0;
  bottom: 48px;
  overflow: hidden;
  .seller-name {
    font-size: 14px;
    color: rbg(7,17,27);
    line-height: 14px;
    padding: 18px;
    .seller-star {
      margin-top: 8px;
    }
  }
  .seller-send {
    height: 75px;
    padding: 18px 0;
    margin: 0 18px;
    display: flex;
    .title {
      font-size: 10px;
      color: rgb(147,153,159);
      line-height: 10px;
    }
    .money {
      font-size: 24px;
      font-weight: 200;
      color: rgb(7,17,27);
      line-height: 24px;
      margin-top: 4px;
    }
    &.border-top::before {
      border-color:rgba(7,17,27,.1);
    }
    .min-price,
    .delivery-price,
    .delivery-time {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .min-price,
    .delivery-price {
      &.border-right::before {
        border-right: 1px solid rgba(7,17,27,.1);
      }
    }
    .min-price {
      flex: 1;
    }
    @media (max-width: 373px) {
      .delivery-price {
        width: 89px !important;
      }
    }
    .delivery-price {
      width: 124px;
    }
    .delivery-time {
      flex: 1;
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
  .bulletin {
    padding: 18px 18px 16px;
    .bulletin-title {
      font-size: 14px;
      font-weight: 400;
      color: #07111b;
      margin-bottom: 12px;
    }
    .bulletin-text {
      font-size: 12px;
      font-weight: 200;
      color: rgb(240,20,20);
      line-height: 24px;
      padding: 8px 12px 0;
    }
  }
  .seller-tag {
    padding: 0 18px;
    /* .tag-item:first-child.border-top::before {
      border-top: none;
    } */
    .tag-item {
      font-size: 12px;
      font-weight: 200;
      color: rgb(7,17,27);
      margin: 0 12px;
      padding: 16px 0;
      line-height: 16px;
      &.border-top::before {
        border-color: rgba(7,17,27,.1);
      }
      .tag-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
      .tag-text {
        vertical-align: middle;
        display: inline-block;
        margin-left: 6px;
        font-size: 12px;
        font-weight: 200;
        color: (7,17,27);
        line-height: 12px;
      }
      .decrease {
        @include bg-img($baseUrl + 'decrease_3')
      }
      .discount {
        @include bg-img($baseUrl + 'discount_3')
      }
      .guarantee {
        @include bg-img($baseUrl + 'guarantee_3')
      }
      .invoice {
        @include bg-img($baseUrl + 'invoice_3')
      }
      .special {
        @include bg-img($baseUrl + 'special_3')
      }
    }
  }
  .seller-img {
    padding: 18px 0 18px 18px;
    .img-item {
      /* width: 120px;
      height: 90px; */
      margin-left: 6px;
      .pic {
        width: 120px;
        height: 90px;
      }
    }
  }
  .seller-infos {
    padding: 18px 18px 0;
    .info-title {
      margin-bottom: 12px;
    }
    .info-item {
      padding: 16px 12px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(7,17,27);
      line-height: 16px;
      &.border-top::before {
        border-color:rgba(7,17,27,.1);
      }
    }
  }
}
</style>
