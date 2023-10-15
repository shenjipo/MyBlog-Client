<template>
    <div class="box">
        <div class="box-left">
            <router-view :index="index"></router-view>
        </div>
        <div class="box-right">
            <a-input placeholder="请输入标题搜索" allow-clear @input="handleInput" @clear="handleClear" />
            <div class="blog-list">
                <div class="blog" v-for="blog in blogList" :key="blog.id" @click="handleBlogDetail(blog)"
                    style="cursor: pointer;">
                    {{ blog.title }} -- {{ Utils.formatDate(blog.createTime) }}

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { FormRules } from '@/utils/ComponentUtils'
import { Api } from '@/api/login';
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router'
import { ArticleManageApi, Blog } from '@/api/ArticleManageApi'
import { Utils } from '@/utils/Utils'
const router = useRouter()
const blogList = ref<Array<{ id: string, title: string, createTime: string }>>()
onMounted(() => {
    getList()
})
let originBlogList: Array<any> = []
const index = ref<number>(1)
const getList = () => {
    ArticleManageApi.queryBlogListExceptContent().then(res => {
        blogList.value = res
        originBlogList = res
    }).catch(err => {
        Message.error(err?.message || '查询博客列表失败!')
    })
}

const handleInput = (val: string) => {
    if (val === '') {
        blogList.value = originBlogList
    } else {
        blogList.value = originBlogList.filter((blog: Blog) => {
            return blog.title.indexOf(val) > -1
        })
    }
}
const handleClear = () => {
    blogList.value = originBlogList
}
const handleBlogDetail = (blog: { id: string, title: string, createTime: string }) => {

    router.push(`/Preview/PreviewBlog/${blog.id}`)
    index.value += 1
}
</script>

<style lang="scss" scoped>
@import "../styles/var.scss";

.box {
    width: 100%;
    display: flex;
    height: 100vh;
    overflow-y: auto;

    .box-left {
        flex-grow: 1;
    }

    .box-right {
        width: 300px;
        position: relative;
        
        &::before {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            background-color: $gray-6;
            height: 100%;
            width: 1px;
        }

        padding: 20px;

        .blog-list {
            max-height: calc(100vh - 55px);
            overflow-x: hidden;
            overflow-y: auto;
            .blog {
                margin-top: 10px;
                background-color: $gray-3;
                border-radius: 5px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $blue-6;
                padding: 10px;

            }
        }

    }
}
</style>