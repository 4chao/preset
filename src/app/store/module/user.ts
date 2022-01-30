import { createModule, action } from 'vuex-class-component'

export class User extends createModule({
  namespaced: 'user',
}) {
  token = '123'
  tokenExpired = ''
  userInfo = {} as any

  @action async login() {}
}
