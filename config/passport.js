/* config/passport.js */

// Load all the things passport needs
const LocalStrategy = require('passport-local').Strategy

// Load up user model
var User = require("models/user.js");



// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
         User.findById(id, function (err, user) {
            done(err, user);
       });
    });

    // =========================================================================
    // SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back

            /* Get username */
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    'email': email
                }, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user || email) {
                        return done(null, false, req.flash('signupMessage', 'Ese email ya está registrado. Intenta con otro.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.email = email;
                        newUser.username = req.body.username;
                        newUser.password = newUser.generateHash(password);
                        newUser.image = "/static/assets/img/default.jpg";

                        console.log(newUser.email + ' ' + newUser.password + ' ' + newUser.username);
                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));


              // =============================== LOGIN =======================================

      passport.use('local-login', new LocalStrategy({
              usernameField: 'email',
              passwordField: 'password',
              passReqToCallback: true
          },
          function (req, email, password, done) {
              User.findOne({
                  'email': email
              }, function (err, user) {
                  if (err) {
                      console.log('err')
                      return done(null, false, { message: 'Error:.', error });
                  }
                  if (user == null) {
                      // console.log('User not found. Login');
                      return done(null, false, { message: 'Incorrect username.' });
                  }else{
                    var compare = user.comparePassword(password)
                    if (!compare) {
                      // console.log('Incorrect Password. Login');
                      return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);

                                      }
                })
            }))
    }
