require('dotenv').config();
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

let cookieParser = require('cookie-parser');
let expressSession = require('express-session');

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 */
var bodyParser = require('body-parser');

// attempt to build the providers/passport config
var config = require('./providers');

// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));

var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client/assets')));
app.set('views', path.resolve(__dirname, '../client'));
app.set('view engine', 'jade');

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

app.middleware('session:before',
  cookieParser(app.get('cookieSecret')));
app.middleware('session',
  expressSession({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true,
  })
);

passportConfigurator.init();

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/', function(req, res) {
  res.render('pages/index', {
    user: req.user,
    url: req.url,
  });
});

app.get('/auth/account', ensureLoggedIn('/login'), function(req, res) {
  res.cookie('access-token', req.signedCookies.access_token);
  res.cookie('userId', req.user.id);
  res.redirect('/select-topics');
});

app.get('/select-topics', ensureLoggedIn('/login'), function(req, res) {
  var User = app.models.user;
  User.findById(req.user.id, {
    include: 'prefers',
  }, (err, user) => {
    if (user.prefers().length > 0) {
      return res.redirect('/list-matching');
    }
    res.render('pages/select-topics', {
      user: req.user,
      url: req.url,
    });
  });
});

app.get('/list-matching', function(req, res) {
  res.render('pages/list-matching', {
    user: req.user,
    url: req.url,
  });
});

app.get('/signup', function(req, res) {
  res.render('pages/signup', {
    user: req.user,
    url: req.url,
  });
});

app.post('/signup', function(req, res) {
  var User = app.models.user;

  var newUser = {};
  newUser.email = req.body.email.toLowerCase();
  newUser.username = req.body.username.trim();
  newUser.password = req.body.password;

  User.create(newUser, function(err, user) {
    if (err) {
      return res.redirect('back');
    } else {
      // Passport exposes a login() function on req (also aliased as logIn())
      // that can be used to establish a login session. This function is
      // primarily used when users sign up, during which req.login() can
      // be invoked to log in the newly registered user.
      req.login(user, function(err) {
        if (err) {
          return res.redirect('back');
        }
        return res.redirect('/auth/account');
      });
    }
  });
});

app.get('/login', function(req, res) {
  res.render('pages/login', {
    user: req.user,
    url: req.url,
  });
});

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
