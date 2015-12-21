'use strict'

import test from 'ava'

const getArguments = require('../lib/getArguments')
const randomUrlsWithPlaceholders = require('../lib/randomUrlsWithPlaceholders')
let route = '/user/:id'

test('it doesn\'t spit out a name with a slash', t => {
  let placeholder = 'iamthe/last'
  let url = '/user/' + placeholder
  t.notSame(getArguments(url, route), ['iamthe', 'last'])
})

test('it produces the correct string/integer argument', t => {
  let placeholder = 'iamthe1st'
  let url = '/user/' + placeholder
  t.same(getArguments(url, route), ['iamthe1st'])
})

test(`it spits out a name with a full stop`, t => {
  let placeholder = 'iamthe.1st'
  let url = '/user/' + placeholder
  t.same(getArguments(url, route), ['iamthe.1st'])
})

test(`it spits out a name with an underscore`, t => {
  let placeholder = 'iamthe1_st'
  let url = '/user/' + placeholder
  t.same(getArguments(url, route), ['iamthe1_st'])
})

test('it returns placeholders from random strings', t => {
  const { url, route } = randomUrlsWithPlaceholders()
  const numberOfPlaceholders = (route.match(/:placeholder/g)).length
  t.is(getArguments(url, route).length, numberOfPlaceholders)
})
