<template>
  <div id="app">
    <div class="main" @click="focusToIpt">
      <div class="transpanel">
        <el-input
          :autosize="{ minRows: 5, maxRows: 5 }"
          :style="{ color: '#000', fontSize: '18px', fontWeight: '600px' }"
          type="textarea"
          v-model="data.textarea"
          @input="autoTrans"
          placeholder="翻译内容"
          ref="input"
        ></el-input>
        <el-input
          :autosize="{ minRows: 5, maxRows: 5 }"
          :style="{ color: '#000', fontSize: '18px', fontWeight: '600px' }"
          type="textarea"
          v-model="data.result"
          placeholder="翻译结果"
        ></el-input>
      </div>
      <div class="moreFun">
        <div class="mainbutton">
          <!--下拉菜单选项-->
          <el-dropdown trigger="click" @command="changeLanguage">
            <el-button class="dropmenu" :disabled="data.dropmenuChecked">
              <span class="el-dropdown-link">
                翻译为：{{ data.Language }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </el-button>
            <!--语言选择下拉菜单-->
            <el-dropdown-menu>
              <el-dropdown-item command="en">英文</el-dropdown-item>
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="jp">日语</el-dropdown-item>
              <el-dropdown-item command="spa">西班牙</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!--翻译按钮-->
          <el-button class="btn1" style="margin: 20px 0;" type="primary" @click="goTranslate"
            :loading="data.loadingStat"
          >{{ this.data.loadingStat ? '翻译中' : '翻译' }}</el-button>
          <!--清空按钮-->
          <el-button class="btn2" style="margin: 20px 0;" type="danger" @click="clear">清空</el-button>
        </div>
        <div class="otherOpe">
          <el-checkbox-group class="checkBox" v-model="data.checkList">
            <el-checkbox label="saveres">保留翻译历史</el-checkbox>
            <el-button class="clearHis" @click="clearHis">清空翻译记录</el-button>
          </el-checkbox-group>
          <div class="history">
            <div
              class="item"
              @click="fillHisInfo(item)"
              v-for="(item, index) in data.transHistory"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import { translateFun } from 'D:/frontend/src/util/transAPI.js'

  
  
  export default {
    name:"translation",
    data() {
      return {
        data: {
          textarea: '',
          result: '',
          targetLan: 'en',//翻译的语言
          Language: 'EN',//选项框显示的语言
          loadingStat: false,//用来显示翻译按钮是否有加载动画
          checkList: [],//用来存放当前复选框的选择信息
          dropmenuChecked: false,//用来调整翻译下拉选项是否显示/锁定
          transHistory: []
        }
      }
    },
    methods: {
      
      changeLanguage(lan) {
        switch (lan) {
          case 'en':
            this.data.targetLan = 'en'
            this.data.Language = 'EN'
            break
          case 'zh':
            this.data.targetLan = 'zh'
            this.data.Language = '中文'
            break
          case 'jp':
            this.data.targetLan = 'jp'
            this.data.Language = '日语'
            break
          case 'spa':
            this.data.targetLan = 'spa'
            this.data.Language = '西班牙语'
            
        }
      },
      //做发送前的准备工作
      goTranslate() {
        let inputValue = this.data.textarea.trim()
        //检测输入内容是否为空
        if (inputValue.length === 0) {
          this.notifyFun('请输入内容', 'error')
          this.data.loadingStat = false
          return
        }
        if (this.data.checkList.some(val => val === 'saveres')) {//如果发现复选框A被选中，则保留翻译结果
          let hisarr = this.data.transHistory   //将this.data.transHistory的引用赋值给了hisarr
          if (hisarr.length >= 6) {
            hisarr.splice(hisarr.length - 1, 1)
          }
          hisarr.unshift(this.data.textarea)
        }
      
        // 百度翻译入口
        translateFun(inputValue, this.data.targetLan).then(res => {
          this.data.loadingStat = false
          this.data.result = res
          this.notifyFun('翻译成功', 'success')
        }).catch(() => {
          this.notifyFun('翻译API调用频率过高，请稍后重试！', 'error')
          this.data.loadingStat = false
        })
      },
      clear() {
        this.data.textarea = ''
        this.data.result = ''
        this.notifyFun('清空内容成功', 'success')
      },
      notifyFun(content, type) {
        this.$notify({
          title: content,
          position: 'bottom-left',
          type: type,
          duration: 2000
        })
      },
    
     
      focusToIpt() {
        this.$refs.input.focus()  //自动聚焦输入框
      }
    },
    watch: {
      data: {
        handler() {
          this.checkIsAuto()
          //设置防抖方法，让用户停止输入0.5秒后才将数据保存在本地
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            let { Language, targetLan, checkList, transHistory } = this.data
            localStorage.setItem('transConfig', JSON.stringify({ Language, targetLan, checkList, transHistory }))
          }, 500)
        },
        deep: true
      }
  
    },
    created() {
      if (localStorage.getItem('transConfig')) {//如果是初次启动，checkList的值就为null
        let { Language, targetLan, checkList, transHistory } = JSON.parse(localStorage.getItem('transConfig'))
        this.data.Language = Language
        this.data.targetLan = targetLan
        this.data.checkList = checkList
        this.data.transHistory = transHistory
      }
      this.checkIsAuto()
    },
    mounted() {
      this.focusToIpt()
    }
  }
  </script>
  
  <style>
  </style>
  