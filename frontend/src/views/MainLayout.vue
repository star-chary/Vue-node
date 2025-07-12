<script setup >
</script>

<template>
  <div class="appContainer">
    <div class="sideBar"></div>
    <div class="rightBar">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

.appContainer {
  width: 100vw;
  height: 1000px;
  display: flex;
  flex-direction: row;
}

.sideBar {
  width: 200px;
  height: 100%;
  background-color: cadetblue;
}

.rightBar {
  flex: 1;
  background-color: lemonchiffon;
}
</style>
