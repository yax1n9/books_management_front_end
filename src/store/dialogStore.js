import {defineStore} from "pinia";

const useDialogStore = defineStore('dialogStore', {
  state: () => ({
    bookPageDialogVisible: false
  }),
  getters: {},
  actions: {}
})

export default useDialogStore
