// 文章类型
export interface TopicForm {
  title: string
  content: string
}
// 表格项
export interface Row {
  title: string
  content: string
  reply_count: number
  _id: string
}
// 页，页大小
export interface Page {
  page: number
  pageSize: number
  title?: string
}

// 评论列表
export interface CommentList {
  comments: any[] // 评论列表
  author_id: string // 评论者 ID
  author_name: string // 评论者用户名
  author_avatar?: string // 评论者头像 - 可选
  author_website?: string // 评论者网站 - 可选
  author_email?: string // 评论者邮箱 - 可选
  author_ip?: string // 评论者IP - 可选
  author_location?: string // 评论者位置 - 可选
  author_create_time: string
  content: string
  reply_id?: string // 回复ID - 可选
  total?: number
}
// 获取评论列表参数类型
export interface GetCommentParams {
  topic_id: string
  page?: number
  pageSize?: number
}
