import { defineStore } from 'pinia'
import { ref, computed } from "vue"
import { Account } from '@/model/Account'

export const useUserStore = defineStore('user', () => {

    let user = ref<Account>({
        username: '',
        password: '',
        uuid: '',
        createTime: '',
        updateTime: '',
        id: 0
    })

    function setUser(par: Account) {
        user.value = par
    }


    return {
        user,
        setUser
    }
})