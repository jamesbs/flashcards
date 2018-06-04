export { configProviders } from './config-providers'
export { Config } from './config'
export { ConfigDataSource } from './config-data-source'

import { dev } from './dev.config'

export const config: { [key: string]: { [key: string]: any } } = {
  'dev': dev,
  'prod': {},
  'test': {}
}
