console.log('hello from jsx')
const React = require('react')
const ReactDOM = require('react-dom')

const MessageBoard = require('./messageBoard.jsx')

ReactDOM.render(
  <MessageBoard messages={window.__myMessages}></MessageBoard>,
  document.getElementById('content')
)