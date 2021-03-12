<template>
  <ul class="ratings">
    <li v-if="ratings.length === 0" class="ratings-item border-top">暂无评价</li>
    <li v-show="selfFlag || item.text" class="ratings-item border-top" v-for="(item, index) in ratings" :key="item.rateTime">
    <div class="time-container">
      <span class="time">{{time[index]}}</span>
      <div class="avatar-container">
      <span class="username">{{item.username}}</span>
      <img class="username-img" :src="item.avatar" art="avatar" />
      </div>
    </div>
    <p class="text-container">
      <i v-if="item.rateType===0" class="icon-thumb_up" :class="{'thumb-up': item.rateType===0}"></i>
      <i v-else class="icon-thumb_down"></i>
      <span class="text">{{item.text}}</span>
    </p>
    </li>
</ul>
</template>

<script>
export default {
  name: 'Show-ratings',
  props: {
    ratings: Array,
    flag: Boolean
  },
  data () {
    return {
      isShow: [],
      selfFlag: true
    }
  },
  methods: {},
  computed: {
    time () {
      const time = []
      this.ratings.forEach(rating => {
        let TIME = new Date(rating.rateTime)
        const year = TIME.getFullYear()
        const month = TIME.getMonth() + 1 /* 0-11 */
        const date = TIME.getDate() /* 一个月的某一天 1-31 */
        const hour = TIME.getHours()
        const minutes = TIME.getMinutes()
        TIME = `${year}-${month.toString().padStart(2, 0)}-${date.toString().padStart(2, 0)}
                ${hour.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`
        time.push(TIME)
      })
      return time
    }
  },
  watch: {
    flag () { /* falg => true 表示显示有内容的 */
      this.selfFlag = !this.flag
    }
  }
}
</script>

<style lang="scss" scoped>
.ratings {
  padding: 0 18px;
  & :first-child {
    &::before {
      border-top: none !important;
    }
  }
  .ratings-item {
    padding: 16px 0;
    &.border-top::before {
      border-top: 1px solid #e5e6e7;
    }
    .time-container {
      height: 16px;
      line-height: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: rgb(147,153,159);
      font-size: 10px;
      .time,
      .avatar-container {
        display: inline-block;
      }
      .avatar-container {
        height: 100%;
        .username {
          display: inline-block;
          vertical-align: top;
        }
        .username-img {
          height: 100%;
          border-radius: 50%;
          padding-left: 6px;
        }
      }
    }
    .text-container {
      display: flex;
      align-items: center;
      margin-top: 6px;
      .thumb-up {
        color: #00a0dc;
      }
      .text {
        margin-left: 4px;
      }
    }
  }
}
</style>
