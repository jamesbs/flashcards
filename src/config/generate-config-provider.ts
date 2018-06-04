import { InjectionToken, Provider } from '@angular/core'
import { Config } from './config.type'

export function generateConfigProvider<T>(token: InjectionToken<T>, factory: (config: Config) => T): Provider {
  return {
    provide: token,
    useFactory: factory,
    deps: [ Config ],
  }
}
