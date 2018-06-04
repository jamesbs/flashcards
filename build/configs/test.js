import { devConfig } from './dev'

export const testConfig = {
  context: devConfig.context,
  resolve: devConfig.resolve,
  devtool: devConfig.devtool,
  module: devConfig.module,
}
