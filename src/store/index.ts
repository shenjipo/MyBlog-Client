import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { computed } from "vue";

export const useStore = defineStore('speed', () => {
    const userStore = useUserStore()

    return {
        userStore
    }
})