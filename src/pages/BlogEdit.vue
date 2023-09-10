<template>
    <div class="box">
        <div class="box-tool">
            <div class="box-left">
                <a-input class="box-title" placeholder="请输入标题" allow-clear style="width: 500px;" />
            </div>


            <div class="box-right">
                <a-button type="primary" style="margin-right: 20px;" @click="handleSave">保存</a-button>
                <a-button>返回</a-button>
            </div>
        </div>

        <div>
            <mavon-editor class="box-edit" v-model="content" @imgAdd="handleImgAdd" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArticleManageApi } from '../api/ArticleManageApi'
import { ref } from 'Vue'


const content = ref()
const handleSave = () => {
    console.log(content.value)
}
const handleImgAdd = (pos: any, file: any) => {
    ArticleManageApi.uploadImg(file).then(res => {
        
    })
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