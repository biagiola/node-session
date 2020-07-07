const express = require('express')
const session = require('express-session')
const users = require('./fakeDatabase')
const app = express()
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

app.use(express.urlencoded({extended: true})); //bodyparser

// database connection
mongoose.connect( 'mongodb://localhost/nodesession', 
    { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    })
mongoose.connection.once('open', () => {
    console.log('Connection with the database has been made')
}).on('error', (error) => {
    console.log('Connection database error:', error)
});  

const {PORT, NODE_ENV, SESS_NAME, SESS_SECRET, SESS_LIFETIME}  = require('./sessionConfig')
//set node-session configurations
app.use(session({
    name: SESS_NAME,
    resave: false, //save even if the session was never modified 
    saveUninitialized: false, //force a session that is uninitialized to be saved to the store
    secret: SESS_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: SESS_LIFETIME, //maxime time for a session 
        sameSite: true, //stric
        secure: NODE_ENV === 'production' //in our case, this will be false
    }
}))

//this will be execute before any routes for every single request
app.use((req, res, next) => {
    const { userId } = req.session
    if(userId) {
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})

//Routes
const dashboard = require('./routes/dashboard')
const login = require('./routes/login')
const logout = require('./routes/logout')
const register = require('./routes/register')
app.use('/',dashboard)
app.use('/login', login)
app.use('/logout', logout)
app.use('/register', register)

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`  
))