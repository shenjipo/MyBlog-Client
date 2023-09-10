<template>
    <div class="box-button">
        <a-button @click="handleEditBlog()" type="primary" style="margin-right: 10px;">添加文章</a-button>
    </div>
    <div class="box-list">
        <a-table :columns="columns" :data="data" :pagination="false" />
    </div>
    <div class="box-bottom">
        <a-pagination :total="200" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ArticleManageApi } from '../api/ArticleManageApi'
import { useRouter } from 'vue-router'
const router = useRouter()

const handleEditBlog = (id?: any) => {
    console.log(id)
    if (id) {

    } else {
        router.push('/MainPage/BlogEdit')
    }
}
const handleBlogList = () => {
    getBlogList()
}

const getBlogList = () => {
    ArticleManageApi.queryAll()
}
const columns = [
    {
        title: '标题',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'salary',
    },
    {
        title: '修改时间',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];
const data = reactive([{
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
}, {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
}, {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com'
}, {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}]);
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