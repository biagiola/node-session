const express = require('express');
const session = require('express-session');

const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    PORT = 3000, 
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = '%!1"$!Adlkñj0i452dtg12c',
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production'

const app = express()

app.use(session({
    name: SESS_NAME,
    resave: false, //save even if the session was never modified 
    saveUninitialized: false, //force a session that is uninitialized to be saved to the store
    secret: SESS_SECRET,
    //store: mongodb
    cookie: {
        maxAge: SESS_LIFETIME, //maxime time for a session 
        sameSite: true, //stric
        secure: IN_PROD //in our case, this will be true
    }
}))

app.get('/', (req, res) => {
    console.log(req.session);

    res.send(`
        <h1>Welcome!</h1>
        <a href='/login'>Login</a>    
        <a href='/register'>Register</a>

        <a href='/Home'>Home</a>
        <form method='post' action='/logout'>
            <button>Logout</button>
        </form>
    `)
})

app.get('/home', (req, res) => {

})

app.get('/login', (req, res) => {

})

app.get('/register', (req, res) => {

})

app.post('/login', (req, res) => {

})

app.post('/register', (req, res) => {

})

app.post('/logout', (req, res) => {

})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`  
))