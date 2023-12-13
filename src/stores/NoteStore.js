import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { get } from '../net'

export const useNoteStore = defineStore('note', () => {
  const noteList = ref([])
  function fetchData() {
    get('/api/note/list',(data)=>{
      noteList.value = data;
    })
  }
  return { noteList, fetchData }
})
