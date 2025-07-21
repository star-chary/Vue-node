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
