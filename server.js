/* importing the installed dependencies */
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));

/* Connecting to DATABASE */
const uri = 'mongodb+srv://yodaermias:Breeze33@cluster0.yqiay1g.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri, {dbName: 'filmQ'});
        console.log("Connect to MongoDB");
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

/* Pages */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.post('/login', (req, res) => {

})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html')
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

        db.collection('users').insertOne(data, (error, collection) => {
            if (error) {
                throw error;
            } else {
                console.log("User inserted to DB successfully");
            }
        });

        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
})

app.listen(3000)