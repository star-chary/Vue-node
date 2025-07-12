import type { Directive } from 'vue'

// 禁止输入空格的指令
export const noSpace: Directive = {
  mounted(el: HTMLElement) {
    el.onkeydown = function (e: keyboardEvent) {
      if (e.keyCode === 32) {
        return false
      }
    }
  },
}
