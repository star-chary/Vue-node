<!--<script setup lang="ts">-->
<!--import { ref, onMounted, onBeforeUnmount } from 'vue'-->
<!--import gsap from 'gsap'-->
<!--import { ScrollTrigger } from 'gsap/ScrollTrigger'-->
<!--import Lenis from '@studio-freight/lenis'-->

<!--gsap.registerPlugin(ScrollTrigger)-->

<!--const wapper = ref<HTMLElement | null>(null)-->
<!--const cardsbox = ref<HTMLElement | null>(null)-->

<!--onMounted(() => {-->
<!--  // 初始化平滑滚动-->
<!--  const lenis = new Lenis({-->
<!--    duration: 1.1,-->
<!--    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),-->
<!--    smoothWheel: true,-->
<!--    autoRaf: true,-->
<!--  })-->

<!--  lenis.on('scroll', ScrollTrigger.update) // 同步 scroll 状态-->
<!--  const updateLenis = (time: number) => {-->
<!--    lenis.raf(time)-->
<!--    requestAnimationFrame(updateLenis)-->
<!--  }-->
<!--  requestAnimationFrame(updateLenis)-->

<!--  // 横向滚动逻辑-->
<!--  const initScrollBox = () => {-->
<!--    const box = cardsbox.value!-->
<!--    const wrap = wapper.value!-->

<!--    const scrollDistance = box.scrollWidth - window.innerWidth-->
<!--    wrap.style.height = `${scrollDistance + window.innerHeight}px`-->

<!--    // 移除旧的 ScrollTrigger-->
<!--    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())-->

<!--    ScrollTrigger.create({-->
<!--      trigger: wrap,-->
<!--      start: 'top top',-->
<!--      // end: () => `+=${scrollDistance}`,-->
<!--      end: 'bottom bottom',-->
<!--      scrub: true,-->
<!--      onUpdate: (self) => {-->
<!--        gsap.to(box, { x: -scrollDistance * self.progress, duration: 0.1, ease: 'none' })-->
<!--      },-->
<!--    })-->
<!--  }-->

<!--  initScrollBox()-->
<!--  window.addEventListener('resize', initScrollBox)-->

<!--  onBeforeUnmount(() => {-->
<!--    window.removeEventListener('resize', initScrollBox)-->
<!--    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())-->
<!--  })-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div ref="wapper" class="wapper">-->
<!--    <div class="container">-->
<!--      <div ref="cardsbox" class="cardsbox">-->
<!--        <div class="cardsbox_card" v-for="n in 4" :key="n">KEEP SCROLL {{ n }}</div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--  <div class="empty">KEEP SCROLL</div>-->
<!--  <div class="empty">KEEP SCROLL</div>-->
<!--</template>-->

<!--<style scoped>-->


<!--.wapper {-->
<!--  position: relative;-->
<!--  width: 100%;-->
<!--}-->

<!--.container {-->
<!--  position: sticky;-->
<!--  top: 0;-->
<!--  height: 100vh;-->
<!--  width: 100%;-->
<!--  overflow: hidden;-->
<!--  background-color: #17f700;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.cardsbox {-->
<!--  display: flex;-->
<!--  will-change: transform;-->
<!--  padding-left: 10vw;-->
<!--}-->

<!--.cardsbox_card {-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  display: flex;-->
<!--  width: 70rem;-->
<!--  height: 50rem;-->
<!--  background-color: #f7f7f7;-->
<!--  margin-right: 50rem;-->
<!--  font-size: 5rem;-->
<!--  color: #171717;-->
<!--  flex-shrink: 0;-->
<!--}-->

<!--.empty {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  width: 100%;-->
<!--  height: 80rem;-->
<!--  margin: 10rem 0;-->
<!--  background-color: #f7f7f7;-->
<!--  font-size: 5rem;-->
<!--  color: #171717;-->
<!--}-->
<!--</style>-->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

