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
        <div>
          <p>户型</p>
          <!-- 居中 -->
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in types"
              :key="index"
              :class="{ highlight: highs.includes(item) }"
              @click="formatSup(item)"
              >{{ item }}</van-col
            >
          </van-row>
        </div>
        <div>
          <p>朝向</p>
          <!-- 居中 -->
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in directions"
              :key="index"
              :class="{ highlight: highs.includes(item) }"
              @click="formatSup(item)"
              >{{ item }}</van-col
            >
          </van-row>
        </div>
        <div>
          <p>楼层</p>
          <!-- 居中 -->
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in floors"
              :key="index"
              :class="{ highlight: highs.includes(item) }"
              @click="formatSup(item)"
              >{{ item }}</van-col
            >
          </van-row>
        </div>
        <div>
          <p>房屋亮点</p>
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in options4"
              :key="index"
              :class="{ highlight: highs.includes(item.label) }"
              @click="formatSup(item.label)"
              >{{ item.label }}</van-col
            >
          </van-row>
        </div>
        <van-button
          type="primary"
          style="width: 35%"
          plain
          hairline
          @click="clickFn('item4')"
          >取消</van-button
        >
        <van-button type="primary" style="width: 65%" @click="clickFn('item4')"
          >确定</van-button
        >
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<script>
import { getQueryConditionData } from '@/api'
import { mapState } from 'vuex'
import { sendConditionToVuex } from '@/mixin'
export default {
  data() {
    return {
      region: '',
      mode: '',
      rentPrice: '',
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      show: false
    }
  },
  mixins: [sendConditionToVuex],
  computed: {
    ...mapState('PublishAbout', [
      'types',
      'typeValues',
      'floors',
      'floorValues',
      'directions',
      'directionValues'
    ])
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
      //房屋亮点数据
      this.options4 = res.data.body.characteristic
      console.log(this.options4)
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

<style scoped lang="less">
p {
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 15px;
}
.van-col {
  height: 32px;
  // width: 70px;
  margin: 0 18px 15px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #888;
}
.highlight {
  color: #21b97a;
  border: 1px solid #21b97a;
}
</style>
