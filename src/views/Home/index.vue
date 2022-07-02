<template>
  <div>
    <top-bar></top-bar>
    <div class="wrap">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="img" v-lazy="image"
        /></van-swipe-item>
      </van-swipe>
      <van-row type="flex" justify="center">
        <van-col span="6" @click="$router.push({ name: 'search' })"
          ><van-icon name="wap-home-o" />
          <p class="info">整租</p></van-col
        >
        <van-col span="6" @click="$router.push({ name: 'search' })"
          ><van-icon name="manager-o" />
          <p class="info">合租</p></van-col
        >
        <van-col span="6"
          ><van-icon name="flag-o" @click="$router.push({ name: 'map' })" />
          <p class="info">地图找房</p></van-col
        >
        <van-col span="6" @click="$router.push({ name: 'publish' })"
          ><van-icon name="description" />
          <p class="info">去出租</p></van-col
        >
      </van-row>
      <div class="group">
        <h3 class="title">租房小组<span class="more">更多</span></h3>
        <van-row
          type="flex"
          justify="space-around"
          style="padding-bottom: 15px"
        >
          <van-col span="11" v-for="item in groups" :key="item.id"
            ><van-image
              width="50"
              height="50"
              :src="`http://liufusong.top:8080${item.imgSrc}`"
              style="float: left; padding-top: 19px"
            />
            <div class="tips">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <layout></layout>
  </div>
</template>
<script>
// https://lbsyun.baidu.com/jsdemo.htm#eAddMarker
import Layout from '@/components/common/Layout'
import TopBar from '@/components/common/TopBar'
import { getSwiperData, getGroupData } from '@/api'
export default {
  data() {
    return {
      images: [],
      groups: []
    }
  },
  async created() {
    try {
      const res = await getSwiperData()
      this.images = res.data.body.map(
        (item) => `http://liufusong.top:8080${item.imgSrc}`
      )
      const res2 = await getGroupData(
        //首次登录没有选中当前城市,使用默认value(北京)
        this.$store.state.LocationAbout.defaultCityInfo.value
      )
      this.groups = res2.data.body
    } catch (err) {
      console.error(err)
    }
  },
  components: { Layout, TopBar }
}
</script>
<style scoped lang="less">
.wrap {
  margin-top: -10px;
}
.img {
  width: 100%;
  height: 212px;
}
.info {
  font-size: 15px;
}
.van-col {
  margin-top: 10px;
  text-align: center;
  background-color: white;
}
.van-icon {
  font-size: 40px;
  color: #04af68;
}
.group {
  background-color: #f6f5f6;
  overflow: hidden;
  padding: 0 10px;
}
.title {
  position: relative;
  margin: 15px 0 15px 10px;
  font-size: 15px;
}
.more {
  color: #787d82;
  position: absolute;
  right: 0;
  font-size: 14px;
  font-weight: 400;
}
.tips {
  font-size: 14px;
}
</style>
