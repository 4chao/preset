import { createModule, action } from 'vuex-class-component'

export class User extends createModule({
  namespaced: 'user',
}) {
  //示例变量 - 开发时请删除
  name = '123'

  // 未实现
  token = import.meta.env.DEV ? '[default token]' : ''
  tokenExpired = ''
  userInfo = {} as any

  @action async login() {}
}
