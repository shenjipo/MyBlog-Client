<template>
    <div class="box-button">
        <a-button @click="handleCreateBlog()" type="primary" style="margin-right: 10px;">添加文章</a-button>
    </div>
    <div class="box-list">
        <a-table :data="tableData" :pagination="false">
            <template #columns>
                <a-table-column title="id" data-index="id"></a-table-column>
                <a-table-column title="标题" data-index="title"></a-table-column>
                <a-table-column title="创建时间">
                    <template #cell="{ record }">
                        <a-tag color="arcoblue">{{ Utils.formatDate(record.createTime) }}</a-tag>
                    </template>
                </a-table-column>
                <a-table-column title="更新时间" data-index="title">
                    <template #cell="{ record }">
                        <a-tag color="arcoblue">{{ Utils.formatDate(record.updateTime) }}</a-tag>
                    </template>
                </a-table-column>
                <a-table-column title="作者" data-index="author"></a-table-column>
                <a-table-column title="操作">
                    <template #cell="{ record }">
                        <a-button @click="handlePreviewBlog(record)">查看详情</a-button>
                        <a-button style="margin-left: 5px;" @click="handleEditBlog(record)" type="primary">编辑</a-button>
                        <a-popconfirm content="确定要删除吗？" position="top" @ok="handleDeleteBlog(record)">
                            <a-button style="margin-left: 5px;" status="danger">删除</a-button>
                        </a-popconfirm>

                    </template>
                </a-table-column>
            </template>

        </a-table>
    </div>
    <div class="box-bottom">
        <a-pagination :total="tableData.length" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ArticleManageApi } from '../api/ArticleManageApi'
import { useRouter } from 'vue-router'
import { Blog } from '../api/ArticleManageApi'
import { Message } from '@arco-design/web-vue';
import { Utils } from '../utils/Utils'
const router = useRouter()

onMounted(() => {
    getBlogList()
})

const tableData = ref<Array<Blog>>([]);


const getBlogList = () => {
    ArticleManageApi.queryBlogList().then(res => {
        tableData.value = res
     
    }).catch(err => {
        Message.error(err?.message || '查询失败！')
    })
}
const handleCreateBlog = (id?: any) => {
    router.push('/MainPage/BlogEdit')
}
const handlePreviewBlog = (blog: Blog) => {
    router.push(`/Preview/PreviewBlog/${blog.id}`)
}
const handleEditBlog = (params: Blog) => {

    router.push(`/MainPage/BlogUpdate/${params.id}`)
}
const handleDeleteBlog = (params: Blog) => {
    ArticleManageApi.deleteBlogById(params.id).then(res => {
        Message.success('删除成功!!!')
        getBlogList()
    }).catch(err => {
        Message.error(err.message || '删除失败!!!')
    })
}

</script>

<style lang="scss">
.box-button {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}

.box-list {
    padding: 0 0 0 30px;
    margin-top: 30px;

    .arco-table {
        max-height: calc(100vh - 200px);
        overflow: auto;
    }
}

.box-bottom {
    position: absolute;
    bottom: 20px;
    right: 20px;
}
</style>@/api/ArticleManageApi