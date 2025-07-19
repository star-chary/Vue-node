import '@/assets/gloab.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { noSpace } from '@/directives/noSpace.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 注册全局指令
app.directive('noSpace', noSpace)

app.mount('#app')
