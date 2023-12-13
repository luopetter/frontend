<script setup>
import { ref } from 'vue'
import { useUserStore } from '/src/stores/UserStore';
import { useUserDialogStore } from '/src/stores/UserDialogStore.js';
import { watchEffect } from 'vue'
import { logout } from '/src/net/index.js';
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const userDialogStore = useUserDialogStore()
const user = ref(null)
watchEffect(() => {
  user.value = userStore.user
  console.log(user.value)
})

function userLogout() {
 logout(()=>{
  window.location.reload()
 })
}

</script>
<template>
  <el-card v-if="user == false" class="user-card-wrap" :body-style="{ padding: '0px' }">
    <div class="user-card-header">
      <el-image src="/src/assets/images/UserCard.jpg" fit="fill" alt="" lazy style="height: 100%;width: 100%;position: absolute;" />
    </div>
    <div class="user-card-content">
      <div class="user-card-avatar">
        <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="user.avatar == null ? '/src/assets/avatars/defaultAvatar.jpg' : user.avatar" fit="fill"
          class="avatar80">
        </el-avatar>
      </div>
      <div class="user-card-info">Hi! 请登录</div>
      <div class="user-card-text">
        <el-button type="primary" @click="userDialogStore.login" class="login-btn"><img class="btn-icon"
            src="/src/assets/icons/login.svg" alt="">登录</el-button>
        <el-button type="primary" @click="userDialogStore.register" class="reg-btn">
          <img class="btn-icon" src="/src/assets/icons/register.svg" alt="">注册</el-button>
      </div>
      <div class="separator-wrapper">
        <div class="user-card-separator">社交帐号登录</div>
      </div>
      <div class="user-card-bottom">
        <el-button type="primary" round class="tencent-btn" @click="ElMessage.success('更多功能,敬请期待')">
          <img class="btn-icon" src="/src/assets/icons/qq.svg" alt="">
          QQ登录
        </el-button>
        <el-button type="primary" round class="weChat-btn" @click="ElMessage.success('更多功能,敬请期待')">
          <img class="btn-icon" src="/src/assets/icons/wechat.svg" alt="">
          微信登录
        </el-button>
      </div>
    </div>
  </el-card>

  <el-card v-else class="user-card-wrap" :body-style="{ padding: '0px' }">
    <div class="user-card-header">
      <el-image src="/src/assets/images/UserCard.jpg" fit="fill" alt="" lazy style="height: 100%;width: 100%;position: absolute;" />
    </div>
    <div class="user-card-content">
      <div class="user-card-avatar">
        <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="user.avatar == null ? '/src/assets/avatars/defaultAvatar.jpg' : user.avatar" fit="fill"
          class="avatar80"></el-avatar>
      </div>
      <div class="user-card-info">{{ user.username }}</div>
      <div class="user-card-text">
        <el-button type="primary" @click="userLogout" class="login-btn"><img class="btn-icon"
            src="/src/assets/icons/login.svg" alt="退出登录">退出登录</el-button>
      </div>
    </div>
  </el-card>

</template>
<style scoped>
.user-card-wrap {
  position: relative;
  border-radius: 2%;
  height: fit-content;
}

.user-card-header {
  position: relative;
  padding-bottom: 60%;
  z-index: 1;
}

.user-card-avatar {
  text-align: center;
}

.user-card-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
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

.user-card-info {
  color: rgb(119, 119, 119);
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  height: 24px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: default;
}

.user-card-text {
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.user-card-content {
  position: relative;
  height: fit-content;
  margin-top: -56px;
  padding: 14px;
  z-index: 2;
}

.sign-up {
  color: rgb(78, 83, 88);
  font-size: 14px;
  text-decoration: none;
}

.forget {
  color: rgb(78, 83, 88);
  font-size: 14px;
  text-decoration: none;
}

.remember {
  color: rgb(78, 83, 88);
  font-size: 14px;
}

.line-form {
  margin-top: 25px;
  position: relative;
  padding: 0px 4px 4px 4px;
}

.line-form-input {
  border: none;
  outline: none;
  height: 20px;
  line-height: 20px;
  cursor: default;
}

.line {
  position: absolute;
  display: block;
  bottom: 0px;
  width: 100%;
  height: 1px;
  background-color: rgb(78, 83, 88);
}

.line:before,
.line:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: rgb(78, 83, 88);
  z-index: -1;
}

.line:before {
  z-index: 1;
  /* background: rgb(240, 68, 148); */
  background: rgb(64, 158, 255);
  transition: 1s;
}

.line:hover {
  background: transparent;
}

.line-form-input:hover+.line:before,
.line-form-input:hover+.line:after {
  width: 100%;
}

.placeholder {
  position: absolute;
  bottom: 5px;
  color: rgb(78, 83, 88);
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  pointer-events: none;
  opacity: 0.5;
}

.line-form-input:focus+.line+.placeholder {
  bottom: 25px;
  color: rgb(240, 68, 148);
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}

.line-form-input:not(:placeholder-shown)+.line+.placeholder {
  bottom: 25px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}
</style>
