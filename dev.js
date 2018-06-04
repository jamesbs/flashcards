import * as webpack from 'webpack'
import config from './webpack.config'
const WebpackDevServer = require('webpack-dev-server')

process.env.NODE_ENV = 'dev'

const compiler = webpack(config)
