<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push({ name: 'home' })"
    />
    <div class="list-header">房源信息</div>
    <van-form @submit="onSubmit">
      <van-field
        disabled
        name="小区名称"
        label="小区名称"
        :placeholder="$store.state.area"
        v-model="$store.state.area"
        @click="$router.push({ name: 'block' })"
      />
      <van-field
        v-model="price"
        name="租金"
        label="租金"
        placeholder="请输入租金/月"
      />
      <van-field
        v-model="area"
        name="建筑面积"
        label="建筑面积"
        placeholder="请输入建筑面积"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="value1"
        label="户型"
        placeholder="请选择"
        @click="changePicker(1)"
      />
      <van-popup v-model="showPicker" position="bottom" v-if="flag === 1">
        <van-picker
          show-toolbar
          :columns="columns1"
          @confirm="onConfirm1"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value2"
        label="所在楼层"
        placeholder="请选择"
        @click="changePicker(2)"
      />
      <van-popup v-model="showPicker" position="bottom" v-if="flag === 2">
        <van-picker
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm2"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value3"
        label="朝向"
        placeholder="请选择"
        @click="changePicker(3)"
      />
      <van-popup v-model="showPicker" position="bottom" v-if="flag === 3">
        <van-picker
          show-toolbar
          :columns="columns3"
          @confirm="onConfirm3"
          @cancel="showPicker = false"
        />
      </van-popup>
      <div class="title">房屋标题</div>
      <van-field
        v-model="title"
        name="房屋标题"
        placeholder="请输入标题(例如:整租 小区名 2室 5000元)"
      />
      <div class="pic">房屋图像</div>
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" :after-read="afterRead" />
        </template>
      </van-field>
      <div class="tools">房屋配置</div>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(value, index) in supportings"
          :key="index"
          icon="photo-o"
          :text="value"
          :class="{ highlight: highs.includes(index) }"
          @click="getSup(index)"
        ></van-grid-item>
      </van-grid>
      <div class="desc">房屋描述</div>
      <textarea placeholder="请输入房屋描述内容" v-model="desc"></textarea>
      <div class="btns">
        <van-button block @click="cancel">取消</van-button>
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
//这个页面写的很差,很垃圾特别垃圾,后面再优化吧
import { getQueryParamsData, publishRoomData } from '@/api'
import { highLight, sendImg } from '@/mixin'
export default {
  data() {
    return {
      price: '',
      area: '',
      value1: '',
      value2: '',
      value3: '',
      columns1: [],
      val1: [],
      v1: '',
      columns2: [],
      val2: [],
      v2: '',
      columns3: [],
      val3: [],
      v3: '',
      supportings: [],
      theSup: '',
      showPicker: false,
      title: '',
      desc: '',
      flag: 0
    }
  },
  mixins: [highLight, sendImg],
  async created() {
    try {
      const res = await getQueryParamsData()
      this.columns1 = res.data.body.roomType.map((item) => item.label)
      this.val1 = res.data.body.roomType.map((item) => item.value)
      this.columns2 = res.data.body.floor.map((item) => item.label)
      this.val2 = res.data.body.floor.map((item) => item.value)
      this.columns3 = res.data.body.oriented.map((item) => item.label)
      this.val3 = res.data.body.oriented.map((item) => item.value)
      this.supportings = res.data.body.supporting.map((item) => item.label)
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    changePicker(flag) {
      this.showPicker = true
      this.flag = flag
    },
    onConfirm1(val, index) {
      this.value1 = val
      this.v1 = this.val1[index]
      console.log(this.v1)
      this.showPicker = false
    },
    onConfirm2(val, index) {
      this.value2 = val
      this.v2 = this.val2[index]
      this.showPicker = false
    },
    onConfirm3(val, index) {
      this.value3 = val
      this.v3 = this.val3[index]
      this.showPicker = false
    },
    async onSubmit() {
      const res = await publishRoomData(
        this.title,
        this.desc,
        this.uploader[0],
        this.v3,
        this.theSup.substring(0, this.theSup.length - 1),
        this.price,
        this.v1,
        this.area,
        this.v2,
        this.$store.state.id
      )
      console.log(res)
    },
    cancel() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style scoped lang="less">
.list-header {
  padding: 15px 15px 9px;
  width: 100%;
  font-size: 15px;
  color: #21b97a;
  background-color: #fff;
}
.title,
.pic,
.tools,
.desc {
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  color: #646566;
  padding-left: 16px;
}
.btns {
  display: flex;
}
textarea {
  width: 100%;
  height: 100px;
}
textarea::placeholder {
  font-size: 14px;
  padding: 8px;
}
.van-grid-item {
  /* 不加透明边框会导致点击高亮盒子抖动 */
  border: 1px solid transparent;
}
.highlight {
  color: #21b97a;
  border: 1px solid #21b97a;
}
</style>
