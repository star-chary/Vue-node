<script setup lang="ts">
import HomeHeader from '@/modules/homePage/component/HomeHeader.vue'
import HomeBody from '@/modules/homePage/component/HomeBody.vue'
import HomeBody2 from '@/modules/homePage/component/HomeBody2.vue'
</script>

<template>
  <div class="container">
    <header>
      <HomeHeader></HomeHeader>
    </header>
    <main>
      <HomeBody></HomeBody>
      <HomeBody2></HomeBody2>
    </main>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  background-color: black;
}

</style>
