import { environment } from './environment'
import { testConfig } from './webpack.config'

// export default doesn't work?
module.exports = config => {
  config.set({
    frameworks: [ 'jasmine' ],
    
    singleRun: true,
    
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-sourcemap-loader'
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

  })
}
