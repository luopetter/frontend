<script setup>
import {
  Notebook,
  Tools,
  HomeFilled,
} from '@element-plus/icons-vue'
</script>
<template>
  <div class="demo-image__lazy page-cover-wrap  img-wrap">
    <el-image src="/src/assets/page_cover.jpg" fit="cover" alt="" lazy class="page-cover-image"/>
    <div class="page-cover-info-wrap">
      <div class="page-cover-info line-active">
        <el-icon style="margin: 0px 10px 0px 6px;padding: 2px 0;">
          <Notebook />
        </el-icon>
        <el-text style="font-weight: 700;color: white;font-size: 16px;line-height: 20px;">经验分享</el-text>
      </div>
      <i class="line"></i>
    </div>
    <div class="page-cover-filter"></div>

  </div>
</template>
<style scoped>
.page-cover-image {
  width: 100%;
  height: 100%;
}
.page-cover-wrap {
  margin-bottom: 20px;
  position: relative;
  border-radius: 2%;
  overflow: hidden;
  width: 100%;
}

.page-cover-filter {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(0deg, rgba(2, 5, 49, .4) 3em, rgba(255, 255, 255, 0) 8em);
}

.page-cover-info-wrap {
  position: absolute;
  width: 150px;
  height: fit-content;
  color: white;
  line-height: 20px;
  left: 15px;
  bottom: 24px;
  z-index: 1;
}

.page-cover-info {
  display: flex;
  height: 20px;
  padding-bottom: 8px;
  cursor: default;
}
</style>