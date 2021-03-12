<template>
  <ul class="ratings">
    <li v-show="flag || item.text" class="ratings-item border-top"  v-for="(item, index) in ratings" :key="index">
      <img class="avatar" :src="item.avatar" alt="头像">
      <div class="info">
        <p class="name">
          <span>{{item.username}}</span>
          <span>{{time[index]}}</span>
        </p>
        <div class="star-time">
          <Star :size="size" :score="score[index]"/>
          <span class="delivery-time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
        </div>
        <p class="text">{{item.text}}</p>
        <div class="tag">
          <i v-if="item.rateType===0" class="color-blue icon-thumb_up"></i>
          <i v-else class="icon-thumb_down"></i>
          <span class="recommend" v-for="(recommend, index) in item.recommend" :key="index">
            {{recommend}}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Star from '../../../common/Star'
export default {
  name: 'Ratings',
  data () {
    return {
      selfFlag: true,
      size: 36
    }
  },
  components: {
    Star
  },
  props: {
    ratings: Array,
    flag: Boolean
  },
  computed: {
    time () {
      let time = []
      this.ratings.forEach(item => {
        let t = null
        const D = new Date(item.rateTime)
        const year = D.getFullYear()
        const month = D.getMonth() + 1
        const date = D.getDate()
        const hour = D.getHours()
        const minutes = D.getMinutes()
        t = `${year}-${month.toString().padStart(2, 0)}-${date.toString().padStart(2, 0)}
            ${hour.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`
        time.push(t)
      })
      return time
    },
    score () {
      let score = []
      this.ratings.forEach(item => {
        score.push(item.score)
      })
      return score
    }
  }
}
</script>

<style lang="scss" scoped>
.ratings {
  & :first-child {
    &::before {
      border-top: none !important;
    }
  }
  .ratings-item {
    margin: 0 18px;
    padding: 18px 0;
    display: flex;
    &.border-top::before {
      border-top: 1px solid #e5e6e7;
    }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      margin-left: 12px;
      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .star-time {
        display: flex;
        margin-top: 4px;
        .delivery-time {
          margin-left: 6px;
        }
      }
      .text {
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 14px;
        margin-top: 8px;
      }
      .tag {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 8px;
        .color-blue {
          font-size: 12px;
          color:rgb(0,160,220);
          line-height: 16px;
        }
        .recommend {
          display: inline-block;
          font-size: 9px;
          color: rgb(147,153,159);
          line-height: 16px;
          border: 1px solid rgba(7,17,27,.1);
          border-radius: 2px;
          background: #fff;
          padding: 0 6px;
          margin-left: 6px;
          margin-top: 2px;
        }
      }
    }

  }
}
</style>
