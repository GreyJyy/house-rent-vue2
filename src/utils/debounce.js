let result,
  timeout = null
/**
 *
 * @param {function} callback //需要执行的回调函数
 * @param {number} delay //推迟时间
 * @param {boolean} immediate //是否立即执行
 * @returns
 */
export default function debounce(callback, delay, immediate) {
  const debounced = function (...args) {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if (callNow) {
        result = callback.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => {
        callback.apply(this, args)
      }, delay)
    }
    return result
  }
  //取消防抖
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
