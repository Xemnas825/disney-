INSERT INTO users (name, email, password_hash, status) VALUES
    ('Alice Smith', 'alice@example.com', 'hashed_password_1', 'active'),
    ('Bob Johnson', 'bob@example.com', 'hashed_password_2', 'inactive'),
    ('Charlie Brown', 'charlie@example.com', 'hashed_password_3', 'active');

INSERT INTO music_lists (name, description, user_id) VALUES
    ('Rock Clásico', 'Lista con los mejores éxitos del rock clásico', 1),
    ('Música Relajante', 'Playlist ideal para relajarse y meditar', 1),
    ('Fiesta Latina', 'Las canciones más bailables de la música latina', 3);

INSERT INTO songs (title, artist, album, genre, duration, release_date, music_list_id) VALUES
    ('Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 'Rock', '00:05:55', '1975-10-31', 1),
    ('Hotel California', 'Eagles', 'Hotel California', 'Rock', '00:06:30', '1977-02-22', 1),
    ('Weightless', 'Marconi Union', NULL, 'Ambient', '00:08:00', '2011-11-16', 2),
    ('Clair de Lune', 'Claude Debussy', NULL, 'Classical', '00:05:10', NULL, 2),
    ('Despacito', 'Luis Fonsi', 'Vida', 'Reggaeton', '00:03:47', '2017-01-13', 3),
    ('Bailando', 'Enrique Iglesias', 'Sex and Love', 'Latin Pop', '00:04:03', '2014-04-28', 3);
