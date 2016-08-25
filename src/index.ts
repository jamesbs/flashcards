import 'babel-polyfill'
import 'reflect-metadata'
import 'core-js/es6'
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { App } from './app.module'

platformBrowserDynamic().bootstrapModule(App)
