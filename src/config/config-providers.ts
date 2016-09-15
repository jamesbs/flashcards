import { Provider } from '@angular/core'
import { Config } from './config'
import { googleApisClientIdFactory } from './google-apis/google-apis-client-id'
import { ConfigDataSource } from './config-data-source'

const configProviders: Provider[] = [
  googleApisClientIdFactory
]

export const getConfigProviders: (dataSource: ConfigDataSource) => Provider[]
  = (dataSource: ConfigDataSource) => [
      { provide: Config, useFactory: () => new Config(dataSource) },
      ...configProviders
    ]
