<template>
  <div>
    <van-nav-bar
      :title="detailInfos.community"
      left-arrow
      @click-left="$router.back()"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in detailInfos.houseImg" :key="index"
        ><van-image
          width="100%"
          height="248"
          :src="`http://liufusong.top:8080${item}`"
        >
          <template v-slot:error>图片走丢了</template></van-image
        ></van-swipe-item
      >
    </van-swipe>
    <div class="title">
      <p>{{ detailInfos.title }}</p>
      <van-tag
        type="primary"
        v-for="(item, index) in detailInfos.tags"
        :key="index"
        >{{ item }}</van-tag
      >
    </div>
    <van-row style="padding-bottom: 20px">
      <van-col class="info" span="8">
        <p>{{ detailInfos.price }}元/月</p>
        <span>租金</span></van-col
      >
      <van-col class="info" span="8">
        <p>{{ detailInfos.roomType }}</p>
        <span>房型</span></van-col
      >
      <van-col class="info" span="8"
        ><p>{{ detailInfos.size }}平米</p>
        <span>面积</span></van-col
      >
    </van-row>
    <van-row style="border-bottom: 1px solid #cecece">
      <van-col class="type" span="12"><span>装修</span>: 精装 </van-col>
      <van-col class="type" span="12" v-if="detailInfos.oriented"
        ><span>朝向</span>: {{ detailInfos.oriented[0] }}</van-col
      >
      <van-col class="type" span="12"
        ><span>楼层</span>: {{ detailInfos.floor }}</van-col
      >
      <van-col class="type" span="12"><span>类型</span>: 普通住宅</van-col>
    </van-row>
    <p class="ins">{{ detailInfos.community }}</p>
    <div class="map">地图位置</div>
    <p class="ins">房屋配套</p>
    <van-grid :column-num="5">
      <van-grid-item
        v-for="(value, index) in detailInfos.supporting"
        :key="index"
        icon="photo-o"
        :text="value"
      ></van-grid-item>
    </van-grid>
    <div class="icons"></div>
    <p class="ins">房源概述</p>
    <div class="desc">
      <van-image
        round
        width="52px"
        height="52px"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div style="margin-left: 20px; margin-top: 5px">
        <div>王女士</div>
        <div>已认证</div>
      </div>
      <span style="margin-left: 168px; margin-top: 6px" class="msg"
        >发消息</span
      >
    </div>
    <div class="text">
      {{ detailInfos.description === '' ? '默认' : detailInfos.description }}
    </div>
    <p class="ins">猜你喜欢</p>
    <img src="@/assets/likes.png" />
    <div class="btns">
      <div style="flex: 1">
        <van-icon name="star-o" style="padding-right: 10px" />收藏
      </div>
      <div style="flex: 1; border-left: 1px solid #ccc">在线咨询</div>
      <div style="flex: 1; background-color: #21b97a; color: #fff">
        电话预约
      </div>
    </div>
  </div>
</template>
<script>
// 这里的发布人头像是通过获取登录用户信息渲染的,我懒得做了
//概述里的详情发现有些没有,就做了个判断,没有返回默认,有则渲染
//包括配置选项,看了好几条数据都是空的,也用的默认的
//猜你喜欢在已经做好的项目里不是通过渲染生成的,无法点击跳转,我直接截了个图用了
import { getCertainRoomData } from '@/api'
export default {
  data() {
    return {
      detailInfos: {},
      supportings: ['空调', '网络', '暖气']
    }
  },
  async created() {
    try {
      const res = await getCertainRoomData(this.$route.query.id)
      this.detailInfos = res.data.body
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
<style scoped lang="less">
.title {
  height: 84px;
  padding-left: 15px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  border-bottom: 1px solid #cecece;
}
.van-tag {
  margin: 4px 5px;
}
.info {
  text-align: center;
  border-bottom: 1px solid #cecece;
  p {
    color: #fa5741;
    font-size: 18px;
    font-weight: bolder;
  }
  span {
    font-size: 14px;
    color: #999;
  }
}
.type {
  padding: 10px 15px;
  font-size: 13px;
  span {
    color: #999;
  }
}
.ins {
  padding-left: 15px;
  font-size: 14px;
  line-height: 44px;
  color: #666;
}
.desc {
  display: flex;
  font-size: 16px;
}
.msg {
  height: 29px;
  line-height: 29px;
  color: #33be85;
  border: 1px solid #33be85;
  border-radius: 3px;
}
.text {
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}
.btns {
  display: flex;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  text-align: center;
}
</style>
