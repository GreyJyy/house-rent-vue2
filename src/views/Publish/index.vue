<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-arrow
      @click-left="$router.push({ name: 'home' })"
    />
    <div class="list-header">房源信息</div>
    <van-form @submit="onSubmit">
      <!-- 小区名称 -->
      <van-field
        disabled
        name="小区名称"
        label="小区名称"
        placeholder="请输入小区名称"
        v-model="communityName"
        @click="$router.push({ name: 'block' })"
      />
      <!-- 租金 -->
      <van-field
        v-model="baseInfo.price"
        name="租金"
        label="租金"
        placeholder="请输入租金/月"
      />
      <!-- 建筑面积 -->
      <van-field
        v-model="baseInfo.size"
        name="建筑面积"
        label="建筑面积"
        placeholder="请输入建筑面积"
      />
      <!-- 户型/楼层/朝向 value属性动态绑定-->
      <div v-for="(item, index) in fields" :key="index">
        <van-field
          readonly
          clickable
          name="picker"
          :value="
            item === '户型'
              ? typeInfo.label
              : item === '所在楼层'
              ? floorInfo.label
              : orientedInfo.label
          "
          :label="item"
          placeholder="请选择"
          @click="changePicker(item)"
        ></van-field>
        <!-- 选择器选项 -->
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
      <!-- 房屋标题 -->
      <van-field
        v-model="baseInfo.title"
        name="房屋标题"
        placeholder="请输入标题(例如:整租 小区名 2室 5000元)"
      />
      <!-- 房屋图像 -->
      <div class="pic">房屋图像</div>
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="uploader" multiple :after-read="afterRead" />
        </template>
      </van-field>
      <!-- 房屋配置 -->
      <div class="tools">房屋配置</div>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, index) in publishConditions.supporting"
          :key="index"
          icon="photo-o"
          :text="item.label"
          :class="{ highlight: highs.includes(item.label) }"
          @click="concatSupporting(item.label)"
        ></van-grid-item>
      </van-grid>
      <div class="desc">房屋描述</div>
      <!-- 房屋描述 -->
      <textarea
        placeholder="请输入房屋描述内容"
        v-model="baseInfo.description"
      ></textarea>
      <!-- 取消和提交按钮 -->
      <div class="btns">
        <!-- 这里需要阻止默认提交事件,否则点击取消也会发网络请求 -->
        <van-button block @click.prevent="cancel">取消</van-button>
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { getPublishParamsData, publishRoomData } from '@/api'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { mapState } from 'vuex'
//高亮,上传图片
import { highLight, sendImg } from '@/mixin'
export default {
  data() {
    return {
      fields: ['户型', '所在楼层', '朝向'], //用于渲染三个选择器
      baseInfo: {
        price: '', //价格
        size: '', //面积
        title: '', //标题
        description: '' //描述
      },
      columns: [], //选择器配置项
      publishConditions: {}, //发布房源所需条件的集合
      typeInfo: {}, //选中的户型信息
      floorInfo: {}, //选中的楼层信息
      orientedInfo: {}, //选中的朝向信息
      showPicker: false, //控制选择器的显示隐藏
      supportingStr: '' //存放处理过后的房屋配置数据格式,eg:'冰箱|空调'
    }
  },
  computed: {
    ...mapState('LocationAbout', ['communityName', 'community'])
  },
  mixins: [highLight, sendImg],
  methods: {
    //定义一个用于判断目标元素是否存在于对应房源发布条件数组中的函数,如果存在直接返回该元素,否则返回undefined
    judgment(targetArrName, val) {
      return this.publishConditions[targetArrName].find(
        (item) => item.label === val
      )
    },
    //通过判断传入的item名来切换对应的选择器配置项
    changePicker(item) {
      this.columns =
        item === '户型'
          ? this.publishConditions.roomType.map((item) => item.label)
          : item === '所在楼层'
          ? this.publishConditions.floor.map((item) => item.label)
          : this.publishConditions.oriented.map((item) => item.label)
      this.showPicker = true
    },
    //点击选择器确认时判断把点击的值存进哪一个对象中
    onConfirm(val) {
      this.judgment('roomType', val)
        ? (this.typeInfo = this.judgment('roomType', val))
        : this.judgment('floor', val)
        ? (this.floorInfo = this.judgment('floor', val))
        : (this.orientedInfo = this.judgment('oriented', val))
      this.showPicker = false
    },
    // //拼接字符串的函数,eg:'冰箱|空调|网络|'
    concatSupporting(name) {
      this.highLight(name)
      this.supportingStr += `${name}|`
    },
    //删除字符串末尾分隔符的函数,eg:'冰箱|空调|网络'
    formatSupportings(names) {
      return names.substring(0, names.length - 1)
    },
    async onSubmit() {
      if (this.uploader.length === 0) return Toast.fail('请上传房屋信息')
      //格式化房屋配置项参数
      this.supportingStr = this.formatSupportings(this.supportingStr)
      try {
        await publishRoomData(
          this.baseInfo.title,
          this.baseInfo.description,
          this.uploader.join('|'),
          // this.imgs.join('|'),
          this.orientedInfo.value,
          this.supportingStr,
          this.baseInfo.price,
          this.typeInfo.value,
          this.baseInfo.size,
          this.floorInfo.value,
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
  },
  async created() {
    try {
      //获取发布房源所需条件
      const res = await getPublishParamsData()
      this.publishConditions = res.data.body
    } catch (err) {
      console.error(err)
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
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
