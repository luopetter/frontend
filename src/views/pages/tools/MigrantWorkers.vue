<template>

<div class="main_container">
    <div class="title">休息时间到</div>
    <el-divider class="divider" content-position="left">时间配置</el-divider>
    <div class="form_block">
      <span class=".tip">工作时间</span>
      <el-time-select
        v-model="workTimeStart"
        :max-time="workTimeEnd"
        class="time-select"
        placeholder="开始时间"
        start="00:00"
        step="00:15"
        end="23:45"
        default-value="new Date()"
        is-range
        @change="saveConfig"
      />
      <el-time-select
        v-model="workTimeEnd"
        :min-time="workTimeStart"
        class="time-select"
        placeholder="结束时间"
        start="00:00"
        step="00:15"
        end="23:45"
        is-range
        @change="saveConfig"
      />
    </div>
    <div class="form_block">
      <span class=".tip">午休时间</span>
      <el-time-select
        v-model="restTimeStart"
        :min-time="workTimeStart"
        :max-time="restTimeEnd"
        class="time-select"
        placeholder="开始时间"
        start="00:00"
        step="00:15"
        end="23:45"
        default-value="new Date()"
        is-range
        @change="saveConfig"
      />
      <el-time-select
        v-model="restTimeEnd"
        :min-time="restTimeStart"
        :max-time="workTimeEnd"
        class="time-select"
        placeholder="结束时间"
        start="00:00"
        step="00:15"
        end="23:45"
        is-range
        @change="saveConfig"
      />
    </div>
    <el-divider class="divider" content-position="left">时间图表</el-divider>
    <div class="form_block">
      <div class="progress_container">
        <div class="chart_span">午休进度条</div>
        <el-progress :percentage="restPercentage" :text-inside="true" :stroke-width="20" status="success" :color="progressColor" />
      </div>
      <div class="progress_container">
        <div class="chart_span">下班进度条</div>
        <el-progress :percentage="workEndPercentage" :text-inside="true" :stroke-width="20" status="success" :color="progressColor" />
      </div>
    </div>
  </div>
</template>
  
<script>
import { onMounted, onUnmounted, ref } from 'vue'
  export default {
    name: 'MigrantWorkers',
    setup() {
      const workTimeStart = ref('09:00');
      const workTimeEnd = ref('18:00');
      const restTimeStart = ref('12:00');
      const restTimeEnd = ref('13:00');

      const restPercentage = ref(0);
      const workEndPercentage = ref(0);

      const progressColor = [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ]

      let currentTime = ref(new Date());

      let flushInterval;

      const getCurrentTime = () => {
        var currentDate = new Date();
        currentDate.setFullYear(1900);
        currentDate.setMonth(1);
        currentDate.setDate(1)
        return currentDate;
      }

      const parseTimeSelectDate = (str) => {
        var splited = str.split(':');
        var hour = splited[0];
        var minutes = splited[1];
        var date = new Date('1900', '1', '1', hour, minutes, '0');
        return date;
      }

      const flushTime = () => {
        currentTime.value = getCurrentTime();
        restPercentage.value = progressPercentage(parseTimeSelectDate(workTimeStart.value), parseTimeSelectDate(restTimeStart.value));
        workEndPercentage.value = progressPercentage(parseTimeSelectDate(workTimeStart.value), parseTimeSelectDate(workTimeEnd.value));
      }

      const progressPercentage = (startTime, endTime) => {
        let percent = ((currentTime.value - startTime) / (endTime - startTime)) * 100;
        if (isNaN(percent) || percent < 0) {
          percent = 0;
        }
        if (percent > 100.0) {
          percent = 100;
        }
        return percent.toFixed(2)
      }

      const saveConfig = () => {
        localStorage.setItem("workTimeStart", workTimeStart.value);
        localStorage.setItem("workTimeEnd", workTimeEnd.value);
        localStorage.setItem("restTimeStart", restTimeStart.value);
        localStorage.setItem("restTimeEnd", restTimeEnd.value);
      }

      const restoreConfig = () => {
        if (localStorage.getItem("workTimeStart")) {
          workTimeStart.value = localStorage.getItem("workTimeStart");
        }
        if (localStorage.getItem("workTimeEnd")) {
          workTimeEnd.value = localStorage.getItem("workTimeEnd");
        }
        if (localStorage.getItem("restTimeStart")) {
          restTimeStart.value = localStorage.getItem("restTimeStart");
        }
        if (localStorage.getItem("restTimeEnd")) {
          restTimeEnd.value = localStorage.getItem("restTimeEnd");
        }
      }

      onMounted(() => {
        currentTime = ref(getCurrentTime());
        flushInterval = setInterval(flushTime, 1000);
        restoreConfig();
      })

      onUnmounted(() => {
        clearInterval(flushInterval)
      })

      return {
        workTimeStart,
        workTimeEnd,
        restTimeStart,
        restTimeEnd,
        restPercentage,
        workEndPercentage,
        progressColor,
        currentTime,
        parseTimeSelectDate,
        progressPercentage,
        saveConfig
      };
    }
  }
</script>
<style scoped>
.main_container {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: rgb(0, 47, 167);
}

.divider {
  border-width: 2px;
  border-color: skyblue;
}

.tip {
  margin-right: 10px;
}

.time-select {
  margin-right: 10px;
}

.form_block{
  padding-left: 10px;
  margin-bottom: 10px;
}

.progress_container {
  margin-bottom: 20px;
}

.chart_span {
  padding-bottom: 10px;
}

</style>