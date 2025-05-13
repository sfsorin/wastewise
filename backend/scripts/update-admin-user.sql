-- Script pentru actualizarea utilizatorului admin
UPDATE users 
SET username = 'admin', 
    password = '$2b$10$oXsjeRjayrDSue3WfVco4O/n69oZwog0xTZbQ3kSncYB2.ZzvN2P2', 
    email = 'admin@wastewise.ro' 
WHERE username = 'testuser';

-- Verificare
SELECT id, username, email FROM users;
