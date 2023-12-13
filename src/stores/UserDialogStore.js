import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserDialogStore = defineStore('userDialog', () => {
  const userDialogVisible = ref(false)
  const loginVisible = ref(false)
  const registerVisible = ref(false)
  const forgetVisible = ref(false)

  function login() {
    userDialogVisible.value = true
    loginVisible.value = true
    registerVisible.value = false
    forgetVisible.value = false
  }

  function register() {
    userDialogVisible.value = true
    loginVisible.value = false
    registerVisible.value = true
    forgetVisible.value = false
  }

  function forget() {
    userDialogVisible.value = true
    loginVisible.value = false
    registerVisible.value = false
    forgetVisible.value = true
  }

  function close() {
    userDialogVisible.value = false
    loginVisible.value = false
    registerVisible.value = false
    forgetVisible.value = false
  }
  return { userDialogVisible,loginVisible,registerVisible,forgetVisible,login, register, forget, close }
})
