<template>
    <div class="box">
        <div class="box-head">
            <a-button @click="handleAddAccount()" type="primary" style="margin-right: 10px;">添加账号</a-button>
        </div>
        <div class="box-content">
            <a-table :data="tableData" :pagination="false">
                <template #columns>
                    <a-table-column title="id" data-index="id"></a-table-column>
                    <a-table-column title="用户名" data-index="username"></a-table-column>
                    <a-table-column title="密码" data-index="password"></a-table-column>
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
                    <a-table-column title="uuid" data-index="uuid"></a-table-column>

                    <a-table-column title="操作">
                        <template #cell="{ record }">
                            <a-button style="margin-left: 5px;" @click="handleEditAccount(record)"
                                type="primary">编辑</a-button>
                            <a-popconfirm content="确定要删除吗？" position="top" @ok="handleDeleteAccount(record)">
                                <a-button style="margin-left: 5px;" status="danger">删除</a-button>
                            </a-popconfirm>

                        </template>
                    </a-table-column>
                </template>

            </a-table>
        </div>
        <div class="box-bottom">
            <a-pagination :total="page.total" @change="handlePageChange" @page-size-change="handlePageSizeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Utils } from '../../utils/Utils'
import { Account } from '@/model/Account.ts'
import { AccountManageApi } from '@/api/AccountManageApi'
import { Page } from '@/model/Component'
import { Message } from '@arco-design/web-vue';
import { useStore } from '@/store/index'

const store = useStore()
// 数据
const router = useRouter()
const tableData = ref<Array<Account>>([{
    username: 'wangxing',
    password: 'wangxing',
    id: 1,
    uuid: 'wangxing',
    createTime: 'wangxing',
    updateTime: 'wangxing',
}])
let allTableData: Array<Account> = []
const page = ref<Page>({
    currentPage: 0,
    pageSize: 10,
    total: 0
})
// 生命周期
onMounted(() => {
    console.log(store.userStore.user)
    queryAccountList()
})
// 方法
const handleAddAccount = () => {
    router.push('/MainPage/AccountEdit')
}

const queryAccountList = () => {
    AccountManageApi.queryAccountList().then(res => {
        tableData.value = res
        if (Array.isArray(res)) {
            page.value.total = res.length
            allTableData = res
            tableData.value = allTableData.slice(page.value.currentPage * page.value.pageSize, page.value.currentPage * page.value.pageSize + page.value.pageSize)
        } else {
            page.value.total = 0
            allTableData = []
            tableData.value = []
        }
    }).catch(err => {
        Message.error(err?.message || '查询账号失败！')
    })
}

const handleEditAccount = (par: Account) => {
    router.push({
        name: 'AccountEdit',
        params: {
            account: JSON.stringify({
                uuid: par.uuid,
                username: par.username
            })
        }
    })
}
// 删除账号
const handleDeleteAccount = (par: Account) => {
    let params = {
        uuid: par.uuid
    }
    AccountManageApi.deleteAccount(params).then(res => {
        Message.success('删除账号成功！')
        queryAccountList()
    }).catch(err => {
        Message.error(err?.message || '删除账号失败！')
    })
}

const handlePageChange = (current: number) => {
    tableData.value = allTableData.slice((current - 1) * page.value.pageSize, (current - 1) * page.value.pageSize + page.value.pageSize)
}
const handlePageSizeChange = (pageSize: number) => {
    tableData.value = allTableData.slice(page.value.currentPage * pageSize, page.value.currentPage * pageSize + pageSize)
}
</script>

<style lang="scss" scoped>
.box {
    .box-head {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }

    .box-content {
        margin-left: 30px;
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
}
</style>