<template>
    <div class="box">
        <a-tag class="box-title" color="arcoblue">{{ blog.title }}</a-tag>
        <mavon-editor class="box-editor" ref="mdRef" v-model="blog.content" :editable="false" :toolbarsFlag="false"
            defaultOpen="preview" :subfield="false" />
    </div>
</template>

<script setup lang="ts">
import { ArticleManageApi, Blog } from '../api/ArticleManageApi'
import { onMounted, ref, watch } from 'vue';

import { Message } from '@arco-design/web-vue';
import { useRoute } from 'vue-router'


const route = useRoute()
const blog = ref<Blog>({
    content: '',
    title: '',
    author: '',
    id: '',
    updateTime: '',
    isPreviewShow: '1'
})

onMounted(() => {
    getBlogDetail()
})

const getBlogDetail = () => {
    blog.value.id = route.params.id as string
    ArticleManageApi.queryBlogByIdNoToken(blog.value.id).then(res => {
        blog.value = res
    }).catch(err => {
        Message.error(err.message || '查询失败！')
    })
}

watch(() => route.params.id, (nVal, oVal) => {
    getBlogDetail()
})
</script>

<style lang="scss" scoped>
@import "../styles/var.scss";

.box {
    width: 100%;
    height: calc(100vh - 50px);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 50px;
    overflow-y: auto;
    flex-direction: column;

    .box-title {
        margin-left: 50px;
    }

    .markdown-body {
        margin: 20px 0 0 50px;
        width: calc(100vw - 300px - 150px);
        max-height: calc(100vh - 200px);
        overflow-y: auto;
    }
}
</style>