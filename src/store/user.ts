import { defineStore } from 'pinia'
export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      name: '李华',
      age: 25,
      sex: '男',
    }
  },
  getters: {
    getAddAge: (state) => {
      // 返回state中age值，并+100
      return state.age + 100
    },
    getNameAndAge(): string {
      return this.name + this.getAddAge // 调用其它getter
    },
    getAddParamsAge: (state) => {
      return (params: number) => state.age + 100 + params
    },
  },
  actions: {
    saveName(name: string) {
      // 修改state中的name
      this.name = name
    },
  },
})
