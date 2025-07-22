import { request } from '@/api/request.ts'
import type { GetCommentParams } from '@/modules/topic/types/topic'

export const commentApi = {
  // 发表评论
  createComment: (data: object) => {
    return request({
      url: '/createComment',
      method: 'post',
      data,
    })
  },
  // 获取文章评论
  getComment: (data:GetCommentParams) => {
    return request({
      url: '/getCommentList',
      method: 'post',
      data,
    })
  },
}
