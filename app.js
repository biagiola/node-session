const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    PORT = 3000, 
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = '%!1"$!Adlkñj0i452dtg12c',
    SESS_LIFETIME = TWO_HOURS 
} = process.env

const IN_PROD = NODE_ENV === 'production'

//TODO DB
const users = [
    { id:1, name: 'Alex', email: 'alex@gmail.com', password: 'secret' },
    { id:2, name: 'Max', email:'max@gmail.com', password: 'secret' },
    { id:3, name: 'Hagard', email: 'hagard@gmail.com', password: 'secret' }
]

const app = express()

app.use(express.urlencoded({extended: true}));

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

const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/home')
    } else {
        next()
    }
}
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

app.get('/', (req, res) => {
    //console.log(req.session);

    //const { userId } = req.session

    const userId = 1

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
})

app.get('/home', redirectLogin, (req, res) => {
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
})

app.get('/login', redirectHome, (req, res) => {
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

app.get('/register', redirectHome, (req, res) => {
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

app.post('/login', redirectHome, (req, res) => {
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

app.post('/register', redirectHome, (req, res) => {
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

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })
})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`  
))