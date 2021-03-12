<template>
  <div>
    <div class="dividing border-topbottom"></div>
    <div class="rating border-bottom">
      <h2 v-if="title.show" class="rating-title">商品评价</h2>
      <div class="rating-multiple">
        <span class="all"
          :class="{'cur' : cur === 0}"
          @click="handleAll(0)"
        >{{title.o}}
          <span class="distance">{{ratingsData.all}}</span>
        </span>
        <span class="recommend"
          :class="{'cur' : cur === 1}"
          @click="handleRecommend(1)"
        >{{title.t}}
          <span class="distance">{{ratingsData.recommend}}</span>
        </span>
        <span class="sayno"
          :class="{'cur' : cur === 2}"
          @click="handleSayno(2)"
        >{{title.th}}
          <span class="distance">{{ratingsData.sayno}}</span>
        </span>
      </div>
      <div class="special border-top" @click="handleIsShow">
        <i class="icon-check_circle"  :class="{'colorText':flag}" ></i>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      // 显示全部评价
      // 点击事件的可以连续取反
      flag: false, /* false表示全部显示， 子组件detail-ratings的falg为true是全部显示 */
      cur: 0,
      ratingsData: {},
      ratings: [], /* 统计数量 */
      title: {}
    }
  },
  props: {
    detailFood: Object
  },
  mounted () {
    if (!this.detailFood.$tit) return
    this.title = this.detailFood.$tit
    this.getTypeNum()
  },
  methods: {
    // 得到不同类型评价的数量
    getTypeNum () {
      let sayno = 0
      let recommend = 0
      this.detailFood.ratings.forEach(rating => {
        if (rating.rateType) {
          sayno++
        } else {
          recommend++
        }
      })
      this.ratingsData.all = this.detailFood.ratings.length
      this.ratingsData.sayno = sayno
      this.ratingsData.recommend = recommend
      console.log(this.ratingsData)
    },
    // 点击按钮显示相应内容
    handleAll (n) {
      this.ratings = this.detailFood.ratings
      this.$emit('refreshPage')
      this.cur = n
    },
    handleRecommend (n) {
      this.ratings = []
      this.detailFood.ratings.forEach(rating => {
        if (!rating.rateType) {
          this.ratings.push(rating)
        }
      })
      this.cur = n
      this.$emit('refreshPage')
    },
    handleSayno (n) {
      this.ratings = []
      this.detailFood.ratings.forEach(rating => {
        if (rating.rateType) {
          this.ratings.push(rating)
        }
      })
      this.cur = n
      this.$emit('refreshPage')
    },
    // 只看有内容的评价
    handleIsShow () {
      this.flag = !this.flag
      this.$emit('changeFlag', this.flag)
      this.$emit('refreshPage')
    }
  },
  watch: {
    detailFood () {
      this.title = this.detailFood.$tit
      this.ratings = this.detailFood.ratings
      this.getTypeNum()
      // 根据数据的改变来更改传到子组件show-detail的内容
      this.ratings = this.detailFood.ratings
      this.cur = 0
      // 该操作会引起点击事件的成倍增加
      /* this.$nextTick(() => {
        this.detailScroll = new BScroll(this.$refs.foodDetail, {
          click: true
        })
      }) */
    },
    ratings () {
      this.$emit('change-ratings', this.ratings)
    },
    flag () {
      console.log(this.flag)
    }
  }
}
</script>

<style lang="scss" scoped>
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
.rating {
  padding: 18px 18px 0;
  min-height: 125px;
  &.border-bottom:before {
    border-bottom: 1px solid #e5e6e7;
  }
  .rating-title {
    padding-bottom: 6px;
  }
  .rating-multiple {
    width: 100%;
    margin: 12px 0 18px;
    .cur {
      border-radius: 6px;
      box-shadow: 3px 3px 3px rgba(7,17,27,.7);
    }
    .all,
    .recommend,
    .sayno {
      display: inline-block;
      padding: 8px 12px;
      min-width: 45px;
      .distance {
        display: inline-block;
        padding-left: 4px;
        height: 100%;
      }
    }
    .all {
      background: #00a0dc;
    }
    .recommend {
      margin-left: 8px;
      background: #ccecf8;
    }
    .sayno {
      margin-left: 8px;
      background: #e9ebec;
    }

  }
  .special {
    padding: 12px 0;
    &.border-top::before {
      border-top: 1px solid #e5e6e7;
    }
    & > .colorText {
      color: green;
    }
    .icon-check_circle {
        vertical-align: middle;
        font-size: 20px;
      &::before {
      }
    }
    .text {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
