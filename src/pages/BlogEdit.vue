<template>
    <div class="box">
        <div class="box-tool">
            <div class="box-left">
                <a-input class="box-title" placeholder="请输入标题" allow-clear style="width: 500px;" v-model="title" />
                <a-switch style="margin-left: 20px;" v-model="isPreviewShow" checked-value="1" unchecked-value="2">
                    <template #checked>
                        对外显示
                    </template>
                    <template #unchecked>
                        对外关闭
                    </template>
                </a-switch>
                <a-tag color="blue" size="large" style="margin-left: 20px;">新建博客</a-tag>
            </div>


            <div class="box-right">
                <a-button type="primary" style="margin-right: 20px;" @click="handleSave">保存</a-button>
                <a-popconfirm position="bottom" content="确定退出吗? 内容可能未保存！" @ok="handleReturn" popup-container="body">
                    <a-button>返回</a-button>
                </a-popconfirm>
            </div>
        </div>

        <div>
            <mavon-editor ref="mdRef" class="box-edit" v-model="content" @imgAdd="handleImgAdd" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArticleManageApi } from '../api/ArticleManageApi'
import { ref, onMounted } from 'Vue'
import { Message } from '@arco-design/web-vue';
import { useRoute, useRouter } from "vue-router"
const route = useRoute(); // 第一步
const router = useRouter()

const mdRef: any = ref(null)
const content = ref('')
const title = ref('')
const isPreviewShow = ref('1')

onMounted(() => {

})
const handleSave = () => {
    if (!title.value) {
        Message.error('标题不能为空!')
        return
    }
    if (!content.value) {
        Message.error('内容不能为空!')
        return
    }
    const params = {
        content: content.value,
        title: title.value,
        author: 'wangxing',
        createTime: new Date().getTime().toString(),
        isPreviewShow: isPreviewShow.value
    }
    ArticleManageApi.saveBlog(params).then(res => {
        Message.success('保存文章成功')
        router.push(`/MainPage/BlogUpdate/${res.id}`)
    }).catch(err => {
        Message.error(err?.message || '保存失败！')
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