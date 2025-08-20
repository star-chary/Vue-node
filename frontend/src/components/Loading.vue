<script setup lang="ts">
</script>

<template>
  <div class="loading">
    <div class="spinner"></div>
    <span style="color: gray">加载中...</span>
  </div>
</template>
<style scoped>

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}
.spinner {
  width: 16px;
  height: 10px;
  border: 2px solid #ccc; /* 外圈 */
  border-top-color: #333; /* 高亮部分 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
