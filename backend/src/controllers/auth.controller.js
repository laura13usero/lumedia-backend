const db = require('../database/db');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios'); // Se agrega axios para llamar a Lambda
const { enviarCorreoConfirmacion } = require('../utils/ses');

// URL de tu API Gateway que invoca la función Lambda
const LAMBDA_URL = "https://iyy7v7mtza.execute-api.us-east-1.amazonaws.com/prod/enviarCorreo";

exports.register = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  // Verificación básica de los campos
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: 'Todos los campos son necesarios.' });
  }

  try {
    // Encriptación de la contraseña
    const hash = contraseña; //await bcrypt.hash(contraseña, 10);

    // Generación de token de confirmación
    const token = crypto.randomBytes(20).toString('hex');

    // Insertar en la base de datos
    await db.query(
      'INSERT INTO usuarios (nombre, email, contraseña, token_confirmacion) VALUES ($1, $2, $3, $4)',
      [nombre, email, hash, token]
    );

    // Enviar correo de confirmación
    await enviarCorreoConfirmacion(email, token);

    // 🔹 Llamar a la función Lambda para enviar correo de bienvenida
    try {
      await axios.post(LAMBDA_URL, { email, nombre });
      console.log("Correo de bienvenida enviado con éxito.");
    } catch (lambdaError) {
      console.error("Error al enviar correo de bienvenida:", lambdaError.message);
    }

    // Responder con éxito
    res.status(201).json({ mensaje: 'Usuario registrado. Revisa tu correo para confirmar.' });
  } catch (err) {
    // Manejo de errores en caso de fallo al registrar
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.confirmEmail = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado.' });
  }

  try {
    // Verificar el token y actualizar el estado del usuario
    const result = await db.query(
      'UPDATE usuarios SET verificado = true, token_confirmacion = NULL WHERE token_confirmacion = $1 RETURNING *',
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: 'Token inválido o expirado' });
    }

    // Responder con éxito
    res.json({ mensaje: 'Cuenta confirmada correctamente' });
  } catch (err) {
    // Manejo de errores
    console.error(err);
    res.status(500).json({ error: 'Error al confirmar el correo' });
  }
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;

  // Verificación básica de los campos
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Correo y contraseña son necesarios.' });
  }

  try {
    // Buscar el usuario en la base de datos
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar si la cuenta está confirmada
    if (!user.verificado) {
      return res.status(403).json({ error: 'Confirma tu cuenta primero' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    if (contraseña !== user.contraseña) {
      console.log('Las contraseñas no coinciden');
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = user.id; //jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Enviar el token de respuesta
    res.json({ token });
  } catch (err) {
    // Manejo de errores
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
