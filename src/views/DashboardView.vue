<script setup>
import Header from './pages/home/Header.vue';
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { genFileId } from 'element-plus';
import { get, post, takeAccessToken } from '../net';
import axios from 'axios';

</script>

<template>
  <header class="header-navbar">
    <Header activeIndex="1" />
  </header>
  <div class="container-center">
    <div class="dashboard-wrapper">
      <h1 class="dashboard-header">数据分析</h1>
      <div class="dashboard-nav">
        <router-link to="/dashboard">
          首页
        </router-link>
        <router-link to="/dashboard">
          作品
        </router-link>
      </div>
      <div class="article-box">
        <div class="article-header">
          <div class="article-header-start" font-size14>近期投稿的作品</div>
          <div class="article-header-end">查看全部</div>
        </div>
        <div class="article-content-box">
            <div class="article-tooltip" >
              <div style="width: 12px;height: 12px;background-color: rgb(177, 204, 41);border-radius: 16px;"></div>
              <span class="font-size12">实时更新中</span>
            </div>
            <div></div>
            <div class="font-size12" style="align-self: flex-end;">上次浏览时间: 2023年12月10日 17:09</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 40px 72px;
  margin: 0 auto;
}

.dashboard-nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

</style>
