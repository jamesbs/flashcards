import { setActivity } from './card-view-state'
import { CardViewModel } from './card-view-model'

describe('setActivity', () => {
  it('waiting', () => {
    const vm: CardViewModel = {
      id: 'vm',
      type: 'intro',
    }

   ;(expect(setActivity(vm, 'waiting')) as any)
    .toDeepEqual({
      id: 'vm',
      type: 'intro',
      activity: 'waiting'
    })
  })

  it('before', () => {
    const vm: CardViewModel = {
      id: 'vm',
      type: 'intro',
    }

   ;(expect(setActivity(vm, 'before')) as any)
    .toDeepEqual({
      id: 'vm',
      type: 'intro',
      activity: 'before'
    })
  })
})
