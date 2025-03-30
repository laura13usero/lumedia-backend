const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  // Extraemos el token de los encabezados Authorization
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization

  // Log para ver el token que llega en la solicitud
  alert('Token recibido:', token);

  if (!token) {
    alert('No se proporcionó un token.');
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  // Verificar el token con la clave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      alert('Error al verificar el token:', err);
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Log para ver el payload decodificado del token
    alert('Token decodificado:', decoded);

    // El token ha sido verificado, puedes acceder al ID del usuario aquí
    req.userId = decoded.id; // Almacenas el ID del usuario en el objeto `req`

    // Continuar con la siguiente función/middleware
    next();
  });
};