<template>
  <div>
    <van-nav-bar title="账号注册" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        autocomplete="true"
        v-model="username"
        name="用户名"
        placeholder="请输入5至8位用户名"
        :rules="[
          {
            validator: checkUserName,
            required: true,
            message: '允许5-8字节,允许字母数字'
          }
        ]"
      />
      <van-field
        autocomplete="true"
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入六位纯数字密码"
        :rules="[
          {
            validator: checkPassword,
            required: true,
            message: '请输入六位纯数字密码'
          }
        ]"
        @touchstart.native.stop="show = true"
      />
      <van-number-keyboard
        v-model="password"
        :show="show"
        :maxlength="6"
        @blur="show = false"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <van-checkbox v-model="checked" class="instructions" label-disabled
      >点击同意<strong
        style="color: blue; text-decoration: underline"
        is-link
        @click="isPopup = true"
        >注册协议</strong
      >方可完成注册</van-checkbox
    >
    <van-popup v-model="isPopup" class="text"
      >没什么好看的,都是我瞎编的,爱注册不注册随你，但是你要是不同意我是不会让你注册的。这注册接口写的跟屎一样，没有任何限制，你甚至可以纯空格，所以我给他写了点正则校验，你别重复就行。最后说一下这项目很简单，有手就行随便写写。</van-popup
    >
  </div>
</template>
<script>
import { registerData } from '@/api'
import { Notify } from 'vant'
export default {
  data() {
    return {
      username: '',
      password: '',
      show: false,
      checked: false,
      isPopup: false
    }
  },
  methods: {
    // 校验用户名规则
    checkUserName() {
      return /^[a-zA-Z0-9]{5,8}$/.test(this.username)
    },
    // 校验密码规则
    checkPassword() {
      return /^\d{6}$/.test(this.password)
    },
    async onSubmit() {
      try {
        //是否勾选协议判断
        if (!this.checked)
          return Notify({ type: 'warning', message: '请先同意注册协议!' })
        await registerData(this.username, this.password)
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.error(err)
        Notify({ type: 'warning', message: '注册失败' })
      }
    },
    onClickLeft() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped>
.instructions {
  margin-top: 30px;
  margin-left: 20px;
  font-size: 14px;
}
.text {
  width: 80%;
  height: 80%;
}
</style>
