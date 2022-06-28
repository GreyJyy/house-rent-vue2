<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="region" title="区域" ref="item1">
      <van-picker :options1="options1" />
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
      <van-picker :options2="option2" />
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
      <van-picker :options3="option3" />
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
          @click="clickFn('item4')"
          >清除</van-button
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
export default {
  data() {
    return {
      region: '',
      mode: '',
      rentPrice: '',
      options1: [],
      options2: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ],
      options3: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ]
    }
  },
  methods: {
    //点击下拉菜单取消/确认按钮关闭下拉菜单
    clickFn(item) {
      this.$refs[item].toggle()
    }
  },
  async created() {
    //获取对应地区房屋查询条件
    const res = await getQueryConditionData()
    console.log(res)
    this.options1 = res.data.body.area
    console.log(this.options1)
    // this.options1 = Object.assign(
    //   [],
    //   JSON.parse(JSON.stringify(res.data.body.area))
    // )
    // console.log(this.options1)
    // this.options1 = Object.assign({}, this.options1)
    // console.log(this.options1)
    // this.options1 = res.data.body.area
    // console.log(this.options1)
    // const res1 = arr.map((item) => JSON.parse(item))
    // console.log(res1)
    // console.log('后端返回的数据', res)
    // console.log('后端返回的area数据', res.data.body) //{}
    // const s = res.data.body.area
    // this.options1.push(s)
    // console.log(this.options1)
    // console.log(this.options1)
    // console.log(res.data.body.area)
    // this.options1 = res.data.body.area
    // console.log(this.options1)
    // console.log('this.options', this.options1) //{__ob__: Observer}
    // this.options2 = res.data.body.rentType
    // console.log(this.options2)
    // console.log(this.area)
    // console.log(JSON.parse(JSON.stringify(this.conditions.area)))
    // for (const key in this.conditions) {
    //   if (Object.hasOwnProperty.call(this.conditions, key)) {
    //     this.conditions[key] = res.data.body[key]
    //   }
    // }
    // console.log(this.conditions.area)
    // const re = /label/gi
    // let str = JSON.stringify(res.data.body.area)
    // str = str.replace(re, 'text')
    // this.options1 = JSON.parse(str)
    // console.log(JSON.parse(str))
    // this.options1 = Object.assign([], JSON.parse(str))
    // console.log(this.options1)
  },
  props: {
    area: Object,
    characteristic: Array,
    floor: Array,
    oriented: Array,
    price: Array,
    rentType: Array,
    roomType: Array,
    subway: Object,
    a: Object
  }
}
</script>

<style scoped></style>
