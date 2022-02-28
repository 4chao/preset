import config from '@/app.config'
import logdown from 'logdown'

export default function () {
  return {
    install(vue) {
      if (!config.uniCloud) return
    },
  }
}
