<template>
    <div class="container">
      <div class="converter">
        <h1 class="title">进制转换器</h1>
        <el-row>
          <el-col :span="24">
            <el-form>
              <el-form-item>
                <el-input type="text" v-model="decimalInput" placeholder="输入要转换的值" />
              </el-form-item>
              <el-form-item>
                <el-select v-model="selectedBinary" placeholder="选择进制" class="centered">
                    <el-option value="2">二进制</el-option>
                    <el-option value="8">八进制</el-option>
                    <el-option value="10">十进制</el-option>
                    <el-option value="16">十六进制</el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-button @click="convert">转换</el-button>    
        <p>结果为:</p>
        <div class="result">{{ binary }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        decimalInput: '',
        selectedBinary: '2',
        binary: '',
      };
    },
    methods: {
      convert() {
        const decimal = parseInt(this.decimalInput, 10);
        const base = parseInt(this.selectedBinary, 10);
        this.binary = decimal.toString(base);
      },
    },
  };
  </script>
 <style>
 .container {
 width: 60%; /* 设置容器宽度为五分之三 */
 margin: 0 auto; /* 居中对齐 */
 border: 1px solid #ccc;
 padding: 20px;
 margin-top: 100px;
}

.converter {
  text-align: center;
  margin-top: 50px;
}

.result {
  margin-top: 10px;
  font-weight: bold;
}

.centered {
  margin: 0 auto;
}
.title {
 margin-bottom: 30px; /* 将标题向上移动 10px */
}
 </style>