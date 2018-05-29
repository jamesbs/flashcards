import { Config } from '../config'
import { generateConfigProvider } from '../generate-config-provider'
import { googleApisClientId } from '../../shared/services/google-apis'


export const googleApisClientIdFactory = generateConfigProvider(
    googleApisClientId,
    (config: Config) => config.data['googleapis']['clientId']
)
