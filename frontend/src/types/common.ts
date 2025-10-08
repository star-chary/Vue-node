// 分页
export interface Page {
  page: number
  pageSize: number
}
// 用户信息
export interface UserInfo {
  username: string
  id: string
}
// 用户个人信息
export interface UserProfile {
  // 用户 ID
  user_id: string
  // 用户头像 url
  avatar_url: string
  // 昵称
  nickname: string
  // 个人简介
  bio: string
  // 性别 (0:保密, 1:男, 2:女)别
  gender: number
  // 所在城市
  location: string
  // 生日
  birthday: string
  // 笔记数
  post_count: number
  // 更新时间
  update_at: string
}
