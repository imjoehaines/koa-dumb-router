module.exports = function urlMatches (url, route) {
  const routeSections = route.split('/')
  const urlSections = url.split('/')

  if (routeSections.length !== urlSections.length) return false

  // check every section of the route url is a placeholder or matches the url
  return routeSections.every((section, index) => {
    return section.startsWith(':') || section === urlSections[index]
  })
}
