import * as user from './user'
import { userApi } from '@/api/modules/user'

// 统一导出所有 api
export default {
  user: userApi,
}
