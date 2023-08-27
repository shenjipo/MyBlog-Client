<template>
    纹章展示列表
    <a-button @click="handleBlogList" type="primary">请求</a-button>
</template>

<script setup lang="ts">
import { articleManage } from '@/api/articleManage';
const handleBlogList = () => {
    getBlogList()
}

const getBlogList = () => {
    articleManage.queryAll()
}
</script>