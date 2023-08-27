import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import { router } from './router/router'
import "./styles/index.scss"

const app: any = createApp(App)
app.use(ArcoVue)
app.use(router)
app.mount('#app')
