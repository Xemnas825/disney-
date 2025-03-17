const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3001;

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'example', // Cambia esto si tienes un usuario diferente
    password: 'example', // Cambia esto por tu contraseña
    database: 'example_db'
});

// Conectar a MySQL
db.connect(err => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Obtener todos los usuarios
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `SELECT u.id AS user_id, u.name AS user_name, u.email, u.created_at, u.status, 
                ml.id AS music_list_id, ml.name AS music_list_name, ml.description AS music_list_description 
         FROM users u
         LEFT JOIN music_lists ml ON u.id = ml.user_id
         WHERE u.id = ?`,
        [id],
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }

            // Organizar los datos para estructurar las listas de música asociadas
            const user = {
                id: results[0].user_id,
                name: results[0].user_name,
                email: results[0].email,
                created_at: results[0].created_at,
                status: results[0].status,
                music_lists: results.map(row => ({
                    id: row.music_list_id,
                    name: row.music_list_name,
                    description: row.music_list_description
                })).filter(list => list.id) // Filtrar listas nulas en caso de que el usuario no tenga listas
            };

            res.json(user);
        }
    );
});

// mostrar Todas las canciones
app.get('/songs', (req, res) => {
    db.query(
        `SELECT s.*, ml.name AS music_list_name 
        FROM songs s 
        LEFT JOIN music_lists ml ON s.music_list_id = ml.id`, 
        (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: 'No se encontraron canciones' });
                return;
            }

            // Organizar canciones con sus respectivas listas
            const songs = results.map(song => ({
                id: song.id,
                title: song.title,
                artist: song.artist,
                album: song.album,
                genre: song.genre,
                duration: song.duration,
                release_date: song.release_date,
                music_list: {
                    id: song.music_list_id,
                    name: song.music_list_name
                }
            }));

            res.json(songs);
        }
    );
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
