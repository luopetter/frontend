<script setup>
import Notes from './pages/home/Notes.vue';
import PageCover from './pages/home/PageCover.vue';
import UserCard from './pages/home/UserCard.vue';
import Header from './pages/home/Header.vue';
import AsideNavigation from '../components/AsideNavigation.vue';
</script>

<template>
  <AsideNavigation/>

  <header class="header-navbar">
    <Header activeIndex="1" />
  </header>
  <div class="container-center">
    <main class="content-wrap">
      <div class="main-left">
        <div class="content-header">
          <PageCover />
        </div>
        <div class="content-main">
          <Notes />
        </div>
      </div>
      <div class="main-right">
        <UserCard />
      </div>
    </main>
  </div>


  <footer class="footer-wrap">Footer</footer>
</template>

<style></style>
