<script setup>
import Header from './pages/home/Header.vue';
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { genFileId } from 'element-plus';
import { get,post,takeAccessToken } from '../net';
import axios from 'axios';

const noteForm = reactive({
  publicRange: '',
  canBeCommented: '',
  file: ''
})
const loginRule = {
  // username: [
  //   { required: true, message: "请输入用户名或邮箱" }
  // ],
  // password: [
  //   { required: true, message: "请输入密码" }
  // ],
  // defPassword: [
  //   { required: true, message: "请再次输入密码" }
  // ]
}

const upload = ref();
const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
const handleChange = (file) => {
  noteForm.file = file.raw;
  console.log(file.raw)
}
const submitUpload = () => {
  axios.post(("/api/note/postNote"), {
    publicRange: noteForm.publicRange,
    canBeCommented: noteForm.canBeCommented,
    multipartFile: noteForm.file
  }, {
  headers: {
    'Authorization': "Bearer " + takeAccessToken(),
    'Content-Type': 'multipart/form-data' 
  }
}).then(function (response) {
    // 请求成功的处理
    ElMessage.success("上传成功")
  }).catch(function (error) {
    // 请求失败的处理
    ElMessage.error(error.message)
  });
  // post("/api/note/postNote", {
  //   publicRange: noteForm.publicRange,
  //   canBeCommented: noteForm.canBeCommented,
  //   file: noteForm.file
  // },()=>{
  //   ElMessage.success("上传成功")
  // })
};
// const submitUpload = () => {
//   upload.value.submit()
// }
</script>

<template>
  <header class="header-navbar">
    <Header activeIndex="1" />
  </header>
  <div class="container-center">
    <div class="content-wrap">
      <el-form :model="noteForm" :rules="loginRule" ref="loginFormRef">
        <el-form-item prop="file">
          <el-upload ref="upload" class="upload-demo" action="/api/note/postNote" :limit="1" :on-exceed="handleExceed"
            :on-change="handleChange" :auto-upload="false" accept=".md">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip text-red">
                限制为一个文件，文件格式为.md格式。
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item class="line-form" prop="password">
          <span class="info">公开范围</span>
          <el-radio-group v-model="noteForm.publicRange">
            <el-radio :label="'public'">所有人</el-radio>
            <el-radio :label="'friendsOnly'">仅限好友</el-radio>
            <el-radio :label="'private'">不公开</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="line-form" prop="password">
          <span class="info">作品评论功能</span>
          <el-radio-group v-model="noteForm.canBeCommented">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="line-form">
          <el-button type="primary" class="def-btn line-form-button" @click="submitUpload">投稿</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style>
.info {
  width: 100px;
  color: rgb(96, 98, 102);
}
</style>
