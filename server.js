/* importing the installed dependencies */
require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
<<<<<<< HEAD
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

/* Connecting to database */
async function connect() {
  try {
    await mongoose.connect(process.env.URI, { dbName: "filmQ" });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
=======
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');
const cineSwipe = require('./api.js')

/* Connecting to database */
async function connect() {
    try {
        await mongoose.connect(process.env.URI, {dbName: 'CineSwipe'});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
>>>>>>> origin
}

connect();
var db = mongoose.connection;

/* User Schema */
const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  id: String,
  name: String,
  email: String,
  password: String,
  recs: [String],
  watchlist: [String],
});
=======
    id : String,
    name : String,
    email : String,
    password : String,
    recs : [Number],
    watchlist : [Number]
})
>>>>>>> origin

const User = mongoose.model("User", userSchema);

/* Initialize passport */
const initializePassport = require("./passport-config.js");
initializePassport(
  passport,
  async (email) => await User.findOne({ email: email }),
  async (id) => await User.findOne({ id: id })
);



/* Setting app uses */
<<<<<<< HEAD
app.set("views", "views");
app.engine("html", require("ejs").renderFile);
=======
app.set('view engine', 'ejs');
>>>>>>> origin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.flash();
  next();
});
app.use(passport.initialize());
app.use(passport.session());
<<<<<<< HEAD

/* Pages */
app.get("/user", async (req, res) => {
  var user = await req.user;
  console.log("inside user");
  console.log(user);
  res.json(user);
});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/errorMessage",
    failureFlash: true,
  })
);

app.get("/errorMessage", (req, res) => {
  console.log("in errors");
  res.send(res.locals.message);
});

// Adding user information to database
app.post("/api/signup", async (req, res) => {
  console.log("inside signup");
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const data = new User({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      recs: [],
      watchlist: [],
    });

    console.log(data);

    /* Checking if user already exists */
    user = await User.findOne({ email: data.email });
    console.log(user);
    if (user == null) {
      console.log("before ");
      db.collection("users").insertOne(data, (error, collection) => {
        if (error) {
          res.json({
            message: error,
          });
        } else {
          console.log("User inserted to DB successfully");
          res.json({
            message: "User created successfully",
          });
        }
      });
    } else {
      res.json({
        message: "User already exists",
      });
=======
    
/* Post Routes */
app.post('/login', passport.authenticate('local', {
    successRedirect: '/homepage-intermediary',
    // successRedirect: '/cineSwipe',
    failureRedirect: '/login',
    failureFlash: true
}))


// Adding user information to database
app.post('/signup', async (req, res) => {
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

        /* Checking if user already exists */
        user = await User.findOne({email : data.email});

        if (user == null) {

            db.collection('users').insertOne(data, (error, collection) => {
                if (error) {
                   console.log(error)
                } else {
                    console.log("User inserted to DB successfully");

                }
            });
        } else {
            req.flash('error', 'User already exists');
            
        }
        res.redirect('/login')
    } catch {
        res.redirect('/signup')
>>>>>>> origin
    }
  } catch {
    res.json({
      message: "User already exists",
    });
  }
});

<<<<<<< HEAD
app.listen(3000, () => console.log("Server starting on port 3000"));
=======

/* Get Routes */
app.get('/', async (req, res) => {
    let user = await req.user

    res.render('index', {data : user})
})

app.get('/homepage-intermediary', async (req, res) => {
    let user = await req.user

    if (user.recs.length == 0) {
        res.redirect('/cineSwipe')
    } else {
        res.redirect('/')
    }
})

app.get('/login', (req, res) => {
    if (res.locals.message) {
        res.render('login', {message: res.locals.message})
    } else {
        res.render('login')
    }
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/cineSwipe', async (req, res) => {
    let user = await req.user
    // console.log("data going to pass", JSON.stringify(user))
    res.render('cineSwipe', {data : user})
})



/* Functions */

app.post('/api/updateUser', async (req, res) => {
    let user = await req.body
    console.log ("this is the param", user)
    console.log(user.email)

    await User.updateOne({email: user.email}, user)
    let updated_user = await User.findOne({email: user.email})
    res.send(updated_user)
})

app.listen(3000, () => console.log("Server starting on port 3000"))
>>>>>>> origin
