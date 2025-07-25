import { request } from '@/api/request.ts'
import type { Page } from '@/modules/topic/types/topic'

export const topicApi = {
  // 新建话题
  createTopic: (data?: FormData) => {
    return request({
      url: '/topic',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // createTopicFile: (data?:FormData) => {
  //   return request({
  //     url: '/topicFiles',
  //     method: 'post',
  //     data,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  // },
  // 获取列表
  getTopicList: (data?: object) => {
    return request({
      url: '/list',
      method: 'post',
      data,
    })
  },
  // 列表详情
  getTopicDetail: (id: number | string) => {
    return request({
      url: `/list/${id}`,
      method: 'get',
    })
  },
  // 删除
  deleteTopic: (data?: object) => {
    return request({
      url: '/del',
      method: 'post',
      data,
    })
  },
  // 修改
  modifyTopic: (data?: object) => {
    return request({
      url: '/modify',
      method: 'post',
      data,
    })
  },
  // 获取当前用户文章
  getMyTopic: (data: Page) => {
    return request({
      url: '/myTopic',
      method: 'post',
      data,
    })
  },
}
