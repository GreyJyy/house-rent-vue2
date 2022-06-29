import { sendImgData } from '@/api'
//多选高亮效果
export const highLight = {
  data() {
    return {
      highs: []
    }
  },
  methods: {
    getSup(val) {
      this.theSup += `${this.supportings[val]}|`
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
        console.log(this.uploader)
        console.log(this.uploader[0])
        this.uploader[0] = res.data.body[0]
      } catch (err) {
        console.error(err)
      }
    }
  }
}
