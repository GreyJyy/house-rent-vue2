<template>
  <div>
    <div class="wrap">
      <span class="city" @click="$router.push({ name: 'city' })"
        >北京<van-icon name="arrow-down" style="margin-left: 5px" />
        <i class="line"></i>
      </span>
      <van-search disabled show-action placeholder="请输入小区或地址">
        <template #action>
          <van-icon name="map-marked" @click="$router.push({ name: 'map' })" />
        </template>
      </van-search>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.wrap {
  position: relative;
}
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
/* .city {
  position: absolute;
  bottom: 60px;
  left: 0;
  left: 16px;
  top: 11px;
  font-size: 15px;
  text-align: center;
  height: 34px;
  line-height: 34px;
} */
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
