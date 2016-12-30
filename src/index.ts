import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app.module'
import { memoize } from './util/memoize'

platformBrowserDynamic().bootstrapModule(AppModule)


// export const memoize = (func: Function) => {
//   const stored: any = {}

//   return (...args: any[]) => {
//     console.log('args', args)
//     console.log('matches', isEqual(args, stored.args))
//     console.log('stored', stored)

//     if(isEqual(args, stored.args))
//       return stored.computed
//     else {
//       stored.args = args
//       stored.computed = func(...args)
//       return stored.computed
//     }
//   }
// }

const add = (a: number, b: number) => a + b

const madd = memoize(add)

console.log('adding 1 and 2', madd(1,2))
console.log('adding 1 and 2', madd(1,2))
console.log('adding 1 and 3', madd(1,3))
console.log('adding 2 and 4', madd(2,4))
