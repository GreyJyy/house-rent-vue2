<template>
  <div>
    <!-- 头部搜索 -->
    <top-bar></top-bar>
    <!-- 导航筛选 -->
    <van-sticky> <filter-condition></filter-condition></van-sticky>
    <!-- 内容 -->
    <room-card
      v-for="item in roomList"
      :key="item.id"
      :item="item"
      :tags="item.tags"
    >
    </room-card>
    <!-- 底部导航 -->
    <div class="wrap"><layout></layout></div>
  </div>
</template>
<script>
import Layout from '@/components/common/Layout'
import TopBar from '@/components/common/TopBar'
import FilterCondition from '@/components/content/Search/FilterCondition'
import RoomCard from '@/components/common/RoomCard'
import { mapState, mapMutations } from 'vuex'
export default {
  // data() {
  //   return {
  //     roomList: []
  //   }
  // },
  computed: {
    ...mapState('LocationAbout', ['cityId']),
    ...mapState('RoomCardAbout', ['roomList'])
  },

  components: { Layout, TopBar, FilterCondition, RoomCard },
  methods: {
    ...mapMutations('RoomCardAbout', { renderCards: 'RENDER_CARDS' })
  }
}
</script>
<style scoped lang="less">
/deep/.van-search {
  position: relative;
  width: 100%;
  margin-top: -10px;
  background-color: #21b97a;
}
/deep/ .city {
  top: 16px;
}
/deep/ .map {
  color: white;
}
.wrap {
  padding-top: 50px;
}
</style>
