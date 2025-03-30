const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  // Aseguramos que siempre pase el middleware sin hacer validación del token
  console.log('Pasando por el middleware de verificación de token');


  //req.token = token;
  // Deja pasar la petición sin verificación del token
  next();
};
