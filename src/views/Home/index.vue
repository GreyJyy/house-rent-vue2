<template>
  <div>
    <top-bar></top-bar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="img" v-lazy="image"
      /></van-swipe-item>
    </van-swipe>
    <van-row type="flex" justify="center">
      <van-col span="6"
        ><van-icon name="wap-home-o" />
        <p class="info">整租</p></van-col
      >
      <van-col span="6"
        ><van-icon name="manager-o" />
        <p class="info">合租</p></van-col
      >
      <van-col span="6"
        ><van-icon name="flag-o" />
        <p class="info">地图找房</p></van-col
      >
      <van-col span="6"
        ><van-icon name="description" />
        <p class="info">去出租</p></van-col
      >
    </van-row>
    <div class="group">
      <h3 class="title">租房小组<span class="more">更多</span></h3>
      <van-row type="flex" justify="space-around" style="padding-bottom: 15px">
        <van-col span="11"
          ><van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="float: left; padding-top: 19px"
          />
          <div class="tips">
            <p>家住回龙观</p>
            <p>垃圾的感觉</p>
          </div>
        </van-col>
        <van-col span="11"
          ><van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="float: left; padding-top: 19px"
          />
          <div class="tips">
            <p>家住回龙观</p>
            <p>垃圾的感觉</p>
          </div></van-col
        >
        <van-col span="11"
          ><van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="float: left; padding-top: 19px"
          />
          <div class="tips">
            <p>家住回龙观</p>
            <p>垃圾的感觉</p>
          </div></van-col
        >
        <van-col span="11"
          ><van-image
            width="50"
            height="50"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            style="float: left; padding-top: 19px"
          />
          <div class="tips">
            <p>家住回龙观</p>
            <p>垃圾的感觉</p>
          </div></van-col
        >
      </van-row>
    </div>
    <layout></layout>
  </div>
</template>
<script>
import Layout from '@/components/common/Layout'
import TopBar from '@/components/common/TopBar'
export default {
  data() {
    return {
      images: [
        'http://liufusong.top:8080/img/swiper/1.png',
        'http://liufusong.top:8080/img/swiper/2.png',
        'http://liufusong.top:8080/img/swiper/3.png'
      ]
    }
  },
  components: { Layout, TopBar }
}
</script>
<style scoped>
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
