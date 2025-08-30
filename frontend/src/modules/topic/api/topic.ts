import { request } from '@/api/request.ts'
import type { Page } from '@/modules/topic/types/topic'
const API_V = '/api/v1'
export const topicApi = {
  // 新建话题
  createTopic: (data?: FormData) => {
    return request({
      url: API_V + '/topic',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  // 获取列表
  getTopicList: (data?: Page) => {
    return request({
      url: API_V + '/topics',
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
  // 获取日志
  getLogs: (params?: object) => {
    return request({
      url: API_V + '/logs',
      method: 'get',
      params,
    })
  },
}
