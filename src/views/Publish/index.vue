<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.go(-1)" />
    <div class="list-header">房源信息</div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.list-header {
  padding: 15px 15px 9px;
  width: 100%;
  font-size: 15px;
  color: #21b97a;
  background-color: #fff;
}
</style>
