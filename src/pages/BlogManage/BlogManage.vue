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
                        <a-button style="margin-left: 5px;" @click="handleEditBlog(record)" type="primary">编辑</a-button>
                        <a-popconfirm content="确定要删除吗？" position="top" @ok="handleDeleteBlog(record)">
                            <a-button style="margin-left: 5px;" status="danger">删除</a-button>
                        </a-popconfirm>
                        <a-switch style="margin-left: 5px;" v-model="record.isPreviewShow" checked-value="1"
                            unchecked-value="2" @change="handleShowChange(record)">
                            <template #checked>
                                对外显示
                            </template>
                            <template #unchecked>
                                对外关闭
                            </template>
                        </a-switch>
                        <a-button @click="handlePreviewBlog(record)" v-if="record.isPreviewShow === '1'">查看详情</a-button>
                    </template>
                </a-table-column>
            </template>

        </a-table>
    </div>
    <div class="box-bottom">
        <a-pagination :total="page.total" @change="handlePageChange" @page-size-change="handlePageSizeChange" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ArticleManageApi } from '../../api/ArticleManageApi'
import { useRouter } from 'vue-router'
import { Blog } from '../../api/ArticleManageApi'
import { Message } from '@arco-design/web-vue';
import { Utils } from '../../utils/Utils'
import { Page } from '@/model/Component'
import { useStore } from '@/store/index'
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = useStore()
onMounted(() => {
    getBlogList()
})

const tableData = ref<Array<Blog>>([]);
let allTableData: Array<Blog> = []
const page = ref<Page>({
    currentPage: 0,
    pageSize: 10,
    total: 0
})

const getBlogList = () => {

    ArticleManageApi.queryBlogList().then(res => {
        if (Array.isArray(res)) {
            page.value.total = res.length
            allTableData = res.sort((a, b) => {
                if (!a.createTime || !b.createTime) {
                    return 1
                }

                return parseInt(b.createTime) - parseInt(a.createTime)
            })
            tableData.value = allTableData.slice(page.value.currentPage * page.value.pageSize, page.value.currentPage * page.value.pageSize + page.value.pageSize)
        } else {
            page.value.total = 0
            allTableData = []
            tableData.value = []
        }


    }).catch(err => {
        console.log(err)
        Message.error(err?.message || '查询失败！')
    })
}
const handleCreateBlog = (id?: any) => {
    router.push('/MainPage/BlogEdit')
}
const handlePreviewBlog = (blog: Blog) => {
    window.open(`http://${location.host}/Blog/#/Preview/PreviewBlog/${blog.id}`)
    // router.push(`/Preview/PreviewBlog/${blog.id}`)
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
// 设置博客是否对外显示
const handleShowChange = (params: Blog) => {
    ArticleManageApi.updateBlogShowById({
        id: params.id,
        isPreviewShow: params.isPreviewShow
    }).then(res => {
        Message.success('更新成功!')
    }).catch(err => {
        Message.error(err.message || '更新失败!')
    })
}
const handlePageChange = (current: number) => {

    tableData.value = allTableData.slice((current - 1) * page.value.pageSize, (current - 1) * page.value.pageSize + page.value.pageSize)
}
const handlePageSizeChange = (pageSize: number) => {
    tableData.value = allTableData.slice(page.value.currentPage * pageSize, page.value.currentPage * pageSize + pageSize)
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