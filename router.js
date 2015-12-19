'use strict'

const urlMatches = require('./lib/urlMatches')

function getArguments (url, route) {
  const routeSections = route.split('/')
  const urlSections = url.split('/')

  let args = []
  routeSections.forEach((section, index) => {
    section.startsWith(':') && args.push(urlSections[index])
  })

  return args
}

module.exports = function (route, handler) {
  return function * (next) {
    // if we can't handle the request, continue to the next function
    if (!urlMatches(this.url, route)) return yield * next

    const args = getArguments(this.url, route)

    yield * handler.apply(this, [next, ...args])
  }
}
