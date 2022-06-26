<template>
  <div>
    <div class="myTitle">
      <div class="user">
        <div class="avatar">
          <img src="@/assets/my-avatar.png" style="width: 60px" />
        </div>
        <p class="name">{{ userName }}</p>
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
          @click="optionsClickFn"
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
export default {
  data() {
    return {
      userName: 'USER',
      tips: '退出',
      options: [
        '我的收藏',
        '我的出租',
        '看房记录',
        '成为房主',
        '个人资料',
        '联系我们'
      ],
      names: ['star', 'wap-home', 'underway', 'card', 'manager', 'audio']
    }
  },
  components: { Layout },
  methods: {
    changeStatus() {
      if (this.tips === '退出') {
        Dialog.confirm({
          title: '提示',
          message: '是否确认退出'
        })
          .then(() => {
            this.tips = '登录'
            this.userName = '游客'
          })
          .catch(() => {})
        return
      }
      this.$router.replace({ name: 'login' })
    },
    optionsClickFn() {
      if (this.tips === '登录') this.$router.replace({ name: 'login' })
    }
  }
}
</script>
<style scoped>
.myTitle {
  position: relative;
  height: 320px;
  background: url('@/assets/avatar.png') no-repeat top;
  background-size: 100%;
}
.user {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 85%;
  height: 55%;
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
.van-col {
  margin-bottom: 15px;
  font-size: 15px;
  color: #333;
  text-align: center;
}
</style>
