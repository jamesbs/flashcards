import { Start, Cards, Settings } from './components'

export const Routes = [
  { path: '', component: Start },
  { path: 'play/:cardId', component: Cards },
  { path: 'settings', component: Settings },
]
