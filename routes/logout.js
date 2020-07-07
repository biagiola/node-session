const express = require('express')
const app = express()
const router = require('express').Router()
const middlewares  = require('../middlewares/middlewares')

//app.use(middlewares.redirectLogin)

router.post('/', function(req, res) {
  console.log(req.session, 'logout.js')
  req.session.destroy(err => {
      if (err) {
          return res.redirect('/home');
      }
      //res.clearCookie(SESS_NAME)
      res.redirect('/login')
  })
})

module.exports = router