import { InjectionToken, Provider } from '@angular/core'
import { Config } from './config'

export const generateConfigProvider: <T>(token: InjectionToken<T>, factory: (config: Config) => T) => Provider
  = <T>(token: InjectionToken<T>, factory: (config: Config) => T) =>
    ({
      provide: token,
      useFactory: factory,
      deps: [ Config ],
    })
