<template>
  <div>
    <van-nav-bar title="账号登陆" />
    <van-form @submit="onSubmit">
      <van-field
        autocomplete="true"
        v-model="username"
        name="用户名"
        placeholder="请输入账号"
        :rules="[
          {
            required: true,
            message: '请填写5至8位字母数字组合的用户名',
            pattern: /^[a-zA-Z0-9]{5,8}$/
          }
        ]"
      />
      <van-field
        autocomplete="true"
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入6位纯数字密码"
        :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link class="reg" :to="{ name: 'register' }"
      >还没有账号,去注册</router-link
    >
  </div>
</template>
<script>
import { loginData } from '@/api'
import { Notify } from 'vant'
export default {
  data() {
    return {
      username: 'heima',
      password: '123456'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await loginData(this.username, this.password)
        //--- 登录失败分支
        if (res.data.status === 400) {
          Notify({ type: 'warning', message: '账户密码错误' })
          return
        }
        //--- 登录成功分支
        //保存token
        this.$store.commit('LocationAbout/SET_TOKEN', res.data.body.token)
        //---首次登录跳转到用户页面
        this.$router.replace({ name: 'user' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
<style scoped lang="less">
.reg {
  display: block;
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
  color: #666;
}
</style>
