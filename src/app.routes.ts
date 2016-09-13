import { Start, Cards, Settings } from './components'

export const Routes = [
  { path: '', component: Start },
  { path: 'run/:cardId', component: Cards },
  { path: 'settings', component: Settings },
]
