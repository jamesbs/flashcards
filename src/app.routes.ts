import { HomeComponent, PlayCardsComponent, SettingsComponent } from './components'

export const Routes = [
  { path: '', component: HomeComponent },
  { path: 'play/:cardId', component: PlayCardsComponent },
  { path: 'settings', component: SettingsComponent },
]
