const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const models = require('../models'); 

passport.use(
    'local',
    new LocalStrategy(function(username, password, done) {
        models.users
        .findOne({
            where: {
                Username: username
            }
        })
        .then(user => {
            if (!user) {
                console.log('not a user');
                return done(null, false, {
                    message: 'Incorrect Username'
                });
            }
            if (user.Password !== password) {
                console.log('That password is not valid');
                return done(null, false, {
                    message: "Incorrect Password"
                });
            }
        return done(null, user);
        })
        .catch(err => {
            if (err) {
                console.log('error');
                return done(err);
            }
        });
    })
    );

    passport.use(
        'local',
        new LocalStrategy(function(username, password, done) {
            models.users
            .findOne({
                where: {
                    Admin: true
                }
            })
            .then(user => {
                if (!user) {
                    console.log('not a user');
                    return done(null, false, {
                        message: 'Incorrect Username'
                    });
                }
            
            return done(null, user);
            })
            .catch(err => {
                if (err) {
                    console.log('error');
                    return done(err);
                }
            });
        })
        );

    passport.serializeUser((user, cb) => {
        cb(null, user.UserId);
    });

    passport.deserializeUser((id, cb) => {
        models.users 
        .findOne({
            where: {
                UserId: id
            }
        })
        .then(user => {
            cb(null, user);
        })
        .catch(err => {
            cb(err);
        });
    });