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
        :placeholder="communityName"
        v-model="communityName"
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
      <div class="title">房屋标题</div>
      <van-field
        v-model="title"
        name="房屋标题"
        placeholder="请输入标题(例如:整租 小区名 2室 5000元)"
      />
      <div class="pic">房屋图像</div>
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="uploader" multiple :after-read="afterRead" />
        </template>
      </van-field>
      <div class="tools">房屋配置</div>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(value, index) in main.supporting"
          :key="index"
          icon="photo-o"
          :text="value.label"
          :class="{ highlight: highs.includes(value.label) }"
          @click="concatSupporting(value.label)"
        ></van-grid-item>
      </van-grid>
      <div class="desc">房屋描述</div>
      <textarea placeholder="请输入房屋描述内容" v-model="desc"></textarea>
      <div class="btns">
        <!-- 这里需要阻止默认提交事件,否则会发网络请求 -->
        <van-button block @click.prevent="cancel">取消</van-button>
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { publishRoomData } from '@/api'
import { highLight, sendConditionToVuex, sendImg } from '@/mixin'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      //用于渲染三个选择器
      fields: ['户型', '所在楼层', '朝向'],
      //价格
      price: '',
      //面积
      size: '',
      //标题
      title: '',
      //描述
      desc: '',
      //选择器配置项
      columns: [],
      //选中的户型名
      roomType: '',
      //选中的楼层名
      floor: '',
      //选中的朝向名
      oriented: '',
      //选中的户型对应value
      typeValue: '',
      //选中的楼层对应value
      floorValue: '',
      //选中的朝向对应value
      orientedValue: '',
      //控制选择器的显示隐藏
      showPicker: false,
      //存放处理过后的房屋配置数据格式,eg:'冰箱|空调'
      supportings: ''
    }
  },
  computed: {
    ...mapState('PublishAbout', ['main']),
    ...mapState('LocationAbout', ['communityName', 'community'])
  },
  mixins: [highLight, sendConditionToVuex, sendImg],
  methods: {
    changePicker(item) {
      //通过判断传入的item名来切换对应的选择器配置项
      this.columns =
        item === '户型'
          ? this.main.roomType.map((item) => item.label)
          : item === '所在楼层'
          ? this.main.floor.map((item) => item.label)
          : this.main.oriented.map((item) => item.label)
      this.showPicker = true
    },
    onConfirm(val, ind) {
      //通过判断当前选中的选项名是否出现在main的roomType/floor/oriented数组中来确定给哪个value赋值
      if (this.main.roomType.map((item) => item.label).includes(val)) {
        this.roomType = val
        this.typeValue = this.main.roomType[ind].value
      } else if (this.main.floor.map((item) => item.label).includes(val)) {
        this.floor = val
        this.floorValue = this.main.floor[ind].value
      } else {
        this.oriented = val
        this.orientedValue = this.main.oriented[ind].value
      }
      this.showPicker = false
    },
    //每次点击将对应房屋配置项拼接到字符串中,eg:'冰箱|空调|网络|'
    concatSupporting(name) {
      this.supportings += `${name}|`
      this.highLight(name)
    },
    //按照接口要求删除房屋配置项最后多余的分隔符,eg:'冰箱|空调|网络'
    formatSupportings(names) {
      return names.substring(0, names.length - 1)
    },
    async onSubmit() {
      if (this.uploader.length === 0) return Toast.fail('请上传房屋信息')
      //格式化房屋配置项参数
      this.supportings = this.formatSupportings(this.supportings)
      try {
        await publishRoomData(
          this.title,
          this.desc,
          this.uploader.join('|'),
          // this.imgs.join('|'),
          this.orientedValue,
          this.supportings,
          this.price,
          this.typeValue,
          this.size,
          this.floorValue,
          this.community
        )
        Dialog.confirm({
          title: '发布成功',
          message: '点击确认前去查看,点击取消可继续发布'
        })
          .then(() => {
            //点击确认跳转到找房页面
            this.$router.push({ name: 'search' })
          })
          .catch(() => {
            //点击取消停留在当前页面
            this.$router.go(0)
          })
      } catch (err) {
        console.error(err)
        Toast.fail('发布失败')
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
.van-uploader__file {
  display: none;
}
</style>
