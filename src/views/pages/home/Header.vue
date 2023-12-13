<script setup>
import { ref, watch, onBeforeMount, computed, onUnmounted } from 'vue';
import { Notebook, Tools, HomeFilled, Search } from '@element-plus/icons-vue'
import { useUserStore } from '/src/stores/UserStore';
import { useAsideNavStore } from '/src/stores/AsideNavStore.js';
import { watchEffect } from 'vue'
const userStore = useUserStore()
const user = ref(null)
watchEffect(() => {
  user.value = userStore.user
})
const props = defineProps(['activeIndex'])
const activeIndex = ref(Number(props.activeIndex) || 0) // 初始选项索引为0
const handleSelect = (index) => {
  activeIndex.value = index // 更新当前选项索引
}

const input = ref('')
const showNav = ref(true)


const dropdownHeight = ref(0)

const handleDropdownResize = (bool) => {
  if (bool) {
    dropdownHeight.value = document.documentElement.clientHeight - 64
  }
};
</script>

<template>
  <!-- 菜单 -->
  <div class="header-left">
    <el-tooltip class="box-item" effect="light" content="菜单" placement="bottom" :show-after=750>
      <el-icon class="header-icon" @click="showNav = !showNav">
        <img src="/src/assets/icons/菜单.svg" alt="" class="header-icon-img">
      </el-icon>
    </el-tooltip>
    <img src="/src/assets/icons/logo.svg" alt="" style="height: 64px;width: 64px;">
  </div>
  <div class="header-center">
    <el-input v-model="input" class="w-50 m-2" placeholder="搜索作品" style="width: 528px;">
      <template #prefix>
        <el-icon class="el-input__icon">
          <search />
        </el-icon>
      </template>
    </el-input>
  </div>
  <div class="header-right">
    <!-- 投稿 -->
    <el-dropdown trigger="click" placement="bottom-start" style="margin-right: 30px" :max-height="dropdownHeight">
      <el-button color="#F5F5F5" type="primary" round class="upload-btn el-dropdown-link">
        <span style="font-size: 14px;width: 70px;height: 22px;line-height: 22px;">投稿作品</span>
        <el-icon>
          <img src="/src/assets/icons/下拉.svg" alt="" style="height: 8px;width: 8px;">
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="dropdown-box-w232px">
          <router-link to="/create">
            <el-dropdown-item class="dropdown-item">
              <el-icon class="el-input__icon">
                <img src="/src/assets/icons/上传笔记.svg" alt="" style="height: 24px;width: 24px;">
              </el-icon>
              <span class="dropdown-upload-item-info">博客</span>
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 消息 -->
    <el-dropdown trigger="click" :max-height="dropdownHeight">
      <div>
        <el-tooltip class="box-item" effect="light" content="消息" placement="bottom" :show-after=750>
          <el-icon class="header-icon">
            <img src="/src/assets/icons/消息.svg" alt="" class="header-icon-img">
          </el-icon>
        </el-tooltip>
      </div>
      <template #dropdown>
        <div class="dropdown-box-w320px">
          <div class="dropdown-header">
            <span class="dropdown-header-center">消息</span>
            <span class="dropdown-header-end">设置</span>
          </div>

          <div class="dropdown-footer">
            <span class="dropdown-footer-center">查看全部</span>
          </div>
        </div>
      </template>
    </el-dropdown>
    <!-- 通知 -->
    <el-dropdown trigger="click" :max-height="dropdownHeight">
      <div>
        <el-tooltip class="box-item" effect="light" content="通知" placement="bottom" :show-after=750>
          <el-icon class="header-icon">
            <img src="/src/assets/icons/通知.svg" alt="" class="header-icon-img">
          </el-icon>
        </el-tooltip>
      </div>
      <template #dropdown>
        <div class="dropdown-box-w320px">
          <div class="dropdown-header">
            <span class="dropdown-header-center">通知</span>
            <span class="dropdown-header-end">设置</span>
          </div>

          <div class="dropdown-footer">
            <span class="dropdown-footer-center">查看全部</span>
          </div>
        </div>
      </template>
    </el-dropdown>
    <!-- 用户相关 -->
    <el-dropdown trigger="click" @visible-change="handleDropdownResize" :max-height="dropdownHeight">
      <button class="avatar-btn">
        <el-tooltip class="box-item" effect="light" :content="user.username == null ? 'Hi! 请登录' : user.username"
          placement="bottom" :show-after=750>
          <div class="el-dropdown-link">
            <el-avatar shape="circle" class="avatar40" style="margin: 0 7px;"
              :src="user.avatar == null ? '/src/assets/avatars/defaultAvatar.jpg' : user.avatar" />
            <el-icon>
              <img src="/src/assets/icons/下拉.svg" alt="" style="height: 8px;width: 8px;">
            </el-icon>
          </div>
        </el-tooltip>
      </button>
      <template #dropdown>
        <div class="dropdown-avatar-row">
          <div class="dropdown-avatar-row-shadow"></div>
          <el-avatar shape="circle" class="avatar64"
            :src="user.avatar == null ? '/src/assets/avatars/defaultAvatar.jpg' : user.avatar" />
          <el-button class="dropdown-avatar-row-end premium-btn-unActive">premium</el-button>
        </div>
        <span class="dropdown-small-item bold">{{ user.username == null ? '游客' : user.username }}</span>
        <span class="dropdown-small-item">{{ user.id == null ? '@tourist' : user.id }}</span>
        <div class="dropdown-item">
          <div class="dropdown-column-item">
            <span class="dropdown-colum-row-item bold">0</span>
            <span class="dropdown-colum-row-item">已关注</span>
          </div>
          <div class="dropdown-column-item">
            <span class="dropdown-colum-row-item bold">0</span>
            <span class="dropdown-colum-row-item">粉丝</span>
          </div>
        </div>
        <el-dropdown-menu class="dropdown-box-w200px">
          <div class="spacer"></div>
          <router-link to="/dashboard">
            <el-dropdown-item class="dropdown-item">
              <span>数据分析</span>
            </el-dropdown-item>
          </router-link>
          <router-link to="/dashboard">
            <el-dropdown-item class="dropdown-item">
              <span class="dropdown-none-w200px">我的作品</span>
            </el-dropdown-item>
          </router-link>
          <div class="spacer"></div>
          <router-link to="/create">
            <el-dropdown-item class="dropdown-item">
              <span class="dropdown-none-w200px">收藏</span>
            </el-dropdown-item>
          </router-link>
          <router-link to="/create">
            <el-dropdown-item class="dropdown-item">
              <span class="dropdown-none-w200px">浏览记录</span>
            </el-dropdown-item>
          </router-link>
          <div class="spacer"></div>
          <router-link to="/create">
            <el-dropdown-item class="dropdown-item">
              <span class="dropdown-none-w200px">设置</span>
            </el-dropdown-item>
          </router-link>
          <router-link to="/create">
            <el-dropdown-item class="dropdown-item">
              <span class="dropdown-none-w200px">会员功能</span>
            </el-dropdown-item>
          </router-link>
          <div class="spacer"></div>
          <el-dropdown-item class="dropdown-item">
            <span class="dropdown-none-w200px">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 更多服务 -->
    <el-dropdown trigger="click" :max-height="dropdownHeight">
      <div>
        <el-tooltip class="box-item" effect="light" content="更多服务" placement="bottom" :show-after=750>
          <el-icon class="header-icon">
            <img src="/src/assets/icons/更多服务.svg" alt="" class="header-icon-img">
          </el-icon>
        </el-tooltip>
      </div>
      <template #dropdown>
      </template>
    </el-dropdown>

  </div>
</template>


<style scoped>
.header-left {
  display: flex;
  line-height: 64px;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
}

.header-center {
  display: flex;
  line-height: 64px;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.header-right {
  display: flex;
  line-height: 64px;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.header-icon {
  padding: 10px;
  margin: 0px 10px;
  font-size: 24px;
  border-radius: 32px;
  cursor: pointer;
}

.header-icon:hover {
  background-color: rgb(245, 245, 245);
}

.header-icon-img {
  width: 24px;
  height: 24px;
}


.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 64px;
}

a {
  padding: 0 12px;
}

.active {
  border-bottom: 2px solid rgb(64, 158, 255);
}
</style>
