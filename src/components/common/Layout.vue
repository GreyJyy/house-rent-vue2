<template>
  <van-tabbar v-model="active" route fixed>
    <van-tabbar-item icon="home-o" :to="{ name: 'home' }">首页</van-tabbar-item>
    <van-tabbar-item icon="search" :to="{ name: 'search' }"
      >找房</van-tabbar-item
    >
    <van-tabbar-item icon="friends-o" :to="{ name: 'news' }"
      >资讯</van-tabbar-item
    >
    <van-tabbar-item icon="setting-o" :to="{ name: 'user' }"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>
<style></style>
