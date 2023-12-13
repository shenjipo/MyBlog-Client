<template>
    <div class="box">
        <a-form ref="formRef" :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
            <a-form-item field="username" tooltip="请输入用户名" label="用户名" :rules="rules">
                <a-input v-model="form.username" placeholder="请输入用户名..." />
            </a-form-item>
            <a-form-item field="password" label="密码" :rules="rules">
                <a-input v-model="form.password" placeholder="请输入密码..." />
            </a-form-item>
            <a-form-item field="copyPassword" label="确认密码" :rules="form3Rules">
                <a-input v-model="form.copyPassword" placeholder="请再次确认密码..." />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="handleSubmit">确定</a-button>
                <a-button style="margin-left: 10px;">取消</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Account } from '@/model/Account'
import { FormRules } from '@/utils/ComponentUtils'
import { AccountManageApi } from '@/api/AccountManageApi'
import { useRouter, useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue';
import { Modal } from '@arco-design/web-vue';

const router = useRouter()
const route = useRoute()

interface Form extends Account {
    copyPassword: string
}
const rules = [
    FormRules.Required()
]
const form3Rules = [
    {
        validator: (value: string, cb: any) => {
            if (value !== form.value.password) {
                console.log(value)
                cb('两次输入密码不一致')
            }
        }
    },
    FormRules.Required()
]
const form = ref<Form>({
    username: '',
    password: '',
    createTime: '',
    updateTime: '',
    id: 1,
    uuid: '12',
    copyPassword: ''
})
const formRef: any = ref(null)
let isEdit = false

onMounted(() => {
    let account: any = route.params.account as string

    if (account) {
        isEdit = true
        account = JSON.parse(account)
        form.value.uuid = account.uuid
        form.value.username = account.username

    }
})

const handleSubmit = () => {
    // 先校验表单
    formRef.value.validate((err: any) => {
        if (!err && form.value.password === form.value.copyPassword) {
            // 二次弹窗确认
            Modal.open({
                title: '确认修改',
                content: isEdit ? '确定修改密码？修改成功后须重新登陆！' : '确定创建账号？',
                onOk: () => {

                    isEdit ? editAccount() : addAccount()
                }
            })

        }
    })


}
const editAccount = () => {
    let params = {
        uuid: form.value.uuid,
        password: form.value.password,
    }
    AccountManageApi.editAccount(params).then(res => {
        Message.success('修改密码成功！请重新登陆')
        localStorage.setItem('token', '')
        router.push('/login')
    }).catch(err => {
        Message.error(err?.message || '修改账号失败！')
    })
}
const addAccount = () => {
    let params = {
        username: form.value.username,
        password: form.value.password,
    }
    AccountManageApi.addAccount(params).then(res => {
        Message.success('添加账号成功！')
        router.push('/MainPage/AccountManage')
    }).catch(err => {
        Message.error(err?.message || '添加账号失败！')
    })
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    justify-content: center;
    margin-top: 150px;
}
</style>