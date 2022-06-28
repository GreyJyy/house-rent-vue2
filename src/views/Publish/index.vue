<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.go(-1)" />
    <div class="list-header">房源信息</div>
    <van-form>
      <van-field
        disabled
        name="小区名称"
        label="小区名称"
        :placeholder="$store.state.area"
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
        :value="value"
        label="户型"
        placeholder="请选择"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="所在楼层"
        placeholder="请选择"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="朝向"
        placeholder="请选择"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
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
      <div class="icons">
        <span class="box"
          ><van-icon name="location" />
          <p>衣柜</p></span
        >
        <span class="box"
          ><van-icon name="like" />
          <p>洗衣机</p></span
        >
        <span class="box"
          ><van-icon name="star" />
          <p>空调</p></span
        >
        <span class="box"
          ><van-icon name="phone" />
          <p>天然气</p></span
        >
        <span class="box"
          ><van-icon name="fire" />
          <p>冰箱</p></span
        >
      </div>
      <div class="icons">
        <span class="box"
          ><van-icon name="cart" />
          <p>燃气</p></span
        >
        <span class="box"
          ><van-icon name="setting" />
          <p>电视</p></span
        >
        <span class="box"
          ><van-icon name="gem" />
          <p>热水器</p></span
        >
        <span class="box"
          ><van-icon name="gift" />
          <p>沙发</p></span
        >
        <span class="box"
          ><van-icon name="bag" />
          <p>宽带</p></span
        >
      </div>

      <div class="desc">房屋描述</div>
      <textarea placeholder="请输入房屋描述内容" v-model="desc"></textarea>
      <div class="btns">
        <van-button block>取消</van-button>
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { publishRoomData, getQueryParamsData } from '@/api'
export default {
  data() {
    return {
      price: '',
      area: '',
      value: '',
      columns: ['一室', '二室', '三室', '四室', '四室+'],
      showPicker: false,
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      title: '',
      desc: ''
    }
  },
  async created() {
    const res = await getQueryParamsData()
    console.log(res)
  },
  methods: {
    afterRead(file) {
      this.uploader = file
      console.log(file)
    },
    async onConfirm() {
      const res = await publishRoomData(this.title, this.desc.this.uploader)
      console.log(res)
      this.showPicker = false
    }
  }
}
</script>
<style scoped>
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
.icons {
  display: flex;
}
.box {
  flex: 1;
  height: 50px;
  font-size: 16px;
  text-align: center;
  padding: 8px 0;
}
textarea {
  width: 100%;
  height: 100px;
}
textarea::placeholder {
  font-size: 14px;
  padding: 8px;
}
</style>
