'use strict'

const urlMatches = require('./lib/urlMatches')
const getArguments = require('./lib/getArguments')

module.exports = function (route, handler) {
  return function * (next) {
    // if we can't handle the request, continue to the next function
    if (!urlMatches(this.url, route)) return yield * next

    const args = getArguments(this.url, route)

    yield * handler.apply(this, [next, ...args])
  }
}
