const express = require('express')
const logger = require('morgan')
const path = require('path')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')
const isValid = require('./utils').isValid

const url = 'mongodb://localhost:27017/'

let app = express()

app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(bodyParser.json())

require("babel-register")
const React = require('react')

const MessageBoard = require('./components/messageboard.jsx')
const MessageBoardFactory = React.createFactory(MessageBoard)
const { renderToString } = require('react-dom/server')
mongodb.MongoClient.connect(url, (error, db) => {
  if (error) return process.exit(1)

  app.get('/', (req, res, next) => {
    db.collection('messages')
    .find({}, {sort: {_id: -1}})
    .toArray((error, messages) => {
      if (error) return next(error)
      console.log( renderToString(MessageBoardFactory({messages: messages})))
      res.render('index', {
        data: JSON.stringify(messages),
        myHTML: renderToString(MessageBoardFactory({messages: messages}))
      })    
    })    
  })
  app.get('/messages', (req, res, next) => {
    setTimeout(() => {

   
    db.collection('messages')
      .find({}, {sort: {_id: -1}})
      .toArray((error, messages) => {
        if (error) return next(error)
        res.send(messages)
    })
  },1000)
  })

  app.get('/messages/:id', (req, res, next) => {
    db.collection('messages')
      .find({_id: mongodb.ObjectID(req.params.id)}, {sort: {_id: -1}})
      .toArray((error, messages) => {
        if (error) return next(error)
        res.send(messages)
    })
  })

  app.post('/messages', (req, res, next) => {
    let newMessage = req.body
    if (!isValid(newMessage)) return next(new Error('not valid body'))
    // TODO: add validation for name and message
    // console.log(req.body)
    db.collection('messages').insert(newMessage, (error, results) => {
      if (error) return next(error)
      res.send(results)
    })
  })

  app.put('/messages/:id', (req, res, next) => {
    // if (!isValid(req.body)) return next(new Error('not valid body'))
    db.collection('messages')
      .update({_id: mongodb.ObjectID( req.params.id)}, {$set: req.body}, (error, results) => {
    if (error) return next(error)
    res.send(results)
   })
  })

  app.delete('/messages/:id', (req, res, next) => {
    db.collection('messages').remove({_id:mongodb.ObjectID( req.params.id)}, (error, results) => {
      if (error) return next(error)
    res.send(results)
   })
  })

  app.use(errorhandler())
  app.listen(3000)
  
})