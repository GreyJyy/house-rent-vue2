<template>
  <div>
    <div class="myTitle">
      <img :src="bgObj" class="bgi" />
      <div class="user">
        <div class="avatar">
          <img :src="avatarObj" style="width: 60px" />
        </div>
        <p class="name">{{ nickName }}</p>
        <span class="quit" @click="changeStatus">{{ tips }}</span>
        <div
          class="edit"
          style="margin-top: 15px; color: #999"
          v-if="tips === '退出'"
        >
          编辑个人资料<van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="myOptions" style="padding-top: 0.775rem">
      <!-- 居中 -->
      <van-row type="flex" justify="center">
        <van-col
          span="8"
          v-for="(item, index) in options"
          :key="index"
          @click="optionsClickFn(item)"
          ><van-icon :name="names[index]" />
          <p>{{ item }}</p></van-col
        >
      </van-row>
    </div>
    <img
      src="@/assets/join.png"
      style="width: 92%; display: block; margin: 0 auto"
    />
    <layout></layout>
  </div>
</template>
<script>
import Layout from '@/components/common/Layout'
import { Dialog } from 'vant'
import { getUserData, loginOutData } from '@/api'
import { removeToken } from '@/utils/token'
import { getToken } from '@/utils/token'
export default {
  data() {
    return {
      nickName: 'USER',
      tips: '退出',
      options: [
        '我的收藏',
        '我的出租',
        '看房记录',
        '成为房主',
        '个人资料',
        '联系我们'
      ],
      names: ['star', 'wap-home', 'underway', 'card', 'manager', 'audio'],
      //未登录显示的默认头像
      avatarObj: 'http://liufusong.top:8080/img/profile/avatar.png',
      name: '',
      //未登录显示的默认背景
      bgObj: 'http://liufusong.top:8080/img/profile/bg.png'
    }
  },
  components: { Layout },
  async created() {
    try {
      const res = await getUserData()
      //token不存在，显示未登录状态
      if (!getToken()) {
        this.tips = '登录'
        return
      }
      //token存在证明登录成功，获取用户信息渲染页面
      this.nickName = res.data.body.nickname
      //头像与背景同步为后端传入的图片路径
      this.avatarObj = `http://liufusong.top:8080${res.data.body.avatar}`
      this.bgObj = `http://liufusong.top:8080${res.data.body.avatar}`
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    //退出与登录按钮切换的逻辑
    changeStatus() {
      if (this.tips === '退出') {
        Dialog.confirm({
          title: '提示',
          message: '是否确认退出'
        })
          .then(async () => {
            this.tips = '登录'
            this.nickName = '游客'
            //退出后头像与图片切换为默认显示
            this.avatarObj = 'http://liufusong.top:8080/img/profile/avatar.png'
            this.bgObj = 'http://liufusong.top:8080/img/profile/bg.png'
            //调用登出接口
            await loginOutData()
            //手动清除token
            removeToken()
          })
          .catch(() => {})
        return
      }
      this.$router.replace({ name: 'login' })
    },
    //如果未登录,点击任意选项全部跳转到登录页
    optionsClickFn(item) {
      if (this.tips === '登录') {
        this.$router.replace({ name: 'login' })
        return
      }
      //登录状态下的选项跳转
      switch (item) {
        case '我的收藏':
          this.$router.push({ name: 'collection' })
          break
        case '我的出租':
          this.$router.push({ name: 'rent' })
          break
      }
    }
  }
}
</script>
<style scoped lang="less">
.myTitle {
  position: relative;
  height: 320px;
}
.bgi {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: -999;
}
.user {
  position: absolute;
  bottom: -38px;
  left: 50%;
  width: 85%;
  height: 68%;
  margin: 50px auto 0;
  padding: 0 20px;
  font-size: 13px;
  text-align: center;
  background: #fff;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
}
.quit {
  padding: 2px 15px;
  font-size: 12px;
  color: #fff;
  background: #21b97a;
  border-radius: 30px;
}

.van-row {
  background-color: #fff;
  padding-top: 40px;
}
.van-col {
  margin-bottom: 15px;
  font-size: 15px;
  color: #333;
  text-align: center;
}
</style>
