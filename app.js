const PORT = 9000
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const expressLayouts = require('express-ejs-layouts');

// Create an application JSON / parser
const jsonParser = bodyParser.json();
// Create application web form parser
const urlencodedParser = bodyParser.urlencoded({extended: false})

// We dont need this
// app.use(expressLayouts)

// An array of student objects
let users = []

// initializing are views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Home page route.
app.route('/')
  .get((req, res) => {
    res.render('index')
  })

// Sign in page route
app.route('/sign-in')
  .get((req, res) => {
    res.render('sign-in')
  })
  .post(urlencodedParser, (req, res) => {
    try {
      for (let i=0; i < users.length; i++) {
        if (users[i].username == req.body.username && users[i].password == req.body.password) {
          res.render('profile', {
            username: req.body.username
          })
          break;
        }
      }
      res.redirect('/sign-in')
    }
    catch {
      res.redirect('/sign-in')
    }
  })

// Register page route
app.route('/register')
  .get((req, res) => {
    res.render('sign-up')
  })
  .post(urlencodedParser, (req, res) => {
    try {
      users.push({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })

      console.log(users)
      res.redirect('/sign-in')
    }
    catch {
      res.redirect('/register')
    }
  })




app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})
