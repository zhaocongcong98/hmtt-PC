// 提供 存储用户信息的相关API
// 约定：key=hm-toutiao-pc-84-user-key

const KEY = 'hmtt'
const local = {
  // 存储
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    // eslint-disable-next-line no-undef
    return JSON.parse(jsonStr)
  },
  // 清除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
