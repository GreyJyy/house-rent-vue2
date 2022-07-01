<template>
  <div>
    <div class="opt">
      <van-field
        readonly
        clickable
        label="区域"
        :value="region"
        @click="optClick(1)"
      />
      <van-field
        readonly
        clickable
        label="方式"
        :value="mode"
        @click="optClick(2)"
      />
      <van-field
        readonly
        clickable
        label="租金"
        :value="rentPrice"
        @click="optClick(3)"
      />
      <van-field
        readonly
        clickable
        label="筛选"
        :value="tagsList"
        @click="optClick(4)"
      />
    </div>
    <van-popup v-model="showPicker" position="top">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-popup v-model="showFilter" position="top">
      <div style="width: 100%">
        <div>
          <p>户型</p>
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in main.roomType"
              :key="index"
              :class="{ highlight: highs.includes(item.label) }"
              @click="addTag(item.label)"
              >{{ item.label }}</van-col
            >
          </van-row>
        </div>
        <div>
          <p>朝向</p>
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in main.oriented"
              :key="index"
              :class="{ highlight: highs.includes(item.label) }"
              @click="addTag(item.label)"
              >{{ item.label }}</van-col
            >
          </van-row>
        </div>
        <div>
          <p>楼层</p>
          <van-row
            type="flex"
            justify="left"
            style="text-align: center; padding-left: 0.9063rem"
          >
            <van-col
              span="8"
              v-for="(item, index) in main.floor"
              :key="index"
              :class="{ highlight: highs.includes(item.label) }"
              @click="addTag(item.label)"
              >{{ item.label }}</van-col
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
              @click="addTag(item.label)"
              >{{ item.label }}</van-col
            >
          </van-row>
        </div>
        <van-button
          type="primary"
          style="width: 35%"
          plain
          hairline
          @click="filterCancel"
          >取消</van-button
        >
        <van-button type="primary" style="width: 65%" @click="filterConfirm"
          >确定</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getQueryConditionData, getHouseData } from '@/api'
import { mapState } from 'vuex'
import { sendConditionToVuex, highLight } from '@/mixin'
export default {
  data() {
    return {
      region: '',
      mode: '',
      rentPrice: '',
      prices: [],
      rentTypes: [],
      tagsList: '',
      columns: [],
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      showPicker: false,
      showFilter: false
    }
  },
  mixins: [sendConditionToVuex, highLight],
  computed: {
    ...mapState('PublishAbout', ['main']),
    ...mapState('LocationAbout', ['cityId'])
  },
  methods: {
    optClick(ind) {
      switch (ind) {
        case 1:
          this.columns = this.options1
          this.showPicker = true
          this.showFilter = false
          break
        case 2:
          this.columns = this.options2
          this.showPicker = true
          this.showFilter = false
          break
        case 3:
          this.columns = this.options3
          this.showPicker = true
          this.showFilter = false
          break
        case 4:
          this.showPicker = false
          this.showFilter = true
      }
    },
    async onConfirm(val, ind) {
      if (ind?.length) {
        this.region =
          this.options1[ind[0]].children[ind[1]].children[ind[2]].value || null
        console.log(this.region)
      } else if (this.options2.some((item) => item === val)) {
        this.mode = this.rentTypes[ind].value
        console.log(this.mode)
      } else {
        this.rentPrice = this.prices[ind].value
        console.log(this.rentPrice)
      }
      const res = await getHouseData(
        this.cityId,
        this.region,
        this.region,
        this.rentType,
        this.rentPrice
      )
      console.log(res)
      this.showFilter = false
      this.showPicker = false
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
    },
    addTag(name) {
      console.log(name)
      this.highLight(name)
    },
    filterCancel() {
      this.showFilter = false
    },
    filterConfirm() {
      console.log(1)
      this.showFilter = false
    }
  },
  async created() {
    try {
      //获取对应地区房屋查询条件
      const res2 = await getQueryConditionData()
      this.prices = res2.data.body.price
      this.rentTypes = res2.data.body.rentType
      //处理area字段
      this.handleDeepData(res2.data.body.area.children)
      const formatArea = this.formatPickerData(res2.data.body.area)
      //处理subway字段
      this.handleDeepData(res2.data.body.subway.children)
      const formatSubway = this.formatPickerData(res2.data.body.subway)
      this.options1 = new Array(formatArea, formatSubway)
      this.options2 = this.handleShallowData(res2.data.body.rentType)
      this.options3 = this.handleShallowData(res2.data.body.price)
      //房屋亮点数据
      console.log(this.options2)
      this.options4 = res2.data.body.characteristic
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
  margin: 0 18px 15px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #888;
}
.green {
  color: #21b97a !important;
}
.highlight {
  color: #21b97a;
  border: 1px solid #21b97a;
}
.opt {
  position: sticky;
  top: 0;
  display: flex;
  z-index: 99999;
  // margin-top: 10px;
  /deep/.van-cell--clickable {
    height: 50px;
    line-height: 40px;
    font-size: 17px;
    z-index: 9009;
    border-bottom: 1px solid #ccc;
  }
}
.van-popup--top {
  top: 54px;
  height: 328px;
  z-index: 500;
}
/deep/.van-picker__toolbar {
  position: absolute;
  bottom: -65px;
  width: 100%;
  font-size: 18px;
  z-index: 999;
  .van-picker__confirm {
    border-radius: 0;
    flex: 2 1;
    color: #fff;
    background-color: #21b97a;
  }
  .van-picker__cancel {
    flex: 1 1;
    border-radius: 0;
    color: #21b97a;
  }
}
</style>
