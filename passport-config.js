const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// const localStrategy = require('passport-local').Strategy;


function initialize(passport, getUserByEmail, getUserById)
{
    console.log('inside initializePassport')
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        console.log('user from getUserByEmail', user)

        if (user == null) {
            console.log('no user')
            return done(null, false, { message : 'No user with that email'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('correct')

                return done(null, user)
            } else {
                console.log('no password')

                return done(null, false, {message: 'Password incorrect'});
            }
        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        return done(null, getUserById(id));
    });


}

module.exports = initialize;