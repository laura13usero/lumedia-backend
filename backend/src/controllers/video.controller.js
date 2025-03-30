const videoService = require('../services/video.service');  // Importamos el servicio para gestionar videos
const s3 = require('../utils/s3'); // Importamos la configuración de S3
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Guarda en memoria antes de subir a S3

// Subir un video
exports.subir = async (req, res) => {
  try {
    

    const { titulo, descripcion, categoria_id, userId } = req.body;
    const usuario_id = userId;
    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Configuración del archivo en S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `videos/${Date.now()}_${archivo.originalname}`, // Nombre único
      Body: archivo.buffer,
      ContentType: archivo.mimetype,
      //ACL: 'public-read'
    };

    // Subir a S3
    const resultado = await s3.upload(params).promise();
    const videoURL = resultado.Location;

    // Guardar en la base de datos
    const result = await videoService.guardarVideo({
      usuario_id,
      titulo,
      descripcion,
      url: videoURL,
      categoria_id
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir el vídeo' });
  }
};

// Obtener todos los videos
exports.obtenerTodos = async (_req, res) => {
  try {
    const videos = await videoService.obtenerTodos();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener vídeos' });
  }
};

// Obtener un video específico por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const video = await videoService.obtenerPorId(req.params.id);
    if (!video) return res.status(404).json({ error: 'Vídeo no encontrado' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el vídeo' });
  }
};

exports.obtenerPorUsuario = async (req, res) => {
  const usuario_id = 2; // Obtiene el ID del usuario de la URL
  console.log('🔍 Buscando videos del usuario:', usuario_id);

  try {
      const result = await pool.query(
          'SELECT id, usuario_id, url, titulo, descripcion FROM videos WHERE usuario_id = $1',
          [usuario_id]
      );
      console.log('📋 Videos encontrados:', result.rows);
      
      if (result.rows.length > 0) {
          res.json(result.rows);
      } else {
          res.status(404).json({ error: 'No se encontraron videos para este usuario' });
      }
  } catch (error) {
      console.error('❌ Error al obtener videos:', error);
      res.status(500).json({ error: 'Error al obtener los videos' });
  }
};