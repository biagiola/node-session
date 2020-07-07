const router = require('express').Router()
const redirects  = require('../middlewares')

router.route('/logout', redirects.login, (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.redirect('/home');
      }

      res.clearCookie(SESS_NAME)
      res.redirect('/login')
  })
})