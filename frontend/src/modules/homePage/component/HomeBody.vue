<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="container-body">
    <div class="container-body-left">
      <h1>全栈驱动的创意空间 从前端到后端，构建属于你的数字体验</h1>
      <p>
        “基于 Vue3 + Node.js + MongoDB
        构建的全栈项目，涵盖用户系统、评论模块、文件上传与数据展示，整合前后端完整流程。
      </p>
      <div class="btn">
        <button id="contact">联系我</button>
        <button @click="router.push('/login')" id="started">进入体验</button>
      </div>
    </div>
    <div class="container-body-right"></div>
  </div>
</template>

<style scoped>
.container-body {
  height: calc(100vh - 60px);
  position: relative;
}

.container-body-left {
  width: clamp(300px, 50%, 600px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 6rem 4rem 2rem 4rem;
  gap: clamp(1rem, 2vw, 2rem);
}

.container-body-left h1 {
  color: white;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 500;
}

.container-body-left p {
  width: 80%;
  font-size: 1rem;
  font-weight: 400;
  color: gray;
  mix-blend-mode: exclusion;
}
.btn {
  position: relative;
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  margin-top: 1rem;
  z-index: 1;
}
#contact,
#started {
  position: relative;
  width: clamp(150px, 6rem, 200px);
  padding: 1rem 2rem 1rem 2rem;
  font-size: clamp(1rem, 1vw, 1.2rem);
  border-radius: clamp(1rem, 2vw, 2rem);
  background-color: white;
  color: #0b021c;
  overflow: hidden;
  cursor: pointer;
  transition: 0.75s;
  border: 2px solid white;
  z-index: 2;
}
#started {
  background-color: transparent;
  color: white;
}
#started:before,
#contact:before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: white;
  clip-path: circle(0% at 50% 50%);
  z-index: -1;
  transition: 0.75s;
}
#started:hover::before,
#contact:hover::before {
  clip-path: circle(100% at 50% 50%);
}
#started:hover {
  color: #0b021c;
}
#contact::before {
  background-color: #3e108a;
  filter: blur(6px);
}

.container-body::before {
  content: '';
  position: absolute;
  bottom: clamp(-10%, -20%, -30%);
  left: clamp(-1%, -5%, -10%);
  color: white;
  width: clamp(100px, 15vw, 200px);
  height: clamp(100px, 15vw, 200px);
  border-radius: 50%;
  background-color: #8665e4;
  filter: blur(150px);
}
.container-body:after {
  content: '';
  position: absolute;
  top: clamp(-10%, 20%, 30%);
  right: clamp(-2%, -2%, -2%);
  color: white;
  width: clamp(100px, 15vw, 200px);
  height: clamp(100px, 15vw, 200px);
  border-radius: 50%;
  background-color: #8665e4;
  filter: blur(110px);
}
</style>
