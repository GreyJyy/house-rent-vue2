<template>
  <div>
    <van-row type="flex">
      <van-col span="4">北京</van-col>
      <van-col span="20">
        <van-search
          disabled
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #action>
            <van-icon name="map-marked" />
          </template> </van-search
      ></van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  methods: {
    onSearch() {
      console.log(1)
    }
  }
}
</script>
<style></style>
