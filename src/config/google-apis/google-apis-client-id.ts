import { OpaqueToken } from '@angular/core'
import { Config } from '../config'
import { generateConfigProvider } from '../generate-config-provider'
import { googleApisClientId } from '../../common/services/google-apis'


export const googleApisClientIdFactory = generateConfigProvider(
    googleApisClientId,
    (config: Config) => config.data['googleapis']['clientId']
)
