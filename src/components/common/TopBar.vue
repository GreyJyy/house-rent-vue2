<template>
  <div>
    <div class="topBox">
      <span class="city" @click="cityClick"
        >{{ $store.state.LocationAbout.defaultCityInfo.label
        }}<van-icon name="arrow-down" style="margin-left: 5px" />
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
  </div>
</template>
<script>
export default {
  methods: {
    cityClick() {
      this.$router.push({ name: 'city' })
    }
  }
}
</script>
<style scoped>
.topBox {
  margin-bottom: 10px;
}
.van-search {
  position: fixed;
  z-index: 1000;
  top: 10px;
  width: 365px;
  background-color: transparent;
}
.van-search .van-cell {
  position: relative;
  z-index: 10000;
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
  z-index: 1001;
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
