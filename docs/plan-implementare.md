# Plan de Implementare - Aplicație Management Deșeuri

## Descriere Generală

Aplicația de Management al Deșeurilor este o soluție completă pentru companiile care activează în domeniul colectării, transportului, procesării și eliminării deșeurilor. Sistemul permite gestionarea întregului flux operațional, de la planificarea colectării până la facturare și raportare, oferind funcționalități avansate de analiză și predicție pentru optimizarea activității.

### Funcționalități Principale

1. **Gestionare Entități**

   - Administrare județe, localități și UAT-uri
   - Gestionare clienți (persoane fizice, juridice, UAT-uri)
   - Administrare operatori și subcontractori

2. **Management Operațional**

   - Gestionare categorii de deșeuri și servicii
   - Administrare autospeciale și șoferi
   - Planificare și monitorizare colectări
   - Trasee și rute optimizate

3. **Management Contracte și Prețuri**

   - Gestionare contracte cu clienți și furnizori
   - Administrare liste de prețuri diferențiate
   - Tarife specifice pe categorii de deșeuri
   - Discount-uri și promoții

4. **Facturare și Financiar**

   - Generare automată facturi
   - Urmărire plăți și solduri
   - Rapoarte financiare
   - Integrare cu sisteme contabile

5. **Raportare și Analiză**
   - Rapoarte operaționale și de conformitate
   - Dashboard-uri personalizabile
   - Analiză predictivă și tendințe
   - Optimizare costuri și resurse

## Cuprins

