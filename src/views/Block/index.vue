<template>
  <div>
    <div class="wrap">
      <!-- 搜索框 -->
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @cancel="$router.go(-1)"
          @input="getRes"
        />
      </form>
    </div>
    <div v-if="show">
      <van-cell-group v-for="(item, index) in searchResult" :key="index">
        <van-cell
          :title="item.communityName"
          @click="onSearch(item.communityName, item.community)"
        />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { queryBlockData } from '@/api'
import debounce from '@/utils/debounce'
export default {
  name: 'block',
  data() {
    return {
      //搜索关键字
      value: '',
      //搜索结果列表
      searchResult: [],
      //控制列表页显示与隐藏
      show: false
    }
  },
  methods: {
    //获取搜索结果
    getRes() {
      //输入框防抖
      debounce(
        async () => {
          try {
            //如果没有内容了,隐藏搜索结果列表
            if (this.value === '') return (this.show = false)
            this.show = true
            this.searchResult = []
            //获取查询结果
            const res = await queryBlockData(
              this.value,
              this.$store.state.LocationAbout.defaultCityInfo.value
            )
            this.searchResult = res.data.body
          } catch (err) {
            console.error(err)
          }
        },
        800,
        false
      )()
    },
    onSearch(communityName, community) {
      this.$store.commit('LocationAbout/GET_RES', { communityName, community })
      this.$router.push({ name: 'publish' })
    }
  }
}
</script>
<style scoped lang="less">
.van-search {
  position: fixed;
  z-index: 555;
  top: 10px;
  width: 365px;
  background-color: transparent;
}
.van-search .van-cell {
  position: relative;
  z-index: 20;
  padding-left: 65px;
  background-color: white;
}
.van-search__action {
  padding-left: 15px;
  font-size: 20px;
}
.wrap {
  margin-bottom: 64px;
}
</style>
