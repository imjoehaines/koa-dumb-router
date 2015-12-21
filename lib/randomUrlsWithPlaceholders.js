'use strict'

module.exports = function randomUrlsWithPlaceHolders () {
  const Chance = require('chance')
  const chance = new Chance()
  const count = chance.integer({ min: 2, max: 30 })
  const url = chance.n(chance.word, count)

  const route = url.map((word, index) => {
    return Math.round(Math.random()) === 1 && word || ':placeholder'
  })
  return { 'url': url.join('/'), 'route': route.join('/') }
}
