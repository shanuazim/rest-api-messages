// unit testing
const assert = require('assert')

const utils = require('../utils.js')

assert.equal(utils.isValid({name: 'Azat', message: 'hello'}), true)
assert.equal(utils.isValid({name: 'Azat', message: ''}), false)
assert.equal(utils.isValid({name: '', message: ''}), false)
assert.equal(utils.isValid({name: '', message: 'Hello'}), false)
assert.equal(utils.isValid({name: ' ', message: ' '}), false)
assert.equal(utils.isValid({name: '***&&&#$%ßßß', message: ' '}), false)
assert.equal(utils.isValid({name: 'A', message: 'A'}), false)
