<template>
  <div>
    <top-bar></top-bar>
    <div style="padding-top: 54px">
      <van-row type="flex" justify="center">
        <van-col span="6">区域<van-icon name="arrow-down" /></van-col>
        <van-col span="6">方式<van-icon name="arrow-down" /></van-col>
        <van-col span="6">租金<van-icon name="arrow-down" /></van-col>
        <van-col span="6">筛选<van-icon name="arrow-down" /></van-col>
      </van-row>
    </div>
    <layout></layout>
  </div>
</template>
<script>
import Layout from '@/components/common/Layout'
import TopBar from '@/components/common/TopBar'
export default {
  data() {
    return {}
  },
  components: { Layout, TopBar }
}
</script>
<style scoped lang="less">
/deep/.van-search {
  background-color: #21b97a;
  top: 0;
  width: 100%;
}
/deep/ .city {
  top: 16px;
}
/deep/ .map {
  color: white;
}
</style>
