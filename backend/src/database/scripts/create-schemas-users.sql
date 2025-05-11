-- Script pentru crearea schemelor și utilizatorilor pentru aplicația WasteWise
-- Acest script trebuie rulat ca utilizator postgres sau alt utilizator cu drepturi de superuser
-- Notă: Baza de date 'wastewise' trebuie să existe înainte de a rula acest script
-- Pentru a crea baza de date, rulați scriptul 'create-database.sql'

-- Crearea utilizatorului aplicației
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'wastewise_app') THEN
        CREATE USER wastewise_app WITH
            ENCRYPTED PASSWORD 'app_password_secure';
        RAISE NOTICE 'Utilizatorul wastewise_app a fost creat cu succes.';
    ELSE
        RAISE NOTICE 'Utilizatorul wastewise_app există deja.';
    END IF;
END
$$;

-- Acordarea drepturilor de conectare la baza de date
GRANT CONNECT ON DATABASE wastewise TO wastewise_app;

-- Crearea schemelor
-- Schema public există implicit, dar o vom recrea pentru a fi siguri că are proprietarul corect
DO $$
BEGIN
    -- Schema public
    IF EXISTS (SELECT FROM pg_catalog.pg_namespace WHERE nspname = 'public') THEN
        -- Schema există, schimbăm proprietarul
        ALTER SCHEMA public OWNER TO postgres;
        RAISE NOTICE 'Schema public există deja, proprietarul a fost actualizat.';
    ELSE
        -- Schema nu există, o creăm
        CREATE SCHEMA public AUTHORIZATION postgres;
        RAISE NOTICE 'Schema public a fost creată cu succes.';
    END IF;

    -- Schema audit
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_namespace WHERE nspname = 'audit') THEN
        CREATE SCHEMA audit AUTHORIZATION postgres;
        RAISE NOTICE 'Schema audit a fost creată cu succes.';
    ELSE
        RAISE NOTICE 'Schema audit există deja.';
    END IF;

    -- Schema geo
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_namespace WHERE nspname = 'geo') THEN
        CREATE SCHEMA geo AUTHORIZATION postgres;
        RAISE NOTICE 'Schema geo a fost creată cu succes.';
    ELSE
        RAISE NOTICE 'Schema geo există deja.';
    END IF;
END
$$;

-- Acordarea drepturilor pentru utilizatorul aplicației pe scheme
GRANT USAGE ON SCHEMA public TO wastewise_app;
GRANT USAGE ON SCHEMA audit TO wastewise_app;
GRANT USAGE ON SCHEMA geo TO wastewise_app;

-- Acordarea drepturilor implicite pentru tabele viitoare
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT SELECT, INSERT ON TABLES TO wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA geo GRANT SELECT ON TABLES TO wastewise_app;

-- Acordarea drepturilor pentru secvențe
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA audit GRANT USAGE, SELECT ON SEQUENCES TO wastewise_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA geo GRANT USAGE, SELECT ON SEQUENCES TO wastewise_app;

-- Comentarii pentru scheme
COMMENT ON SCHEMA public IS 'Schema principală pentru tabelele aplicației WasteWise';
COMMENT ON SCHEMA audit IS 'Schema pentru loguri de audit și istoricul modificărilor';
COMMENT ON SCHEMA geo IS 'Schema pentru date geografice (județe, localități, UAT-uri)';

-- Comentariu pentru utilizator
COMMENT ON ROLE wastewise_app IS 'Utilizator pentru aplicația WasteWise cu drepturi limitate';
