import { request } from '@/utils/request'
import store from '../store'
// user - 用户注册接口
/**
 *
 * @param {string} username (必需)注册用户名
 * @param {string} password (必需)注册密码
 * @returns Promise
 */
export const registerData = (username, password) =>
  request({
    url: '/user/registered',
    method: 'POST',
    data: { username, password }
  })

// user - 用户登录接口
/**
 *
 * @param {string} username (必需)登录用户名 默认可登录账号:heima
 * @param {string} password (必需)登录密码   默认可登录密码:123456
 * @returns Promise
 */
export const loginData = (username, password) =>
  request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })

// User - 获取用户的信息资料
/**
 *
 * @returns "body": {
    "avatar": "/img/avatar.png",
    "gender": "1",
    "nickname": "好客_46423",
    "phone": null,
    "id": 187
 */
export const getUserData = () =>
  request({
    url: '/user',
    method: 'GET',
    headers: {
      Authorization: store.state.LocationAbout.token
    }
  })

// User - 用户登出接口
/**
 *
 * @returns 用户登出时调用,但是这个接口也没有清空token,还要手动清除,我也不知道这个接口的意义是什么
 */
export const loginOutData = () =>
  request({
    url: '/user/logout',
    method: 'POST',
    headers: {
      Authorization: store.state.LocationAbout.token
    }
  })

// Home - 首页轮播图
/**
 *
 * @returns "body": [
    {
      "id": 1,
      "imgSrc": "/img/swiper/1.png",
      "alt": ""
    },
    {
      "id": 2,
      "imgSrc": "/img/swiper/2.png",
      "alt": ""
    },
    {
      "id": 3,
      "imgSrc": "/img/swiper/3.png",
      "alt": ""
    }
  ]
 */
export const getSwiperData = () =>
  request({
    url: '/home/swiper',
    method: 'GET'
  })
// Home - 租房小组
/**
 *
 * @param {string} area 地区id(vuex/LocationAbout-community)
 * @returns
 */
export const getGroupData = (area = 'AREA|88cff55c-aaa4-e2e0') =>
  request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area
    }
  })

// Search -获取房屋查询条件(有问题)
/**
 *
 * @param {string} id (必需)地区id(vuex/LocationAbout-community)
 * @returns
 */
export const getQueryConditionData = (id = 'AREA|88cff55c-aaa4-e2e0') =>
  request({
    url: '/houses/condition',
    method: 'GET',
    params: { id }
  })
// Search - 根据条件查询房屋
/**
 *
 * @param {string} cityId (必需)城市id
 * @param {string} area 地区id(vuex/LocationAbout-community)
 * @param {string} subway 地铁
 * @param {boolean} rentType 是否整租,默认true
 * @param {*} price 价格,默认null
 * @param {*} more 复合查询,eg: 'CHAR|76eb0532-8099-d1f4,FLOOR|1,AREA|88cff55c-aaa4-e2e0,ORIEN|61e99445-e95e-7f37,true'
 * @param {*} roomType 房屋类型
 * @param {*} oriented 朝向
 * @param {*} characteristic 标签
 * @param {*} floor 楼层
 * @param {*} start 开始项
 * @param {*} end 结束项
 * @returns
 */
export const getHouseData = (
  cityId = 'AREA|88cff55c-aaa4-e2e0',
  area = null,
  subway = null
  // rentType = true,
  // price = null,
  // more = 'CHAR|76eb0532-8099-d1f4,FLOOR|1,AREA|88cff55c-aaa4-e2e0,ORIEN|61e99445-e95e-7f37,true',
  // roomType = 'ROOM|d1a00384-5801-d5cd',
  // oriented = 'ORIEN|61e99445-e95e-7f37',
  // characteristic = 'CHAR|76eb0532-8099-d1f4',
  // floor = 'FLOOR|1',
  // start = 1,
  // end = 20
) =>
  request({
    url: '/houses',
    method: 'GET',
    params: {
      cityId,
      area,
      subway
      // rentType,
      // price,
      // more,
      // roomType,
      // oriented,
      // characteristic,
      // floor,
      // start,
      // end
    }
  })

// Rent - 查看已发布房源列表
/**
 *
 * @returns 根据本地token获取用户已发布房源数据
 *  "body": [
    {
      "houseImg": "/uploads/upload_4e30b748fd5b8b701129c87ec8335ff4.png",
      "title": "二二",
      "tags": [
        "近地铁"
      ],
      "price": 4000,
      "desc": "三室/100/东/",
      "houseCode": "15cd9443-d251-92c2"
    }
  ]
 */
