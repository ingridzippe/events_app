var express = require('express');
var app = express();
var LocalStrategy = require('passport-local');
// var GoogleStrategy = require('passport-google-oauth20');
//var google = require('./config');
var util = require('util');
var models = require('./models/models');
var { User } = require('./models/models');
var auth = require('./routes/auth');
var routes = require('./routes/routes');

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
// const transformGoogleProfile = (profile) => ({
//   name: profile.displayName,
//   avatar: profile.image.url,
// });


// var session = require('express-session');
// app.use(session({
//   secret: [ process.env.FACEBOOK_APP_SECRET || 'fake secret' ]
// }));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var cookieSession = require('cookie-session');
app.use(cookieSession({
  keys: ['my super secret key']
}));


// passport.use(new GoogleStrategy({
//     clientID:     process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     models.User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// passport.use(new GoogleStrategy({
//     clientID:     process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// app.use(auth(passport));
// app.use(routes);

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => res.redirect('/users/' + req.user));


var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
  if (! util.isString(username)) {
    done(null, false, {message: 'User must be string.'});
    return;
  }
  // Find the user with the given username
  models.User.findOne({ username: username, password: password }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      done(err);
      return;
    }
    // if no user present, auth failed
    if (!user) {
      done(null, false, { message: 'Incorrect username/password combination.' });
      return;
    }
    // auth has has succeeded
    done(null, user);
  });
}));

// var FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/fb/login/callback',
  // profileFields: ['_id', 'token', 'displayName', 'fbId'],
},
function(accessToken, refreshToken, profile, done) {
  var u;
  models.User.findOne({fbId: profile.id}, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
        u = new models.User({
        displayName: profile.displayName,
        fbId: profile.id
      });
      u.save(function(err, user) {
        console.log('saved user')
        if (err) { return; }
      })
      done(null, {_id: u._id, token: accessToken, displayName: profile.displayName, fbId: profile.id});
    } else {
      console.log('IMAG?', profile)
      console.log('USER FOUND', user);
      done(null, user);
    }
  });
}));


// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// app.get('/fb/login', passport.authenticate('facebook'));
// app.get('/fb/login/callback',
//   passport.authenticate('facebook', { failureRedirect: '/fb/login' }),
//   // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
//   (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));
//
// app.get('/fb/login/callback', passport.authenticate('facebook', {
//   successRedirect: '/',
//   failureRedirect: '/fail'
// }));


app.get('/fb/login', passport.authenticate('facebook'));

app.get('/fb/login/callback', passport.authenticate('facebook', {
  successRedirect: '/login/success/fb',
  failureRedirect: '/login/failure',
}),
(req, res) => {
    console.log('REQ.USER', req.user);
    res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
});

app.get('/login/success/fb', function(req, res) {
  res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user));
});

app.use('/', auth(passport));
app.use('/', routes);

//ROUTES
//
// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//   	[ 'https://localhost:3000/auth/plus.login',
//   	  'https://localhost:3000/auth/plus.profile.emails.read' ] }
// ));
//
// app.get( '/users/register',
// 	passport.authenticate( 'google', {
// 		successRedirect: '/users',
// 		failureRedirect: '/login'
// }));



module.exports = app;
