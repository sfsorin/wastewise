# Checklist Detaliat - Faza 2: Implementare Core și Autentificare

## Legendă

- Nivel de dificultate: 🟢 Ușor | 🟡 Mediu | 🔴 Dificil
- Status: ⬜ Neînceput | 🟨 În progres | ✅ Finalizat

## 2.1 Implementare Schema Bază de Date (8 zile)

### 2.1.1 Creare entități pentru utilizatori și roluri 🟡 (1 zi) ✅

- [x] Creare entitate User
  - [x] Definire proprietăți (id, email, password_hash, etc.)
  - [x] Configurare indexuri și validări
  - [x] Implementare hooks (beforeInsert, etc.)
- [x] Creare entitate Role
  - [x] Definire proprietăți (id, name, description, etc.)
  - [x] Configurare relație many-to-many cu User
- [x] Creare entitate Permission
  - [x] Definire proprietăți (id, name, description, etc.)
  - [x] Configurare relație many-to-many cu Role
- [x] Testare relații și CRUD

### 2.1.2 Creare entități pentru județe și localități 🟡 (1 zi) ✅

- [x] Creare entitate Judet
  - [x] Definire proprietăți (id, nume, cod, etc.)
  - [x] Configurare indexuri și validări
- [x] Creare entitate Localitate
  - [x] Definire proprietăți (id, nume, tip, cod_postal, etc.)
  - [x] Configurare relație many-to-one cu Judet
  - [x] Configurare indexuri și validări
- [x] Implementare repository pentru Judet
- [x] Implementare repository pentru Localitate
- [x] Testare relații și CRUD

### 2.1.3 Creare entități pentru UAT-uri 🟡 (1 zi) ✅

- [x] Creare entitate UAT
  - [x] Definire proprietăți (id, codSiruta, nume, strada, numar, telefon, telefon secundar, E-mail, E-mail secundar, Cod fiscal, etc.)
  - [x] Configurare relație many-to-one cu Judet
  - [x] Configurare relație many-to-one cu Localitate
  - [x] Configurare indexuri și validări
- [x] Implementare repository pentru UAT
- [x] Testare relații și CRUD

### 2.1.4 Creare entități pentru clienți 🟡 (1 zi) ✅

- [x] Creare entitate TipClient
  - [x] Definire proprietăți (id, nume, descriere, etc.)
- [x] Creare entitate Client
  - [x] Definire proprietăți (id, nume, cui, cnp, adresa, etc.)
  - [x] Configurare relație many-to-one cu TipClient
  - [x] Configurare relație many-to-one cu Judet și Localitate
  - [x] Configurare indexuri și validări
- [x] Creare entitate PunctColectare
  - [x] Definire proprietăți (id, nume, adresa, coordonate, etc.)
  - [x] Configurare relație many-to-one cu Client
  - [x] Configurare relație many-to-one cu Judet și Localitate
- [x] Implementare repository pentru Client și PunctColectare
- [x] Testare relații și CRUD

### 2.1.5 Creare entități pentru categorii deșeuri 🟡 (1 zi) ✅

- [x] Creare entitate CategorieDeseu
  - [x] Definire proprietăți (id, nume, cod, descriere, etc.)
  - [x] Configurare indexuri și validări
- [x] Creare entitate Serviciu
  - [x] Definire proprietăți (id, nume, descriere, etc.)
  - [x] Configurare relație many-to-one cu CategorieDeseu
- [x] Implementare repository pentru CategorieDeseu și Serviciu
- [x] Testare relații și CRUD

### 2.1.6 Creare entități pentru zone ADI și zone Iridex 🟡 (1 zi) ✅

- [x] Creare entitate ZonaADI
  - [x] Definire proprietăți (id, nume, cod, descriere, etc.)
  - [x] Configurare indexuri și validări
- [x] Creare entitate ZonaIridex
  - [x] Definire proprietăți (id, nume, cod, descriere, etc.)
  - [x] Configurare indexuri și validări
- [x] Actualizare entitate UAT
  - [x] Adăugare relație many-to-one cu ZonaADI
  - [x] Adăugare relație many-to-one cu ZonaIridex
  - [x] Configurare restricții pentru unicitatea relațiilor
