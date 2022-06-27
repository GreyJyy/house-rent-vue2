<template>
  <div>
    <top-bar></top-bar>
    <div class="nav">
      <van-row
        type="flex"
        justify="center"
        style="border-bottom: 1px solid #e4e6f0; height: 40px"
      >
        <van-col span="6" @click="show = true"
          >区域<van-icon name="arrow-down"
        /></van-col>
        <van-col span="6" @click="show = true"
          >方式<van-icon name="arrow-down"
        /></van-col>
        <van-col span="6" @click="show = true"
          >租金<van-icon name="arrow-down"
        /></van-col>
        <van-col span="6">筛选<van-icon name="arrow-down" /></van-col>
      </van-row>
    </div>
    <!-- 循环生成的房屋列表 -->
    <van-row>
      <van-col
        span="24"
        v-for="(item, index) in roomList"
        :key="index"
        class="room"
      >
        <img :src="`http://liufusong.top:8080${item.houseImg}`" />
        <div class="right">
          <h3>{{ item.title }}</h3>
          <div class="desc">{{ item.desc }}</div>
          <div>
            <span class="tag" v-for="(tag, index) in item.tags" :key="index">{{
              tag
            }}</span>
          </div>
          <div class="price">{{ item.price }}元/月</div>
        </div>
      </van-col>
    </van-row>
    <layout></layout>
  </div>
</template>
<script>
import Layout from '@/components/common/Layout'
import TopBar from '@/components/common/TopBar'
import { getHouseData } from '@/api'
export default {
  data() {
    return {
      roomList: [],
      show: false
    }
  },
  async created() {
    const res = await getHouseData()
    this.roomList = res.data.body.list
  },
  components: { Layout, TopBar }
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
img {
  float: left;
  width: 106px;
  height: 80px;
  padding-top: 16px;
}
h3 {
  font-size: 15px;
  color: #394043;
}
.desc {
  font-size: 12px;
  color: #afb2b3;
}
.price {
  font-size: 12px;
  color: #fa5741;
}
.right {
  overflow: hidden;
  line-height: 22px;
  padding-left: 12px;
}
.room {
  justify-content: space-around;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
}
.tag {
  display: inline-block;
  font-size: 12px;
  border-radius: 3px;
  padding: 4px 5px;
  margin-right: 5px;
  line-height: 12px;
  color: #39becd;
  background: #e1f5f8;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
/deep/ .nav {
  padding-top: 13px;
  position: sticky;
  top: 0;
  background-color: #fff;
}
.van-col {
  display: inline-block;
  font-size: 17px;
  background-color: #fff;
  text-align: center;
}
</style>
