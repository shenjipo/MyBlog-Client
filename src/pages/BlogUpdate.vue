<template>
    <div class="box">
        <div class="box-tool">
            <div class="box-left">
                <a-input class="box-title" placeholder="请输入标题" allow-clear style="width: 500px;" v-model="blog.title" />
                <a-switch style="margin-left: 20px;" v-model="blog.isPreviewShow" checked-value="1" unchecked-value="2">
                    <template #checked>
                        对外显示
                    </template>
                    <template #unchecked>
                        对外关闭
                    </template>
                </a-switch>
                <a-tag color="green" size="large" style="margin-left: 20px;">更新博客</a-tag>
            </div>


            <div class="box-right">
                <a-button type="primary" style="margin-right: 20px;" @click="handleSave">修改保存</a-button>
                <a-button type="secondary" style="margin-right: 20px;" @click="handleExportMd">导出为md</a-button>
                <a-button type="secondary" style="margin-right: 20px;" @click="handleExportImage">导出为图片</a-button>
                <a-popconfirm position="bottom" content="确定退出吗? 内容可能未保存！" @ok="handleReturn" popup-container="body">
                    <a-button>返回</a-button>
                </a-popconfirm>

            </div>
        </div>

        <div>
            <mavon-editor ref="mdRef" class="box-edit" v-model="blog.content" @imgAdd="handleImgAdd" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArticleManageApi, Blog } from '../api/ArticleManageApi'
import { ref, onMounted } from 'Vue'
import { Message } from '@arco-design/web-vue';
import { useRoute, useRouter } from "vue-router"
import { Utils } from '../utils/Utils'
const route = useRoute(); // 第一步
const router = useRouter()

const mdRef: any = ref(null)
const blog = ref<Blog>({
    content: '',
    title: '',
    author: '',
    id: '',
    updateTime: '',
    isPreviewShow: '1',
})
const title = ref('')


onMounted(() => {

    blog.value.id = route.params.id as string
    ArticleManageApi.queryBlogById(blog.value.id).then(res => {
        blog.value = res
    }).catch(err => {
        Message.error(err.message || '查询失败！')
    })
})
const handleSave = () => {
    if (!blog.value.title) {
        Message.error('标题不能为空!')
        return
    }
    if (!blog.value.content) {
        Message.error('内容不能为空!')
        return
    }
    const params = {
        id: blog.value.id,
        title: blog.value.title,
        content: blog.value.content,
        isPreviewShow: blog.value.isPreviewShow
    }

    ArticleManageApi.updateBlogById(params).then(res => {
        Message.success('更新成功!')
    }).catch(err => {
        Message.error(err?.message || '更新失败!')
    })
}
const handleImgAdd = (pos: any, file: any) => {
    ArticleManageApi.uploadImg(file).then(res => {

        mdRef.value.$img2Url(pos, process.env.VUE_APP_BASE_API + `/getImage/${res.url}`)

    }).catch(err => {

        Message.error(err?.message || '上传图片失败！')
    })
}
const handleReturn = () => {
    router.push('/MainPage/BlogManage')
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
.box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .box-tool {
        width: calc(100vw - 360px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;


        .box-right {
            display: flex;
        }
    }


    .box-edit {
        max-height: calc(100vh - 200px);
        overflow: auto;
        width: calc(100vw - 360px);
        overflow-x: hidden;
        margin-top: 20px;
    }
}
</style>