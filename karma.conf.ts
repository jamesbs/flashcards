import { environment } from './environment'
import { testConfig } from './webpack.config'
import { Config, ConfigOptions } from 'karma'

// export default doesn't work?
// implement correct type using declaration merging
module.exports = (config) => {
  config.set({
    frameworks: [ 'jasmine' ],

    singleRun: true,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack',
    ],

    files: [
      './test/prerun.ts',
      './src/**/*.spec.ts'
    ],

    webpack: testConfig,

    preprocessors: {
      './src/**/*.spec.ts': [ 'webpack', 'sourcemap' ],
      './test/**/*.ts': [ 'webpack', 'sourcemap' ]
    },

    colors: true,

    browsers: [ 'Chrome' ],

    reporters: [ 'spec' ]

  } as any)
}
