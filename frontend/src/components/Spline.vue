<template>
  <spline-viewer
    :url="splineUrl"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 110%"
  ></spline-viewer>
</template>

<script setup lang="ts">

const props = defineProps({
  splineUrl: {
    type: String,
    required: true,
  },
  scriptUrl: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  // 动态加载 Spline 的脚本（只会加载一次）
  if (!document.querySelector('#spline-viewer-script')) {
    const script = document.createElement('script')
    script.id = 'spline-viewer-script'
    script.type = 'module'
    script.src = props.scriptUrl
    document.head.appendChild(script)
  }
  nextTick()
})
</script>
