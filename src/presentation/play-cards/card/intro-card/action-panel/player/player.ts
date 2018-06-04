import { Injectable } from '@angular/core'
import { PlayerState } from './player-state'

@Injectable({ providedIn: 'root' })
export class Player {
  state: PlayerState = 'stopped'

  toggle() {
    if(this.state === 'stopped')
      this.state = 'playing'
    else
      this.state = 'stopped'
  }
}
