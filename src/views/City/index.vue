<template>
  <div>
    <van-index-bar :index-list="indexList" highlight-color="#21b97a">
      <div v-for="(item, index) in theList" :key="index">
        <van-index-anchor :index="index" style="font-size: 14px">{{
          index === '#' ? '当前城市' : index === 'Hot' ? '热门城市' : index
        }}</van-index-anchor>
        <van-cell
          v-for="(item2, ind) in item"
          :key="ind"
          :title="item2.label"
          style="height: 50px; font-size: 16px"
          @click="checkOne(item2)"
        ></van-cell>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import { getCityListData, getHotListData } from '@/api'
import citySort from '@/utils/citySort'
import { Notify } from 'vant'
export default {
  data() {
    return {
      //侧边索引对应项(用于组件渲染侧边导航)
      indexList: [],
      //cell区域标题(外层遍历) cell区域内容(内层遍历)
      theList: {}
    }
  },
  async created() {
    try {
      //获取所有城市
      const res = await getCityListData()
      //获取热门城市
      const res2 = await getHotListData()
      //拼接侧边#索引与热门索引(如果有选择城市则显示到当前,否则默认显示北京)
      const obj = {
        '#': [JSON.parse(localStorage.getItem('checkedCity'))] || [
          {
            label: '北京',
            pinyin: 'beijing',
            short: 'bj',
            value: 'AREA|88cff55c-aaa4-e2e0'
          }
        ],
        //热门城市数据
        Hot: res2.data.body
      }
      //保存地区数据(需要拼接当前与热门城市选项)
      this.theList = { ...obj, ...citySort(res.data.body) }
      //获取键名保存侧边索引
      this.indexList = [...Object.keys(this.theList)]
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    async checkOne(item) {
      //对照已经实现的项目效果发现如果不是热搜的四个城市则不会发起网络请求,因此这里做个判断
      const hotArr = ['北京', '上海', '深圳', '广州']
      if (hotArr.every((name) => name !== item.label)) {
        Notify({ type: 'warning', message: '此地区没有房源' })
        return
      }
      //本地存储与vuex状态管理(实现刷新不丢失状态+多页面状态共享)
      localStorage.setItem('checkedCity', JSON.stringify(item))
      this.$store.dispatch('changeCity', item.label)
      //必须是返回,因为city与search页面的返回地址不一样
      this.$router.go(-1)
    }
  }
}
</script>
<style></style>
