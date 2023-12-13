import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import { router } from './router/router'
import "./styles/index.scss"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './assets/index.scss'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app: any = createApp(App)
app.use(ArcoVue)
.use(router)
.use(mavonEditor)
.use(pinia)

app.mount('#app')
