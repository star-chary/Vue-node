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
  getTopicList: (params?: object) => {
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
  getMyTopic: () => {
    return request({
      url: '/myTopic',
      method: 'get',
    })
  },
}
