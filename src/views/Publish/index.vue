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
        :placeholder="area"
        v-model="area"
        @click="$router.push({ name: 'block' })"
      />
      <van-field
        v-model="price"
        name="租金"
        label="租金"
        placeholder="请输入租金/月"
      />
      <van-field
        v-model="size"
        name="建筑面积"
        label="建筑面积"
        placeholder="请输入建筑面积"
      />
      <div v-for="(item, index) in fields" :key="index">
        <van-field
          readonly
          clickable
          name="picker"
          :value="
            item === '户型' ? roomType : item === '所在楼层' ? floor : oriented
          "
          :label="item"
          placeholder="请选择"
          @click="changePicker(item)"
        ></van-field>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>

      <!-- ----------------------------------------------------------------------------------------------------- -->
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
          v-for="(value, index) in this.supportings"
          :key="index"
          icon="photo-o"
          :text="value"
          :class="{ highlight: highs.includes(value) }"
          @click="formatSup(value)"
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
import { getQueryParamsData, publishRoomData } from '@/api'
import { highLight, sendImg } from '@/mixin'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      //用于遍历生成选择器
      fields: ['户型', '所在楼层', '朝向'],
      price: '',
      size: '',
      title: '',
      desc: '',
      columns: [],
      roomType: '',
      floor: '',
      oriented: '',
      sups: '',
      typeValue: '',
      floorValue: '',
      orientedValue: '',
      showPicker: false
    }
  },
  computed: {
    ...mapState('PublishAbout', [
      'types',
      'typeValues',
      'floors',
      'floorValues',
      'directions',
      'directionValues',
      'supportings',
      'supportingValues'
    ]),
    ...mapState('LocationAbout', ['area'])
  },
  mixins: [highLight, sendImg],
  async created() {
    try {
      const res = await getQueryParamsData()
      const main = res.data.body
      const labels = [],
        values = []
      for (const key in main) {
        labels.push(this.mapCols(main, key, 'label'))
        values.push(this.mapCols(main, key, 'value'))
      }
      this.$store.commit('PublishAbout/SAVE_LABELS', labels)
      this.$store.commit('PublishAbout/SAVE_VALUES', values)
    } catch (err) {
      console.error(err)
    }
  },
  methods: {
    //遍历生成数据的函数
    mapCols(source, type, attr) {
      return source[type].map((item) => item[attr])
    },
    changePicker(item) {
      this.columns =
        item === '户型'
          ? this.types
          : item === '所在楼层'
          ? this.floors
          : this.directions
      this.showPicker = true
    },
    onConfirm(val, ind) {
      //判断点击的是哪一个选择器,把对应的名称显示在页面上并且保存对应名称的value用于发起网络请求
      if (this.types.includes(val)) {
        this.roomType = val
        this.typeValue = this.typeValues[ind]
      } else if (this.floors.includes(val)) {
        this.floor = val
        this.floorValue = this.floorValues[ind]
      } else {
        this.oriented = val
        this.orientedValue = this.directionValues[ind]
      }
      this.showPicker = false
    },
    async onSubmit() {
      //判断是否输入了必要信息,如果没有则不发起请求
      if (
        !this.title ||
        this.uploader.length === 0 ||
        this.price <= 0 ||
        this.size <= 0
      ) {
        Toast.fail('请输入完整房源信息')
        return
      }

      //格式化成接口要求的数据格式,删除末尾的'|'
      this.sups = this.sups.substring(0, this.sups.length - 1)
      try {
        const res = await publishRoomData(
          this.title,
          this.desc,
          this.uploader[0],
          this.orientedValue,
          this.sups,
          this.price,
          this.typeValue,
          this.size,
          this.floorValue,
          this.id
        )
        console.log(res)
        Dialog.confirm({
          title: '发布成功',
          message: '点击确认前去查看,点击取消可继续发布'
        })
          .then(() => {
            this.$router.push({ name: 'search' })
          })
          .catch(() => {
            this.$router.go(0)
          })
      } catch (err) {
        console.error(err)
        Toast.fail('请求发送失败请联系客服')
      }
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
