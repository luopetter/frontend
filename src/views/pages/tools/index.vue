<script setup>

import { ref, reactive, computed, watch, onMounted } from 'vue'
import relationship from 'relationship.js'
defineProps({
  msg: String,
})
// 性别
let sex = ref('我是男的')

// 是否为称呼我
let addressMe = ref(true)

// 表单输入信息
const form = reactive({
  // 关系数组
  relation: []
})

// 关系文字描述
const relationText = ref('')

// 称呼计算属性
const appellation = ref('')

// 监听 关系数组数据变化 
watch(
  () => form.relation,
  (newValue, oldValue) => {
    // 根据关系返回文字称谓，将数组转换为字符串,用 '的' 隔开
    relationText.value = newValue.join('的')
    addressComputed()
  },
  { deep: true }
)

/**
 * 称呼计算方法
 */
function addressComputed() {

  // 关系称谓
  let relation_ = form.relation.join('的')
  if (relation_.length == 0) {
    // 如果关系数组为空则取 输入的关系
    relation_ = relationText.value
  }
  // 性别 数据转换
  let _sex = 1
  if (sex.value == '我是男的') {
    _sex = 1
  } else {
    _sex = 0
  }
  // 计算参数
  const options = {
    text: relation_,		// 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
    target: '',	    	// 相对对象：相对对象的称谓汉字表达，称谓间用‘的’字分隔，空表示自己
    sex: _sex,			// 本人性别：0表示女性,1表示男性
    type: 'default',		// 转换类型：'default'计算称谓,'chain'计算关系链,'pair'计算关系合称
    reverse: addressMe.value,		// 称呼方式：true对方称呼我,false我称呼对方
    mode: 'default',		// 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
    optimal: false       	// 最短关系：计算两者之间的最短关系
  }
  appellation.value = relationship(options)
}

// 固定的关系列表选项
const relationList = ref([
  '父亲',
  '母亲',
  '丈夫',
  '妻子',
  '儿子',
  '女儿',
  '哥哥',
  '弟弟',
  '姐姐',
  '妹妹'
])

// 添加关系
function addRelation(item) {
  form.relation.push(item)
}

// 删除关系
function delRelation() {
  // 每次移除最后一个元素
  if (form.relation.length > 0) {
    form.relation = form.relation.splice(0, form.relation.length - 1)
  }
}
// 删除所有关系
function delAll() {
  form.relation = []
}

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <!-- 头部选项 -->
      <div class="card-header">
        <div class="card-header-radio">
          <el-radio-group v-model="sex" @change="addressComputed()">
            <el-radio-button label="我是男的" />
            <el-radio-button label="我是女的" />
          </el-radio-group>
        </div>
        <el-checkbox v-model="addressMe" label="对方称呼我" size="default" @change="addressComputed()" />
      </div>
    </template>
    <div>
      <!-- 表单内容 -->
      <el-form :model="form" label-width="50px">
        
        <el-form-item label="关系">
          <el-input v-model="relationText" placeholder="我七叔公的八大姨的孙子叫我什么?" @keyup.enter="addressComputed()" />
        </el-form-item>
        <el-form-item label-width="0px">
          <el-col v-for="(item, index) in relationList" :key="item" :span="6" style="margin-top: 5px;">
            <el-button type="primary" @click="addRelation(item)" style="width: 98%;">{{ item }}</el-button>
          </el-col>
          <el-col :span="6"  style="margin-top: 5px;">
            <el-button type="danger" @click="delRelation()" style="width: 98%;">清除</el-button>
          </el-col>
          <el-col :span="6"  style="margin-top: 5px;">
            <el-button type="danger" @click="delAll()" style="width: 98%;">全清</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="称呼">
          <el-input v-model="appellation" disabled />
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
