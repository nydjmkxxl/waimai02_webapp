<template>
  <!-- 删除添加数量 -->
  <div class="del-add">
    <!-- 滚动 -->
    <transition name="roll">
      <div class="roll" v-show="food.count>0">
        <transition name="rotate">
          <!-- 旋转 -->
          <span v-show="food.count>0" class="del icon-remove_circle_outline" @click="delCount"></span>
        </transition>
        <span class="count" >{{food.count}}</span>
      </div>
    </transition>
    <!-- 加数量操作 -->
    <span class="add icon-add_circle" @click="addCount"></span>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: 'Count',
  data () {
    return {
    }
  },
  props: {
    food: Object
  },
  mounted () {
  },
  methods: {
    delCount (e) {
      if (this.food.count > 0) {
        this.food.count--
        // console.log('相减')
        // 当时为了当执行减少操作时，都要给购物车触发一个事件来检测totalCount有没有为 0，然后隐藏购物车列表
        // 现在用 组件的侦测器开观察totalCount的值，当符合条件来做自己的事情
        // if (!this.food.count) {
        // this.$emit('count-emit')
        // }
      }
    },
    addCount (e) {
      if (!this.food.count) {
        // 这样设置，vue也会监视count的变化
        this.$set(this.food, 'count', 1)
      } else {
        // console.log(e)
        // console.log(e.target, '===========================')
        console.log('相加')
        this.food.count++
        this.$emit('count-emit', e.target)
        // 在执行加操作时，向使用该组件的父组件emit一个count-emit事件，将事件对象传入
      }
      e.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/private/private.scss';
$baseUrlSvg: '../assets/svg/';

.del-add {
  width: 70px;
  height: 23px;
  font-size: 0;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -11px;
  // transform: translateY(50%);

  .roll-enter,
  .roll-leave-to {
    transform: translateX(68px);
    opacity: 0;
  }
  .roll-enter-active,
  .roll-leave-active {
    transition: all .5s;
  }
  .roll{
    font-size: 0;
    width: 50px;
    height: 23px;
    display: flex;
    .rotate-enter,
    .rotate-leave-to {
      transform: rotate(180deg);
    }
    .rotate-enter-active,
    .rotate-leave-active {
      transition: all .5s;
    }
    .del {
      display: inline-block;
      width: 20px;
      height: 23px;
      font-size: 23px;
      &.icon-remove_circle_outline {
        &::before {
          color: #449FDB;
        }
      }
    }
    .count {
      display: inline-block;
      flex: 1;
      height: 23px;
      line-height: 23px;
      text-align: center;
      font-size: 13px;
    }
  }
  .add{
    display: inline-block;
    background: #fff;
    position: relative;
    &.icon-add_circle {
      display: inline-block;
      width: 20px;
      height: 23px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 23px;
      &::before {
        color: #449FDB;
      }
    }
  }
}
</style>
