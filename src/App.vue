<template>
  <div id="app">

    <!-- 顶部区域 -->
      <Header :seller="httpSeller"/>

    <!-- 切换区域 -->
    <Tab />

    <!-- 内容区域 -->
    <keep-alive>
      <router-view :Seller="httpSeller" :Rating="httpRating"/>
    </keep-alive>
  </div>
</template>

<script>
import Tab from './components/tab/Tab'
import Header from './components/header/Header'
import axios from 'axios'

const OK_STATUS = 0

export default {
  name: 'App',
  data () {
    return {
      httpSeller: {},
      httpRating: [],
      httpGoods: []
    }
  },
  components: {
    Header,
    Tab
  },
  methods: {
    resourceData () {
      axios.get('/api/data.json').then((res) => {
        if (res.data.errno === OK_STATUS) {
          this.httpSeller = res.data.seller
          this.httpRating = res.data.ratings
          this.httpGoods = res.data.goods
        }
      })
    }
  },
  mounted () {
    this.resourceData()
  },
  updated () {
    // 通过路由中的name值获得哪个地址名字传给 Tab组件， 来更改切换导航的样式
    this.bus.$emit('app-emit-tab', this.$route.name)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
