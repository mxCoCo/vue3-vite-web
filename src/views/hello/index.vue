<template>
  <div class="aa">{{ name }}</div>
  <el-button type="primary" @click="name = '张三1'">按钮</el-button>
  <el-button type="primary" @click="store.saveName('李四')"
    >修改名字：李四</el-button
  >
  <div class="aa">{{ age }}</div>
  <div class="aa">{{ getAddAge }}</div>
  <div class="aa">{{ getAddParamsAge(1000) }}</div>
  <el-button type="primary" @click="age = 18">按钮1</el-button>
  <el-icon><Mic /></el-icon>
  <el-button type="primary" @click="reset">重置</el-button>
  <el-button type="primary" @click="patchStore">批量更新</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUsersStore } from '@/store/user'
import { storeToRefs } from 'pinia'
const store = useUsersStore()
const { name, age, getAddAge, getAddParamsAge } = storeToRefs(store)

let user = ref({
  name: 'zs',
  age: 18,
})
const reset = () => {
  store.$reset()
}
// 法一
const patchStore = () => {
  store.$patch({
    name: '张三',
    age: 100,
  })
}
// 法二（推荐）
const patchStore2 = () => {
  store.$patch((state) => {
    state.name = '张三'
    state.age = 99
  })
}
</script>

<style lang="less" scoped>
.aa {
  color: @color;
}
</style>
