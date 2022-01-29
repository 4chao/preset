import { createModule } from 'vuex-class-component'

export class Global extends createModule({
  namespaced: 'global',
}) {
  readonly config = {}
}
