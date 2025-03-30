CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña TEXT NOT NULL,
    verificado BOOLEAN DEFAULT FALSE,
    token_confirmacion TEXT,
    fecha_creacion TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    titulo VARCHAR(255),
    descripcion TEXT,
    url TEXT NOT NULL,
    fecha_subida TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comentarios (
    id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES videos(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    texto TEXT,
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS likes_dislikes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    video_id INTEGER REFERENCES videos(id),
    tipo BOOLEAN, -- true = like, false = dislike
    UNIQUE (usuario_id, video_id)
);

CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    video_id INTEGER REFERENCES videos(id),
    UNIQUE (usuario_id, video_id)
);


CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

ALTER TABLE videos ADD COLUMN categoria_id INTEGER REFERENCES categorias(id);


INSERT INTO categorias (nombre) VALUES
  ('Cocina'),
  ('Entretenimiento'),
  ('Educación'),
  ('Música'),
  ('Ciencia y Tecnología'),
  ('Cine y TV'),
  ('Videojuegos'),
  ('Salud y Bienestar'),
  ('Viajes y Turismo'),
  ('Animales y Naturaleza');
