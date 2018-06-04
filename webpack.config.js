import { devConfig } from './build/configs/dev'
import { prodConfig } from './build/configs/prod'

export { testConfig } from './build/configs/test'

const config = process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig

export default config
