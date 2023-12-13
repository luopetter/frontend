<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useNoteStore } from './stores/NoteStore'
import { useUserStore } from './stores/UserStore'
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import UserDialog from './components/dialogs/UserDialog.vue'

const noteStore = useNoteStore();
const userStore = useUserStore();
const dataLoaded = ref(false); // 用于标记数据是否已加载

onBeforeMount(async () => {
  if (!dataLoaded.value) {
    // 异步获取数据
    await noteStore.fetchData()
    await userStore.fetchData()
    dataLoaded.value = true; // 数据加载完成后标记为已加载
  }
});
</script>

<template>
  <RouterView/>
  <UserDialog/>
</template>

<style scoped>

</style>