- [x] Implementare repository pentru ZonaADI și ZonaIridex
- [x] Testare relații și CRUD

### 2.1.7 Configurare relații între entități 🔴 (2 zile) ✅

- [x] Configurare relații one-to-many
  - [x] Judet -> Localitate
  - [x] Judet -> UAT
  - [x] Client -> PunctColectare
  - [x] ZonaADI -> UAT
  - [x] ZonaIridex -> UAT
- [x] Configurare relații many-to-many
  - [x] User <-> Role
  - [x] Role <-> Permission
- [x] Configurare cascade operations
- [x] Configurare lazy/eager loading
- [x] Testare relații complexe

### 2.1.8 Creare migrări pentru schema inițială 🟡 (1 zi) ✅

- [x] Configurare TypeORM migrations
- [x] Generare migrare inițială
- [x] Implementare migrare pentru date de bază (seed)
- [x] Testare migrare up/down
- [x] Documentare proces de migrare

### 2.1.9 Testare și validare schema 🟡 (1 zi) 🟨

- [ ] Creare teste pentru entități
- [ ] Creare teste pentru relații
- [ ] Creare teste pentru repository-uri
- [ ] Testare performanță query-uri
- [ ] Optimizare indexuri și relații

## 2.2 Implementare Autentificare și Autorizare (7 zile)

### 2.2.1 Implementare înregistrare utilizatori 🟡 (1 zi)

- [ ] Creare DTO pentru înregistrare
- [ ] Implementare validare date înregistrare
- [ ] Implementare service pentru înregistrare
- [ ] Implementare controller pentru înregistrare
- [ ] Implementare hash parole
- [ ] Implementare confirmare email (opțional)
- [ ] Testare funcționalitate

### 2.2.2 Implementare autentificare cu JWT 🟡 (1 zi)

- [ ] Configurare JWT module
- [ ] Creare DTO pentru autentificare
- [ ] Implementare service pentru autentificare
- [ ] Implementare controller pentru autentificare
- [ ] Implementare verificare parole
- [ ] Implementare generare token JWT
- [ ] Testare funcționalitate

### 2.2.3 Implementare refresh token 🟡 (1 zi)

- [ ] Creare entitate RefreshToken
- [ ] Implementare generare refresh token
- [ ] Implementare validare refresh token
- [ ] Implementare regenerare access token
- [ ] Implementare invalidare token
- [ ] Testare funcționalitate

### 2.2.4 Implementare recuperare parolă 🟡 (1 zi)

- [ ] Creare DTO pentru recuperare parolă
- [ ] Implementare generare token unic
- [ ] Implementare trimitere email cu link recuperare
- [ ] Implementare validare token recuperare
- [ ] Implementare resetare parolă
- [ ] Testare funcționalitate

### 2.2.5 Implementare RBAC (Role-Based Access Control) 🔴 (2 zile)

- [ ] Implementare decorator pentru roluri
- [ ] Implementare guard pentru verificare roluri
- [ ] Implementare service pentru gestionare permisiuni
- [ ] Implementare verificare permisiuni dinamice
- [ ] Implementare cache pentru permisiuni
- [ ] Testare funcționalitate cu diferite roluri

### 2.2.6 Implementare guards și decoratori pentru autorizare 🟡 (1 zi)

- [ ] Implementare JwtAuthGuard
- [ ] Implementare RolesGuard
- [ ] Implementare PermissionsGuard
- [ ] Implementare decorator Roles
- [ ] Implementare decorator Permissions
- [ ] Implementare decorator Public
- [ ] Testare guards și decoratori

### 2.2.7 Testare și securizare autentificare 🔴 (2 zile)

- [ ] Implementare rate limiting
- [ ] Implementare protecție CSRF
- [ ] Implementare validare token JWT
- [ ] Implementare logging pentru autentificare
- [ ] Implementare detecție activitate suspectă
- [ ] Testare securitate
- [ ] Audit vulnerabilități

## 2.3 Implementare Gestionare Utilizatori și Roluri (5 zile)

