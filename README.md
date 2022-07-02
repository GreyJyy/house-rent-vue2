# house-rent-vue2

> This is my first project which was compeleted by myself.This project may be  simple, but it means a lot to me at this stage. hope I can become better.



## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
#   h o u s e - r e n t - v u e 2 


### Project Tree


```
house-rent-vue2
├─ .browserslistrc
├─ .editorconfig
├─ .eslintrc.js
├─ .gitignore
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ _
│     ├─ .gitignore
│     └─ husky.sh
├─ .prettierignore
├─ .prettierrc
├─ babel.config.js
├─ commitlint.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ src
│  ├─ api
│  │  └─ index.js
│  ├─ App.vue
│  ├─ assets
│  │  ├─ avatar.png
│  │  ├─ bg.png
│  │  ├─ choose.png
│  │  ├─ discount.png
│  │  ├─ doc.png
│  │  ├─ join.png
│  │  ├─ likes.png
│  │  ├─ my-avatar.png
│  │  └─ trick.png
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Layout.vue
│  │  │  ├─ RoomCard.vue
│  │  │  └─ TopBar.vue
│  │  └─ content
│  │     └─ Search
│  │        └─ FilterCondition.vue
│  ├─ main.js
│  ├─ mixin
│  │  └─ index.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  └─ index.js
│  ├─ styles
│  │  └─ cover.less
│  ├─ utils
│  │  ├─ citySort.js
│  │  ├─ debounce.js
│  │  ├─ formatData.js
│  │  └─ request.js
│  └─ views
│     ├─ Block
│     │  └─ index.vue
│     ├─ City
│     │  └─ index.vue
│     ├─ Collection
│     │  └─ index.vue
│     ├─ Detail
│     │  └─ index.vue
│     ├─ Home
│     │  └─ index.vue
│     ├─ Login
│     │  └─ index.vue
│     ├─ Map
│     │  └─ index.vue
│     ├─ News
│     │  └─ index.vue
│     ├─ Publish
│     │  └─ index.vue
│     ├─ Register
│     │  └─ index.vue
│     ├─ Rent
│     │  └─ index.vue
│     ├─ Search
│     │  └─ index.vue
│     └─ User
│        └─ index.vue
├─ vue.config.js
└─ yarn.lock

```
### 功能统计

- 登录（默认账号 heima 密码 123456）     -Login
- 注册     -Register
- 首页(底部tabbar对应的)      -Home
- 地图找房(首页中的功能)     -Map
- 找房(底部tabbar对应的)      -Search
- 我的(底部tabbar对应的)     -User
- 房源详情页     -Detail
- 发布房源(首页中的功能)      -Publish
- 我的房源     -Rent