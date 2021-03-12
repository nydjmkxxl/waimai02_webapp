<template>

  <div class="header">

    <!-- 主体区域 -->
    <div class="top-container">

      <!-- 头像 -->
      <div class="avatar">
        <img :src="seller.avatar" class="avatar-img" alt="头像">
      </div>

      <!-- 卖家信息 -->
      <div class="seller-info">
        <p class="title">
          <span class="brand"></span>
          <span class="seller-name">{{seller.name}}</span>
        </p>
        <p class="desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </p>
        <p class="supports" v-if="seller.supports">
            <span class="supports-left">
              <i class="icon"></i>
              <span class="text">{{seller.supports[0].description}}</span>
            </span>
            <span class="supports-right" @click="handleShowLayer()">
              {{seller.supports.length}}个
              <span class="supports-arrow" >&gt;</span>
            </span>
        </p>

        <!-- 活动信息显示层 -->
        <transition name="drop">
          <div class="seller-supports-layer" v-show="showLayer">
            <div class="seller-container clearfix">
              <div class="seller-content">
                <h1 class="h1-name">{{seller.name}}</h1>
                <div class="star-container">
                  <Star :size="48" :score="seller.score" />
                </div>
                <div class="layer-title">
                  <div class="line"></div>
                  <div class="test">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul class="type" v-if="seller.supports">
                  <li class="type-item" v-for="(item, index) of seller.supports" :key="item.type">
                    <i class="icon" :class="classMap[seller.supports[index].type]"></i>
                    <span class="text">{{item.description}}</span>
                  </li>
                </ul>
                <div class="layer-title">
                  <div class="line"></div>
                  <div class="test">商家公告</div>
                  <div class="line"></div>
                </div>
                <div class="about">
                  <span class="about-content">{{seller.bulletin}}</span>
                </div>
              </div>
            </div>
            <div class="seller-layer-close">
              <i class="icon-arrow icon-close" @click="handleHideLayer()"></i>
            </div>
          </div>
        </transition>
      </div>

    </div>

    <!-- 公告 -->
    <div class="bulletin-container">
        <span class="bulletin-left"></span>
        <span class="bulletin-mid">{{seller.bulletin}}</span>
        <span class="bulletin-right">&gt;</span>
    </div>

  </div>

</template>

