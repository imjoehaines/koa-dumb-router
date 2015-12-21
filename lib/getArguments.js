'use strict'
module.exports = function getArguments (url, route) {
  const routeSections = route.split('/')
  const urlSections = url.split('/')

  let args = []
  routeSections.forEach((section, index) => {
    section.startsWith(':') && args.push(urlSections[index])
  })

  return args
}
// takes in url, spits out the argument at the same index as the placeholder
