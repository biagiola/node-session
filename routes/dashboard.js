const express = require('express')
const app = express()
const router = express.Router()
const middlewares  = require('../middlewares/middlewares')

app.use(middlewares.redirectLogin)

router.get('/home', middlewares.redirectLogin, function(req, res){
    //console.log(req.session);
    //const { userId } = req.session
    const userId = 1
    console.log('/', userId)
  
    res.send(`
        <h1>Welcome!</h1>
        ${userId ? `
            <a href='/home'>Home</a>
            <form method='post' action='/logout'>
                <button>Logout</button>
            </form>
            ` : `
            <a href='/login'>Login</a>    
            <a href='/register'>Register</a>
        `}
    `)
  })

/*app.get('/', redirectLogin, (req, res) => {
  //console.log(req.session);

  //const { userId } = req.session
  const userId = 1
  console.log('/', userId)

  res.send(`
      <h1>Welcome!</h1>
      ${userId ? `
          <a href='/Home'>Home</a>
          <form method='post' action='/logout'>
              <button>Logout</button>
          </form>
          ` : `
          <a href='/login'>Login</a>    
          <a href='/register'>Register</a>
      `}
  `)
})*/

/*router.route('/home', (req, res) => {
  const { user } = res.locals

  res.send(`
      <h1>Home</h1>
      <a href='/'>Main</a>
      <ul>
          <li>Name: ${user.name}</li>
          <li>Email: ${user.email}</li>
      </ul>
  `
  )
})*/

module.exports = router;