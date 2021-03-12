<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass, index) in itemClasses" :class="itemClass" :key="index">
    </span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'Star',
  props: {
    size: Number, /* 表示星星的尺寸 */
    score: Number
  },
  data () {
    return {
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      // 先将 score * 2 然后向下取整 然后在除以 2 得到 5的倍数
      const classList = []
      // console.log(this.score)
      const score = Math.floor(this.score * 2) / 2
      // 取模 得知如果不等于 0 那么就有小数位
      const hasPoint = score % 1 !== 0
      // const fullStart = parseInt(score)
      let fullStar = Math.floor(score)

      // if (fullStart) {

      fullStar = fullStar > 5 ? 5 : fullStar
      for (let i = 0; i < fullStar; i++) {
        classList.push(CLS_ON)
      }
      // }

      if (hasPoint && classList.length < 5) {
        classList.push(CLS_HALF)
      }

      while (classList.length < LENGTH) {
        classList.push(CLS_OFF)
      }
      // console.log(classList)
      return classList
      // const res = result === 0.5 ? result : (result < 0.5 ? 0 : 1)
      // const htmlScore = 【整数 score 个】 + 【剩余 res】 3
      // 2.5 * 2 = 5      5  /2   2.5
      // 2.7 * 2 = 5.4    5       2.5
      // 2.9 * 2 = 5.8    5       2.5
      // 3 * 2 = 6        6       3
      // 3.1 * 2 = 6.2    6       3
      // 3.2 * 2 = 6.4    6       3
      // 3.4 * 2 = 6.8    6       3
      // 3.5 * 2 = 7      7       3.5
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/private/private.scss';

$url: '../assets/img/';

.star {
  // font-size: 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      display: inline-block;
      background-repeat: no-repeat;
      &.on {
        @include bg-img($url + 'star48_on')
      }
      &.half {
        @include bg-img($url + 'star48_half')
      }
      &.off {
        @include bg-img($url + 'star48_off')
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.star-36 {
    .star-item {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &.on {
        @include bg-img($url + 'star36_on')
      }
      &.half {
        @include bg-img($url + 'star36_half')
      }
      &.off {
        @include bg-img($url + 'star36_off')
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.star-24 {
    .star-item {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &.on {
        @include bg-img($url + 'star24_on')
      }
      &.half {
        @include bg-img($url + 'star24_half')
      }
      &.off {
        @include bg-img($url + 'star24_off')
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
