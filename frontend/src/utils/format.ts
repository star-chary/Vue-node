export const formatTime = (timeStr: string): string => {
  const date = new Date(timeStr)
  return date
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')
}

// 将 ISO 格式的时间转换为年月日时分
export const formatISOTime = (isoString: string): string => {
  if (!isoString) return ''

  const date = new Date(isoString) // 解析 ISO 格式
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}`
}
