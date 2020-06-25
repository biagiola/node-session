require('dotenv').config()

const obj = {
  PORT: process.env.PORT, 
  NODE_ENV: process.env.NODE_ENV,
  SESS_NAME: process.env.SEE_NAME,
  SESS_SECRET: process.env.SESS_SECRET,
  SESS_LIFETIME: process.env.SESS_LIFETIME
}
module.exports = obj