1. [Arhitectură și Tehnologii](#arhitectură-și-tehnologii)
2. [Baza de Date](#baza-de-date)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Design System](#design-system)
6. [DevOps și Infrastructură](#devops-și-infrastructură)
7. [Planificare și Etapizare](#planificare-și-etapizare)

## Arhitectură și Tehnologii

### Arhitectură Generală

- **Arhitectură**: Microservicii
- **Comunicare**: API RESTful + GraphQL pentru interogări complexe
- **Autentificare**: OAuth 2.0 + JWT

### Tehnologii Backend

- **Framework**: NestJS (TypeScript)
- **ORM**: TypeORM
- **Bază de Date**: PostgreSQL
- **Cache**: Redis
- **Message Broker**: RabbitMQ
- **Documentație API**: Swagger/OpenAPI
- **Validare**: class-validator, class-transformer
- **Testing**: Jest, Supertest

### Tehnologii Machine Learning și Analiză Date

- **Biblioteci ML**: TensorFlow.js, scikit-learn (Python cu API)
- **Vizualizare Date**: D3.js, Chart.js, Recharts
- **Procesare Date**: Pandas (Python cu API), Apache Spark
- **Modele Predictive**: Regresie, Serii Temporale (ARIMA, Prophet)
- **Integrare Python**: NestJS cu microserviciu Python
- **API ML**: REST API pentru predicții și analiză
- **Stocare Modele**: Bază de date PostgreSQL + S3 pentru modele mari

### Tehnologii Frontend

- **Framework**: React 18+ (TypeScript)
- **State Management**: Zustand
- **Routing**: React Router
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + componente custom
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios + React Query
- **Testing**: Jest, React Testing Library, Cypress
- **Bundler**: Vite
- **Internaționalizare**: react-i18next

### DevOps

- **Containerizare**: Docker
- **Orchestrare**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **Infrastructure as Code**: Terraform
- **Secret Management**: HashiCorp Vault

## Baza de Date

### Schema Conceptuală

- **Entități Principale**:
  - Utilizatori și Roluri
  - Județe
  - Localități
  - UAT-uri (Unități Administrativ-Teritoriale)
  - Clienți (Persoane Fizice și Juridice)
  - Categorii de Deșeuri
  - Operatori de Deșeuri
  - Autospeciale și Șoferi
  - Contracte și Liste de Prețuri
  - Facturi și Plăți
  - Documente și Fișiere
  - Rapoarte și Statistici
  - Date pentru Machine Learning și Predicții

### Structura Tabelelor

#### Utilizatori și Autentificare

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);
```

#### Structura Geografică

```sql
CREATE TABLE judete (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL UNIQUE,
  cod VARCHAR(2) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE localitati (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  judet_id UUID NOT NULL REFERENCES judete(id) ON DELETE CASCADE,
  tip VARCHAR(50) NOT NULL, -- oraș, municipiu, comună, sat
  cod_postal VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(nume, judet_id)
);

CREATE TABLE uat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  judet_id UUID NOT NULL REFERENCES judete(id),
  localitate_id UUID REFERENCES localitati(id),
  cod_siruta VARCHAR(10) UNIQUE,
  populatie INTEGER,
  suprafata DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Clienți

```sql
CREATE TABLE tipuri_client (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(50) NOT NULL UNIQUE,
  descriere TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clienti (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tip_client_id UUID NOT NULL REFERENCES tipuri_client(id),
  nume VARCHAR(200) NOT NULL,
  cui VARCHAR(20) UNIQUE,
  cnp VARCHAR(13) UNIQUE,
  adresa TEXT NOT NULL,
  judet_id UUID REFERENCES judete(id),
  localitate_id UUID REFERENCES localitati(id),
  cod_postal VARCHAR(10),
  email VARCHAR(255),
  telefon VARCHAR(20),
  persoana_contact VARCHAR(100),
  telefon_contact VARCHAR(20),
  email_contact VARCHAR(255),
  cod_client VARCHAR(50) UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE puncte_colectare (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clienti(id),
  nume VARCHAR(200) NOT NULL,
  adresa TEXT NOT NULL,
  judet_id UUID REFERENCES judete(id),
  localitate_id UUID REFERENCES localitati(id),
  cod_postal VARCHAR(10),
  latitudine DECIMAL(10, 8),
  longitudine DECIMAL(11, 8),
  persoana_contact VARCHAR(100),
  telefon_contact VARCHAR(20),
  email_contact VARCHAR(255),
  program_colectare TEXT,
  observatii TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Gestionare Deșeuri

```sql
CREATE TABLE categorii_deseuri (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL UNIQUE,
  cod VARCHAR(20) NOT NULL UNIQUE,
  descriere TEXT,
  unitate_masura_implicita VARCHAR(10) NOT NULL DEFAULT 'kg',
  periculos BOOLEAN DEFAULT FALSE,
  cod_clasificare VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE operatori (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(200) NOT NULL,
  cui VARCHAR(20) UNIQUE NOT NULL,
  adresa TEXT,
  judet_id UUID REFERENCES judete(id),
  localitate_id UUID REFERENCES localitati(id),
  email VARCHAR(255),
  telefon VARCHAR(20),
  website VARCHAR(255),
  licenta_colectare VARCHAR(50),
  data_expirare_licenta DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicii (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  descriere TEXT,
  categorie_deseu_id UUID REFERENCES categorii_deseuri(id),
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  durata_estimata INTEGER, -- în minute
  necesita_echipament_special BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rapoarte_deseuri (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  operator_id UUID NOT NULL REFERENCES operatori(id),
  uat_id UUID NOT NULL REFERENCES uat(id),
  categorie_id UUID NOT NULL REFERENCES categorii_deseuri(id),
  perioada_start DATE NOT NULL,
  perioada_end DATE NOT NULL,
  cantitate DECIMAL(10, 2) NOT NULL,
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  status VARCHAR(20) NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Contracte și Prețuri

```sql
CREATE TABLE contracte (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numar_contract VARCHAR(50) NOT NULL,
  client_id UUID NOT NULL REFERENCES clienti(id),
  operator_id UUID NOT NULL REFERENCES operatori(id),
  data_inceput DATE NOT NULL,
  data_sfarsit DATE,
  valoare_contract DECIMAL(12, 2),
  moneda VARCHAR(3) DEFAULT 'RON',
  frecventa_facturare VARCHAR(20) NOT NULL, -- lunar, trimestrial, etc.
  zile_scadenta INTEGER NOT NULL DEFAULT 30,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  observatii TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE liste_preturi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  descriere TEXT,
  data_inceput DATE NOT NULL,
  data_sfarsit DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE preturi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lista_preturi_id UUID NOT NULL REFERENCES liste_preturi(id),
  categorie_deseu_id UUID REFERENCES categorii_deseuri(id),
  serviciu_id UUID REFERENCES servicii(id),
  pret DECIMAL(10, 2) NOT NULL,
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  cantitate_minima DECIMAL(10, 2),
  cantitate_maxima DECIMAL(10, 2),
  discount_procent DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contracte_liste_preturi (
  contract_id UUID NOT NULL REFERENCES contracte(id),
  lista_preturi_id UUID NOT NULL REFERENCES liste_preturi(id),
  data_inceput DATE NOT NULL,
  data_sfarsit DATE,
  PRIMARY KEY (contract_id, lista_preturi_id)
);

CREATE TABLE contracte_puncte_colectare (
  contract_id UUID NOT NULL REFERENCES contracte(id),
  punct_colectare_id UUID NOT NULL REFERENCES puncte_colectare(id),
  frecventa_colectare VARCHAR(50), -- zilnic, săptămânal, lunar, la cerere
  zile_colectare VARCHAR(50), -- Luni, Marți, etc.
  PRIMARY KEY (contract_id, punct_colectare_id)
);
```

#### Facturare și Plăți

```sql
CREATE TABLE facturi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numar_factura VARCHAR(50) NOT NULL UNIQUE,
  serie_factura VARCHAR(10) NOT NULL,
  contract_id UUID NOT NULL REFERENCES contracte(id),
  client_id UUID NOT NULL REFERENCES clienti(id),
  data_emitere DATE NOT NULL,
  data_scadenta DATE NOT NULL,
  valoare_fara_tva DECIMAL(12, 2) NOT NULL,
  valoare_tva DECIMAL(12, 2) NOT NULL,
  valoare_totala DECIMAL(12, 2) NOT NULL,
  moneda VARCHAR(3) DEFAULT 'RON',
  status VARCHAR(20) NOT NULL DEFAULT 'emisa', -- emisa, platita, anulata, etc.
  metoda_plata VARCHAR(50),
  observatii TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE facturi_linii (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  factura_id UUID NOT NULL REFERENCES facturi(id),
  descriere VARCHAR(255) NOT NULL,
  categorie_deseu_id UUID REFERENCES categorii_deseuri(id),
  serviciu_id UUID REFERENCES servicii(id),
  cantitate DECIMAL(10, 2) NOT NULL,
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  pret_unitar DECIMAL(10, 2) NOT NULL,
  valoare_fara_tva DECIMAL(12, 2) NOT NULL,
  procent_tva DECIMAL(5, 2) NOT NULL,
  valoare_tva DECIMAL(12, 2) NOT NULL,
  valoare_totala DECIMAL(12, 2) NOT NULL,
  discount_procent DECIMAL(5, 2) DEFAULT 0,
  discount_valoare DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plati (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  factura_id UUID NOT NULL REFERENCES facturi(id),
  numar_document VARCHAR(50),
  data_plata DATE NOT NULL,
  suma DECIMAL(12, 2) NOT NULL,
  moneda VARCHAR(3) DEFAULT 'RON',
  metoda_plata VARCHAR(50) NOT NULL, -- transfer bancar, numerar, card, etc.
  referinta_plata VARCHAR(100),
  observatii TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Gestionare Documente

```sql
CREATE TABLE tipuri_documente (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL UNIQUE,
  descriere TEXT,
  extensii_permise VARCHAR(255), -- ex: "pdf,doc,docx,jpg,png"
  dimensiune_maxima INTEGER, -- în KB
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documente (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tip_document_id UUID NOT NULL REFERENCES tipuri_documente(id),
  nume VARCHAR(255) NOT NULL,
  descriere TEXT,
  cale_fisier VARCHAR(500) NOT NULL,
  extensie VARCHAR(10) NOT NULL,
  dimensiune INTEGER NOT NULL, -- în KB
  hash VARCHAR(128), -- pentru verificarea integrității
  metadata JSONB, -- metadate extrase din document
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documente_contracte (
  document_id UUID NOT NULL REFERENCES documente(id),
  contract_id UUID NOT NULL REFERENCES contracte(id),
  tip_asociere VARCHAR(50) NOT NULL, -- contract, act adițional, anexă, etc.
  data_asociere TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  PRIMARY KEY (document_id, contract_id)
);

CREATE TABLE documente_facturi (
  document_id UUID NOT NULL REFERENCES documente(id),
  factura_id UUID NOT NULL REFERENCES facturi(id),
  tip_asociere VARCHAR(50) NOT NULL, -- factură, chitanță, etc.
  data_asociere TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  PRIMARY KEY (document_id, factura_id)
);

CREATE TABLE documente_plati (
  document_id UUID NOT NULL REFERENCES documente(id),
  plata_id UUID NOT NULL REFERENCES plati(id),
  tip_asociere VARCHAR(50) NOT NULL, -- chitanță, ordin de plată, etc.
  data_asociere TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  PRIMARY KEY (document_id, plata_id)
);

CREATE TABLE documente_colectari (
  document_id UUID NOT NULL REFERENCES documente(id),
  colectare_id UUID NOT NULL REFERENCES colectari(id),
  tip_asociere VARCHAR(50) NOT NULL, -- foaie de parcurs, bon cântar, etc.
  data_asociere TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  PRIMARY KEY (document_id, colectare_id)
);

CREATE TABLE documente_autospeciale (
  document_id UUID NOT NULL REFERENCES documente(id),
  autospeciala_id UUID NOT NULL REFERENCES autospeciale(id),
  tip_asociere VARCHAR(50) NOT NULL, -- carte identitate, asigurare, revizie, etc.
  data_asociere TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  PRIMARY KEY (document_id, autospeciala_id)
);

CREATE TABLE documente_soferi (
  document_id UUID NOT NULL REFERENCES documente(id),
  sofer_id UUID NOT NULL REFERENCES soferi(id),
  tip_asociere VARCHAR(50) NOT NULL, -- permis, atestat, etc.
  data_asociere TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  PRIMARY KEY (document_id, sofer_id)
);
```

### Indexare și Optimizare

#### Autospeciale și Șoferi

```sql
CREATE TABLE soferi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  prenume VARCHAR(100) NOT NULL,
  cnp VARCHAR(13) UNIQUE,
  serie_permis VARCHAR(20),
  data_expirare_permis DATE,
  telefon VARCHAR(20),
  email VARCHAR(255),
  operator_id UUID REFERENCES operatori(id),
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE autospeciale (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numar_inmatriculare VARCHAR(20) NOT NULL UNIQUE,
  marca VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  an_fabricatie INTEGER,
  capacitate DECIMAL(10, 2),
  unitate_masura VARCHAR(10) DEFAULT 'tone',
  operator_id UUID REFERENCES operatori(id),
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  data_ultima_revizie DATE,
  data_urmatoare_revizie DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE programari_autospeciale (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  autospeciala_id UUID NOT NULL REFERENCES autospeciale(id),
  sofer_id UUID NOT NULL REFERENCES soferi(id),
  data_programare DATE NOT NULL,
  ora_start TIME NOT NULL,
  ora_final TIME NOT NULL,
  uat_id UUID REFERENCES uat(id),
  status VARCHAR(20) NOT NULL DEFAULT 'programat',
  observatii TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE colectari (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programare_id UUID REFERENCES programari_autospeciale(id),
  autospeciala_id UUID NOT NULL REFERENCES autospeciale(id),
  sofer_id UUID NOT NULL REFERENCES soferi(id),
  uat_id UUID NOT NULL REFERENCES uat(id),
  categorie_id UUID NOT NULL REFERENCES categorii_deseuri(id),
  data_colectare DATE NOT NULL,
  ora_colectare TIME NOT NULL,
  cantitate DECIMAL(10, 2) NOT NULL,
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  latitudine DECIMAL(10, 8),
  longitudine DECIMAL(11, 8),
  observatii TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Date pentru Machine Learning și Predicții

```sql
CREATE TABLE date_istorice (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uat_id UUID NOT NULL REFERENCES uat(id),
  categorie_id UUID NOT NULL REFERENCES categorii_deseuri(id),
  data DATE NOT NULL,
  cantitate DECIMAL(10, 2) NOT NULL,
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  temperatura DECIMAL(5, 2),
  precipitatii DECIMAL(5, 2),
  sezon VARCHAR(20),
  eveniment_special BOOLEAN DEFAULT FALSE,
  descriere_eveniment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE predictii_cantitati (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  uat_id UUID REFERENCES uat(id),
  client_id UUID REFERENCES clienti(id),
  punct_colectare_id UUID REFERENCES puncte_colectare(id),
  categorie_id UUID NOT NULL REFERENCES categorii_deseuri(id),
  data_predictie DATE NOT NULL,
  perioada_start DATE NOT NULL,
  perioada_end DATE NOT NULL,
  cantitate_estimata DECIMAL(10, 2) NOT NULL,
  unitate_masura VARCHAR(10) NOT NULL DEFAULT 'kg',
  interval_incredere_min DECIMAL(10, 2),
  interval_incredere_max DECIMAL(10, 2),
  acuratete_predictie DECIMAL(5, 2), -- procent
  model_utilizat VARCHAR(100),
  parametri_model JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE predictii_financiare (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clienti(id),
  contract_id UUID REFERENCES contracte(id),
  perioada_start DATE NOT NULL,
  perioada_end DATE NOT NULL,
  valoare_estimata DECIMAL(12, 2) NOT NULL,
  moneda VARCHAR(3) DEFAULT 'RON',
  interval_incredere_min DECIMAL(12, 2),
  interval_incredere_max DECIMAL(12, 2),
  acuratete_predictie DECIMAL(5, 2), -- procent
  detalii_predictie JSONB, -- detalii pe categorii de deșeuri
  model_utilizat VARCHAR(100),
  parametri_model JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modele_ml (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  descriere TEXT,
  tip_model VARCHAR(50) NOT NULL,
  parametri JSONB,
  metrici_performanta JSONB,
  data_antrenare TIMESTAMP WITH TIME ZONE,
  activ BOOLEAN DEFAULT FALSE,
  versiune VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variabile_externe (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nume VARCHAR(100) NOT NULL,
  descriere TEXT,
  sursa VARCHAR(255),
  frecventa_actualizare VARCHAR(50),
  ultima_actualizare TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE valori_variabile_externe (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  variabila_id UUID NOT NULL REFERENCES variabile_externe(id),
  data DATE NOT NULL,
  valoare DECIMAL(15, 5) NOT NULL,
  uat_id UUID REFERENCES uat(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Indexare și Optimizare

```sql
-- Indexuri pentru căutări frecvente
CREATE INDEX idx_localitati_judet_id ON localitati(judet_id);
CREATE INDEX idx_uat_judet_id ON uat(judet_id);
CREATE INDEX idx_uat_localitate_id ON uat(localitate_id);
CREATE INDEX idx_rapoarte_operator_id ON rapoarte_deseuri(operator_id);
CREATE INDEX idx_rapoarte_uat_id ON rapoarte_deseuri(uat_id);
CREATE INDEX idx_rapoarte_categorie_id ON rapoarte_deseuri(categorie_id);
CREATE INDEX idx_rapoarte_perioada ON rapoarte_deseuri(perioada_start, perioada_end);
CREATE INDEX idx_soferi_operator_id ON soferi(operator_id);
CREATE INDEX idx_autospeciale_operator_id ON autospeciale(operator_id);
CREATE INDEX idx_programari_autospeciala_id ON programari_autospeciale(autospeciala_id);
CREATE INDEX idx_programari_sofer_id ON programari_autospeciale(sofer_id);
CREATE INDEX idx_programari_data ON programari_autospeciale(data_programare);
CREATE INDEX idx_colectari_uat_id ON colectari(uat_id);
CREATE INDEX idx_colectari_categorie_id ON colectari(categorie_id);
CREATE INDEX idx_colectari_data ON colectari(data_colectare);
CREATE INDEX idx_date_istorice_uat_id ON date_istorice(uat_id);
CREATE INDEX idx_date_istorice_categorie_id ON date_istorice(categorie_id);
CREATE INDEX idx_date_istorice_data ON date_istorice(data);
CREATE INDEX idx_predictii_uat_id ON predictii(uat_id);
CREATE INDEX idx_predictii_categorie_id ON predictii(categorie_id);
CREATE INDEX idx_predictii_data ON predictii(data_predictie);

-- Indexuri pentru full-text search
CREATE INDEX idx_localitati_nume_gin ON localitati USING gin(to_tsvector('romanian', nume));
CREATE INDEX idx_operatori_nume_gin ON operatori USING gin(to_tsvector('romanian', nume));
CREATE INDEX idx_soferi_nume_gin ON soferi USING gin(to_tsvector('romanian', nume || ' ' || prenume));
```

## Backend

### Structura Proiectului

```
backend/
├── src/
│   ├── common/                 # Cod comun, reutilizabil
│   │   ├── decorators/         # Decoratori personalizați
│   │   ├── dto/                # DTO-uri comune
│   │   ├── entities/           # Entități comune
│   │   ├── enums/              # Enumerări
│   │   ├── exceptions/         # Excepții personalizate
│   │   ├── filters/            # Filtre de excepții
│   │   ├── guards/             # Guards pentru autorizare
│   │   ├── interceptors/       # Interceptori
│   │   ├── interfaces/         # Interfețe
│   │   ├── middlewares/        # Middleware-uri
│   │   ├── pipes/              # Pipe-uri de validare
│   │   ├── services/           # Servicii comune
│   │   └── utils/              # Utilități
│   ├── config/                 # Configurații
│   │   ├── database.config.ts
│   │   ├── auth.config.ts
│   │   ├── cache.config.ts
│   │   └── app.config.ts
│   ├── modules/                # Module funcționale
│   │   ├── auth/               # Autentificare și autorizare
│   │   ├── users/              # Gestionare utilizatori
│   │   ├── judete/             # Gestionare județe
│   │   ├── localitati/         # Gestionare localități
│   │   ├── uat/                # Gestionare UAT-uri
│   │   ├── clienti/            # Gestionare clienți
│   │   ├── puncte-colectare/   # Gestionare puncte de colectare
│   │   ├── categorii-deseuri/  # Gestionare categorii deșeuri
│   │   ├── servicii/           # Gestionare servicii
│   │   ├── operatori/          # Gestionare operatori
│   │   ├── autospeciale/       # Gestionare autospeciale
│   │   ├── soferi/             # Gestionare șoferi
│   │   ├── programari/         # Gestionare programări
│   │   ├── colectari/          # Gestionare colectări
│   │   ├── contracte/          # Gestionare contracte
│   │   ├── preturi/            # Gestionare liste de prețuri
│   │   ├── facturare/          # Gestionare facturi și plăți
│   │   ├── documente/          # Gestionare documente și fișiere
│   │   ├── rapoarte/           # Gestionare rapoarte
│   │   └── ml/                 # Machine Learning și predicții
│   │       ├── predictii-cantitati/  # Predicții cantități deșeuri
│   │       ├── predictii-financiare/ # Predicții financiare
│   │       ├── modele/               # Gestionare modele ML
│   │       └── training/             # Antrenare și evaluare modele
│   ├── migration/              # Migrări bază de date
│   ├── app.module.ts           # Modulul principal
│   ├── app.controller.ts       # Controller principal
│   ├── app.service.ts          # Serviciu principal
│   └── main.ts                 # Punct de intrare
├── test/                       # Teste
│   ├── e2e/                    # Teste end-to-end
│   └── unit/                   # Teste unitare
├── .env                        # Variabile de mediu
├── .env.example                # Exemplu variabile de mediu
├── nest-cli.json               # Configurare NestJS CLI
├── package.json                # Dependențe
├── tsconfig.json               # Configurare TypeScript
└── README.md                   # Documentație
```

### Structura Modulelor

Fiecare modul va urma o structură consistentă:

```
modules/[module-name]/
├── controllers/           # Controllere pentru API
├── dto/                   # Data Transfer Objects
│   ├── create-*.dto.ts    # DTO pentru creare
│   ├── update-*.dto.ts    # DTO pentru actualizare
│   └── response-*.dto.ts  # DTO pentru răspunsuri
├── entities/              # Entități pentru baza de date
├── interfaces/            # Interfețe specifice modulului
├── services/              # Servicii pentru logica de business
├── repositories/          # Repository pattern (opțional)
├── guards/                # Guards specifice modulului
├── [module-name].module.ts
└── index.ts               # Barrel file pentru exporturi
```

### Standardizarea API

#### Răspunsuri API

Toate răspunsurile API vor urma un format standard:

```typescript
// common/dto/api-response.dto.ts
export class ApiResponseDto<T> {
	success: boolean;
	data?: T;
	error?: {
		code: string;
		message: string;
		details?: Record<string, string[]>;
	};
	meta?: {
		timestamp: Date;
		pagination?: {
			page: number;
			pageSize: number;
			total: number;
			totalPages: number;
		};
	};
}
```

#### Gestionarea Erorilor

Implementarea unui sistem centralizat de gestionare a erorilor:

```typescript
// common/filters/http-exception.filter.ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const exceptionResponse = exception.getResponse() as any;

		const errorResponse = {
			success: false,
			error: {
				code: exceptionResponse.error || 'HTTP_ERROR',
				message: exceptionResponse.message || 'A apărut o eroare',
				details: exceptionResponse.details,
			},
			meta: {
				timestamp: new Date(),
				path: request.url,
			},
		};

		response.status(status).json(errorResponse);
	}
}
```

#### Validare

Utilizarea class-validator și class-transformer pentru validarea datelor:

```typescript
// common/pipes/validation.pipe.ts
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			const details = this.formatErrors(errors);
			throw new BadRequestException({
				error: 'VALIDATION_ERROR',
				message: 'Eroare de validare',
				details,
			});
		}
		return object;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private formatErrors(errors: ValidationError[]) {
		const result: Record<string, string[]> = {};
		errors.forEach((error) => {
			const property = error.property;
			const constraints = error.constraints;
			if (constraints) {
				result[property] = Object.values(constraints);
			}
		});
		return result;
	}
}
```

## Frontend

### Structura Proiectului

```
frontend/
├── public/                     # Fișiere statice
│   ├── locales/                # Fișiere de traducere
│   │   ├── ro/                 # Română
│   │   └── en/                 # Engleză
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/                 # Resurse (imagini, fonturi, etc.)
│   ├── components/             # Componente reutilizabile
│   │   ├── ui/                 # Componente UI de bază
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   └── ...
│   │   └── common/             # Componente compuse
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       ├── Footer/
│   │       ├── Layout/
│   │       ├── SearchBar/
│   │       ├── FilterPanel/
│   │       └── ...
│   ├── config/                 # Configurații
│   │   ├── api.config.ts
│   │   ├── routes.config.ts
│   │   └── app.config.ts
│   ├── features/               # Module funcționale
│   │   ├── auth/               # Autentificare
│   │   ├── users/              # Gestionare utilizatori
│   │   ├── judete/             # Gestionare județe
│   │   ├── localitati/         # Gestionare localități
│   │   ├── uat/                # Gestionare UAT-uri
│   │   ├── clienti/            # Gestionare clienți
│   │   ├── puncte-colectare/   # Gestionare puncte de colectare
│   │   ├── categorii-deseuri/  # Gestionare categorii deșeuri
│   │   ├── servicii/           # Gestionare servicii
│   │   ├── operatori/          # Gestionare operatori
│   │   ├── autospeciale/       # Gestionare autospeciale
│   │   ├── soferi/             # Gestionare șoferi
│   │   ├── programari/         # Gestionare programări
│   │   ├── colectari/          # Gestionare colectări
│   │   ├── contracte/          # Gestionare contracte
│   │   ├── preturi/            # Gestionare liste de prețuri
│   │   ├── facturare/          # Gestionare facturi și plăți
│   │   ├── documente/          # Gestionare documente și fișiere
│   │   ├── rapoarte/           # Gestionare rapoarte
│   │   └── analytics/          # Analiză date și predicții
│   │       ├── dashboard/            # Dashboard-uri analitice
│   │       ├── predictii-cantitati/  # Predicții cantități deșeuri
│   │       ├── predictii-financiare/ # Predicții financiare
│   │       ├── vizualizari/          # Vizualizări avansate
│   │       └── simulari/             # Simulări și scenarii
│   ├── hooks/                  # Hooks personalizate
│   │   ├── useAuth.ts
│   │   ├── usePagination.ts
│   │   ├── useSort.ts
│   │   ├── useFilter.ts
│   │   └── ...
│   ├── services/               # Servicii pentru API
│   │   ├── api.service.ts      # Client HTTP de bază
│   │   ├── auth.service.ts
│   │   ├── judete.service.ts
│   │   └── ...
│   ├── store/                  # State management
│   │   ├── auth.store.ts
│   │   ├── judete.store.ts
│   │   └── ...
│   ├── types/                  # Definiții de tipuri
│   │   ├── entities.ts         # Entități
│   │   ├── api.ts              # Tipuri pentru API
│   │   ├── forms.ts            # Tipuri pentru formulare
│   │   └── ...
│   ├── utils/                  # Utilități
│   │   ├── format.ts           # Formatare date
│   │   ├── validation.ts       # Validare
│   │   ├── storage.ts          # Local storage
│   │   └── ...
│   ├── App.tsx                 # Componenta principală
│   ├── main.tsx                # Punct de intrare
│   ├── routes.tsx              # Configurare rute
│   └── i18n.ts                 # Configurare internaționalizare
├── .env                        # Variabile de mediu
├── .env.example                # Exemplu variabile de mediu
├── vite.config.ts              # Configurare Vite
├── tailwind.config.js          # Configurare Tailwind CSS
├── tsconfig.json               # Configurare TypeScript
├── package.json                # Dependențe
└── README.md                   # Documentație
```

### Structura Features

Fiecare feature va urma o structură consistentă:

```
features/[feature-name]/
├── components/             # Componente specifice feature-ului
│   ├── [Feature]List.tsx   # Listare
│   ├── [Feature]Form.tsx   # Formular creare/editare
│   ├── [Feature]Details.tsx # Detalii
│   └── ...
├── hooks/                  # Hooks specifice feature-ului
├── services/               # Servicii API specifice
├── store/                  # State management specific
├── types/                  # Tipuri specifice
├── utils/                  # Utilități specifice
├── pages/                  # Pagini
│   ├── [Feature]ListPage.tsx
│   ├── [Feature]CreatePage.tsx
│   ├── [Feature]EditPage.tsx
│   ├── [Feature]DetailsPage.tsx
│   └── ...
└── index.ts                # Barrel file pentru exporturi
```

### Implementarea State Management cu Zustand

```typescript
// store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthService } from '../services/auth.service';

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;

	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	checkAuth: () => Promise<void>;
	clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			login: async (email, password) => {
				set({ isLoading: true, error: null });
				try {
					const { user, token } = await AuthService.login(email, password);
					set({ user, token, isAuthenticated: true, isLoading: false });
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Eroare de autentificare',
						isLoading: false,
					});
				}
			},

			logout: () => {
				AuthService.logout();
				set({ user: null, token: null, isAuthenticated: false });
			},

			checkAuth: async () => {
				set({ isLoading: true });
				try {
					const { user } = await AuthService.checkAuth();
					set({ user, isAuthenticated: true, isLoading: false });
				} catch (error) {
					set({
						user: null,
						token: null,
						isAuthenticated: false,
						isLoading: false,
					});
				}
			},

			clearError: () => set({ error: null }),
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({ token: state.token }),
		}
	)
);
```

### Implementarea Serviciilor API

```typescript
// services/api.service.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../store/auth.store';

class ApiService {
	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_API_URL,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		this.api.interceptors.request.use(
			(config) => {
				const token = useAuthStore.getState().token;
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		this.api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response?.status === 401) {
					useAuthStore.getState().logout();
				}
				return Promise.reject(error);
			}
		);
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<ApiResponse<T>> = await this.api.get(
			url,
			config
		);
		return this.handleResponse(response);
	}

	async post<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response: AxiosResponse<ApiResponse<T>> = await this.api.post(
			url,
			data,
			config
		);
		return this.handleResponse(response);
	}

	async put<T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response: AxiosResponse<ApiResponse<T>> = await this.api.put(
			url,
			data,
			config
		);
		return this.handleResponse(response);
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<ApiResponse<T>> = await this.api.delete(
			url,
			config
		);
		return this.handleResponse(response);
	}

	private handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
		const { data } = response;
		if (!data.success) {
			throw new Error(data.error?.message || 'A apărut o eroare');
		}
		return data.data as T;
	}
}

