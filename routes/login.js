const express = require('express');
const app = express()
const router = require('express').Router()
const middlewares  = require('../middlewares/middlewares')
const users = require('../fakeDatabase');

app.use(middlewares.redirectHome);

router.get('/', middlewares.redirectHome, function(req, res) {
  res.send(`
      <h1>Login</h1>
      <form method='post' action='/login'>
          <input type='email' name='email' placeholder='Email' require />
          <input type='password' name='password' placeholder='Password' require />
          <input type='submit' />
      </form>
      <a href='/register'>Register</a>
  `)
})

router.post('/', middlewares.redirectHome, function(req, res) {
  const { email, password } = req.body //we can do this because the bodyParser can access to another request body object 

  if (email && password) { //TODO validation 
      const user = users.find(
          user => user.email === email && user.password === password
      )

      if (user) {
          req.session.userId = user.id
          return res.redirect('/home')
      }
  }
  res.redirect('/login')
})

module.exports = router