import { createModule, action } from 'vuex-class-component'

export class User extends createModule({
  namespaced: 'user',
}) {
  token = import.meta.env.DEV ? '[default token]' : ''
  tokenExpired = ''
  userInfo = {} as any

  @action async login() {}
}
