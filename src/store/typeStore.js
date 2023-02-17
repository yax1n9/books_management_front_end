import {defineStore} from "pinia";
import {getTypes} from '../api/index'

const useTypeStore = defineStore('typeStore', {
  state: () => ({
    typeList: []
  }),
  getters: {},
  actions: {
    async getTypeList() {
      const res = await getTypes()
      if (res.data.code === 200) {
        this.typeList = res.data.data
      }
    }
  }
})

export default useTypeStore
