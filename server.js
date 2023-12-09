/* importing the installed dependencies */
require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');

/* Connecting to database */
async function connect() {
    try {
        await mongoose.connect(process.env.URI, {dbName: 'filmQ'});
        console.log("Connected to MongoDB");
    } catch (error) {
        chonsole.log(error);
    }
}

connect();
var db = mongoose.connection;

/* User Schema */
const userSchema = new mongoose.Schema({
    id : String,
    name : String,
    email : String,
    password : String,
    recs : [String],
    watchlist : [String]
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
app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
})
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "views")))
    
/* API Calls */
app.get('/api/user', async(req, res) => {
    var user = await req.user;
    console.log('inside user');
    console.log(user);
    // res.json(user)
    res.redirect('/index?data=' + `${JSON.stringify(user)}`)

})

app.get('/index', (req, res) => {
    let data = JSON.parse(req.query.data)
    console.log("data is", data);
    res.sendFile(__dirname + "/views/index.html")
})

app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/user',
    failureRedirect: '/api/errorMessage',
    failureFlash: true
}))

app.get('/api/errorMessage', (req, res) => {
    console.log("in errors")
    res.send(res.locals.message)
})


// Adding user information to database
app.post('/api/signup', async (req, res) => {
    console.log("inside signup")
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.password)


    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = new User({
            id: parseFloat(Date.now().toString()),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            recs: [],
            watchlist: []
        })

        console.log(data)

        /* Checking if user already exists */
        user = await User.findOne({email : data.email});
        console.log(user)
        if (user == null) {
            console.log('before ')
            db.collection('users').insertOne(data, (error, collection) => {
                if (error) {
                    res.json({
                        message: error
                    });
                } else {
                    console.log("User inserted to DB successfully");
                    res.json({
                        message: 'User created successfully'}
                    );
                    

                }
            });
        } else {
            res.json({
                message: 'User already exists'}
             );
        }
    } catch {
        res.json({
            message: 'User already exists'}
         );
    }
})

app.listen(3000, () => console.log("Server starting on port 3000"))