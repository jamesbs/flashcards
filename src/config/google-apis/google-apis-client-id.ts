import { Config } from '../config.type'
import { generateConfigProvider } from '../generate-config-provider'
import { googleApisClientId } from '../../shared/services/google-apis'
import { get } from 'lodash'

export function getGoogleApisClientId(config: Config) {
  return get(config, 'googleapis.clientId')
}

export const googleApisClientIdFactory = generateConfigProvider(
  googleApisClientId,
  getGoogleApisClientId,
)
