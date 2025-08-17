<script setup>
import SideBar from '@/modules/layout/pages/SideBar.vue'
</script>

<template>
  <div class="appContainer">
    <div class="sideBar">
      <SideBar></SideBar>
    </div>
    <div class="rightBar">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.appContainer {
  width: 100%;
  height: 100vh;
  display: flex;
}

.sideBar {
  width: 200px;
  background-color: white;
}

.rightBar {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