export default new ApiService();
```

## Design System

### Paletă de Culori

```typescript
// design-system/tokens.ts
export const colors = {
	// Culori primare
	primary: {
		50: '#e6f7ff',
		100: '#bae7ff',
		200: '#91d5ff',
		300: '#69c0ff',
		400: '#40a9ff',
		500: '#1890ff', // Culoare principală
		600: '#096dd9',
		700: '#0050b3',
		800: '#003a8c',
		900: '#002766',
	},

	// Culori secundare
	secondary: {
		50: '#f0f5ff',
		100: '#d6e4ff',
		200: '#adc6ff',
		300: '#85a5ff',
		400: '#597ef7',
		500: '#2f54eb', // Culoare secundară
		600: '#1d39c4',
		700: '#10239e',
		800: '#061178',
		900: '#030852',
	},

	// Culori neutre
	neutral: {
		50: '#fafafa',
		100: '#f5f5f5',
		200: '#e8e8e8',
		300: '#d9d9d9',
		400: '#bfbfbf',
		500: '#8c8c8c',
		600: '#595959',
		700: '#434343',
		800: '#262626',
		900: '#141414',
	},

	// Culori semantice
	success: {
		50: '#f6ffed',
		100: '#d9f7be',
		200: '#b7eb8f',
		300: '#95de64',
		400: '#73d13d',
		500: '#52c41a', // Success
		600: '#389e0d',
		700: '#237804',
		800: '#135200',
		900: '#092b00',
	},

	warning: {
		50: '#fffbe6',
		100: '#fff1b8',
		200: '#ffe58f',
		300: '#ffd666',
		400: '#ffc53d',
		500: '#faad14', // Warning
		600: '#d48806',
		700: '#ad6800',
		800: '#874d00',
		900: '#613400',
	},

	error: {
		50: '#fff1f0',
		100: '#ffccc7',
		200: '#ffa39e',
		300: '#ff7875',
		400: '#ff4d4f',
		500: '#f5222d', // Error
		600: '#cf1322',
		700: '#a8071a',
		800: '#820014',
		900: '#5c0011',
	},

	info: {
		50: '#e6f7ff',
		100: '#bae7ff',
		200: '#91d5ff',
		300: '#69c0ff',
		400: '#40a9ff',
		500: '#1890ff', // Info
		600: '#096dd9',
		700: '#0050b3',
		800: '#003a8c',
		900: '#002766',
	},
};

