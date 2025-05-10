# Checklist Detaliat - Faza 5: Implementare Gestionare Documente

## Legendă

- Nivel de dificultate: 🟢 Ușor | 🟡 Mediu | 🔴 Dificil
- Status: ⬜ Neînceput | 🟨 În progres | ✅ Finalizat

## 5.1 Implementare Infrastructură Stocare Documente (8 zile)

### 5.1.1 Configurare stocare S3/MinIO (backend) 🟡 (2 zile)

- [ ] Instalare și configurare MinIO
  - [ ] Configurare server MinIO
  - [ ] Configurare bucket-uri pentru diferite tipuri de documente
  - [ ] Configurare politici de acces
  - [ ] Configurare retenție și lifecycle
- [ ] Implementare client S3 în aplicație
  - [ ] Configurare conexiune
  - [ ] Implementare operațiuni de bază (upload, download, delete)
  - [ ] Configurare semnare URL-uri pentru acces temporar
  - [ ] Implementare gestionare erori
- [ ] Configurare securitate
  - [ ] Configurare criptare
  - [ ] Configurare CORS
  - [ ] Configurare politici de acces granular
- [ ] Implementare teste unitare și de integrare

### 5.1.2 Implementare serviciu de upload/download (backend) 🟡 (2 zile)

- [ ] Implementare service pentru upload
  - [ ] Validare fișiere (dimensiune, tip, conținut)
  - [ ] Generare nume unice pentru fișiere
  - [ ] Implementare upload multi-part pentru fișiere mari
  - [ ] Implementare progres upload
- [ ] Implementare service pentru download
  - [ ] Generare URL-uri semnate pentru download
  - [ ] Implementare streaming pentru fișiere mari
  - [ ] Implementare download parțial (range requests)
  - [ ] Implementare caching
- [ ] Implementare controller pentru upload/download
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Gestionare erori
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 5.1.3 Implementare gestionare bucket-uri și foldere 🟡 (1 zi)

- [ ] Implementare service pentru gestionare bucket-uri
  - [ ] Creare/ștergere bucket-uri
  - [ ] Configurare politici bucket
  - [ ] Listare bucket-uri
- [ ] Implementare service pentru gestionare foldere
  - [ ] Creare structură de foldere
  - [ ] Listare conținut folder
  - [ ] Mutare/redenumire foldere
- [ ] Implementare controller pentru gestionare bucket-uri și foldere
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 5.1.4 Configurare procesare asincronă 🟡 (2 zile)

- [ ] Implementare coadă de mesaje pentru procesare asincronă
  - [ ] Configurare RabbitMQ/Redis pentru coadă
  - [ ] Implementare producer pentru trimitere task-uri
  - [ ] Implementare consumer pentru procesare task-uri
- [ ] Implementare worker pentru procesare fișiere
  - [ ] Configurare pool de workeri
  - [ ] Implementare logică de procesare
  - [ ] Implementare retry pentru task-uri eșuate
- [ ] Implementare monitorizare și logging
  - [ ] Logging detaliat pentru fiecare etapă
  - [ ] Monitorizare stare coadă
  - [ ] Alertare pentru erori
- [ ] Implementare teste unitare și de integrare

### 5.1.5 Implementare securitate și permisiuni acces 🔴 (2 zile)

- [ ] Implementare model de permisiuni pentru documente
  - [ ] Definire roluri și permisiuni
  - [ ] Implementare ACL (Access Control List)
  - [ ] Implementare permisiuni la nivel de document
- [ ] Implementare service pentru verificare permisiuni
  - [ ] Verificare permisiuni la upload/download
  - [ ] Verificare permisiuni la modificare/ștergere
  - [ ] Caching permisiuni pentru performanță
- [ ] Implementare audit trail
  - [ ] Logging acțiuni pe documente
  - [ ] Stocare istoric modificări
  - [ ] Raportare acces
- [ ] Implementare teste unitare și de integrare

### 5.1.6 Testare și validare infrastructură stocare 🟡 (1 zi)

- [ ] Testare funcționalitate de bază
  - [ ] Upload/download fișiere
  - [ ] Creare/ștergere bucket-uri și foldere
  - [ ] Listare conținut
- [ ] Testare procesare asincronă
  - [ ] Verificare funcționare coadă
  - [ ] Verificare procesare task-uri
  - [ ] Verificare retry și gestionare erori
- [ ] Testare securitate
  - [ ] Verificare permisiuni
  - [ ] Verificare criptare
  - [ ] Verificare URL-uri semnate
