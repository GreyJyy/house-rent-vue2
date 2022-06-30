import { sendImgData, getQueryParamsData } from '@/api'
//多选高亮效果
/* 使用方法:
1.定义高亮样式
.highlight {
  color: #21b97a;
  border: 1px solid #21b97a;
}
2.绑定点击事件
@click="formatSup(item)"
3.定义动态class
:class="{ highlight: highs.includes(item) }"
*/
export const highLight = {
  data() {
    return {
      highs: [],
      sups: ''
    }
  },
  methods: {
    formatSup(val) {
      this.sups += `${val}|`
      //每次点击前判断数组里是否已经存放了这个元素
      if (this.highs.some((item) => item === val)) {
        //如果有,获取这个元素对应的索引位置并删除
        const index = this.highs.indexOf(val)
        this.highs.splice(index, 1)
        return
      }
      //如果没有则添加元素进数组
      this.highs.push(val)
    }
  }
}

//uploader组件上传图片
export const sendImg = {
  data() {
    return {
      uploader: []
    }
  },
  methods: {
    //将图片上传到接口拿到数据用于submit提交
    async afterRead(file) {
      try {
        const res = await sendImgData(file.file)
        this.uploader[0] = res.data.body[0]
      } catch (err) {
        console.error(err)
      }
    }
  }
}

//将房源查询条件存储到vuex进行状态管理(在发布房源和搜索页面的筛选区域都需要使用这里的数据)
export const sendConditionToVuex = {
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
    }
  }
}
