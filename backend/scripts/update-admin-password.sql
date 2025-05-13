-- Script pentru actualizarea parolei utilizatorului admin
UPDATE users 
SET password = '$2b$10$ufiUO46QGf8C3bPExAON4.ks0a5Y9hlQXQsuHvXExir.PXKtLjxoW' 
WHERE username = 'admin';

-- Verificare
SELECT id, username, password FROM users WHERE username = 'admin';
