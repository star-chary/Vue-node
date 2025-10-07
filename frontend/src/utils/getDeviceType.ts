/*
 * 判断是移动端还是 PC 端
 * */
export const getDeviceType = (userAgent: string): string => {
  let device = 'PC'

  if (/Mobile|Android|iPhone/i.test(userAgent)) {
    device = 'Mobile'
  }

  return device
}

/*
 * 拼接后端返回的图片链接
 * */
export const getImgUrl = (url: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  return url ? `${baseUrl}${url}` : ''
}
