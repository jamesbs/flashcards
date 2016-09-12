import { devConfig } from './build/configs/dev'
import { prodConfig } from './build/configs/prod'

export { testConfig } from './build/configs/test'

export default process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig
