const router = require('express').Router()
const redirects = require('../middlewares')

router.route('/register', redirects.home, (req, res) => {
  res.send(`
      <h1>Register</h1>
      <form method='post' action='/register'>
          <input name='name' placeholder='Name' require />
          <input type='email' name='email' placeholder='Email' require />
          <input type='password' name='password' placeholder='Password' require />
          <input type='submit' />
      </form>
      <a href='/login'>Login</a>
  `)
})

router.route('/register', redirects.home, (req, res) => {
  const { name, email, password } = req.body 

  if (name && email && password) { //TODO validation   
      const exists = users.some(
          user => user.email === email
      )

      if (!exists) {
          const user = {
              id: users.length + 1,
              name,
              email,
              password // TODO hash
          }

          users.push(user)
          req.session.userId = user.id
          return res.redirect('/home')
      }
  }

  res.redirect('/register') //TODO error message
})