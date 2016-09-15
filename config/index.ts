import { dev } from './dev'

export const config: { [key: string]: { [key: string]: any } } = {
  'dev': dev,
  'prod': {},
  'test': {}
}
