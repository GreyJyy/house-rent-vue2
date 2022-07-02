//处理级联数据(多层children子集嵌套要求深度一致)
export function handleDeepData(source) {
  source.forEach((item) => {
    item.children
      ? //如果存在children键名,则递归调用
        this.handleDeepData(item.children)
      : //如果不存在 设置空的children
        (item.children = [{ text: '' }])
  })
}
//转换picker级联要求的数据格式(text&children)
export function formatPickerData(obj) {
  //将所有label键名替换为text
  const reg = /label/gi
  const formatStr = JSON.stringify(obj).replace(reg, 'text')
  //转化为对象格式返回
  return JSON.parse(formatStr)
}
