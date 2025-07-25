<script setup lang="ts"></script>

<template>
  <div class="card-box">
    <div class="avatar">
      <img src="@/assets/imgs/img_1.jpg" alt="" />
    </div>
    <div class="title">这是个示例标题</div>
    <div class="user-info">
      <div class="user-avatar-name">
        <div
          style="
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 100%;
            background-color: red;
          "
        ></div>
        <div class="user-name">测试用户名</div>
      </div>
      <div class="likes">爱心</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-box {
  width: 260px;
  height: auto;
  background: gray;
  border-radius: 10px;
  @include flex-column;
}

.avatar {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 10px;
  background: red;
  overflow: hidden;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-info {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-avatar-name {
    width: 60%;
    display: flex;
    align-items: center;
  }
}
</style>
