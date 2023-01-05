import { Store, Pinia, Persist } from '../utils'

/**
 * 用户信息
 */
@Store
export class User extends Pinia {
  // 下方为示例变量 - 开发时请删除

  // 使用Persist修饰器持久化数据
  @Persist
  name = '123'

  // 允许直接编写getter
  get reverseName() {
    return this.name.split('').reverse().join('')
  }

  // 或action
  async handleClick() {
    uni.showToast({ title: this.name })
  }
}
