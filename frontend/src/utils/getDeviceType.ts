export const getDeviceType = (userAgent: string): string => {
  let device = 'PC'

  if (/Mobile|Android|iPhone/i.test(userAgent)) {
    device = 'Mobile'
  }

  return device
}
