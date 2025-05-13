--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'admin',
    'user',
    'operator'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

--
-- Name: users_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_status_enum AS ENUM (
    'active',
    'inactive',
    'suspended',
    'pending'
);


ALTER TYPE public.users_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categorii_deseuri; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorii_deseuri (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nume character varying(100) NOT NULL,
    descriere text,
    cod character varying(20),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categorii_deseuri OWNER TO postgres;

--
-- Name: clienti; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clienti (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "tipClientId" character varying NOT NULL,
    nume character varying(200) NOT NULL,
    cui character varying(20),
    cnp character varying(13),
    adresa text NOT NULL,
    "judetId" character varying,
    "localitateId" character varying,
    "codPostal" character varying(10),
    email character varying(255),
    telefon character varying(20),
    "persoanaContact" character varying(100),
    "telefonContact" character varying(20),
    "emailContact" character varying(255),
    "codClient" character varying(50),
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    tip_client_id uuid,
    judet_id uuid,
    localitate_id uuid
);


ALTER TABLE public.clienti OWNER TO postgres;

--
-- Name: contracte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contracte (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "clientId" character varying NOT NULL,
    "numarContract" character varying(50) NOT NULL,
    "dataInceput" date NOT NULL,
    "dataSfarsit" date,
    valoare numeric(12,2),
    moneda character varying(3) DEFAULT 'RON'::character varying NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    detalii text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    client_id uuid
);


ALTER TABLE public.contracte OWNER TO postgres;

--
-- Name: date_istorice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.date_istorice (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "uatId" character varying NOT NULL,
    "categorieId" character varying NOT NULL,
    data date NOT NULL,
    cantitate numeric(10,2) NOT NULL,
    "unitateMasura" character varying(10) DEFAULT 'kg'::character varying NOT NULL,
    temperatura numeric(5,2),
    precipitatii numeric(5,2),
    sezon character varying(20),
    "evenimentSpecial" boolean DEFAULT false NOT NULL,
    "descriereEveniment" text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    uat_id uuid,
    categorie_id uuid
);


ALTER TABLE public.date_istorice OWNER TO postgres;

--
-- Name: judete; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.judete (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nume character varying(100) NOT NULL,
    "codSiruta" character varying(10),
    "codAuto" character varying(2),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.judete OWNER TO postgres;

--
-- Name: localitati; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.localitati (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "judetId" character varying,
    nume character varying(100) NOT NULL,
    "codSiruta" character varying(10),
    tip character varying(50),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    judet_id uuid
);


ALTER TABLE public.localitati OWNER TO postgres;

--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    token character varying(100) NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: predictii_cantitati; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.predictii_cantitati (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "uatId" character varying,
    "clientId" character varying,
    "punctColectareId" character varying,
    "categorieId" character varying NOT NULL,
    "dataPredictie" date NOT NULL,
    "perioadaStart" date NOT NULL,
    "perioadaEnd" date NOT NULL,
    "cantitateEstimata" numeric(10,2) NOT NULL,
    "unitateMasura" character varying(10) DEFAULT 'kg'::character varying NOT NULL,
    "intervalIncredereMin" numeric(10,2),
    "intervalIncredereMax" numeric(10,2),
    "acuratetePredictie" numeric(5,2),
    "modelUtilizat" character varying(100),
    "parametriModel" jsonb,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    uat_id uuid,
    client_id uuid,
    punct_colectare_id uuid,
    categorie_id uuid
);


ALTER TABLE public.predictii_cantitati OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    avatar character varying,
    "phoneNumber" character varying,
    address character varying,
    city character varying,
    county character varying,
    "postalCode" character varying,
    bio character varying,
    "userId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: puncte_colectare; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puncte_colectare (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "clientId" character varying,
    nume character varying(100) NOT NULL,
    adresa text NOT NULL,
    "judetId" character varying,
    "localitateId" character varying,
    latitudine numeric(10,8),
    longitudine numeric(11,8),
    program text,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    client_id uuid,
    judet_id uuid,
    localitate_id uuid
);


ALTER TABLE public.puncte_colectare OWNER TO postgres;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: servicii; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicii (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nume character varying(100) NOT NULL,
    descriere text,
    "pretUnitar" numeric(10,2),
    "unitateMasura" character varying(20),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.servicii OWNER TO postgres;

--
-- Name: servicii_contractate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicii_contractate (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "contractId" character varying NOT NULL,
    "serviciuId" character varying NOT NULL,
    cantitate numeric(10,2),
    "pretUnitar" numeric(10,2) NOT NULL,
    discount numeric(5,2) DEFAULT '0'::numeric NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    contract_id uuid,
    serviciu_id uuid
);


ALTER TABLE public.servicii_contractate OWNER TO postgres;

--
-- Name: tipuri_client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipuri_client (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nume character varying(100) NOT NULL,
    descriere text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tipuri_client OWNER TO postgres;

--
-- Name: uat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uat (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "judetId" character varying,
    nume character varying(100) NOT NULL,
    "codSiruta" character varying(10),
    populatie integer,
    suprafata numeric(10,2),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    judet_id uuid
);


ALTER TABLE public.uat OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    "firstName" character varying(100),
    "lastName" character varying(100),
    "fullName" character varying(100),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.users_role_enum DEFAULT 'user'::public.users_role_enum NOT NULL,
    status public.users_status_enum DEFAULT 'active'::public.users_status_enum NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "lastLogin" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: categorii_deseuri; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorii_deseuri (id, nume, descriere, cod, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: clienti; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clienti (id, "tipClientId", nume, cui, cnp, adresa, "judetId", "localitateId", "codPostal", email, telefon, "persoanaContact", "telefonContact", "emailContact", "codClient", status, "createdAt", "updatedAt", tip_client_id, judet_id, localitate_id) FROM stdin;
\.


--
-- Data for Name: contracte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contracte (id, "clientId", "numarContract", "dataInceput", "dataSfarsit", valoare, moneda, status, detalii, "createdAt", "updatedAt", client_id) FROM stdin;
\.


--
-- Data for Name: date_istorice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.date_istorice (id, "uatId", "categorieId", data, cantitate, "unitateMasura", temperatura, precipitatii, sezon, "evenimentSpecial", "descriereEveniment", "createdAt", "updatedAt", uat_id, categorie_id) FROM stdin;
\.


--
-- Data for Name: judete; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.judete (id, nume, "codSiruta", "codAuto", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: localitati; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.localitati (id, "judetId", nume, "codSiruta", tip, "createdAt", "updatedAt", judet_id) FROM stdin;
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_reset_tokens (id, "userId", token, "expiresAt", used, "createdAt") FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name, description, "createdAt") FROM stdin;
\.


--
-- Data for Name: predictii_cantitati; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.predictii_cantitati (id, "uatId", "clientId", "punctColectareId", "categorieId", "dataPredictie", "perioadaStart", "perioadaEnd", "cantitateEstimata", "unitateMasura", "intervalIncredereMin", "intervalIncredereMax", "acuratetePredictie", "modelUtilizat", "parametriModel", "createdAt", "updatedAt", uat_id, client_id, punct_colectare_id, categorie_id) FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, avatar, "phoneNumber", address, city, county, "postalCode", bio, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: puncte_colectare; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.puncte_colectare (id, "clientId", nume, adresa, "judetId", "localitateId", latitudine, longitudine, program, status, "createdAt", "updatedAt", client_id, judet_id, localitate_id) FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, description, "createdAt") FROM stdin;
\.


--
-- Data for Name: servicii; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicii (id, nume, descriere, "pretUnitar", "unitateMasura", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: servicii_contractate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicii_contractate (id, "contractId", "serviciuId", cantitate, "pretUnitar", discount, "createdAt", "updatedAt", contract_id, serviciu_id) FROM stdin;
\.


--
-- Data for Name: tipuri_client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipuri_client (id, nume, descriere, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: uat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uat (id, "judetId", nume, "codSiruta", populatie, suprafata, "createdAt", "updatedAt", judet_id) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, "firstName", "lastName", "fullName", email, password, role, status, "isActive", "lastLogin", "createdAt", "updatedAt") FROM stdin;
1f210d02-63fb-4d58-86be-f7ecdd495f04	admin	\N	\N	Administrator	admin@example.com	$2b$10$j8k.Ti2tM7s5JxouFxD5w.XNSzdmVdWHUucaeKQveB4v5ZkXWtnLO	user	active	t	2025-05-13 06:36:50.545	2025-05-13 06:19:31.311012	2025-05-13 06:36:50.550921
\.


--
-- Name: predictii_cantitati PK_199adce44eaee8b0c95466f3749; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.predictii_cantitati
    ADD CONSTRAINT "PK_199adce44eaee8b0c95466f3749" PRIMARY KEY (id);


--
-- Name: user_roles PK_23ed6f04fe43066df08379fd034; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "PK_23ed6f04fe43066df08379fd034" PRIMARY KEY (user_id, role_id);


--
-- Name: role_permissions PK_25d24010f53bb80b78e412c9656; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY (role_id, permission_id);


--
-- Name: date_istorice PK_2d32b964b8cc1776c346bde2281; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date_istorice
    ADD CONSTRAINT "PK_2d32b964b8cc1776c346bde2281" PRIMARY KEY (id);


--
-- Name: uat PK_4833783ac61c40abf602b945510; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uat
    ADD CONSTRAINT "PK_4833783ac61c40abf602b945510" PRIMARY KEY (id);


--
-- Name: categorii_deseuri PK_652a57f8e05fc3c2e48abfb4f0e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorii_deseuri
    ADD CONSTRAINT "PK_652a57f8e05fc3c2e48abfb4f0e" PRIMARY KEY (id);


--
-- Name: clienti PK_72af4bdad6069bd9a4755a54feb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "PK_72af4bdad6069bd9a4755a54feb" PRIMARY KEY (id);


--
-- Name: profiles PK_8e520eb4da7dc01d0e190447c8e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY (id);


--
-- Name: permissions PK_920331560282b8bd21bb02290df; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY (id);


--
-- Name: servicii_contractate PK_9c0a03ed444d0830d670732c44d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicii_contractate
    ADD CONSTRAINT "PK_9c0a03ed444d0830d670732c44d" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: contracte PK_a592edd4777ea280a6b2b45dbee; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracte
    ADD CONSTRAINT "PK_a592edd4777ea280a6b2b45dbee" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: servicii PK_c26acd709a52686a5c7b4554f35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicii
    ADD CONSTRAINT "PK_c26acd709a52686a5c7b4554f35" PRIMARY KEY (id);


--
-- Name: localitati PK_c5c36b3420e847c3b4a7d04e7fc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localitati
    ADD CONSTRAINT "PK_c5c36b3420e847c3b4a7d04e7fc" PRIMARY KEY (id);


--
-- Name: password_reset_tokens PK_d16bebd73e844c48bca50ff8d3d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "PK_d16bebd73e844c48bca50ff8d3d" PRIMARY KEY (id);


--
-- Name: judete PK_d4b72db44e1b8b595666a3d26fb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.judete
    ADD CONSTRAINT "PK_d4b72db44e1b8b595666a3d26fb" PRIMARY KEY (id);


--
-- Name: tipuri_client PK_de56cad3279924cc6dca7d93c69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipuri_client
    ADD CONSTRAINT "PK_de56cad3279924cc6dca7d93c69" PRIMARY KEY (id);


--
-- Name: puncte_colectare PK_f198c4650c9f87f6f35c5333dc6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puncte_colectare
    ADD CONSTRAINT "PK_f198c4650c9f87f6f35c5333dc6" PRIMARY KEY (id);


--
-- Name: profiles REL_315ecd98bd1a42dcf2ec4e2e98; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "REL_315ecd98bd1a42dcf2ec4e2e98" UNIQUE ("userId");


--
-- Name: localitati UQ_16cbe45135b5d71c4fa76cfe91c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localitati
    ADD CONSTRAINT "UQ_16cbe45135b5d71c4fa76cfe91c" UNIQUE ("codSiruta");


--
-- Name: clienti UQ_181d59a2c3c9aedce14301f8439; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "UQ_181d59a2c3c9aedce14301f8439" UNIQUE (cui);


--
-- Name: categorii_deseuri UQ_1a892b4a467f24175314311a8d0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorii_deseuri
    ADD CONSTRAINT "UQ_1a892b4a467f24175314311a8d0" UNIQUE (cod);


--
-- Name: contracte UQ_291d1ba7454ecf60beae6624bfe; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracte
    ADD CONSTRAINT "UQ_291d1ba7454ecf60beae6624bfe" UNIQUE ("numarContract");


--
-- Name: judete UQ_300a9766ac3a30c1d6025e4e69a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.judete
    ADD CONSTRAINT "UQ_300a9766ac3a30c1d6025e4e69a" UNIQUE ("codSiruta");


--
-- Name: clienti UQ_348184becf2fe95f0947895749e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "UQ_348184becf2fe95f0947895749e" UNIQUE ("codClient");


--
-- Name: permissions UQ_48ce552495d14eae9b187bb6716; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE (name);


--
-- Name: clienti UQ_5a76aba45b7b94e5d1fce783b96; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "UQ_5a76aba45b7b94e5d1fce783b96" UNIQUE (cnp);


--
-- Name: roles UQ_648e3f5447f725579d7d4ffdfb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE (name);


--
-- Name: uat UQ_77275b17492312fceb2b5bdbf37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uat
    ADD CONSTRAINT "UQ_77275b17492312fceb2b5bdbf37" UNIQUE ("codSiruta");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: password_reset_tokens UQ_ab673f0e63eac966762155508ee; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "UQ_ab673f0e63eac966762155508ee" UNIQUE (token);


--
-- Name: judete UQ_d6b94ecbe6de1e30c4fd6218399; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.judete
    ADD CONSTRAINT "UQ_d6b94ecbe6de1e30c4fd6218399" UNIQUE ("codAuto");


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: IDX_17022daf3f885f7d35423e9971; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON public.role_permissions USING btree (permission_id);


--
-- Name: IDX_178199805b901ccd220ab7740e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON public.role_permissions USING btree (role_id);


--
-- Name: IDX_87b8888186ca9769c960e92687; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON public.user_roles USING btree (user_id);


--
-- Name: IDX_ab673f0e63eac966762155508e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_ab673f0e63eac966762155508e" ON public.password_reset_tokens USING btree (token);


--
-- Name: IDX_b23c65e50a758245a33ee35fda; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON public.user_roles USING btree (role_id);


--
-- Name: localitati FK_0fb934dc67d7ea3c202897521f8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localitati
    ADD CONSTRAINT "FK_0fb934dc67d7ea3c202897521f8" FOREIGN KEY (judet_id) REFERENCES public.judete(id);


--
-- Name: role_permissions FK_17022daf3f885f7d35423e9971e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY (permission_id) REFERENCES public.permissions(id);


--
-- Name: role_permissions FK_178199805b901ccd220ab7740ec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: date_istorice FK_21b9c97470c3bad55100ef5fdc3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date_istorice
    ADD CONSTRAINT "FK_21b9c97470c3bad55100ef5fdc3" FOREIGN KEY (categorie_id) REFERENCES public.categorii_deseuri(id);


--
-- Name: clienti FK_25e9ad92acfb44c89141cab32e7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "FK_25e9ad92acfb44c89141cab32e7" FOREIGN KEY (judet_id) REFERENCES public.judete(id);


--
-- Name: predictii_cantitati FK_30312b9537e8dfbe26e8bf23f88; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.predictii_cantitati
    ADD CONSTRAINT "FK_30312b9537e8dfbe26e8bf23f88" FOREIGN KEY (punct_colectare_id) REFERENCES public.puncte_colectare(id);


--
-- Name: profiles FK_315ecd98bd1a42dcf2ec4e2e985; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: puncte_colectare FK_361f38a57df475ce204a85dfcb0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puncte_colectare
    ADD CONSTRAINT "FK_361f38a57df475ce204a85dfcb0" FOREIGN KEY (localitate_id) REFERENCES public.localitati(id);


--
-- Name: uat FK_650d93fdaf2d417890ba11dc42a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uat
    ADD CONSTRAINT "FK_650d93fdaf2d417890ba11dc42a" FOREIGN KEY (judet_id) REFERENCES public.judete(id);


--
-- Name: clienti FK_84188214e6d40036af506797cb5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "FK_84188214e6d40036af506797cb5" FOREIGN KEY (localitate_id) REFERENCES public.localitati(id);


--
-- Name: user_roles FK_87b8888186ca9769c960e926870; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: predictii_cantitati FK_9e4db1ec8a64312c798df8356aa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.predictii_cantitati
    ADD CONSTRAINT "FK_9e4db1ec8a64312c798df8356aa" FOREIGN KEY (categorie_id) REFERENCES public.categorii_deseuri(id);


--
-- Name: servicii_contractate FK_9ee2a734a35ac33509c644b01e1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicii_contractate
    ADD CONSTRAINT "FK_9ee2a734a35ac33509c644b01e1" FOREIGN KEY (serviciu_id) REFERENCES public.servicii(id);


--
-- Name: date_istorice FK_a66b8c0149b5fc0b180013b92ee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.date_istorice
    ADD CONSTRAINT "FK_a66b8c0149b5fc0b180013b92ee" FOREIGN KEY (uat_id) REFERENCES public.uat(id);


--
-- Name: clienti FK_ab47380c0fa72c2fa53c82f2c0b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clienti
    ADD CONSTRAINT "FK_ab47380c0fa72c2fa53c82f2c0b" FOREIGN KEY (tip_client_id) REFERENCES public.tipuri_client(id);


--
-- Name: user_roles FK_b23c65e50a758245a33ee35fda1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: predictii_cantitati FK_b774d8658d611c49c004b69483b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.predictii_cantitati
    ADD CONSTRAINT "FK_b774d8658d611c49c004b69483b" FOREIGN KEY (uat_id) REFERENCES public.uat(id);


--
-- Name: puncte_colectare FK_b981a687e4291f470ba5dcaaf56; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puncte_colectare
    ADD CONSTRAINT "FK_b981a687e4291f470ba5dcaaf56" FOREIGN KEY (judet_id) REFERENCES public.judete(id);


--
-- Name: servicii_contractate FK_c21de6ebfc3fc10091be81fd955; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicii_contractate
    ADD CONSTRAINT "FK_c21de6ebfc3fc10091be81fd955" FOREIGN KEY (contract_id) REFERENCES public.contracte(id);


--
-- Name: predictii_cantitati FK_ccfb8acd84cfd75673124afb8f1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.predictii_cantitati
    ADD CONSTRAINT "FK_ccfb8acd84cfd75673124afb8f1" FOREIGN KEY (client_id) REFERENCES public.clienti(id);


--
-- Name: password_reset_tokens FK_d6a19d4b4f6c62dcd29daa497e2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "FK_d6a19d4b4f6c62dcd29daa497e2" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: puncte_colectare FK_ddb823ccb94eeb30a656fdde43c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puncte_colectare
    ADD CONSTRAINT "FK_ddb823ccb94eeb30a656fdde43c" FOREIGN KEY (client_id) REFERENCES public.clienti(id);


--
-- Name: contracte FK_e75db9ed747cec234d72d97763e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracte
    ADD CONSTRAINT "FK_e75db9ed747cec234d72d97763e" FOREIGN KEY (client_id) REFERENCES public.clienti(id);


--
-- PostgreSQL database dump complete
--

