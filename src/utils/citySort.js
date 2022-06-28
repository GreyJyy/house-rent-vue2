export default (cities) => {
  //生成26个大写字母数组
  const alphabet = Array.from(new Array(26), (_, index) =>
    String.fromCharCode(65 + index)
  )
  const obj = {}
  alphabet.forEach((item) => {
    obj[item] = []
    //遍历后台返回的数据进行处理,将首字母一样的归为一类以对象形式返回
    cities.forEach((item2) => {
      if (item2.short[0].toUpperCase() === item) obj[item].push(item2)
    })
  })
  return obj
}
