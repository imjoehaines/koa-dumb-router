'use strict'

import test from 'ava'

const urlMatches = require('../lib/urlMatches')
const randomUrlsWithPlaceholders = require('../lib/randomUrlsWithPlaceholders')
const Chance = require('chance')
const chance = new Chance()

test('it matches the root url', t => {
  t.true(urlMatches('/', '/'))
})

test('it matches two identical urls', t => {
  // make a random url and remove http://
  let url = chance.url({ domain: 'abc' })
  url = url.replace('http://', '')

  t.true(urlMatches(url, url))
})

test(`it doesn't match two different urls`, t => {
  let url = chance.url({ domain: 'abc' })
  url = url.replace('http://', '')

  let route = chance.url({ domain: 'abc' })
  route = route.replace('http://', '')

  t.false(urlMatches(url, route))
})

test(`it doesn't match different urls with the same length`, t => {
  const count = chance.integer({ min: 2, max: 30 })
  const url = chance.n(chance.word, count).join('/')
  const route = chance.n(chance.word, count).join('/')

  t.false(urlMatches(url, route))
})

test('it matches urls with placeholders', t => {
  const url = '/users/12/cats/31'
  const route = '/users/:userId/cats/:catId'

  t.true(urlMatches(url, route))
})

test('it matches random urls with placeholders', t => {
  const { url, route } = randomUrlsWithPlaceholders()

  t.true(urlMatches(url, route))
})
