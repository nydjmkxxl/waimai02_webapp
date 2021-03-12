<template>
  <div class="rating-container" ref="rating">
    <div class="rating">
      <div class="score-container">
        <div class="score-left border-right">
          <p class="score">{{seller.score}}</p>
          <p class="text">综合评分</p>
          <p class="over">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="score-right">
          <div class="service-score">
            <span class="self-text">服务得分</span>
            <div class="self-star">
              <Star :size="size" :score="seller.serviceScore" />
            </div>
            <span class="self-service-score">{{seller.serviceScore}}</span>
          </div>
          <div class="food-score">
            <span class="self-text">食品得分</span>
            <div class="self-star">
              <Star :size="size" :score="seller.foodScore" />
            </div>
            <span class="self-food-score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="self-text">送达时间</span>
            <span class="self-time">{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
      <Category  @change-ratings="changeRatings" @refreshPage="refreshPage" @changeFlag="changeFlag" :detailFood="selfDetailFood"/>
      <Ratings :ratings="ratingsTypeData" :flag="flag"/>
    </div>
  </div>
</template>

<script>
import BSroll from 'better-scroll'
import Star from '../../../common/Star'
import Category from '../../../common/Category'
import Ratings from './Ratings'
export default {
  name: 'Rating',
  components: {
    Star,
    Category,
    Ratings
  },
  data () {
    return {
      ratings: [],
      seller: {},
      size: 36,
      selfDetailFood: {},
      ratingsTypeData: [] /* 表示返回不同类型的评价数组 */,
      flag: true
    }
  },
  props: {
    Seller: Object,
    Rating: Array
  },
  created () {
    console.log(this)
    this.ratings = this.Rating
    this.seller = this.Seller
    this.ratingsTypeData = this.ratings
    this.selfDetailFood.$tit = {
      o: '全部',
      t: '满意',
      th: '不满意',
      show: false
    }
    console.log(this)
    this.selfDetailFood.ratings = this.ratings
    console.log(this.selfDetailFood)
  },
  mounted () {
    console.log(this.flag, '1 Rating     初始')
    this.ratingScroll = new BSroll(this.$refs.rating, {
      click: true
    })
    this.$nextTick(() => {
      console.log(this)
      this.ratingScroll.refresh()
    })
  },
  methods: {
    changeRatings (ratings) {
      this.ratingsTypeData = ratings
    },
    changeFlag (bool) {
      this.flag = !bool
    },
    refreshPage () {
      this.$nextTick(() => {
        console.log(this)
        this.ratingScroll.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rating-container {
  position: fixed;
  top: 174px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .rating {
    // min-width: 375px;
  }
  .score-container {
    // min-width: 375px;
    height: 106px;
    display: flex;
    padding: 18px 0;
    .score-left {
      width: 37%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.border-right::before {
        border: 1px solid #e6e7e8;
      }
      .score {
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }
      .text {
        font-size: 12px;
        color: rgb(7,17, 27);
        line-height: 12px;
        margin-top: 6px;
      }
      .over {
        font-size: 10px;
        color: rgb(7,17, 27);
        line-height: 10px;
        margin-top: 8px;
      }
    }
    @media (max-width: 373px) {
      .score-right {
        padding: 0 6px !important;
      }
    }
    .score-right {
      width: 63%;
      height: 100%;
      padding: 0 24px;
      .self-star,
      .self-time,
      .self-service-score,
      .self-food-score {
        margin-left: 12px;
      }
      .self-service-score,
      .self-food-score  {
        font-size: 12px;
        color: rgb(255,153,0);
        line-height: 18px;
      }
      .self-text {
        font-size: 12px;
        color: rgb(7,17, 27);
        line-height: 18px;
      }
      .service-score,
      .food-score {
        display: flex;
        margin-bottom: 8px;
      }
      .service-score {
      }
      .food-score {
      }
      .delivery-time {
        display: flex;
        .self-time {
          font-size: 12px;
          color: rgb(147,153,159);
          line-height: 18px;
        }
      }
    }
  }
}
</style>
