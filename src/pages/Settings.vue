<template>
    设置页面
</template>

<script setup lang="ts">
import { ArticleManageApi } from '../api/ArticleManageApi'
const handleBlogList = () => {
    getBlogList()
}

const getBlogList = () => {
    ArticleManageApi.queryAll()
}
</script>@/api/ArticleManageApi