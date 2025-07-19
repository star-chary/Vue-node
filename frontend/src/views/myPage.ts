import { ref } from 'vue'

export const myPage = () => {
  const tableHead = ref([
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '内容',
      prop: 'content',
    },
    {
      label: '回复数',
      prop: 'reply_count',
    },
    {
      label: '操作',
      prop: 'action',
      actions: [
        {
          label: '查看',
          prop: 'view',
        },
        {
          label: '删除',
          prop: 'delete',
        },
        {
          label: '编辑',
          prop: 'edit',
        },
      ],
    },
  ])

  return {
    tableHead,
  }
}
