import {defineStore} from "pinia";

const useDialogStore = defineStore('dialogStore', {
  state: () => ({
    // 增加删除
    bookPageDialogVisible: false,
    // 订阅
    subscribeDialogVisible: false
  }),
  getters: {},
  actions: {}
})

export default useDialogStore
