<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { Api } from './api/login'
const handleClick = () => {
  Api.login(1)
}

</script>

<style></style>
