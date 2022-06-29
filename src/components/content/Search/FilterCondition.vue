<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="region" title="区域" ref="item1">
      <van-picker :columns="options1" />
      <div style="width: 100%">
        <van-button
          type="primary"
          style="width: 35%"
          plain
          hairline
          @click="clickFn('item1')"
          >取消</van-button
        >
        <van-button type="primary" style="width: 65%" @click="clickFn('item1')"
          >确定</van-button
        >
      </div>
    </van-dropdown-item>

    <van-dropdown-item v-model="mode" title="方式" ref="item2">
      <van-picker :columns="options2" />
      <div style="width: 100%">
        <van-button
          type="primary"
          style="width: 35%"
          plain
          hairline
          @click="clickFn('item2')"
          >取消</van-button
        >
        <van-button type="primary" style="width: 65%" @click="clickFn('item2')"
          >确定</van-button
        >
      </div>
    </van-dropdown-item>

    <van-dropdown-item v-model="rentPrice" title="租金" ref="item3">
      <van-picker :columns="options3" />
      <div style="width: 100%">
        <van-button
          type="primary"
          style="width: 35%"
          plain
          hairline
          @click="clickFn('item3')"
          >取消</van-button
        >
        <van-button type="primary" style="width: 65%" @click="clickFn('item3')"
          >确定</van-button
        >
      </div>
    </van-dropdown-item>
    <van-dropdown-item title="筛选" ref="item4">
      <div style="width: 100%">
        <van-button
          type="primary"
          style="width: 35%"
          plain
          hairline
          @click="clickFn('item3')"
          >取消</van-button
        >
        <van-button type="primary" style="width: 65%" @click="clickFn('item3')"
          >确定</van-button
        >
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script>
import { getQueryConditionData } from '@/api'
export default {
  data() {
    return {
      region: '',
      mode: '',
      rentPrice: '',
      options1: [],
      options2: [],
      options3: [],
      show: false
    }
  },
  methods: {
    //点击下拉菜单取消/确认按钮关闭下拉菜单
    clickFn(item) {
      this.$refs[item].toggle()
    },
    //处理一级数据(无children子集嵌套)
    handleShallowData(source) {
      return source.map((item) => item.label)
    },
    //处理级联数据(多层children子集嵌套要求深度一致)
    handleDeepData(source) {
      source.forEach((item) => {
        item.children
          ? //如果存在children键名,则递归调用
            this.handleDeepData(item.children)
          : //如果不存在 设置空的children
            (item.children = [{ text: '' }])
      })
    },
    //转换picker级联要求的数据格式(text&children)
    formatPickerData(obj) {
      //将所有label键名替换为text
      const reg = /label/gi
      const formatStr = JSON.stringify(obj).replace(reg, 'text')
      //转化为对象格式返回
      return JSON.parse(formatStr)
    }
  },
  async created() {
    try {
      //获取对应地区房屋查询条件
      const res = await getQueryConditionData()
      //处理area字段
      this.handleDeepData(res.data.body.area.children)
      const formatArea = this.formatPickerData(res.data.body.area)
      //处理subway字段
      this.handleDeepData(res.data.body.subway.children)
      const formatSubway = this.formatPickerData(res.data.body.subway)
      this.options1 = new Array(formatArea, formatSubway)
      this.options2 = this.handleShallowData(res.data.body.rentType)
      this.options3 = this.handleShallowData(res.data.body.price)
    } catch (err) {
      console.error(err)
    }
  },
  props: {
    area: Object,
    characteristic: Array,
    floor: Array,
    oriented: Array,
    price: Array,
    rentType: Array,
    roomType: Array,
    subway: Object
  }
}
</script>

<style scoped></style>
