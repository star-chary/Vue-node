<script setup lang="ts">
</script>

<template>
  <div class="container-body">
    <div class="container-body-left">
      <h1>Step Into Future:A 3D Experience Like Never Before</h1>
      <p>
        Lorem doahwo doaihwod dawijdpaj dawkhd wahdoawhd oaiwhdoawhd oawhdoawhd doawhdohao
        aohdoahdao aodhoahd aoahfoa whfoa owahfowa o
      </p>
      <div class="btn">
        <button id="contact">Contact</button>
        <button id="started">Started</button>
      </div>
    </div>
    <div class="container-body-right"></div>
  </div>
</template>

<style scoped>
.container-body {
  height: calc(100vh - 60px);
}

.container-body-left {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 2rem 4rem 2rem 2rem;
  gap: 1rem;
}

.container-body-left h1 {
  color: white;
  font-size: 4rem;
  font-weight: 500;
}

.container-body-left p {
  width: 80%;
  font-size: 0.9rem;
  font-weight: 300;
  color: gray;
  mix-blend-mode: exclusion;
}
.btn {
  position: relative;
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  z-index: 1;
}
#contact ,#started{
  position: relative;
  width: 12rem;
  padding:1rem 2rem 1rem 2rem;
  font-size: 1.3rem;
  border-radius: 30px;
  background-color: white;
  color: #0b021c;
  overflow: hidden;
  cursor: pointer;
  transition: 0.75s;
  border: 2px solid white;
  z-index: 2;
}
#started{
  background-color: transparent;
  color: white;
}
#started:before,#contact:before{
  content: "";
  position: absolute;
 inset: 0;
  background-color: white;
  clip-path: circle(0% at 50% 50%);
  z-index: -1;
  transition: 0.75s;
}
#started:hover::before,#contact:hover::before{
  clip-path: circle(100% at 50% 50%);
}
#started:hover{
  color: #0b021c;
}
#contact::before{
  background-color: #3e108a;
  filter: blur(6px);
}

</style>
