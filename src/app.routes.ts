import { HomeView, PlayCardsView, SettingsView } from './components'

export const Routes = [
  { path: '', component: HomeView },
  { path: 'play/:cardId', component: PlayCardsView },
  { path: 'settings', component: SettingsView },
]
