<template>
    <div class="box">
        <div class="box-head">
            <div class="box-title" color="arcoblue">{{ blog.title }}</div>
            <a-button type="secondary" style="margin-right: 20px;" @click="handleExportMd">导出为md</a-button>
            <a-button type="secondary" style="margin-right: 20px;" @click="handleExportImage">导出为图片</a-button>
            <a-switch v-model="isShowNav" checked-text="打开导航栏" unchecked-text="关闭导航栏" @change="handleChange"></a-switch>
        </div>

        <mavon-editor class="box-editor" ref="mdRef" v-model="blog.content" :editable="false" :toolbarsFlag="false"
            defaultOpen="preview" :subfield="false" :navigation="isShowNav" @navigationToggle="handleNavToggle" />
    </div>
</template>

<script setup lang="ts">
import { ArticleManageApi, Blog } from '../api/ArticleManageApi'
import { onMounted, ref, watch } from 'vue';
import { Utils } from '../utils/Utils'
import { Message } from '@arco-design/web-vue';
import { useRoute } from 'vue-router'

const mdRef = ref<any>(null)
const isShowNav = ref<boolean>(true)
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
        blog.value.content = blog.value.content.replaceAll('8.130.116.190', '101.133.143.249')
       
    }).catch(err => {
        Message.error(err.message || '查询失败！')
    })
}

watch(() => route.params.id, (nVal, oVal) => {
    getBlogDetail()
})
const handleChange = (val: boolean | number | string) => {

    mdRef.value.toolbar_right_click('navigation')

}
const handleNavToggle = (isShow: boolean, value: string) => {
    isShowNav.value = isShow
}
const handleExportImage = () => {
    const targetDom: any = document.getElementsByClassName('v-show-content')[0]
    Utils.exportImage(targetDom, blog.value.title)
}
const handleExportMd = () => {
    Utils.exportMd(blog.value.content, blog.value.title)
}
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

    .box-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100vw - 400px);

        .box-title {
            margin-left: 50px;
            font-size: 24px;
            background-color: $blue-1;
            color: $blue-6;
            padding: 5px;
            border-radius: 10px;
        }

        .box-setting {}
    }


    .markdown-body {
        margin: 20px 0 0 50px;
        width: calc(100vw - 300px - 150px);
        max-height: calc(100vh - 200px);
        overflow-y: auto;
    }
}
</style>