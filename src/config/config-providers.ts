import { Provider } from '@angular/core'
import { googleApisClientIdFactory } from './google-apis/google-apis-client-id'

export const configProviders: Provider[] = [
  googleApisClientIdFactory
]
