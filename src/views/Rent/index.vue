<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.go(-1)" />
    <!-- 如有已发布房源则显示,否则显示默认提示 -->
    <div v-if="roomList.length > 0">
      <room-card
        v-for="(item, index) in roomList"
        :key="index"
        :item="item"
        :tags="item.tags"
      ></room-card>
    </div>
    <div v-else>
      <div style="text-align: center">
        <img :src="require('@/assets/doc.png')" />
      </div>
      <p style="font-size: 16px; text-align: center">
        您还没有房源,去
        <a href="javascript:;" @click="$router.push({ name: 'publish' })"
          >发布房源吧~</a
        >
      </p>
    </div>
  </div>
</template>
<script>
import { checkPublishedRoomData } from '@/api'
import RoomCard from '@/components/common/RoomCard'
export default {
  data() {
    return {
      roomList: []
    }
  },
  components: { RoomCard },
  props: { item: Object, tags: Array },
  async created() {
    //渲染用户已发布房源
    const res = await checkPublishedRoomData()
    this.roomList = res.data.body
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
</style>
