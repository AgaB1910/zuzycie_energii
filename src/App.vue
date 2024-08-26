<script setup lang="ts"></script>

<template>
  <div>
    <the-header></the-header>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>

<style></style>
