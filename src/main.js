import { createApp } from 'vue'
import { createPinia } from 'pinia'



import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
import router from './router'
import relationship from 'relationship.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
    locale: zhCn
})
app.use(relationship)


app.mount('#app')
