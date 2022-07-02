<template>
  <div>
    <div class="opt">
      <!-- 区域 -->
      <van-field
        readonly
        clickable
        label="区域"
        :value="region"
        @click="pickerControl(1)"
      />
      <!-- 方式 -->
      <van-field
        readonly
        clickable
        label="方式"
        :value="mode"
        @click="pickerControl(2)"
      />
      <!-- 租金 -->
      <van-field
        readonly
        clickable
        label="租金"
        :value="rentPrice"
        @click="pickerControl(3)"
      />
      <!-- 筛选 -->
      <van-field readonly clickable label="筛选" @click="filterControl" />
    </div>
    <!-- 区域/方式/租金对应的选择器 -->
    <van-popup v-model="showPicker" position="left">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
      <!-- 筛选对应的选择器 -->
    </van-popup>
    <van-popup v-model="showFilter" position="right">
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
              v-for="(item, index) in queryConditions.roomType"
              :key="index"
              :class="{ highlight: highs.includes(item.value) }"
              @click="addTag(item.value)"
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
              v-for="(item, index) in queryConditions.oriented"
              :key="index"
              :class="{ highlight: highs.includes(item.value) }"
              @click="addTag(item.value)"
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
              v-for="(item, index) in queryConditions.floor"
              :key="index"
              :class="{ highlight: highs.includes(item.value) }"
              @click="addTag(item.value)"
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
              v-for="(item, index) in queryConditions.characteristic"
              :key="index"
              :class="{ highlight: highs.includes(item.value) }"
              @click="addTag(item.value)"
              >{{ item.label }}</van-col
            >
          </van-row>
        </div>
        <div class="btns">
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
      </div>
    </van-popup>
    <van-loading
      type="spinner"
      color="#1989fa"
      size="60px"
      vertical
      class="loading"
      v-if="isLoading"
      >加载中...</van-loading
    >
  </div>
</template>

<script>
import { getQueryConditionData, getHouseData } from '@/api'
import { mapState, mapMutations } from 'vuex'
import { highLight } from '@/mixin'
//处理嵌套深度,label字段转text字段
import { handleDeepData, formatPickerData } from '@/utils/formatData'
export default {
  data() {
    return {
      region: '', //选中的AREA/SUY字段,后续会做判断
      mode: '', //方式
      rentPrice: '', //租金
      columns: [], //选择器选项
      deepArea: [], //所有处理过后的AREA/SUY
      showPicker: false, //控制选择器显示隐藏
      showFilter: false, //控制筛选项显示隐藏
      queryConditions: {}, //房屋查询条件集合
      moreList: [], //存放roomType,oriented,characteristic,floor的value值的数组
      isLoading: false //控制加载中状态的显示
    }
  },
  mixins: [highLight],
  computed: {
    ...mapState('LocationAbout', ['defaultCityInfo']),
    ...mapState('RoomCardAbout', ['roomList'])
  },
  methods: {
    //控制选择器渲染对应数据
    pickerControl(ind) {
      ind === 1
        ? (this.columns = this.deepArea)
        : ind === 2
        ? (this.columns = this.queryConditions.rentType.map(
            (item) => item.label
          ))
        : (this.columns = this.queryConditions.price.map((item) => item.label))
      this.showPicker = true
      this.showFilter = false
    },
    //控制筛选弹出层的开关
    filterControl() {
      this.showPicker = false
      this.showFilter = true
    },
    //确认查询条件后发送对应请求
    async onConfirm(val, ind) {
      //如果点击的是多层嵌套数据对应选择器(ind是一个长度为3的数组),则给region赋值
      if (ind?.length) {
        this.region =
          this.deepArea[ind[0]].children[ind[1]].children[ind[2]].value || null
      } else if (
        //如果点击的选项存在于rentType数据中,则给mode赋值
        this.queryConditions.rentType
          .map((item) => item.label)
          .some((item) => item === val)
      ) {
        this.mode = this.queryConditions.rentType[ind].value
      } else {
        //以上两个条件都不满足则赋值给rentPrice
        this.rentPrice = this.queryConditions.price[ind].value
      }
      //注意关闭弹出层必须放在网络请求之前,否则会阻塞关闭动画
      this.showFilter = false
      this.showPicker = false
      this.queryCertainRooms()
    },
    addTag(value) {
      this.highLight(value)
      this.moreList.push(value)
    },
    //筛选的取消按钮
    filterCancel() {
      this.showFilter = false
    },
    //筛选的确认按钮
    filterConfirm() {
      this.showFilter = false
      this.queryCertainRooms()
    },
    handleDeepData,
    formatPickerData,
    //查询对应条件的房源
    async queryCertainRooms() {
      //查询符合对应条件的房源
      let area = null,
        subway = null
      // ?.可以避免this.region为null时的报错
      this.region?.slice(0, 4) === 'AREA'
        ? (area = this.region) //如果以AREA开头,则赋值给area
        : (subway = this.region) //否则赋值给subway
      //请求成功前打开加载提示
      this.isLoading = true
      const re = await getHouseData(
        this.defaultCityInfo.value,
        area,
        subway,
        this.rentType,
        this.rentPrice,
        this.moreList.join(',') //转换成接口要求的以逗号分隔的字符串格式
      )
      //重新渲染房源列表
      this.renderCards(re.data.body.list)
      //请求成功后关闭加载提示
      this.isLoading = false
    },
    ...mapMutations('RoomCardAbout', { renderCards: 'RENDER_CARDS' })
  },
  async created() {
    try {
      //首次加载渲染数据
      this.queryCertainRooms()
      //获取房屋查询条件
      const res2 = await getQueryConditionData(this.defaultCityInfo.value)
      this.queryConditions = res2.data.body
      //处理area字段
      this.handleDeepData(res2.data.body.area.children)
      const formatArea = this.formatPickerData(res2.data.body.area)
      //处理subway字段
      this.handleDeepData(res2.data.body.subway.children)
      const formatSubway = this.formatPickerData(res2.data.body.subway)
      this.deepArea = new Array(formatArea, formatSubway)
    } catch (err) {
      console.error(err)
    }
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
/deep/.van-popup--left {
  top: 228px;
}
/deep/.van-popup {
  width: 375px;
  height: 328px;
}
/deep/.van-popup--left {
  bottom: -64px;
}
/deep/.van-popup--right {
  top: 50%;
  width: 375px !important;
  height: 702px !important;
  z-index: 99999 !important;
}
.btns {
  margin-top: 69px;
}
.loading {
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 295px 0;
  width: 375px;
  z-index: 99999;
}
</style>
