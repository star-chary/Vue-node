<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

type Ball = SVGCircleElement & {
  line: SVGLineElement
  ori_x: number
  ori_y: number
  move_x?: number
  move_y?: number
  animater?: gsap.core.Timeline
}

const containerRef = ref<SVGSVGElement | null>(null)

const state = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  lines: 30,
  rows: 30,
  balls: [] as Ball[],
  mouse_radius: 120,
}

const resize = () => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  state.width = rect.width
  state.height = rect.height
  state.left = rect.left
  state.top = rect.top
}

const clearContainer = () => {
  if (!containerRef.value) return
  // 清理动画与元素
  state.balls.forEach((b) => b.animater?.kill())
  state.balls = []
  while (containerRef.value.firstChild) {
    containerRef.value.removeChild(containerRef.value.firstChild)
  }
}

const createYoyo = (radius: number) => {
  if (!containerRef.value) return
  for (let r = 0; r <= state.rows; r++) {
    for (let l = 0; l <= state.lines; l++) {
      const x = (state.width / state.lines) * l
      const y = (state.height / state.rows) * r

      const ball = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as Ball
      ball.setAttribute('fill', '#333')
      ball.setAttribute('cx', String(x))
      ball.setAttribute('cy', String(y))
      ball.setAttribute('r', String(radius))

      const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      point.setAttribute('fill', '#f7f7f7')
      point.setAttribute('cx', String(x))
      point.setAttribute('cy', String(y))
      point.setAttribute('r', String(radius / 2))

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', String(x))
      line.setAttribute('y1', String(y))
      line.setAttribute('x2', String(x))
      line.setAttribute('y2', String(y))
      // 关键：动态创建元素不会被 scoped 样式匹配，必须内联设置描边

      line.setAttribute('stroke', '#f7f7f7')
      line.setAttribute('stroke-width', '2')
      line.setAttribute('stroke-linecap', 'round')


      containerRef.value.appendChild(line)
      containerRef.value.appendChild(point)
      containerRef.value.appendChild(ball)

      ball.line = line
      ball.ori_x = x
      ball.ori_y = y
      state.balls.push(ball)
    }
  }
}

const moveBalls = (x: number, y: number) => {
  const mouse_x = x - state.left
  const mouse_y = y - state.top

  state.balls.forEach((ball) => {
    const dx = ball.ori_x - mouse_x
    const dy = ball.ori_y - mouse_y
    const distance = Math.hypot(dx, dy)

    if (distance <= state.mouse_radius) {
      ball.move_x = mouse_x + (dx / distance) * state.mouse_radius
      ball.move_y = mouse_y + (dy / distance) * state.mouse_radius

      if (ball.animater) ball.animater.kill()

      ball.animater = gsap
        .timeline()
        .to(
          ball,
          {
            attr: { cx: ball.move_x, cy: ball.move_y },
            duration: 0.5,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          ball.line,
          {
            attr: { x2: ball.move_x, y2: ball.move_y },
            duration: 0.5,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          ball,
          {
            attr: { cx: ball.ori_x, cy: ball.ori_y },
            duration: 1,
            ease: 'power3.out',
          },
          0.1,
        )
        .to(
          ball.line,
          {
            attr: { x2: ball.ori_x, y2: ball.ori_y },
            duration: 1,
            ease: 'power3.out',
          },
          0.1,
        )
    }
  })
}

const handleMouseMove = (e: MouseEvent) => {
  moveBalls(e.clientX, e.clientY)
}

const handleWindowResize = () => {
  // 重新计算容器位置与尺寸，重建图形以避免缩放错位
  resize()
  clearContainer()
  createYoyo(10)
}

onMounted(() => {
  resize()
  createYoyo(10)
  document.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('resize', handleWindowResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleWindowResize)
  clearContainer()
})
</script>

<template>
  <svg class="container" ref="containerRef" />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.container line {
  fill: none;
  stroke: #f7f7f7;
  stroke-width: 2;
}

/* 页面背景和居中可按需放到上层容器中控制，这里仅保留核心样式 */
</style>
