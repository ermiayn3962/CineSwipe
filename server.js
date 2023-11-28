/* importing the installed dependencies */
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const secrets = require('./configure.js');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


/* Connecting to database */
async function connect() {
    try {
        await mongoose.connect(secrets.URI, {dbName: 'filmQ'});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

connect();
var db = mongoose.connection;

/* User Schema */
const userSchema = new mongoose.Schema({
    id : Number,
    name : String,
    email : String,
    password : String
})

const User = mongoose.model('User', userSchema);

/* Initialize passport */
const initializePassport = require('./passport-config.js');
initializePassport(
    passport, 
    async email => await User.findOne({email: email}),
    async id => await User.findOne({id: id})
);

/* Setting app uses */
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: secrets.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
})
app.use(passport.initialize());
app.use(passport.session());
    
    
/* Pages */
app.get('/', async (req, res) => {
    const user = await req.user;
    res.render(__dirname + '/views/index.html', {name: user.name})
})

app.get('/login', (req, res) => {
    
    res.render(__dirname + '/views/login.html', {messages: res.locals.message})
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


app.get('/signup', (req, res) => {
    res.render(__dirname + '/views/signup.html')
})

// Adding user information to database
app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = new User({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        /* Checking if user already exists */
        user = await User.findOne({email : data.email});

        if (user == null) {
            db.collection('users').insertOne(data, (error, collection) => {
                if (error) {
                    throw error;
                } else {
                    console.log("User inserted to DB successfully");
                }
            });
        } else {
            req.flash('error', 'User already exists');
        }

        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
})

app.listen(3000)