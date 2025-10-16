<script setup lang="ts">
interface NavItem {
  label: string
  path: string
  id: number
}
const navList: NavItem[] = [
  {
    label: 'HOME',
    path: '/',
    id: 0,
  },
  {
    label: 'ABOUT',
    path: '/about',
    id: 1,
  },
  {
    label: 'CONTACT',
    path: '/contact',
    id: 2,
  },
]
</script>

<template>
  <div class="container-header">
    <div id="logo">REXXXXXX</div>
    <nav>
      <router-link
        v-for="item in navList"
        :key="item.id"
        :to="item.path"
        class="nav-item"
        active-class="active"
        >{{ item.label }}</router-link
      >
    </nav>
  </div>
</template>

<style scoped>
.container-header {
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
#logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
}
nav {
  display: flex;
  gap: 20px;
}
.nav-item {
  padding: 8px 16px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.router-link-active {
  color: #42b983;
  font-weight: bold;
}
</style>
