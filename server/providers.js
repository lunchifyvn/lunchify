module.exports = {
  'facebook-login': {
    'provider': 'facebook',
    'module': 'passport-facebook',
    'profileFields': ['gender', 'link', 'locale', 'name', 'timezone',
      'verified', 'email', 'updated_time'],
    'clientID': process.env.FB_CLIENT_ID || 'clientID',
    'clientSecret': process.env.FB_CLIENT_SECRET || 'clientSecret',
    'callbackURL': '/auth/facebook/callback',
    'authPath': '/auth/facebook',
    'callbackPath': '/auth/facebook/callback',
    'successRedirect': '/auth/account',
    'failureRedirect': '/login',
    'scope': ['email'],
    'failureFlash': true,
  },
};
