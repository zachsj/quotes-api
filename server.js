const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
require('dotenv').config()

app.use(cors())


//const connectionString = 'mongodb+srv://zachj:Zach0329!@cluster0.mesac8l.mongodb.net/?retryWrites=true&w=majority';
const connectionString = process.env.DB_STRING;
MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  client => {
    console.log('Connected to Database')
    const db = client.db('famous-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    //app.use(express.static('views'));
    app.use(bodyParser.json())

//routes
  app.get('/', (req, res) => {
    db.collection('quotes')
      .find()
      .toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(error => console.error(error))
  })

  app.post('/quotes', (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/quotes', (req, res) => {
    //if (req.body.name === 'Clark Griswold') {
    //  return res.json('Unauthorized')
    //}
    quotesCollection
  .findOneAndUpdate(
    { name: { $ne: 'Clark Griswold' } }, 
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    {
      upsert: true,
    }
  )
  .then(result => {
    res.json('Success')
  })
  .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    quotesCollection
      .deleteOne({ name: req.body.name })
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted Clark Griswold's quote`)
      })
      .catch(error => console.error(error))
  })


app.listen(process.env.PORT || 3000, ()=> {
    console.log('listening on 3000')
  })

  
})