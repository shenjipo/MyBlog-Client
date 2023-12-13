<template>
    <div class="login-box">
        <a-card class="test">
            管理后台登录
            <a-form ref="formRef" :model="form" style="margin-top: 20px;">
                <a-form-item field="account" tooltip="请输入账号" label="账号" :rules="[FormRules.Required()]">
                    <a-input v-model="form.account" placeholder="请输入账号" @press-enter="handleFocus" />
                </a-form-item>
                <a-form-item field="password" tooltip="请输入密码" label="密码" :rules="[FormRules.Required()]">
                    <a-input-password ref="inputRef" v-model="form.password" placeholder="请输入密码"
                        @press-enter="handleSubmit" />
                </a-form-item>

                <a-form-item>
                    <a-button @click="handleSubmit">登录</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FormRules } from '@/utils/ComponentUtils'
import { Api } from '@/api/login';
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store/index'


const router = useRouter()
const store = useStore()
const formRef: any = ref(null)
const inputRef: any = ref(null)
const form: any = reactive({
    account: '',
    password: '',
});
const handleFocus = () => {

    inputRef.value.focus()
}
const handleSubmit = () => {

    formRef.value.validate((err: any) => {
        if (!err) {

            const params = {
                account: form.account,
                password: form.password,
            }
            Api.login(params).then(res => {
                store.userStore.setUser(res.user)
                localStorage.setItem('token', res.token)
                router.push('/MainPage/BlogManage')
            }).catch(err => {

                Message.error(err.message || '失败')
            })
        }
    })
}
</script>

<style lang="scss" scoped>
@import "../styles/var.scss";

.login-box {
    width: 500px;
    margin: 0 auto;
    margin-top: calc(30vh);
}
</style>