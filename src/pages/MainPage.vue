<template>
    <div class="main-page">
        <div class="page-menu">
            <div class="menu-title">功能导航</div>
            <div class="menu-item" v-for="item in menuList" :key="item.id" @click="handleMenuClick(item.href)">
                <a-tag color="green">{{ item.name }}</a-tag>
            </div>
        </div>

        <div class="page-content">
            <div class="content-header">
                <div class="header-left">
                    <div :class="onlineClass"></div>
                    <div>{{ onlineTip }}</div>
                    <div class="left-text">当前在线人数：{{ currOnlineInfo.usernames.length }}</div>

                </div>
                <div class="header-right">
                    <a-dropdown @select="handleSelect">
                        <a-avatar :style="{ backgroundColor: '#14a9f8' }">{{ store.userStore.getUser.username.slice(0, 4)
                        }}</a-avatar>
                        <template #content>
                            <a-doption value="exit">退出登录</a-doption>

                        </template>
                    </a-dropdown>
                </div>


            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store/index'
import { onMounted, ref, onBeforeUnmount, computed } from 'vue'


const store = useStore()
const router = useRouter()
const currOnlineInfo = ref<{
    usernames: Array<string>,
    isOnlie: string
}>({
    usernames: [],
    isOnlie: 'disconnected'
})
let ws = new WebSocket(process.env.VUE_APP_WS_BASE_URL)

onMounted(() => {
    initWs()
})
onBeforeUnmount(() => {

})
const onlineClass = computed(() => {
    let status: any = {
        'connecting': 'breath-div yellow',
        'connected': 'breath-div green',
        'disconnected': 'breath-div red'
    }
    return status[currOnlineInfo.value.isOnlie]
})
const onlineTip = computed(() => {
    let status: any = {
        'connecting': '（连接中···）',
        'connected': '（连接正常）',
        'disconnected': '（连接已断开）'
    }
    return status[currOnlineInfo.value.isOnlie]
})
const initWs = () => {


    ws.onopen = () => {
        currOnlineInfo.value.isOnlie = 'connecting'
        console.log('ws连接开启')
    }
    ws.onmessage = (event: { data: string }) => {
        let data = JSON.parse(event.data)
        currOnlineInfo.value.usernames = data.data
        currOnlineInfo.value.isOnlie = 'connected'
    };
    ws.onclose = (ev) => {
        currOnlineInfo.value.isOnlie = 'disconnected'
    };
    setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN) {

            ws.send(JSON.stringify({
                actionName: 'count',
                username: store.userStore.getUser.username,
                uuid: store.userStore.getUser.uuid
            }))
        }
    }, 500)
}
const currentOnlineNum = ref<number>()
const menuList = [
    { id: 1, name: '博客列表', href: '/MainPage/BlogManage' },
    { id: 2, name: '账号设置', href: '/MainPage/AccountManage' },
]
const handleMenuClick = (href: string) => {
    router.push(href)
}
const handleSelect = (value: string | number | Record<string, any> | undefined) => {
    if (value === 'exit') {
        ws.close()
        localStorage.setItem('token', '')
        router.push('/login')
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/var.scss";

.main-page {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;

    .page-content {
        flex-grow: 1;

        .content-header {
            height: 50px;
            margin: 10px 0 0 20px;
            border: 1px solid $gray-3;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .header-left {
                margin-left: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .breath-div {
                    width: 10px;
                    height: 10px;

                    border-radius: 50%;
                    text-align: center;
                    cursor: pointer;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    animation-timing-function: ease-in-out;

                    animation-duration: 1500ms;
                    animation-iteration-count: infinite;
                    animation-direction: alternate;
                }

                .yellow {
                    border: 1px solid $yellow-6;
                    animation-name: breathe-yellow;
                }

                .red {
                    border: 1px solid $red-6;
                    animation-name: breathe-red;
                }

                .green {
                    border: 1px solid $green-6;
                    animation-name: breathe-green;
                }

                .left-text {
                    margin-left: 10px;
                }
            }

            .arco-avatar {
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }

    .page-menu {
        box-sizing: border-box;
        width: 160px;
        height: 100vh;
        background-color: $blue-1;

        .menu-title {
            display: flex;
            justify-content: center;
            height: 25px;
            align-items: center;
        }

        .menu-item {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            cursor: pointer;

        }

        &::after {
            position: absolute;
            width: 1px;
            height: 100vh;
            display: inline-block;
            left: 160px;
            background-color: $gray-10;
            content: '';
            top: 0px;
        }
    }
}
</style>