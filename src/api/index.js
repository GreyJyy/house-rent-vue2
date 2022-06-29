import { request } from '@/utils/request'
import { getToken } from '@/utils/token'

// user - 用户注册接口
/**
 *
 * @param {string} username 注册用户名
 * @param {string} password 注册密码
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
 * @param {string} username 登录用户名 默认可登录账号:heima
 * @param {string} password 登录密码   默认可登录密码:123456
 * @returns Promise
 */
export const loginData = (username, password) =>
  request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })

// User - 获取用户的信息资料
export const getUserData = () =>
  request({
    url: '/user',
    method: 'GET',
    headers: {
      Authorization: getToken()
    }
  })

// User - 用户登出接口
export const loginOutData = () =>
  request({
    url: '/user/logout',
    method: 'POST',
    headers: {
      Authorization: getToken()
    }
  })

// Home - 首页轮播图
export const getSwiperData = () =>
  request({
    url: '/home/swiper',
    method: 'GET'
  })
// Home - 租房小组
/**
 *
 * @param {string} area 区域id(由后台数据库返回)
 * @returns
 */
export const getGroupData = (area) =>
  request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area
    }
  })

// Search -获取房屋查询条件
/**
 *
 * @param {string} id 区域id(由后台数据库返回)
 * @returns
 */
export const getQueryConditionData = (id = 'AREA|88cff55c-aaa4-e2e0') =>
  request({
    url: '/houses/condition',
    method: 'GET',
    params: { id }
  })
// Search - 根据条件查询房屋
export const getHouseData = (
  cityId = 'AREA|88cff55c-aaa4-e2e0',
  area = 'AREA|88cff55c-aaa4-e2e0',
  subway = '',
  rentType = true,
  price = null,
  more = 'CHAR|76eb0532-8099-d1f4,FLOOR|1,AREA|88cff55c-aaa4-e2e0,ORIEN|61e99445-e95e-7f37,true',
  roomType = 'ROOM|d1a00384-5801-d5cd',
  oriented = 'ORIEN|61e99445-e95e-7f37',
  characteristic = 'CHAR|76eb0532-8099-d1f4',
  floor = 'FLOOR|1',
  start = 1,
  end = 20
) =>
  request({
    url: '/houses',
    method: 'GET',
    params: {
      cityId,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      start,
      end
    }
  })

// Rent - 查看已发布房源列表
export const checkPublishedRoomData = () =>
  request({
    url: '/user/houses',
    method: 'GET',
    headers: {
      Authorization: getToken()
    }
  })

// City - 获取城市列表数据
/**
 *
 * @param {number} level 城市级别,1代表一级城市,2代表子城市
 * @returns
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
 * @returns
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
 * @param {string} id  区域id(由后台数据库返回)
 * @returns
 */
export const queryBlockData = (name, id) =>
  request({
    url: '/area/community',
    method: 'GET',
    params: { name, id }
  })

// Publish 发布房源
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
      Authorization: getToken()
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

//Block - 获取房源所需要的条件
export const getQueryParamsData = () =>
  request({
    url: '/houses/params',
    method: 'GET',
    headers: {
      Authorization: getToken()
    }
  })

// RoomCard - 查询房屋具体信息
/**
 *
 * @param {string} id houseCode 房屋具体code值
 * @returns
 */
export const getCertainRoomData = (id) =>
  request({
    url: `/houses/${id}`,
    method: 'GET'
  })
