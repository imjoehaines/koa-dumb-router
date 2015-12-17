'use strict'

const app = require('koa')()
const route = require('./router')

function * test (next, userId) {
  this.body = {
    user: {
      name: userId,
      age: 12,
      height: 6
    }
  }
}

app.use(route('/user/:id', test))

app.use(function * (next) {
  this.body = this.url
})

app.listen(3000)
