<script setup>
import { reactive, ref, computed } from 'vue';
import { useUserDialogStore } from '../../stores/UserDialogStore';
import { get, login, post } from '../../net';
import { UserFilled, Lock, View, Hide } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const userDialogStore = useUserDialogStore()

const loginShowPwd = ref(false)

const regShowPwd = ref(false)
const regShowDefPwd = ref(false)

const resetShowPwd = ref(false)
const resetShowDefPwd = ref(false)
// 登录
const loginFormRef = ref()

const coldTime = ref(0)

const loginForm = reactive({
  username: '',
  password: '',
  remember: ''
})

const loginRule = {
  username: [
    { required: true, message: "请输入用户名或邮箱" }
  ],
  password: [
    { required: true, message: "请输入密码" }
  ],
  defPassword: [
    { required: true, message: "请再次输入密码" }
  ]
}

function userLogin() {
  loginFormRef.value.validate(valid => {
    if (valid) {
      login(loginForm.username, loginForm.password, loginForm.remember, () => {
        window.location.reload()
      })
    }
  })
}
// 注册

const registerFormRef = ref()

const isEmailValid = ref(false)

const registerForm = reactive({
  email: '',
  username: '',
  password: '',
  defPassword: '',
  code: ''
})

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))
  } else {
    callback()
  }
}

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}

const registerRule = {
  username: [
    { validator: validateUsername, trigger: ['blur', 'change'] },
    { min: 2, max: 8, message: '用户名的长度必须在2-8个字符之间', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change'] }
  ],
  defPassword: [
    { validator: validatePassword, trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: '请输入邮件地址', trigger: 'blur' },
    { type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change'] }
  ],
  code: [
    { required: true, message: '请输入获取的验证码', trigger: 'blur' },
  ]
}

const onValidate = (prop, isValid) => {
  if (prop === 'email')
    isEmailValid.value = isValid
}

const validateEmail = (type) => {
  coldTime.value = 60
    get(`/api/auth/ask-code?email=${registerForm.email}&type=${type}`, () => {
      ElMessage.success(`验证码已发送到邮箱: ${registerForm.email}，请注意查收`)
    }, undefined, (message) => {
      ElMessage.warning(message)
      coldTime.value = 0
    })
    const handle = setInterval(() => {
      coldTime.value--
      if (coldTime.value === 0) {
        clearInterval(handle)
      }
    }, 1000)
  }

const register = () => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      post('/api/auth/register', {
        username: registerForm.username,
        password: registerForm.password,
        email: registerForm.email,
        code: registerForm.code
      }, () => {
        ElMessage.success('注册成功，欢迎加入我们')
        login(registerForm.username, registerForm.password, true, () => {
          window.location.reload()
        })
      })
    } else {
      ElMessage.warning('请完整填写注册表单内容！')
    }
  })
}
// 重置密码

const resetFormRef = ref()

const resetForm = reactive({
  email: '',
  password: '',
  defPassword: '',
  code: ''
})

