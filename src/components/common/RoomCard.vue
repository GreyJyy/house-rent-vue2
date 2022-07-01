<template>
  <div>
    <van-card
      :price="item.price + '元/月'"
      :desc="item.desc"
      :title="item.title"
      currency=""
      lazy-load
      :thumb="`http://liufusong.top:8080${item.houseImg}`"
      @click="$router.push({ name: 'detail', query: { id: item.houseCode } })"
    >
      <template #tags>
        <van-tag
          type="primary"
          text-color="#80d4df"
          size="medium"
          v-for="(item, index) in tags"
          :key="index"
          style="margin: 0 2px"
        >
          {{ item }}</van-tag
        >
      </template>
    </van-card>
  </div>
</template>
<script>
export default {
  props: { item: Object, tags: Array }
}
</script>
<style scoped lang="less">
.van-card__title {
  margin: 4px 0;
  font-size: 15px;
  color: #394043;
  font-weight: 700;
}
.van-card__desc {
  font-size: 12px;
  color: #afb2b3;
}
.van-card__price {
  font-size: 12px;
  color: #fa5741;
}
.van-tag {
  background: #e1f5f8;
  display: inline-block;
  font-size: 12px;
  border-radius: 3px;
  padding: 4px 5px;
  line-height: 12px;
}
</style>