// Tipografie
export const typography = {
	fontFamily: {
		base: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
		heading: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
		monospace: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
	},
	fontSize: {
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		md: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '1.875rem', // 30px
		'4xl': '2.25rem', // 36px
		'5xl': '3rem', // 48px
	},
	fontWeight: {
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
	},
	lineHeight: {
		none: 1,
		tight: 1.25,
		normal: 1.5,
		loose: 2,
	},
};

// Spațiere
export const spacing = {
	0: '0',
	1: '0.25rem', // 4px
	2: '0.5rem', // 8px
	3: '0.75rem', // 12px
	4: '1rem', // 16px
	5: '1.25rem', // 20px
	6: '1.5rem', // 24px
	8: '2rem', // 32px
	10: '2.5rem', // 40px
	12: '3rem', // 48px
	16: '4rem', // 64px
	20: '5rem', // 80px
	24: '6rem', // 96px
	32: '8rem', // 128px
	40: '10rem', // 160px
	48: '12rem', // 192px
	56: '14rem', // 224px
	64: '16rem', // 256px
};

// Umbre
export const shadows = {
	sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
	inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
	none: 'none',
};

// Border Radius
export const borderRadius = {
	none: '0',
	sm: '0.125rem', // 2px
	md: '0.25rem', // 4px
	lg: '0.5rem', // 8px
	xl: '0.75rem', // 12px
	'2xl': '1rem', // 16px
	'3xl': '1.5rem', // 24px
	full: '9999px',
};

