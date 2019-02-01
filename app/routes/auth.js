var passport = require ('passport');
module.exports = function (app) {
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github'),
  function(req, res, next) {
    if(req.user){
      res.redirect('/#/home/'+req.user._id);
    }
    else{
      res.redirect('/');
    }
  });  
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook'),
  function(req, res, next) {
    if(req.user){
      res.redirect('/#/home/'+req.user._id);
    }
    else{
      res.redirect('/');
    }
  });
  app.post('/login', passport.authenticate('local-login'),
  function(req, res, next) {
    if(req.user){
      res.redirect('/#/home/'+req.user._id);
    }
    else{
      res.redirect('/');
    }
  });
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
