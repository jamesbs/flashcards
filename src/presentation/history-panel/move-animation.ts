import { EventEmitter } from '@angular/core'

export type MoveAnimation = {
  index: number
  mouseout: EventEmitter<void>
  bind: (index: number) => void
}
