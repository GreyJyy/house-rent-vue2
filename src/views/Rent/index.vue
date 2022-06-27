<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.go(-1)" />
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
</template>
<script>
export default {}
</script>
<style></style>
