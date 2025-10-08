import { defineStore } from 'pinia'
import type { UserProfile } from '@/types/common'
import api from '@/api'

export const useUserProfileStore = defineStore('userProfile', () => {
  // 用户信息
  // const userInfo = ref<UserProfile>({
  //   user_id: '',
  //   avatar_url: '',
  //   nickname: '',
  //   bio: '',
  //   gender: 0,
  //   location: '',
  //   birthday: '',
  //   post_count: 0,
  //   update_at: '',
  // })
  const userInfo = ref<UserProfile>()

  // 获取用户信息
  const getUserProfile = async () => {
    const res = await api.user.getUserInfo()
    userInfo.value = res.data.data
    console.log(userInfo.value,999)
  }

  return {
    userInfo,
    getUserProfile,
  }
})