- [ ] Testare performanță
  - [ ] Testare upload/download fișiere mari
  - [ ] Testare concurență
  - [ ] Testare scalabilitate
- [ ] Rezolvare bug-uri și optimizări

## 5.2 Implementare Modul Gestionare Documente (8 zile)

### 5.2.1 Implementare CRUD pentru tipuri documente (backend) 🟡 (1 zi)

- [ ] Creare DTO-uri pentru tipuri documente
  - [ ] CreateTipDocumentDto
  - [ ] UpdateTipDocumentDto
  - [ ] TipDocumentResponseDto
- [ ] Implementare service pentru tipuri documente
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Configurare extensii permise și dimensiune maximă
- [ ] Implementare controller pentru tipuri documente
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 5.2.2 Implementare CRUD pentru tipuri documente (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru tipuri documente
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru tipuri documente
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare tipuri documente
  - [ ] Tabel cu tipuri documente
  - [ ] Filtrare și sortare
  - [ ] Paginare
- [ ] Implementare formular creare/editare tip document
  - [ ] Validare formular
  - [ ] Configurare extensii permise
  - [ ] Configurare dimensiune maximă
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii tip document
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 5.2.3 Implementare upload și validare documente (backend) 🟡 (2 zile)

- [ ] Creare DTO-uri pentru documente
  - [ ] UploadDocumentDto
  - [ ] DocumentResponseDto
- [ ] Implementare service pentru documente
  - [ ] Upload document
  - [ ] Validare conform tip document
  - [ ] Generare metadate (dimensiune, hash, etc.)
  - [ ] Stocare informații în baza de date
- [ ] Implementare validări
  - [ ] Validare extensie
  - [ ] Validare dimensiune
  - [ ] Validare conținut (opțional)
  - [ ] Scanare antivirus (opțional)
- [ ] Implementare controller pentru documente
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 5.2.4 Implementare upload și validare documente (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru documente
  - [ ] Metode pentru upload
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru documente
  - [ ] State management
  - [ ] Acțiuni pentru upload
- [ ] Implementare componenta upload
  - [ ] Drag & drop
  - [ ] Selecție fișiere
  - [ ] Validare client-side
  - [ ] Progres upload
  - [ ] Gestionare erori
- [ ] Implementare pagină listare documente
  - [ ] Tabel cu documente
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după tip document
- [ ] Implementare pagină detalii document
  - [ ] Afișare informații
  - [ ] Previzualizare document
  - [ ] Acțiuni (descărcare, ștergere)
- [ ] Implementare teste componente

### 5.2.5 Implementare asociere documente cu entități (backend) 🟡 (2 zile)

- [ ] Creare DTO-uri pentru asociere
  - [ ] AsociereDocumentDto
- [ ] Implementare service pentru asociere
  - [ ] Asociere document cu diferite entități (contract, factură, etc.)
  - [ ] Dezasociere document
  - [ ] Listare documente asociate cu o entitate
  - [ ] Listare entități asociate cu un document
- [ ] Implementare controller pentru asociere
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Extindere controllere existente
  - [ ] Endpoint-uri pentru documente în controllere entități
  - [ ] Includere documente în răspunsuri
- [ ] Implementare teste unitare și de integrare

### 5.2.6 Implementare asociere documente cu entități (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru asociere
  - [ ] Metode pentru asociere/dezasociere
  - [ ] Gestionare erori
- [ ] Extindere store-uri Zustand existente
  - [ ] Acțiuni pentru asociere/dezasociere documente
- [ ] Implementare componenta pentru asociere documente
  - [ ] Selector documente
  - [ ] Selector tip asociere
  - [ ] Acțiuni (asociere, dezasociere)
- [ ] Integrare în paginile de detalii entități
  - [ ] Afișare documente asociate
  - [ ] Acțiuni pentru documente
  - [ ] Upload direct din pagina entității
- [ ] Implementare componenta pentru listare documente asociate
  - [ ] Tabel cu documente
  - [ ] Acțiuni (descărcare, previzualizare, dezasociere)
- [ ] Implementare teste componente

### 5.2.7 Implementare versionare documente 🔴 (3 zile)

- [ ] Implementare model de versionare
  - [ ] Stocare versiuni multiple pentru același document
  - [ ] Tracking modificări între versiuni
  - [ ] Gestionare versiune curentă/activă
- [ ] Implementare service pentru versionare
  - [ ] Creare versiune nouă
  - [ ] Listare versiuni
  - [ ] Setare versiune activă
  - [ ] Comparare versiuni
- [ ] Implementare controller pentru versionare
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare interfață pentru versionare
  - [ ] Afișare istoric versiuni
  - [ ] Upload versiune nouă
  - [ ] Comparare versiuni
  - [ ] Setare versiune activă
- [ ] Implementare teste unitare și de integrare

### 5.2.8 Testare și validare modul gestionare documente 🟡 (1 zi)

- [ ] Testare end-to-end pentru tipuri documente
- [ ] Testare end-to-end pentru upload/download documente
- [ ] Testare end-to-end pentru asociere documente
- [ ] Testare end-to-end pentru versionare
- [ ] Testare validări și business rules
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 5.3 Implementare Procesare Documente (9 zile)

### 5.3.1 Implementare extragere text din documente (OCR) 🔴 (3 zile)

- [ ] Configurare serviciu OCR
  - [ ] Instalare și configurare Tesseract OCR
  - [ ] Configurare limbă română
  - [ ] Configurare parametri OCR pentru optimizare
- [ ] Implementare service pentru procesare OCR
  - [ ] Procesare imagini (JPG, PNG, TIFF)
  - [ ] Procesare PDF-uri
  - [ ] Extragere text din zone specifice (opțional)
  - [ ] Îmbunătățire calitate imagine înainte de OCR
- [ ] Implementare procesare asincronă
  - [ ] Adăugare în coadă pentru procesare
  - [ ] Notificare la finalizare procesare
  - [ ] Gestionare erori și retry
- [ ] Implementare stocare și indexare text extras
  - [ ] Stocare text în baza de date
  - [ ] Indexare pentru căutare full-text
- [ ] Implementare teste unitare și de integrare

### 5.3.2 Implementare extragere metadate 🟡 (2 zile)

- [ ] Implementare extragere metadate din documente
  - [ ] Metadate din PDF (autor, titlu, cuvinte cheie, etc.)
  - [ ] Metadate din documente Office (Word, Excel, etc.)
  - [ ] Metadate din imagini (EXIF, etc.)
- [ ] Implementare extragere informații structurate
  - [ ] Identificare date (dată emitere, scadență, etc.)
  - [ ] Identificare sume și valori
  - [ ] Identificare entități (nume companii, persoane, etc.)
- [ ] Implementare procesare asincronă
  - [ ] Adăugare în coadă pentru procesare
  - [ ] Notificare la finalizare procesare
  - [ ] Gestionare erori și retry
- [ ] Implementare stocare metadate
  - [ ] Stocare în format JSON în baza de date
  - [ ] Indexare pentru căutare
- [ ] Implementare teste unitare și de integrare

### 5.3.3 Implementare indexare pentru căutare full-text 🔴 (3 zile)

- [ ] Configurare motor de căutare full-text
  - [ ] Configurare PostgreSQL full-text search
  - [ ] Configurare dicționare și stopwords pentru limba română
  - [ ] Configurare indexare și ranking
- [ ] Implementare service pentru indexare
  - [ ] Indexare text extras din documente
  - [ ] Indexare metadate
  - [ ] Actualizare index la modificare document
- [ ] Implementare service pentru căutare
  - [ ] Căutare full-text în documente
  - [ ] Căutare în metadate
  - [ ] Filtrare rezultate după permisiuni
  - [ ] Ranking și sortare rezultate
- [ ] Implementare controller pentru căutare
  - [ ] Endpoint-uri REST
  - [ ] Parametri de căutare și filtrare
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 5.3.4 Implementare generare miniaturi pentru previzualizare 🟡 (2 zile)

- [ ] Implementare service pentru generare miniaturi
  - [ ] Generare miniaturi pentru imagini
  - [ ] Generare miniaturi pentru PDF-uri
  - [ ] Generare miniaturi pentru documente Office
- [ ] Implementare procesare asincronă
  - [ ] Adăugare în coadă pentru procesare
  - [ ] Notificare la finalizare procesare
  - [ ] Gestionare erori și retry
- [ ] Implementare stocare miniaturi
  - [ ] Stocare în S3/MinIO
  - [ ] Generare URL-uri pentru acces
- [ ] Implementare controller pentru miniaturi
  - [ ] Endpoint-uri REST pentru obținere miniaturi
  - [ ] Caching pentru performanță
- [ ] Implementare teste unitare și de integrare

### 5.3.5 Testare și validare procesare documente 🟡 (1 zi)

- [ ] Testare OCR
  - [ ] Testare pe diferite tipuri de documente
  - [ ] Testare acuratețe
  - [ ] Testare performanță
- [ ] Testare extragere metadate
  - [ ] Testare pe diferite tipuri de documente
  - [ ] Testare acuratețe
- [ ] Testare căutare full-text
  - [ ] Testare diferite tipuri de căutări
  - [ ] Testare relevență rezultate
  - [ ] Testare performanță
- [ ] Testare generare miniaturi
  - [ ] Testare pe diferite tipuri de documente
  - [ ] Testare calitate miniaturi
- [ ] Rezolvare bug-uri și optimizări

## 5.4 Implementare Interfață Utilizator pentru Documente (9 zile)

### 5.4.1 Implementare componente pentru upload documente 🟡 (2 zile)

- [ ] Implementare componentă drag & drop
  - [ ] Suport pentru multiple fișiere
  - [ ] Validare client-side
  - [ ] Feedback vizual
- [ ] Implementare componentă selecție fișiere
  - [ ] Suport pentru multiple fișiere
  - [ ] Filtrare după tip fișier
- [ ] Implementare componentă progres upload
  - [ ] Afișare progres individual pentru fiecare fișier
  - [ ] Afișare progres total
  - [ ] Acțiuni (pauză, anulare)
- [ ] Implementare componentă rezultat upload
  - [ ] Afișare status pentru fiecare fișier
  - [ ] Afișare erori
  - [ ] Acțiuni post-upload
- [ ] Implementare teste componente

### 5.4.2 Implementare vizualizare și previzualizare documente 🟡 (2 zile)

- [ ] Implementare componentă previzualizare imagini
  - [ ] Zoom in/out
  - [ ] Pan
  - [ ] Rotire
- [ ] Implementare componentă previzualizare PDF
  - [ ] Navigare pagini
  - [ ] Zoom in/out
  - [ ] Căutare în text
- [ ] Implementare componentă previzualizare documente Office
  - [ ] Integrare cu serviciu de previzualizare
  - [ ] Navigare pagini
- [ ] Implementare componentă previzualizare miniaturi
  - [ ] Grid de miniaturi
  - [ ] Selecție document pentru previzualizare completă
- [ ] Implementare teste componente

### 5.4.3 Implementare căutare și filtrare documente 🟡 (2 zile)

- [ ] Implementare componentă căutare
  - [ ] Input căutare cu sugestii
  - [ ] Căutare avansată
  - [ ] Highlight rezultate
- [ ] Implementare filtre
  - [ ] Filtrare după tip document
  - [ ] Filtrare după dată
  - [ ] Filtrare după entitate asociată
  - [ ] Filtrare după metadate
- [ ] Implementare rezultate căutare
  - [ ] Afișare rezultate cu highlight
  - [ ] Sortare rezultate
  - [ ] Paginare rezultate
- [ ] Implementare salvare căutări favorite
  - [ ] Salvare configurație căutare
  - [ ] Încărcare căutare salvată
- [ ] Implementare teste componente

### 5.4.4 Implementare gestionare asocieri documente 🟡 (2 zile)

- [ ] Implementare componentă asociere documente
  - [ ] Selector entitate
  - [ ] Selector tip asociere
  - [ ] Acțiuni (asociere, dezasociere)
- [ ] Implementare componentă listare asocieri
  - [ ] Afișare entități asociate cu un document
  - [ ] Acțiuni pentru asocieri
- [ ] Integrare în paginile de detalii entități
  - [ ] Tab documente în paginile de detalii
  - [ ] Acțiuni pentru documente
- [ ] Implementare componenta pentru upload direct în entitate
  - [ ] Upload și asociere într-un singur pas
  - [ ] Validare și feedback
- [ ] Implementare teste componente

### 5.4.5 Testare și validare interfață utilizator 🟡 (1 zi)

- [ ] Testare componente upload
  - [ ] Testare drag & drop
  - [ ] Testare selecție fișiere
  - [ ] Testare progres și rezultat
- [ ] Testare previzualizare
  - [ ] Testare pe diferite tipuri de documente
  - [ ] Testare funcționalități (zoom, navigare)
- [ ] Testare căutare și filtrare
  - [ ] Testare diferite tipuri de căutări
  - [ ] Testare filtre
  - [ ] Testare salvare căutări
- [ ] Testare asocieri
  - [ ] Testare asociere/dezasociere
  - [ ] Testare integrare în pagini entități
- [ ] Testare usability
  - [ ] Testare experiență utilizator
  - [ ] Testare accesibilitate
- [ ] Rezolvare bug-uri și optimizări
