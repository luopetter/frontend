<script setup>
import { useNoteStore } from '../../../stores/NoteStore'
import { ref, watch, onBeforeMount, computed, onUnmounted } from 'vue';
import { watchEffect } from 'vue';
import dayjs from 'dayjs';
import {
  Paperclip,
  Comment,
  View,
} from '@element-plus/icons-vue'
import { get, likeNote } from '../../../net';

const noteStore = useNoteStore();
const noteList = ref(null);
const columnSpan = ref(8);

onBeforeMount(() => {
  handleResize(); // 在渲染之前调用一次，以识别初始屏幕大小并进行渲染
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  if (window.innerWidth < 576) {
    columnSpan.value = 24;
  } else if (window.innerWidth < 1440) {
    columnSpan.value = 12;
  } else {
    columnSpan.value = 8;
  }
};

watchEffect(() => {
  noteList.value = noteStore.noteList;
});

const currentDate = ref(dayjs());
const calculateTimeDifference = (targetDate) => {
  const yearsDiff = currentDate.value.diff(targetDate, 'year');
  if (yearsDiff > 0) {
    return `${yearsDiff}年前`;
  }

  const monthsDiff = currentDate.value.diff(targetDate, 'month');
  if (monthsDiff > 0) {
    return `${monthsDiff}个月前`;
  }

  const daysDiff = currentDate.value.diff(targetDate, 'day');
  if (daysDiff > 0) {
    return `${daysDiff}天前`;
  }

  const hoursDiff = currentDate.value.diff(targetDate, 'hour');
  if (hoursDiff > 0) {
    return `${hoursDiff}小时前`;
  }

  const minutesDiff = currentDate.value.diff(targetDate, 'minute');
  if (minutesDiff > 0) {
    return `${minutesDiff}分钟前`;
  }

  const secondsDiff = currentDate.value.diff(targetDate, 'second');
  if (secondsDiff > 0) {
    return `${secondsDiff}秒前`;
  }
  return '刚刚';
};

</script>
<template>
  <div class="note-sort-wrap">
    <div class="note-sort-info">排序<span class="next">|</span></div>
    <ul class="note-sort-item">
      <li class="sort">更新</li>
      <span class="next">•</span>
      <li class="sort">浏览</li>
      <span class="next">•</span>
      <li class="sort">点赞</li>
      <span class="next">•</span>
      <li class="sort">评论</li>
    </ul>
  </div>
  <el-row v-if="noteList" :gutter="20" class="note-item-box">
    <el-col class='note-item-wrapper' v-for="(note, index) in noteList" :key="note.id" :span="columnSpan"
      style="position: relative;">
      <el-icon style="position: absolute;top: 2.5px;left: 2.5px;" size="20" color="#606266">
        <Paperclip />
      </el-icon>
      <el-card class="note-item-container" :body-style="{ padding: '10px' }">
        <div class="note-item-preview">
          <RouterLink class="note-item-link" :to="`/note/${note.title}`">
            <el-image :src="note.previewImageUrl == null ? '/src/assets/images/defaultImage.jpg' : note.previewImageUrl" class="note-item-image" lazy />
          </RouterLink>
        </div>
        <div class="note-item-content">
          <div class="note-item-header">
            <RouterLink class="note-item-link" :to="`/note/${note.title}`">
              <span>{{ note.title }}</span>
            </RouterLink>
          </div>
          <div class="note-item-tags">
          </div>
          <div class="note-item-meta" style="justify-content: space-between;">
            <div class="note-item-meta-left">
              <el-avatar icon="el-icon-user-solid" size="small" shape="circle" :src="note.userVO.avatar == null ? '/src/assets/avatars/defaultAvatar.jpg' : note.userVO.avatar"
                fit="fill"></el-avatar>
              <div style="padding-left: 5px;">{{ calculateTimeDifference(note.createdTime) }}</div>
            </div>
            <ul class="note-item-meta-right">
              <li class="note-item-meta-li pointer">
                <el-icon size="16">
                  <Comment />
                </el-icon>
                <span class="note-item-meta-text">0</span>
              </li>
              <li class="note-item-meta-li">
                <el-icon size="16">
                  <img src="/src/assets/icons/view.svg" alt="">
                </el-icon>
                <span class="note-item-meta-text">{{ note.view }}</span>
              </li>
              <li v-if="note.isLiked" class="note-item-meta-li pointer" :class="{ 'supportActive': note.isLiked === true }"  @click="likeNote(note)">
                <el-icon size="16">
                  <img src="/src/assets/icons/likeActive.svg" alt="">
                </el-icon>
                <span class="note-item-meta-text">{{ note.support }}</span>
              </li>
              <li v-else="note.isLiked" class="note-item-meta-li pointer" :class="{ 'supportActive': note.isLiked === true }"  @click="likeNote(note)">
                <el-icon size="16">
                  <img src="/src/assets/icons/like.svg" alt="">
                </el-icon>
                <span class="note-item-meta-text">{{ note.support }}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.supportActive{
  color: rgb(64,158,255)
}

.note-item-box {
  margin-top: 8px;
}

.note-item-meta-left {
  display: flex;
  align-items: center;
}

.note-item-meta-right {
  display: flex;
  color: rgb(153, 153, 153);
}

.note-item-meta-text {
  padding-left: 5px;
}

.note-item-meta-li {
  display: flex;
  align-items: center;

  padding: 0px 5px;
}

.sort:hover {
  color: rgb(64, 158, 255);
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.note-sort-wrap {
  display: flex;
  color: rgb(78, 83, 88);
  font-size: 14px;
}

.note-sort-item {
  display: flex;
  color: rgb(153, 153, 153);

}

.note-item-wrapper {
  padding: 10px;
}

.note-item-container {
  height: fit-content;
  width: fit-content;
  background-color: #F0F2F5;
  border-color: #DCDFE6;
}

.note-item-link {
  color: #303133;
  text-decoration: none;
  cursor: default;
}

.note-item-link:hover {
  color: rgb(64, 158, 255);
}

.note-item-preview {
  height: fit-content;
  width: 100%;
}

.note-item-image {
  height: 175px;
  width: 100%;
}

.note-item-content {
  height: fit-content;
}

.note-item-header {
  height: 40px;
}

.note-item-tags {
  height: 25px;
}

.note-item-meta {
  height: 20px;
  display: flex;
  font-size: 12px;
  color: rgb(153, 153, 153);
  align-items: center;
}
</style>
  