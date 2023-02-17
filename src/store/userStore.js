import {defineStore} from "pinia";

const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      // 权限默认为普通
      role: 'user',
      user: {}
    }
  },
  getters: {},
  actions: {}
})


export default useUserStore
