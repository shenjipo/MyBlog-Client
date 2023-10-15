<template>
    <div class="main-page">
        <div class="page-menu">
            <div class="menu-title">功能导航</div>
            <div class="menu-item" v-for="item in menuList" :key="item.id" @click="handleMenuClick(item.href)">
                <a-tag color="green">{{ item.name }}</a-tag>
            </div>
        </div>
        <div class="page-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const menuList = [
    { id: 1, name: '博客列表', href: '/MainPage/BlogManage' },
    { id: 2, name: '账号设置', href: '/MainPage/Settings' },
]
const handleMenuClick = (href: string) => {
    router.push(href)
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