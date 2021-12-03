 // Authentication and Authorization Middleware

const authAdmin = function(req, res, next) {
    if (req.session.userid && req.session.rol == 1){
      return next();
    }
    return res.render('error');
  };
  
const auth = function(req, res, next) {
    if (req.session.userid && req.session.rol == 2){
      return next();
    }
    return res.render('error');
};

module.exports = {
    authAdmin,
    auth
}