const key = 'grey-key'
const getToken = () => localStorage.getItem(key)
const setToken = (value) => localStorage.setItem(key, value)
const removeToken = () => localStorage.removeItem(key)
export { getToken, setToken, removeToken }
