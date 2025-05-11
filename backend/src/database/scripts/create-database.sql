-- Script pentru crearea bazei de date WasteWise
-- Acest script trebuie rulat ca utilizator postgres sau alt utilizator cu drepturi de superuser

-- Crearea bazei de date (dacă nu există)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'wastewise') THEN
        CREATE DATABASE wastewise
            WITH OWNER = postgres
            ENCODING = 'UTF8'
            LC_COLLATE = 'en_US.utf8'
            LC_CTYPE = 'en_US.utf8'
            TEMPLATE = template0;
        RAISE NOTICE 'Baza de date wastewise a fost creată cu succes.';
    ELSE
        RAISE NOTICE 'Baza de date wastewise există deja.';
    END IF;
END
$$;
