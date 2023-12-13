import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAsideNavStore = defineStore('asideNav', () => {
  const asideNavVisible = ref(false)
  function open() {
    asideNavVisible.value = true
  }

  function close() {
    asideNavVisible.value = false
  }
  return { asideNavVisible,open,close }
})