<script>/* text/ecmascript-6 */
import Star from '../../common/Star'
export default {
  name: 'Header',
  components: {
    Star
  },
  props: {
    seller: Object
  },
  data () {
    return {
      showLayer: false,
      classMap: []
    }
  },
  methods: {
    handleShowLayer () {
      this.showLayer = true
    },
    handleHideLayer () {
      this.showLayer = false
    }
  },
  mounted () {
    // this.bus.$on('triggerHeader', function (name) {
    // console.log('Header组件 bus trigger event')
    // })
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/css/private/private.scss';
@import 'my-assets/css/private/private.scss';

$initurl: '../../assets/img/';
// .header >>> * {
 /deep/ * {
  box-sizing: initial;
}
.header {
  height: 134px;
  position: relative;
  background: rgba(0,0,0,.5);
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(6px);
    z-index: -1;
    background: url('http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg') no-repeat center/cover;
  }
  .top-container {
    width: 100%;
    height: 106px;
    display: flex;
    .avatar {
      width: 88px;
      .avatar-img {
        width: 64px;
        height: 64px;
        margin-top: 24px;
        margin-left: 24px;
      }
    }
    .seller-info {
      flex: 1;
      margin-top: 26px;
      margin-left: 16px;
      .drop-enter,
      .drop-leave-to {
        // opacity: 1;
        transform: translate(0, -100%);
      }
      .drop-enter-active,
      .drop-leave-active {
        transition: all .8s
      }
      .title {
        height: 18px;
        display: flex;// 文字垂直对齐1
        justify-content: left;// 文字垂直对齐1
        align-items: center;// 文字垂直对齐1
        .brand {
          display: inline-block;
          // vertical-align: top;//文字垂直对齐2
          width: 30px;
          height: 100%;
          background-size: 100% 100%;
          @include bg-img($initurl + 'brand');
        }
        .seller-name {
          height: 18px;
          line-height: 18px;
          color: #fff;
          font-size: 15px;
          padding-left: 6px;
        }
      }
      .desc {
        color: #fff;
        font-size: 13px;
        font-weight: 200;
        line-height: 13px;
        padding-top: 8px;
      }
      .supports {
        color: #fff;
        padding-top: 5px;
        font-size: 0;
        position: relative;
        .supports-left {
          .icon{
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: middle;
            @include bg-img($initurl + 'discount_1');/* 倒序，加一个是防止第一站图片有误 */
            @include bg-img($initurl + 'decrease_1');
          }
          .text {
            vertical-align: middle;
            padding-left: 4px;
            font-size: 12px;
          }
        }
        .supports-right {
          position: absolute;
          right: 12px;
          top: 0;
          width: 34px;
          height: 28px;
          background: rgba(0,0,0,.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          padding-left: 8px;
          padding-right: 8px;
          .supports-arrow {
            float: right;
          }
        }
      }
      .seller-supports-layer {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7,17,27,0.8);
        color: #fff;
        .seller-container {
          width: 100%;
          min-height: 100%;
          .seller-content {
            margin-top: 64px;
            padding-bottom: 64px;
            .h1-name {
              line-height: 16px;
              text-align: center;
              font-size: 16px;
              font-weight: 700;
            }
            .star-container {
              margin-top: 18px;
              padding: 2px 0;
              text-align: center;
            }
            .layer-title {
              display: flex;
              align-items: center;
              width: 80%;
              margin: 28px auto 24px auto;
              .line {
                flex: 1;
                border-bottom: 1px solid rgba(255,255,255,.2);
                }
              .test {
                padding: 0 12px;
                font-size: 14px;
                font-weight: 700;
              }
            }
            .about{
              width: 72%;
              margin: 0 auto;
              text-align: justify;
              .about-content {
                font-size: 12px;
                font-weight: 200;
                line-height: 24px;
              }
            }
              // -----------------------------------------------------
            .type {
              width: 77%;
              margin: 0 auto;
              .type-item {
                padding: 0 12px;
                margin-bottom: 12px;
                font-size: 0;
                &:last-child {
                  margin-bottom: 0;
                }
                .icon {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  vertical-align: middle;
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                  &.decrease {
                    @include bg-img($initurl + 'discount_2');/* 倒序，加一个是防止第一站图片有误 */
                  }
                  &.discount {
                    @include bg-img($initurl + 'decrease_2');
                  }
                  &.special {
                    @include bg-img($initurl + 'special_2');
                  }
                  &.invoice {
                    @include bg-img($initurl + 'invoice_2');
                  }
                  &.guarantee {
                    @include bg-img($initurl + 'guarantee_2');
                  }
                }
                .text {
                  // line-height: 16px;
                  vertical-align: middle;
                  padding-left: 6px;
                  font-size: 12px;
                }
              }
            }
          }
        }
        .seller-layer-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
            .icon-arrow {
          }
        }
      }
    }
  }
  .bulletin-container {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 28px;
    background: rgba(7,17,27,0.2);
    display: flex;
    align-items: center;
    // padding-right: 9px;
    // padding-left: 9px;
    justify-content: space-between;
    .bulletin-left {
      width: 32px;
      height: 12px;
      margin-left: 9px;
      @include bg-img($initurl + 'bulletin');
    }
    .bulletin-mid {
      flex: 1;
      padding-left: 4px;
      padding-right: 4px;
      color: #fff;
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bulletin-right {
      width: 12px;
      height: 12px;
      line-height: 12px;
      color: #fff;
      margin-right: 9px;
      text-align: right;
    }
  }
}
</style>