const resetRule = {
  email: [
    { required: true, message: '请输入邮件地址', trigger: 'blur' },
    { type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change'] }
  ],
  defPassword: [
    { validator: validatePassword, trigger: ['blur', 'change'] },
  ],
  code: [
    { required: true, message: '请输入获取的验证码', trigger: 'blur' },
  ]
}

const reset = () => {
  resetFormRef.value.validate((valid) => {
    if (valid) {
      post('/api/auth/reset', {
        password: resetForm.password,
        email: resetForm.email,
        code: resetForm.code
      }, () => {
        ElMessage.success('重置密码成功,请重新登录')
      })
    } else {
      ElMessage.warning('请完整填写注册表单内容！')
    }
  })
}
</script>

<template>
  <el-dialog v-model="userDialogStore.userDialogVisible" :before-close="userDialogStore.close" class="custom-dialog"
    width="fit-content" top="20vh">
    <!-- 登录 -->
    <div v-if="userDialogStore.loginVisible" class="dialog-wrap">
      <div class="dialog-content-wrap">
        <header class="dialog-header">
          <h3 class="dialog-header-title" :class="{ 'active': userDialogStore.loginVisible === true }"
            @click="userDialogStore.login">登录</h3>
          <span class="next">|</span>
          <h3 class="dialog-header-title" :class="{ 'active': userDialogStore.registerVisible === true }"
            @click="userDialogStore.register">注册</h3>
        </header>
        <div class="dialog-content">
          <el-form :model="loginForm" :rules="loginRule" ref="loginFormRef">
            <el-form-item class="line-form" prop="username">
              <el-input v-model="loginForm.username" type="text" placeholder="请输入用户名或邮箱">
                <template #prefix>
                  <el-text class="mx-1">账号</el-text>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="password">
              <el-input v-model="loginForm.password" :type="loginShowPwd ? 'text' : 'password'" placeholder="请输入密码">
                <template #prefix>
                  <el-text class="mx-1">密码</el-text>
                </template>
                <template #suffix>
                  <el-icon class="el-input__icon" style="cursor: pointer;" @click="loginShowPwd = !loginShowPwd">
                    <View v-if="loginShowPwd" />
                    <Hide v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <div class="line-form">
              <el-checkbox v-model="loginForm.remember" label="记住登录" checked />
              <span @click="userDialogStore.forget" class="text-btn">重置密码</span>
            </div>
            <div class="line-form">
              <el-button type="primary" @click="userLogin" class="def-btn line-form-button">登录</el-button>
              <el-button type="primary" @click="userDialogStore.close" class="can-btn">取消</el-button>
            </div>
          </el-form>

        </div>
      </div>
    </div>

    <!-- 注册 -->
    <div v-if="userDialogStore.registerVisible" class="dialog-wrap">
      <div class="dialog-content-wrap">
        <header class="dialog-header">
          <h3 class="dialog-header-title" :class="{ 'active': userDialogStore.loginVisible === true }"
            @click="userDialogStore.login">登录</h3>
          <span class="next">|</span>
          <h3 class="dialog-header-title" :class="{ 'active': userDialogStore.registerVisible === true }"
            @click="userDialogStore.register">注册</h3>
        </header>
        <div class="dialog-content">
          <el-form :model="registerForm" :rules="registerRule" @validate="onValidate" ref="registerFormRef">
            <el-form-item class="line-form" prop="username">
              <el-input v-model="registerForm.username" type="text" placeholder="请输入用户名">
                <template #prefix>
                  <el-text class="mx-1">用户名</el-text>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="password">
              <el-input v-model="registerForm.password" :type="regShowPwd ? 'text' : 'password'" placeholder="请输入密码">
                <template #prefix>
                  <el-text class="mx-1">密码</el-text>
                </template>
                <template #suffix>
                  <el-icon class="el-input__icon" style="cursor: pointer;" @click="regShowPwd = !regShowPwd">
                    <View v-if="regShowPwd" />
                    <Hide v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="defPassword">
              <el-input v-model="registerForm.defPassword" :type="regShowDefPwd ? 'text' : 'password'"
                placeholder="请再次输入密码">
                <template #prefix>
                  <el-text class="mx-1">确认密码</el-text>
                </template>
                <template #suffix>
                  <el-icon class="el-input__icon" style="cursor: pointer;" @click="regShowDefPwd = !regShowDefPwd">
                    <View v-if="regShowDefPwd" />
                    <Hide v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="email">
              <el-input v-model="registerForm.email" type="email" placeholder="请输入邮箱">
                <template #prefix>
                  <el-text class="mx-1">邮箱</el-text>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="code">
              <el-row :gutter="20" style="width: 100%;">
                <el-col :span="16">
                  <el-input v-model="registerForm.code" maxlength="6" type="text" placeholder="请输入验证码">
                    <template #prefix>
                      <el-text class="mx-1">验证码</el-text>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="success" size="default" :disabled="!isEmailValid || coldTime"
                    @click="validateEmail('register')">
                    {{ coldTime > 0 ? `请稍后${coldTime}秒` : "获取验证码" }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="line-form">
              <el-button type="primary" @click="register" class="def-btn">注册</el-button>
              <el-button type="primary" @click="userDialogStore.close" class="can-btn">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>


    <!-- 忘记密码 -->
    <div v-else-if="userDialogStore.forgetVisible" class="dialog-wrap">
      <div class="dialog-content-wrap">
        <header class="dialog-header">
          <h3 class="dialog-header-title">重置密码</h3>
        </header>
        <div class="dialog-content">
          <el-form :model="resetForm" :rules="resetRule" @validate="onValidate" ref="resetFormRef">
            <el-form-item class="line-form" prop="email">
              <el-input v-model="resetForm.email" type="text" placeholder="请输入邮箱">
                <template #prefix>
                  <el-text class="mx-1">邮箱</el-text>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="password">
              <el-input v-model="resetForm.password" :type="resetShowPwd ? 'text' : 'password'" placeholder="请输入密码">
                <template #prefix>
                  <el-text class="mx-1">密码</el-text>
                </template>
                <template #suffix>
                  <el-icon class="el-input__icon" style="cursor: pointer;" @click="resetShowPwd = !resetShowPwd">
                    <View v-if="resetShowPwd" />
                    <Hide v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="defPassword">
              <el-input v-model="resetForm.defPassword" :type="resetShowDefPwd ? 'text' : 'password'"
                placeholder="请再次输入密码">
                <template #prefix>
                  <el-text class="mx-1">确认密码</el-text>
                </template>
                <template #suffix>
                  <el-icon class="el-input__icon" style="cursor: pointer;" @click="resetShowDefPwd = !resetShowDefPwd">
                    <View v-if="resetShowDefPwd" />
                    <Hide v-else />
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="line-form" prop="code">
              <el-row :gutter="20" style="width: 100%;">
                <el-col :span="16">
                  <el-input v-model="resetForm.code" maxlength="6" type="text" placeholder="请输入验证码">
                    <template #prefix>
                      <el-text class="mx-1">验证码</el-text>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="success" size="default" :disabled="!isEmailValid || coldTime"
                    @click="validateEmail('reset')">
                    {{ coldTime > 0 ? `请稍后${coldTime}秒` : "获取验证码" }}
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="line-form">
              <span @click="userDialogStore.login" class="text-btn">前往登录</span>
              <span @click="userDialogStore.register" class="text-btn">前往注册</span>
            </div>
            <div class="line-form">
              <el-button type="primary" @click="reset" class="base-btn">重置</el-button>
              <el-button type="primary" @click="userDialogStore.close" class="base-btn">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>

  </el-dialog>
</template>
<style scoped>
.dialog-wrap {
  display: flex;
  height: fit-content;
  width: fit-content;
  padding: 20px;
  background-image: url('/src/assets/images/login-left.png'), url('/src/assets/images/login-right.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 100%, 100% 100%;
  background-size: 14%;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.dialog-header-title {
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: rgb(118, 118, 119);
}

.dialog-header-title:hover {
  color: rgb(64, 158, 255);
}

.dialog-content-wrap {
  min-width: 300px;
}

.dialog-content {
  width: 100%;
}

.active {
  color: rgb(64, 158, 255);
}

.line-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  margin: 20px 0px;
}
</style>