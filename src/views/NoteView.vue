<script setup>
import { useRoute } from 'vue-router'
import { useNoteStore } from '/src/stores/NoteStore.js'
import { watchEffect } from 'vue';
import { ref, onMounted } from 'vue';
import Header from './pages/home/Header.vue';
import 'github-markdown-css/github-markdown.css'
import { get, put } from '../net';

const route = useRoute()
const noteStore = useNoteStore()
const note = ref(null)
const textarea = ref('')

function getData() {
    get(`/api/note/${route.params.title}`, (data) => {
        note.value = data;
    })
}

onMounted(() => {
    get(`/api/note/view/${route.params.title}`, () => { })
})

watchEffect(() => {
    getData()
});
</script>

<template>
    <header class="header-navbar">
        <Header activeIndex="0" />
    </header>
    <div v-if="note" class="container-center">
        <div class="left">
            <div v-html="note.catalogue" class="markdown-body"></div>
        </div>
        <div class="right">
            <h1>{{ note.title }}</h1>
            <div v-html="note.data" class="markdown-body container-center"></div>
            <div class="separator-wrapper">
                <div class="user-card-separator">THE END</div>
            </div>
            <div class="comment-container">
                <h3 class="comment-title">评论区</h3>
                <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
                <div class="comment-content">

                </div>
            </div>
        </div>

    </div>
</template>

<style>
/* .markdown-body{
    position: relative;
    display: flex;
} */
.markdown-catalogue {
    position: fixed;
    width: 200px;
    height: 100%;
    overflow: auto;
    /* 添加滚动条功能 */
}

.right{
    margin-left: 300px;
    margin-right: 300px;
}

.comment-container {
    background-color: #F2F3F5;
    border-radius: 2%;
}

.user-card-separator {
    padding: 10px 0;
    height: 18px;
    cursor: default;
}

.separator-wrapper {
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 12.6px;
    color: rgb(177, 177, 177);
}

.separator-wrapper::before,
.separator-wrapper::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background-color: rgb(177, 177, 177);
    margin: 0 20px;
}

/* .markdown-body a{
    color: rgb(115,116,120);
    text-decoration: none;
}

.markdown-body a:hover{
    color: rgb(65, 159, 255);
    text-decoration: none;
} */
</style>