// Z-Index
export const zIndex = {
	0: 0,
	10: 10,
	20: 20,
	30: 30,
	40: 40,
	50: 50,
	auto: 'auto',
};
```

### Configurare Tailwind CSS

```javascript
// tailwind.config.js
const {
	colors,
	spacing,
	borderRadius,
	typography,
	shadows,
} = require('./src/design-system/tokens');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors,
		spacing,
		borderRadius,
		fontFamily: typography.fontFamily,
		fontSize: typography.fontSize,
		fontWeight: typography.fontWeight,
		lineHeight: typography.lineHeight,
		boxShadow: shadows,
		extend: {
			zIndex: {
				'-1': '-1',
			},
			transitionProperty: {
				height: 'height',
				spacing: 'margin, padding',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
};
```

## DevOps și Infrastructură

### Containerizare

```dockerfile
# backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
```

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - app-network
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${DB_USER} -d ${DB_NAME}']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:alpine
    ports:
      - '6379:6379'
    networks:
      - app-network
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - '5672:5672'
      - '15672:15672'
    networks:
      - app-network
    healthcheck:
      test: ['CMD', 'rabbitmqctl', 'status']
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      RABBITMQ_HOST: rabbitmq
      RABBITMQ_PORT: 5672
      JWT_SECRET: ${JWT_SECRET}
      PORT: 3000
    ports:
      - '3000:3000'
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - '80:80'
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
```

### Kubernetes

```yaml
# k8s/backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  labels:
    app: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: ${DOCKER_REGISTRY}/backend:${VERSION}
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DB_HOST
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: db_host
            - name: DB_PORT
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: db_port
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: db_user
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: db_password
            - name: DB_NAME
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: db_name
            - name: REDIS_HOST
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: redis_host
            - name: REDIS_PORT
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: redis_port
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: jwt_secret
          resources:
            limits:
              cpu: '500m'
              memory: '512Mi'
            requests:
              cpu: '100m'
              memory: '256Mi'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
```

## Planificare și Etapizare

### Faza 1: Configurare și Setup (2-3 săptămâni)

1. Configurare repository Git
2. Setup proiect backend (NestJS)
3. Setup proiect frontend (React + Vite)
4. Configurare bază de date
5. Configurare Docker și Docker Compose
6. Configurare CI/CD (GitHub Actions)

### Faza 2: Implementare Core și Autentificare (3-4 săptămâni)

1. Implementare schema bază de date
2. Implementare autentificare și autorizare
3. Implementare gestionare utilizatori și roluri
4. Implementare layout principal frontend
5. Implementare componente UI de bază

### Faza 3: Implementare Module de Bază (4-6 săptămâni)

1. Implementare module geografice

   - Modul Județe
   - Modul Localități
   - Modul UAT-uri

2. Implementare module entități

   - Modul Clienți
   - Modul Puncte de Colectare
   - Modul Operatori

3. Implementare module operaționale
   - Modul Categorii Deșeuri
   - Modul Servicii
   - Modul Colectări

### Faza 4: Implementare Module Complexe (4-6 săptămâni)

1. Implementare modul Autospeciale

   - Gestionare autospeciale (CRUD)
   - Gestionare șoferi (CRUD)
   - Programări și planificare rute
   - Înregistrare colectări
   - Raportare și monitorizare activitate

2. Implementare module Contracte și Prețuri

   - Gestionare contracte (CRUD)
   - Gestionare liste de prețuri (CRUD)
   - Asociere contracte-prețuri
   - Asociere contracte-puncte de colectare
   - Gestionare termene și condiții

3. Implementare modul Facturare

   - Generare automată facturi
   - Gestionare facturi (CRUD)
   - Înregistrare plăți
   - Rapoarte de facturare
   - Notificări scadențe

4. Implementare modul Rapoarte

   - Rapoarte operaționale
   - Rapoarte de conformitate
   - Rapoarte financiare
   - Export date (PDF, Excel)
   - Import date

5. Implementare dashboard și statistici
   - Dashboard operațional
   - Dashboard financiar
   - Dashboard management
   - Vizualizări interactive
   - Filtre și segmentare date

### Faza 5: Implementare Gestionare Documente (2-3 săptămâni)

1. Implementare infrastructură stocare documente

   - Configurare stocare S3/MinIO
   - Implementare serviciu de upload/download
   - Configurare procesare asincronă

2. Implementare modul gestionare documente

   - Gestionare tipuri documente
   - Upload și validare documente
   - Asociere documente cu entități
   - Versionare documente

3. Implementare procesare documente

   - Extragere text din documente (OCR)
   - Extragere metadate
   - Indexare pentru căutare full-text
   - Generare miniaturi pentru previzualizare

4. Implementare interfață utilizator
   - Componente pentru upload documente
   - Vizualizare și previzualizare documente
   - Căutare și filtrare documente
   - Gestionare asocieri documente

### Faza 6: Implementare Analiză Date și Machine Learning (4-6 săptămâni)

1. Configurare infrastructură ML

   - Setup microserviciu Python
   - Integrare cu NestJS
   - Configurare stocare modele
   - Implementare API pentru predicții

2. Implementare colectare și procesare date

   - ETL pentru date istorice
   - Integrare cu surse externe (meteo, evenimente)
   - Preprocesare și curățare date
   - Extragere features din documente

3. Dezvoltare modele predictive pentru cantități

   - Modele de predicție cantități deșeuri pe client/UAT
   - Modele de predicție sezoniere
   - Modele de optimizare rute
   - Modele de identificare anomalii

4. Dezvoltare modele predictive financiare

   - Modele de predicție valori facturate
   - Modele de predicție încasări
   - Analiză profitabilitate pe client/zonă
   - Optimizare prețuri

5. Implementare vizualizări avansate
   - Grafice de evoluție și tendințe
   - Hărți de densitate
   - Comparații și analize comparative
   - Scenarii "what-if" și simulări

### Faza 7: Optimizare și Finalizare (3-4 săptămâni)

1. Optimizare performanță

   - Optimizare interogări bază de date
   - Optimizare rendering frontend
   - Optimizare modele ML
   - Implementare caching

2. Implementare teste comprehensive

   - Teste unitare
   - Teste de integrare
   - Teste end-to-end
   - Teste de performanță

3. Implementare documentație

   - Documentație API
   - Documentație utilizator
   - Documentație tehnică
   - Documentație modele ML

4. Deployment în producție
   - Configurare infrastructură
   - Migrare date
   - Testare în producție
   - Go-live

### Faza 8: Monitorizare și Îmbunătățiri (Continuu)

1. Configurare monitorizare și logging

   - Monitorizare performanță
   - Monitorizare erori
   - Monitorizare utilizare
   - Alerte și notificări

2. Analiza feedback-ului utilizatorilor

   - Colectare feedback
   - Analiza comportamentului utilizatorilor
   - Identificare puncte de îmbunătățire

3. Îmbunătățirea modelelor ML

   - Reantrenare periodică
   - Evaluare performanță
   - Implementare modele noi
   - Optimizare parametri

4. Scalare infrastructură după necesități
   - Monitorizare încărcare
   - Scalare orizontală/verticală
   - Optimizare costuri
   - Backup și disaster recovery
