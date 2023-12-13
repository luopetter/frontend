<script setup>
import { ref, computed } from 'vue'
import {
    Notebook,
    Tools,
    HomeFilled,
    Fold,
    Expand,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

window.addEventListener("resize", function () {
    if (this.window.innerWidth < 1200) {
        isCollapse.value = true;
    } else {
        isCollapse.value = false;
    }
});

</script>

<template>
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
        style="height: 100vh;position: fixed; padding-top: 64px;z-index: 1;">
        <el-menu-item class="menu-item" index="1">
            <el-icon>
                <Notebook />
            </el-icon>
            <template #title>经验分享</template>
        </el-menu-item>

        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                <Tools />
            </el-icon>
                <span>小工具</span>
            </template>
            <a href="https://chat.blogbb.top/" target="_blank"><el-menu-item index="2-1">ChatGPT</el-menu-item></a>
            <RouterLink to="/relationship"><el-menu-item index="2-2">亲戚关系计算器</el-menu-item></RouterLink>
            <RouterLink to="/conveter"><el-menu-item index="2-3">进制转换器</el-menu-item></RouterLink>
            <RouterLink to="/MigrantWorkers"><el-menu-item index="2-4">打工人下班倒计时</el-menu-item></RouterLink>
        </el-sub-menu>
        <el-menu-item class="menu-item" index="3">
            <el-icon>
                <HomeFilled />
            </el-icon>
            <template #title>网站管理</template>
        </el-menu-item>
    </el-menu>
</template>
  
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.menu-item {
    height: 60px;
    line-height: 60px;
}
</style>