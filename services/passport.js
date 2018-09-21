const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
})

// strategies

// 1--Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleCientSecret,
    callbackURL: '/api/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);

        // google gives the profile info of the person signing in
        // we can register this person in the database
        console.log(profile);

        User.findOne({googleId: profile.id}).then((existingUser) => {
            if (existingUser) {
                // already have a record
                // signature of done -> done(errorObject, existingUser);
                // there's no error here
                done(null, existingUser);
            } else {
                // make a new record
                
                new User({
                    googleId: profile.id
                }).save().then(user => done(null, user));

            }
        })
    }
));

