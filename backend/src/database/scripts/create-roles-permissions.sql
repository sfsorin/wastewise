-- Script pentru crearea tabelelor de roluri și permisiuni

-- Creare tabel pentru roluri
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Creare tabel pentru permisiuni
CREATE TABLE IF NOT EXISTS permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Creare tabel pentru relația many-to-many între utilizatori și roluri
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID NOT NULL,
  role_id UUID NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT FK_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT FK_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Creare tabel pentru relația many-to-many între roluri și permisiuni
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id UUID NOT NULL,
  permission_id UUID NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  CONSTRAINT FK_role_permissions_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  CONSTRAINT FK_role_permissions_permission FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Creare roluri implicite
INSERT INTO roles (name, description)
VALUES 
  ('admin', 'Administrator cu acces complet la sistem'),
  ('user', 'Utilizator standard cu acces limitat'),
  ('operator', 'Operator cu acces la funcționalități specifice')
ON CONFLICT DO NOTHING;

-- Creare permisiuni implicite
INSERT INTO permissions (name, description)
VALUES 
  ('create:users', 'Permite crearea utilizatorilor'),
  ('read:users', 'Permite vizualizarea utilizatorilor'),
  ('update:users', 'Permite actualizarea utilizatorilor'),
  ('delete:users', 'Permite ștergerea utilizatorilor'),
  ('create:roles', 'Permite crearea rolurilor'),
  ('read:roles', 'Permite vizualizarea rolurilor'),
  ('update:roles', 'Permite actualizarea rolurilor'),
  ('delete:roles', 'Permite ștergerea rolurilor'),
  ('assign:roles', 'Permite asignarea rolurilor utilizatorilor'),
  ('create:clients', 'Permite crearea clienților'),
  ('read:clients', 'Permite vizualizarea clienților'),
  ('update:clients', 'Permite actualizarea clienților'),
  ('delete:clients', 'Permite ștergerea clienților')
ON CONFLICT DO NOTHING;

-- Asignare toate permisiunile rolului admin
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'admin';

-- Asignare permisiuni de citire rolului user
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'user' AND p.name LIKE 'read:%';

-- Asignare permisiuni de citire și actualizare rolului operator
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'operator' AND (p.name LIKE 'read:%' OR p.name LIKE 'update:%');

-- Asignare rol admin utilizatorului admin existent
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.username = 'admin' AND r.name = 'admin';

-- Adăugare comentarii pentru tabele
COMMENT ON TABLE roles IS 'Roluri pentru utilizatori';
COMMENT ON TABLE permissions IS 'Permisiuni pentru roluri';
COMMENT ON TABLE user_roles IS 'Relația dintre utilizatori și roluri';
COMMENT ON TABLE role_permissions IS 'Relația dintre roluri și permisiuni';
