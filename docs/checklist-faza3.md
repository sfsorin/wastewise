# Checklist Detaliat - Faza 3: Implementare Module de Bază

## Legendă
- Nivel de dificultate: 🟢 Ușor | 🟡 Mediu | 🔴 Dificil
- Status: ⬜ Neînceput | 🟨 În progres | ✅ Finalizat

## 3.1 Implementare Module Geografice (12 zile)

### 3.1.1 Implementare CRUD pentru județe (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru județe
  - [ ] CreateJudetDto
  - [ ] UpdateJudetDto
  - [ ] JudetResponseDto
- [ ] Implementare service pentru județe
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
- [ ] Implementare controller pentru județe
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.1.2 Implementare CRUD pentru județe (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru județe
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru județe
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare județe
  - [ ] Tabel cu județe
  - [ ] Filtrare și sortare
  - [ ] Paginare
- [ ] Implementare formular creare/editare județ
  - [ ] Validare formular
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii județ
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.1.3 Implementare CRUD pentru localități (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru localități
  - [ ] CreateLocalitateDto
  - [ ] UpdateLocalitateDto
  - [ ] LocalitateResponseDto
- [ ] Implementare service pentru localități
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu județe
- [ ] Implementare controller pentru localități
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.1.4 Implementare CRUD pentru localități (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru localități
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru localități
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare localități
  - [ ] Tabel cu localități
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după județ
- [ ] Implementare formular creare/editare localitate
  - [ ] Validare formular
  - [ ] Selector pentru județ
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii localitate
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.1.5 Implementare CRUD pentru UAT-uri (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru UAT-uri
  - [ ] CreateUatDto
  - [ ] UpdateUatDto
  - [ ] UatResponseDto
- [ ] Implementare service pentru UAT-uri
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu județe și localități
- [ ] Implementare controller pentru UAT-uri
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.1.6 Implementare CRUD pentru UAT-uri (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru UAT-uri
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru UAT-uri
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare UAT-uri
  - [ ] Tabel cu UAT-uri
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după județ și localitate
- [ ] Implementare formular creare/editare UAT
  - [ ] Validare formular
  - [ ] Selectoare pentru județ și localitate
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii UAT
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.1.7 Implementare relații și validări între entități 🟡 (2 zile)
- [ ] Implementare validări pentru relații
  - [ ] Validare existență județ la creare localitate
  - [ ] Validare existență județ și localitate la creare UAT
  - [ ] Validare unicitate nume localitate în județ
- [ ] Implementare cascade operations
  - [ ] Ștergere localități la ștergere județ
  - [ ] Actualizare UAT-uri la actualizare județ/localitate
- [ ] Implementare business rules
  - [ ] Reguli de validare specifice
  - [ ] Reguli de business pentru operațiuni
- [ ] Implementare teste pentru validări și relații

### 3.1.8 Implementare import/export date geografice 🟡 (2 zile)
- [ ] Implementare import date din CSV/Excel
  - [ ] Parser pentru fișiere
  - [ ] Validare date importate
  - [ ] Procesare batch
- [ ] Implementare export date în CSV/Excel
  - [ ] Generare fișiere
  - [ ] Configurare coloane și formate
- [ ] Implementare interfață pentru import/export
  - [ ] Upload fișier
  - [ ] Configurare import
  - [ ] Preview date
  - [ ] Descărcare export
- [ ] Implementare teste pentru import/export

### 3.1.9 Testare și validare module geografice 🟡 (1 zi)
- [ ] Testare end-to-end pentru județe
- [ ] Testare end-to-end pentru localități
- [ ] Testare end-to-end pentru UAT-uri
- [ ] Testare import/export
- [ ] Testare validări și relații
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 3.2 Implementare Module Entități (12 zile)

### 3.2.1 Implementare CRUD pentru clienți (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru clienți
  - [ ] CreateClientDto
  - [ ] UpdateClientDto
  - [ ] ClientResponseDto
- [ ] Implementare service pentru clienți
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu județe și localități
- [ ] Implementare controller pentru clienți
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.2.2 Implementare CRUD pentru clienți (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru clienți
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru clienți
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare clienți
  - [ ] Tabel cu clienți
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după tip client, județ, localitate
- [ ] Implementare formular creare/editare client
  - [ ] Validare formular
  - [ ] Selectoare pentru tip client, județ, localitate
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii client
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Listare puncte de colectare asociate
- [ ] Implementare teste componente

### 3.2.3 Implementare CRUD pentru puncte de colectare (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru puncte de colectare
  - [ ] CreatePunctColectareDto
  - [ ] UpdatePunctColectareDto
  - [ ] PunctColectareResponseDto
- [ ] Implementare service pentru puncte de colectare
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu clienți, județe și localități
- [ ] Implementare controller pentru puncte de colectare
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.2.4 Implementare CRUD pentru puncte de colectare (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru puncte de colectare
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru puncte de colectare
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare puncte de colectare
  - [ ] Tabel cu puncte de colectare
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după client, județ, localitate
- [ ] Implementare formular creare/editare punct de colectare
  - [ ] Validare formular
  - [ ] Selectoare pentru client, județ, localitate
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii punct de colectare
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Afișare pe hartă (opțional)
- [ ] Implementare teste componente

### 3.2.5 Implementare CRUD pentru operatori (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru operatori
  - [ ] CreateOperatorDto
  - [ ] UpdateOperatorDto
  - [ ] OperatorResponseDto
- [ ] Implementare service pentru operatori
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu județe și localități
- [ ] Implementare controller pentru operatori
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.2.6 Implementare CRUD pentru operatori (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru operatori
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru operatori
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare operatori
  - [ ] Tabel cu operatori
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după județ, localitate
- [ ] Implementare formular creare/editare operator
  - [ ] Validare formular
  - [ ] Selectoare pentru județ, localitate
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii operator
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.2.7 Implementare relații și validări între entități 🟡 (2 zile)
- [ ] Implementare validări pentru relații
  - [ ] Validare existență client la creare punct de colectare
  - [ ] Validare existență județ și localitate
  - [ ] Validare unicitate CUI/CNP pentru clienți
- [ ] Implementare cascade operations
  - [ ] Ștergere puncte de colectare la ștergere client
- [ ] Implementare business rules
  - [ ] Reguli de validare specifice
  - [ ] Reguli de business pentru operațiuni
- [ ] Implementare teste pentru validări și relații

### 3.2.8 Implementare căutare și filtrare avansată 🟡 (2 zile)
- [ ] Implementare căutare full-text
  - [ ] Configurare indexuri pentru căutare
  - [ ] Implementare query-uri de căutare
- [ ] Implementare filtrare avansată
  - [ ] Filtrare după multiple criterii
  - [ ] Filtrare după relații
- [ ] Implementare interfață pentru căutare și filtrare
  - [ ] Formular de căutare
  - [ ] Filtre avansate
  - [ ] Salvare filtre favorite
- [ ] Implementare teste pentru căutare și filtrare

### 3.2.9 Testare și validare module entități 🟡 (1 zi)
- [ ] Testare end-to-end pentru clienți
- [ ] Testare end-to-end pentru puncte de colectare
- [ ] Testare end-to-end pentru operatori
- [ ] Testare căutare și filtrare
- [ ] Testare validări și relații
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 3.3 Implementare Module Operaționale (12 zile)

### 3.3.1 Implementare CRUD pentru categorii deșeuri (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru categorii deșeuri
  - [ ] CreateCategorieDeseuDto
  - [ ] UpdateCategorieDeseuDto
  - [ ] CategorieDeseuResponseDto
- [ ] Implementare service pentru categorii deșeuri
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
- [ ] Implementare controller pentru categorii deșeuri
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.3.2 Implementare CRUD pentru categorii deșeuri (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru categorii deșeuri
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru categorii deșeuri
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare categorii deșeuri
  - [ ] Tabel cu categorii deșeuri
  - [ ] Filtrare și sortare
  - [ ] Paginare
- [ ] Implementare formular creare/editare categorie deșeu
  - [ ] Validare formular
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii categorie deșeu
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.3.3 Implementare CRUD pentru servicii (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru servicii
  - [ ] CreateServiciuDto
  - [ ] UpdateServiciuDto
  - [ ] ServiciuResponseDto
- [ ] Implementare service pentru servicii
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu categorii deșeuri
- [ ] Implementare controller pentru servicii
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.3.4 Implementare CRUD pentru servicii (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru servicii
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru servicii
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare servicii
  - [ ] Tabel cu servicii
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după categorie deșeu
- [ ] Implementare formular creare/editare serviciu
  - [ ] Validare formular
  - [ ] Selector pentru categorie deșeu
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii serviciu
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.3.5 Implementare CRUD pentru colectări (backend) 🟡 (1 zi)
- [ ] Creare DTO-uri pentru colectări
  - [ ] CreateColectareDto
  - [ ] UpdateColectareDto
  - [ ] ColectareResponseDto
- [ ] Implementare service pentru colectări
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu categorii deșeuri, UAT-uri, etc.
- [ ] Implementare controller pentru colectări
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 3.3.6 Implementare CRUD pentru colectări (frontend) 🟡 (2 zile)
- [ ] Creare serviciu API pentru colectări
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru colectări
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare colectări
  - [ ] Tabel cu colectări
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după categorie deșeu, UAT, etc.
- [ ] Implementare formular creare/editare colectare
  - [ ] Validare formular
  - [ ] Selectoare pentru categorie deșeu, UAT, etc.
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii colectare
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
- [ ] Implementare teste componente

### 3.3.7 Implementare relații și validări între entități 🟡 (2 zile)
- [ ] Implementare validări pentru relații
  - [ ] Validare existență categorie deșeu la creare serviciu
  - [ ] Validare existență categorie deșeu, UAT, etc. la creare colectare
- [ ] Implementare cascade operations
  - [ ] Actualizare servicii la actualizare categorie deșeu
- [ ] Implementare business rules
  - [ ] Reguli de validare specifice
  - [ ] Reguli de business pentru operațiuni
- [ ] Implementare teste pentru validări și relații

### 3.3.8 Implementare căutare și filtrare avansată 🟡 (2 zile)
- [ ] Implementare căutare full-text
  - [ ] Configurare indexuri pentru căutare
  - [ ] Implementare query-uri de căutare
- [ ] Implementare filtrare avansată
  - [ ] Filtrare după multiple criterii
  - [ ] Filtrare după relații
  - [ ] Filtrare după interval de date pentru colectări
- [ ] Implementare interfață pentru căutare și filtrare
  - [ ] Formular de căutare
  - [ ] Filtre avansate
  - [ ] Salvare filtre favorite
- [ ] Implementare teste pentru căutare și filtrare

### 3.3.9 Testare și validare module operaționale 🟡 (1 zi)
- [ ] Testare end-to-end pentru categorii deșeuri
- [ ] Testare end-to-end pentru servicii
- [ ] Testare end-to-end pentru colectări
- [ ] Testare căutare și filtrare
- [ ] Testare validări și relații
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări
