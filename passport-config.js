/* Importing packages */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport, getUserByEmail, getUserById)
{
    /* Authenticates the user information provided */
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);

        /* Checking if information provided match in DB */
        if (user == null) {
            return done(null, false, { message : 'No user with that email'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
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