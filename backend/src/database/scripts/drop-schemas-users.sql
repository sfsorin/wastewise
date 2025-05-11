-- Script pentru ștergerea schemelor și utilizatorilor pentru aplicația WasteWise
-- Acest script trebuie rulat ca utilizator postgres sau alt utilizator cu drepturi de superuser

-- Revocarea drepturilor implicite
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit REVOKE ALL ON TABLES FROM wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA geo REVOKE ALL ON TABLES FROM wastewise_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit REVOKE ALL ON SEQUENCES FROM wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA geo REVOKE ALL ON SEQUENCES FROM wastewise_app;

-- Revocarea drepturilor pentru scheme
REVOKE USAGE ON SCHEMA public FROM wastewise_app;
REVOKE USAGE ON SCHEMA audit FROM wastewise_app;
REVOKE USAGE ON SCHEMA geo FROM wastewise_app;

-- Ștergerea schemelor (cu excepția schemei public care este implicită)
DROP SCHEMA IF EXISTS audit CASCADE;
DROP SCHEMA IF EXISTS geo CASCADE;

-- Revocarea drepturilor de conectare la baza de date
REVOKE CONNECT ON DATABASE wastewise FROM wastewise_app;

-- Ștergerea utilizatorului aplicației
DROP USER IF EXISTS wastewise_app;
