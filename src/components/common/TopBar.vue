<template>
  <div>
    <span class="city" @click="$router.push({ name: 'city' })"
      >北京<van-icon name="arrow-down" style="margin-left: 5px" />
      <i class="line"></i>
    </span>
    <van-search disabled show-action placeholder="请输入小区或地址">
      <template #action>
        <van-icon
          name="map-marked"
          @click="$router.push({ name: 'map' })"
          class="map"
        />
      </template>
    </van-search>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.van-search {
  position: fixed;
  z-index: 555;
  top: 10px;
  width: 365px;
  background-color: transparent;
}
.van-search .van-cell {
  position: relative;
  z-index: 20;
  padding-left: 65px;
  background-color: white;
}
.van-search__action {
  padding-left: 15px;
  font-size: 20px;
}
.city {
  position: absolute;
  left: 18px;
  top: 26px;
  z-index: 999;
  font-size: 15px;
}
.line {
  position: absolute;
  left: 54px;
  top: 2px;
  width: 1px;
  height: 20px;
  margin-left: 5px;
  background-color: #ccc;
}
</style>
