import { OpaqueToken, Provider } from '@angular/core'
import { Config } from './config'

export const generateConfigProvider: <T>(token: OpaqueToken, factory: (config: Config) => T) => Provider
  = <T>(token: OpaqueToken, factory: (config: Config) => T) =>
    ({
      provide: token,
      useFactory: factory,
      deps: [ Config ],
    })
