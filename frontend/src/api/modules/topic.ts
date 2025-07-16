import { request } from '@/api/request.js'

export const topicApi = {
  // 新建话题
  createTopic: (data: object) => {
    return request({
      url: '/topic',
      method: 'post',
      data,
    })
  },
  // 获取列表
  getTopicList: (params) => {
    return request({
      url: '/list',
      method: 'get',
      params,
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
  deleteTopic: (data) => {
    return request({
      url: '/del',
      method: 'post',
      data,
    })
  },
}
