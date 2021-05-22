const jwt = require('jsonwebtoken');
let verificarAuth = (req, res, next) => {
  let token =  req.get('token');
  jwt.verify(token, 'Pack', (err, decoded) => {
    if(err) {
      return res.status(404).json({
        mensaje: 'token error',
        err
      })
    }
    var decoded = jwt.decode(token, {complete: true});
    req.usuario = decoded.payload;
    next();
  });
}
module.exports = verificarAuth;