### 2.3.1 Implementare CRUD pentru utilizatori 🟡 (1 zi)

- [ ] Creare DTO-uri pentru utilizatori (create, update, response)
- [ ] Implementare service pentru utilizatori
- [ ] Implementare controller pentru utilizatori
- [ ] Implementare validare date utilizatori
- [ ] Implementare paginare și filtrare
- [ ] Testare funcționalitate

### 2.3.2 Implementare CRUD pentru roluri 🟡 (1 zi)

- [ ] Creare DTO-uri pentru roluri (create, update, response)
- [ ] Implementare service pentru roluri
- [ ] Implementare controller pentru roluri
- [ ] Implementare validare date roluri
- [ ] Implementare paginare și filtrare
- [ ] Testare funcționalitate

### 2.3.3 Implementare asignare roluri utilizatorilor 🟡 (1 zi)

- [ ] Creare DTO pentru asignare roluri
- [ ] Implementare service pentru asignare roluri
- [ ] Implementare controller pentru asignare roluri
- [ ] Implementare validare asignare roluri
- [ ] Implementare revocare roluri
- [ ] Testare funcționalitate

### 2.3.4 Implementare gestionare permisiuni 🟡 (1 zi)

- [ ] Creare DTO-uri pentru permisiuni (create, update, response)
- [ ] Implementare service pentru permisiuni
- [ ] Implementare controller pentru permisiuni
- [ ] Implementare asignare permisiuni la roluri
- [ ] Implementare verificare permisiuni
- [ ] Testare funcționalitate

### 2.3.5 Implementare interfață administrare utilizatori 🟡 (2 zile)

- [ ] Creare componente pentru listare utilizatori
- [ ] Creare componente pentru creare/editare utilizatori
- [ ] Creare componente pentru gestionare roluri
- [ ] Creare componente pentru gestionare permisiuni
- [ ] Implementare filtrare și paginare
- [ ] Implementare validare formulare
- [ ] Testare interfață

### 2.3.6 Testare și validare funcționalități 🟡 (1 zi)

- [ ] Creare teste pentru servicii
- [ ] Creare teste pentru controllere
- [ ] Creare teste pentru componente frontend
- [ ] Testare end-to-end
- [ ] Optimizare performanță

## 2.4 Implementare Layout Principal Frontend (8 zile)

### 2.4.1 Creare componente layout (Header, Sidebar, Footer) 🟡 (2 zile)

- [ ] Implementare Header
  - [ ] Logo și branding
  - [ ] Meniu principal
  - [ ] Dropdown utilizator
  - [ ] Notificări
  - [ ] Căutare globală
- [ ] Implementare Sidebar
  - [ ] Meniu navigare
  - [ ] Submeniuri
  - [ ] Stare colapsată/expandată
  - [ ] Highlight item activ
- [ ] Implementare Footer
  - [ ] Informații copyright
  - [ ] Links utile
  - [ ] Versiune aplicație
- [ ] Testare componente

### 2.4.2 Implementare navigare și meniu 🟡 (1 zi)

- [ ] Definire structură meniu
- [ ] Implementare generare dinamică meniu bazată pe permisiuni
- [ ] Implementare navigare între pagini
- [ ] Implementare breadcrumbs
- [ ] Implementare highlight item activ
- [ ] Testare navigare

### 2.4.3 Implementare responsive design 🟡 (2 zile)

- [ ] Implementare layout responsive
- [ ] Implementare sidebar colapsabil pe mobile
- [ ] Implementare meniu hamburger pe mobile
- [ ] Implementare adaptare conținut la diferite dimensiuni de ecran
- [ ] Testare pe diferite dispozitive și rezoluții

### 2.4.4 Implementare teme (light/dark) 🟡 (1 zi)

- [ ] Configurare variabile CSS pentru teme
- [ ] Implementare comutator temă
- [ ] Implementare persistență preferință temă
- [ ] Implementare detecție automată temă sistem
- [ ] Testare teme

### 2.4.5 Implementare context pentru autentificare 🟡 (1 zi)

