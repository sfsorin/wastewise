-- Script pentru actualizarea parolei utilizatorului admin
UPDATE users 
SET password = '$2b$10$oXsjeRjayrDSue3WfVco4O/n69oZwog0xTZbQ3kSncYB2.ZzvN2P2' 
WHERE username = 'admin';

-- Verificare
SELECT id, username, password FROM users WHERE username = 'admin';
