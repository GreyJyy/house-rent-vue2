module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        //自定义vant样式第一步
        style: (name) => `${name}/style/less`
      },
      'vant'
    ]
  ]
}
