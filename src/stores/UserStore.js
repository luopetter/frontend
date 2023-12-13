import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { get } from '../net'

export const useUserStore = defineStore('user', () => {
  const user = ref([])
  async function fetchData() {
    get('/api/user/userVO',(data)=>{
      user.value = data
    },()=>{})
  }
  return { user, fetchData }
})
