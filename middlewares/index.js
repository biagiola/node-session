
module.exports = {
  redirectLogin: function(req, res, next) {
    if(!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
  },
  redirectHome: function(req, res, next) {
    if(req.session.userId) {
        res.redirect('/home')
    } else {
        next()
    }
  }
}  