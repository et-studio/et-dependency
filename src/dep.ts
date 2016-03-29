
import * as _ from './util'

export * from './helper'

export * from './creator'

// polyfill es5 and es6 features
require('es6-collections')

if (!Array.isArray) {
  _.extend(Array, {
    isArray: function (arg: any) {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
  })
}


