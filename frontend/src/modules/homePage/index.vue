<script setup lang="ts">
import HomeHeader from '@/modules/homePage/component/homeHeader.vue'
import HomeBody from '@/modules/homePage/component/homeBody.vue'
</script>

<template>
  <div class="container">
    <header>
      <HomeHeader></HomeHeader>
    </header>
    <main>
      <HomeBody></HomeBody>
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
.container::before {
  content: '';
  position: absolute;
  bottom: -10%;
  left: -5%;
  color: white;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-color: #8665e4;
  filter: blur(150px);
}
.container::after{
  content: '';
  position: absolute;
  top: 10%;
  right: -5%;
  color: white;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  background-color: #8665e4;
  filter: blur(110px);
}
</style>