const wrapper = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const cardsbox = ref<HTMLElement | null>(null)

let lenis: any = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  // 初始化 Lenis（可选）
  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    autoRaf: true,
  })
  // 让 GSAP 在 Lenis 滚动时更新
  lenis.on('scroll', ScrollTrigger.update)
  // raf loop for lenis
  const raf = (t: number) => {
    lenis.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // 初始化或刷新横向滚动
  const setupHorizontal = () => {
    const wrapEl = wrapper.value!
    const boxEl = cardsbox.value!
    const contEl = container.value!

    // 计算真实可滚动横向距离
    // 注意包括 scrollWidth（包含 padding 内部所有内容）比 offsetWidth 更稳妥
    const scrollDistance = Math.max(0, boxEl.scrollWidth - window.innerWidth)

    // 设置 wrapper 的高度：保证页面有足够的垂直滚动区域来驱动完整横向位移
    wrapEl.style.height = `${scrollDistance + window.innerHeight}px`

    // 清除之前的 triggers（如果有）
    ScrollTrigger.getAll().forEach(t => t.kill())

    // 使用 gsap tween + scrollTrigger.pin（pin container），这是最稳妥的方案
    gsap.to(boxEl, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapEl,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        // end: 'bottom bottom',
        scrub: true,
        pin: contEl,            // 把 container 固定在视口
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // 在开发时可打开日志检查数值：
    // console.log({ scrollDistance, containerW: boxEl.scrollWidth, winW: window.innerWidth })
  }

  // 先初始化一次
  setupHorizontal()

  // 当窗口尺寸变化时重新计算
  const onResize = () => {
    setupHorizontal()
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', onResize)

  // 可额外用 ResizeObserver 监听 cardsbox 内容宽度变化（更稳）
  resizeObserver = new ResizeObserver(() => {
    onResize()
  })
  if (cardsbox.value) resizeObserver.observe(cardsbox.value)

  onBeforeUnmount(() => {
    // 清理
    window.removeEventListener('resize', onResize)
    if (resizeObserver && cardsbox.value) resizeObserver.unobserve(cardsbox.value)
    ScrollTrigger.getAll().forEach(t => t.kill())
    if (lenis) {
      // @ts-ignore
      lenis.destroy && lenis.destroy()
      lenis = null
    }
  })
})
</script>

<template>
  <div ref="wrapper" class="wapper">
    <div ref="container" class="container">
      <div ref="cardsbox" class="cardsbox">
        <div class="cardsbox_card" v-for="n in 4" :key="n">开发中... {{ n }}</div>
      </div>
    </div>
  </div>

  <div class="empty">开发中...</div>
  <div class="empty">开发中...</div>
  <div>测试 git 原子提交1</div>
  <div> 测试 git 原子提交2</div>
  <div> 测试 git 原子提交3</div>
</template>

<style scoped>
* { box-sizing: border-box; margin:0; padding:0; }
html, body, #app { height: 100%; }

.wapper { position: relative; width:100%; }

/* container 不用 position: sticky —— 由 ScrollTrigger pin */
.container {
  width: 100%;
  height: 100vh;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  overflow:hidden;
  background: #17f700;
  position: relative; /* pin 会使用这个元素 */
}

/* cardsbox 为横向行内容器 */
.cardsbox {
  display:flex;
  align-items:center;
  /* optional left padding to give initial offset */
  padding-left: 10vw;
  will-change: transform;
}

/* 每张卡片 */
.cardsbox_card {
  display:flex;
  justify-content:center;
  align-items:center;
  width: 70rem;
  height: 50rem;
  margin-right: 50rem; /* gap between cards */
  background: #f7f7f7;
  color: #171717;
  font-size: 5rem;
  flex-shrink: 0;
}

/* 空白区 */
.empty {
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:80rem;
  margin:10rem 0;
  background:#f7f7f7;
  color:#171717;
  font-size:5rem;
}
</style>