- [ ] Creare AuthContext
- [ ] Implementare provider pentru AuthContext
- [ ] Implementare hook useAuth
- [ ] Implementare funcții pentru login/logout
- [ ] Implementare persistență sesiune
- [ ] Testare context

### 2.4.6 Implementare rute protejate 🟡 (1 zi)

- [ ] Creare componenta ProtectedRoute
- [ ] Implementare verificare autentificare
- [ ] Implementare verificare permisiuni
- [ ] Implementare redirect la login
- [ ] Implementare salvare rută inițială pentru redirect după login
- [ ] Testare rute protejate

## 2.5 Implementare Componente UI de Bază (9 zile)

### 2.5.1 Creare componente Button, Input, Select 🟡 (1 zi)

- [ ] Implementare Button
  - [ ] Variante (primary, secondary, outline, etc.)
  - [ ] Dimensiuni (sm, md, lg)
  - [ ] Stări (loading, disabled)
  - [ ] Iconuri
- [ ] Implementare Input
  - [ ] Variante (text, password, number, etc.)
  - [ ] Validare și erori
  - [ ] Iconuri și adornments
  - [ ] Stări (focus, error, disabled)
- [ ] Implementare Select
  - [ ] Single și multiple select
  - [ ] Opțiuni cu iconuri
  - [ ] Căutare
  - [ ] Grupare opțiuni
- [ ] Testare componente

### 2.5.2 Creare componente Modal, Tooltip, Dropdown 🟡 (1 zi)

- [ ] Implementare Modal
  - [ ] Header, body, footer
  - [ ] Dimensiuni
  - [ ] Animații
  - [ ] Închidere cu ESC și click outside
- [ ] Implementare Tooltip
  - [ ] Poziționare (top, right, bottom, left)
  - [ ] Trigger (hover, click, focus)
  - [ ] Conținut rich (text, HTML)
- [ ] Implementare Dropdown
  - [ ] Items și submenus
  - [ ] Poziționare
  - [ ] Keyboard navigation
- [ ] Testare componente

### 2.5.3 Creare componente Card, Table, Pagination 🟡 (2 zile)

- [ ] Implementare Card
  - [ ] Header, body, footer
  - [ ] Variante și stiluri
  - [ ] Acțiuni
- [ ] Implementare Table
  - [ ] Header și coloane configurabile
  - [ ] Sortare
  - [ ] Filtrare
  - [ ] Selecție rânduri
  - [ ] Expandable rows
  - [ ] Sticky header
- [ ] Implementare Pagination
  - [ ] Navigare pagini
  - [ ] Items per page
  - [ ] Informații paginare
- [ ] Testare componente

### 2.5.4 Creare componente Form și validare 🟡 (2 zile)

- [ ] Implementare Form
  - [ ] Layout (vertical, horizontal, inline)
  - [ ] Grupare câmpuri
  - [ ] Validare la submit
- [ ] Implementare FormField
  - [ ] Label și helper text
  - [ ] Validare și erori
  - [ ] Required indicator
- [ ] Implementare integrare cu React Hook Form
- [ ] Implementare validare cu Zod
- [ ] Implementare componente specifice (DatePicker, TimePicker, etc.)
- [ ] Testare componente

### 2.5.5 Creare componente de notificare și alerte 🟡 (1 zi)

- [ ] Implementare Toast
  - [ ] Variante (success, error, warning, info)
  - [ ] Auto-dismiss
  - [ ] Acțiuni
- [ ] Implementare Alert
  - [ ] Variante (success, error, warning, info)
  - [ ] Dismissible
  - [ ] Iconuri
- [ ] Implementare Confirm Dialog
  - [ ] Customizare titlu și mesaj
  - [ ] Butoane customizabile
- [ ] Implementare sistem global de notificări
- [ ] Testare componente

### 2.5.6 Documentare componente în Storybook 🟡 (2 zile)

- [ ] Configurare Storybook
- [ ] Creare stories pentru fiecare componentă
- [ ] Documentare props și variante
- [ ] Creare exemple de utilizare
- [ ] Configurare addon-uri (a11y, viewport, etc.)
- [ ] Testare Storybook
