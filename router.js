'use strict'

function urlMatches (url, route) {
  const routeSections = route.split('/')
  const urlSections = url.split('/')

  if (routeSections.length !== urlSections.length) return false

  // check every section of the route url is a placeholder or matches the url
  return routeSections.every((section, index) => {
    return section.startsWith(':') || section === urlSections[index]
  })
}

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
    if (!urlMatches(this.url, route)) return yield * next

    const args = getArguments(this.url, route)

    yield * handler.apply(this, [next, ...args])
  }
}