export const checkPublishedRoomData = () =>
  request({
    url: '/user/houses',
    method: 'GET',
    headers: {
      Authorization: store.state.LocationAbout.token
    }
  })

// City - 获取城市列表数据
/**
 *
 * @param {number} level (必需)城市级别,1代表所有城市,2代表城市下区的数据
 * @returns   "body": [
    {
      "label": "北京",
      "value": "AREA|88cff55c-aaa4-e2e0",
      "pinyin": "beijing",
      "short": "bj"
    }
  ]
 */
export const getCityListData = (level = 1) =>
  request({
    url: '/area/city',
    method: 'GET',
    params: { level }
  })

// City - 获取热门城市数据
export const getHotListData = () =>
  request({
    url: '/area/hot',
    method: 'GET'
  })

// City - 根据城市名称查询该城市信息
/**
 *
 * @param {string} name 需要查询的城市名称
 * @returns   "body": {
    "label": "北京",
    "value": "AREA|88cff55c-aaa4-e2e0"
  }
 */
export const queryCityNameData = (name) =>
  request({
    url: '/area/info',
    method: 'GET',
    params: { name }
  })

// Publish 小区关键字查询
/**
 *
 * @param {string} name 查询关键字
 * @param {string} id  当前定位城市id
 * @returns  "body": [
    {
      "city": "AREA|88cff55c-aaa4-e2e0",
      "cityName": "北京",
      "area": "AREA|69cc5f6d-4f29-a77c",
      "areaName": "朝阳",
      "street": "AREA|aaa638e8-8a5e-e9ce",
      "streetName": "望京",
      "community": "AREA|14786479-ddb5-1bf2",
      "communityName": "北京香颂"
    },
 */
export const queryBlockData = (name, id) =>
  request({
    url: '/area/community',
    method: 'GET',
    params: { name, id }
  })

// Publish 发布房源
/**
 *
 * @param {string} title 房源信息标题
 * @param {string} description 房源概述
 * @param {string} houseImg 房源图片,在这里通过uploader本地上传给传图接口,然后拿到传图接口返回的图片数据格式作为本接口的图片参数
 * @param {string} oriented 朝向
 * @param {string} supporting 房屋配置,在这里格式为'配置1|配置2|配置3'
 * @param {string} price 房屋价格
 * @param {string} roomType 房型
 * @param {string} size 房屋面积
 * @param {string} floor 楼层
 * @param {string} community 地区id(vuex/LocationAbout-community)
 * @returns
 */
export const publishRoomData = (
  title,
  description,
  houseImg,
  oriented,
  supporting,
  price,
  roomType,
  size,
  floor,
  community
) =>
  request({
    url: '/user/houses',
    method: 'POST',
    headers: {
      Authorization: store.state.LocationAbout.token
    },
    data: {
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    }
  })

//Block - 发布房屋所需的条件
/**
 *
 * @returns  "body": {
    "floor": [
      {
        "label": "高楼层",
        "value": "FLOOR|1"
      }
    ],
    "supporting": [
      {
        "label": "电视",
        "value": "SBac4167b0-cf6a-6198"
      }
    ],
    "oriented": [
      {
        "label": "东",
        "value": "ORIEN|141b98bf-1ad0-11e3"
      }
    ],
    "roomType": [
      {
        "label": "三室",
        "value": "ROOM|20903ae0-c7bc-f2e2"
      }
    ]
  }
}
 */
export const getQueryParamsData = () =>
  request({
    url: '/houses/params',
    method: 'GET',
    headers: {
      Authorization: store.state.LocationAbout.token
    }
  })

// RoomCard - 查询房屋具体信息
/**
 *
 * @param {string} id houseCode 房屋具体code值
 * @returns "body": {
    "houseImg": [
      "/newImg/7bjda81jh.jpg",
    ],
    "title": "整租 · 御景新世界",
    "tags": [
      "精装",
    ],
    "price": 16500,
    "houseCode": "5cc4494549926d0e2b94c816",
    "description": "【房源亮点】 此房所在园区...",
    "roomType": "三室",
    "oriented": [
      "南"
    ],
    "floor": "中楼层",
    "community": "御景新世界",
    "coord": {
      "latitude": "41.757876",
      "longitude": "123.428481"
    },
    "supporting": [
      "电视"
    ],
    "size": 65
  }
}
 */
export const getCertainRoomData = (id) =>
  request({
    url: `/houses/${id}`,
    method: 'GET'
  })

// Publish 房屋图像上传
/**
 *
 * @param {object} file (必需)FormData的键名
 * @returns
 */
export const sendImgData = (file) =>
  request({
    url: '/houses/image',
    method: 'POST',
    data: file
  })
