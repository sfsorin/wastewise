# Checklist Detaliat - Faza 4: Implementare Module Complexe

## Legendă

- Nivel de dificultate: 🟢 Ușor | 🟡 Mediu | 🔴 Dificil
- Status: ⬜ Neînceput | 🟨 În progres | ✅ Finalizat

## 4.1 Implementare Modul Autospeciale (10 zile)

### 4.1.1 Implementare CRUD pentru autospeciale (backend) 🟡 (1 zi)

- [ ] Creare DTO-uri pentru autospeciale
  - [ ] CreateAutospecialaDto
  - [ ] UpdateAutospecialaDto
  - [ ] AutospecialaResponseDto
- [ ] Implementare service pentru autospeciale
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu operatori
- [ ] Implementare controller pentru autospeciale
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.1.2 Implementare CRUD pentru autospeciale (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru autospeciale
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru autospeciale
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare autospeciale
  - [ ] Tabel cu autospeciale
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după operator, status, etc.
- [ ] Implementare formular creare/editare autospecială
  - [ ] Validare formular
  - [ ] Selectoare pentru operator
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii autospecială
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Afișare documente asociate
  - [ ] Afișare istoric programări
- [ ] Implementare teste componente

### 4.1.3 Implementare CRUD pentru șoferi (backend) 🟡 (1 zi)

- [ ] Creare DTO-uri pentru șoferi
  - [ ] CreateSoferDto
  - [ ] UpdateSoferDto
  - [ ] SoferResponseDto
- [ ] Implementare service pentru șoferi
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu operatori
- [ ] Implementare controller pentru șoferi
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.1.4 Implementare CRUD pentru șoferi (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru șoferi
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru șoferi
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare șoferi
  - [ ] Tabel cu șoferi
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după operator, status, etc.
- [ ] Implementare formular creare/editare șofer
  - [ ] Validare formular
  - [ ] Selectoare pentru operator
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii șofer
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Afișare documente asociate
  - [ ] Afișare istoric programări
- [ ] Implementare teste componente

### 4.1.5 Implementare programări și planificare rute (backend) 🔴 (3 zile)

- [ ] Creare DTO-uri pentru programări
  - [ ] CreateProgramareDto
  - [ ] UpdateProgramareDto
  - [ ] ProgramareResponseDto
- [ ] Implementare service pentru programări
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Verificare disponibilitate autospecială și șofer
  - [ ] Verificare suprapuneri programări
- [ ] Implementare algoritm de optimizare rute
  - [ ] Calculare distanțe între puncte de colectare
  - [ ] Optimizare ordine vizitare
  - [ ] Estimare timp parcurs
- [ ] Implementare controller pentru programări
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.1.6 Implementare programări și planificare rute (frontend) 🔴 (3 zile)

- [ ] Creare serviciu API pentru programări
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru programări
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare calendar programări
  - [ ] Vizualizare zilnică/săptămânală/lunară
  - [ ] Drag & drop pentru programări
  - [ ] Filtrare după autospecială, șofer, etc.
- [ ] Implementare formular creare/editare programare
  - [ ] Validare formular
  - [ ] Selectoare pentru autospecială, șofer, puncte colectare
  - [ ] Verificare disponibilitate în timp real
  - [ ] Gestionare submit
- [ ] Implementare vizualizare rute
  - [ ] Afișare rută pe hartă
  - [ ] Afișare puncte de colectare
  - [ ] Afișare informații rută (distanță, timp estimat)
- [ ] Implementare teste componente

### 4.1.7 Implementare înregistrare colectări (backend) 🟡 (2 zile)

- [ ] Creare DTO-uri pentru colectări
  - [ ] CreateColectareDto
  - [ ] UpdateColectareDto
  - [ ] ColectareResponseDto
- [ ] Implementare service pentru colectări
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu programări, autospeciale, șoferi
  - [ ] Calculare cantități și generare date pentru facturare
- [ ] Implementare controller pentru colectări
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.1.8 Implementare înregistrare colectări (frontend) 🟡 (2 zile)

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
  - [ ] Filtrare după programare, autospecială, șofer, etc.
- [ ] Implementare formular înregistrare colectare
  - [ ] Validare formular
  - [ ] Selectoare pentru programare, categorie deșeu
  - [ ] Introducere cantități
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii colectare
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Afișare documente asociate
- [ ] Implementare teste componente

### 4.1.9 Implementare raportare și monitorizare activitate 🟡 (2 zile)

- [ ] Implementare rapoarte pentru autospeciale
  - [ ] Raport utilizare (ore, km)
  - [ ] Raport cantități colectate
  - [ ] Raport eficiență
- [ ] Implementare rapoarte pentru șoferi
  - [ ] Raport activitate
  - [ ] Raport performanță
- [ ] Implementare dashboard monitorizare
  - [ ] Vizualizare în timp real a poziției autospecialelor (opțional)
  - [ ] Statistici zilnice/săptămânale/lunare
  - [ ] Indicatori de performanță
- [ ] Implementare notificări
  - [ ] Alerte pentru întârzieri
  - [ ] Alerte pentru probleme tehnice
  - [ ] Alerte pentru depășire capacitate
- [ ] Implementare teste

### 4.1.10 Testare și validare modul autospeciale 🟡 (1 zi)

- [ ] Testare end-to-end pentru autospeciale
- [ ] Testare end-to-end pentru șoferi
- [ ] Testare end-to-end pentru programări
- [ ] Testare end-to-end pentru colectări
- [ ] Testare rapoarte și monitorizare
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 4.2 Implementare Module Contracte și Prețuri (11 zile)

### 4.2.1 Implementare CRUD pentru contracte (backend) 🟡 (2 zile)

- [ ] Creare DTO-uri pentru contracte
  - [ ] CreateContractDto
  - [ ] UpdateContractDto
  - [ ] ContractResponseDto
- [ ] Implementare service pentru contracte
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu clienți, operatori
  - [ ] Gestionare date valabilitate
- [ ] Implementare controller pentru contracte
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.2.2 Implementare CRUD pentru contracte (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru contracte
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru contracte
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare contracte
  - [ ] Tabel cu contracte
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după client, operator, status, etc.
- [ ] Implementare formular creare/editare contract
  - [ ] Validare formular
  - [ ] Selectoare pentru client, operator
  - [ ] Gestionare date valabilitate
  - [ ] Gestionare frecvență facturare
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii contract
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Afișare liste de prețuri asociate
  - [ ] Afișare puncte de colectare asociate
  - [ ] Afișare facturi asociate
  - [ ] Afișare documente asociate
- [ ] Implementare teste componente

### 4.2.3 Implementare CRUD pentru liste de prețuri (backend) 🟡 (2 zile)

- [ ] Creare DTO-uri pentru liste de prețuri
  - [ ] CreateListaPretDto
  - [ ] UpdateListaPretDto
  - [ ] ListaPretResponseDto
- [ ] Creare DTO-uri pentru prețuri
  - [ ] CreatePretDto
  - [ ] UpdatePretDto
  - [ ] PretResponseDto
- [ ] Implementare service pentru liste de prețuri
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Gestionare date valabilitate
- [ ] Implementare service pentru prețuri
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu categorii deșeuri, servicii
- [ ] Implementare controllere
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.2.4 Implementare CRUD pentru liste de prețuri (frontend) 🟡 (3 zile)

- [ ] Creare servicii API
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store-uri Zustand
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare liste de prețuri
  - [ ] Tabel cu liste de prețuri
  - [ ] Filtrare și sortare
  - [ ] Paginare
- [ ] Implementare formular creare/editare listă de prețuri
  - [ ] Validare formular
  - [ ] Gestionare date valabilitate
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii listă de prețuri
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, ștergere)
  - [ ] Afișare prețuri
- [ ] Implementare gestionare prețuri
  - [ ] Tabel cu prețuri
  - [ ] Formular adăugare/editare preț
  - [ ] Selectoare pentru categorie deșeu, serviciu
  - [ ] Gestionare discount
- [ ] Implementare teste componente

### 4.2.5 Implementare asociere contracte-prețuri (backend) 🟡 (1 zi)

- [ ] Creare DTO-uri pentru asociere
  - [ ] AsociereContractListaPretDto
- [ ] Implementare service pentru asociere
  - [ ] Metode pentru asociere/dezasociere
  - [ ] Validări și business logic
  - [ ] Gestionare date valabilitate
- [ ] Implementare controller pentru asociere
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.2.6 Implementare asociere contracte-prețuri (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru asociere
  - [ ] Metode pentru asociere/dezasociere
  - [ ] Gestionare erori
- [ ] Extindere store Zustand pentru contracte
  - [ ] Acțiuni pentru asociere/dezasociere
- [ ] Implementare interfață pentru asociere
  - [ ] Selector liste de prețuri disponibile
  - [ ] Gestionare date valabilitate
  - [ ] Afișare liste de prețuri asociate
  - [ ] Acțiuni (asociere, dezasociere)
- [ ] Implementare vizualizare prețuri active pentru contract
  - [ ] Afișare prețuri active
  - [ ] Filtrare după categorie deșeu, serviciu
- [ ] Implementare teste componente

### 4.2.7 Implementare asociere contracte-puncte de colectare (backend) 🟡 (1 zi)

- [ ] Creare DTO-uri pentru asociere
  - [ ] AsociereContractPunctColectareDto
- [ ] Implementare service pentru asociere
  - [ ] Metode pentru asociere/dezasociere
  - [ ] Validări și business logic
  - [ ] Gestionare frecvență colectare
- [ ] Implementare controller pentru asociere
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.2.8 Implementare asociere contracte-puncte de colectare (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru asociere
  - [ ] Metode pentru asociere/dezasociere
  - [ ] Gestionare erori
- [ ] Extindere store Zustand pentru contracte
  - [ ] Acțiuni pentru asociere/dezasociere
- [ ] Implementare interfață pentru asociere
  - [ ] Selector puncte de colectare disponibile
  - [ ] Gestionare frecvență colectare
  - [ ] Gestionare zile colectare
  - [ ] Afișare puncte de colectare asociate
  - [ ] Acțiuni (asociere, dezasociere)
- [ ] Implementare vizualizare program colectare
  - [ ] Afișare program pe calendar
  - [ ] Filtrare după punct de colectare
- [ ] Implementare teste componente

### 4.2.9 Implementare gestionare termene și condiții 🟡 (2 zile)

- [ ] Creare entitate pentru termene și condiții
  - [ ] Versiuni termene și condiții
  - [ ] Conținut termene și condiții
- [ ] Implementare service pentru termene și condiții
  - [ ] Metode CRUD
  - [ ] Versionare
- [ ] Implementare controller pentru termene și condiții
  - [ ] Endpoint-uri REST
- [ ] Implementare interfață pentru gestionare termene și condiții
  - [ ] Editor rich text
  - [ ] Versionare
  - [ ] Preview
- [ ] Implementare asociere termene și condiții cu contracte
  - [ ] Selectare versiune termene și condiții
  - [ ] Generare document contract cu termene și condiții
- [ ] Implementare teste

### 4.2.10 Testare și validare module contracte și prețuri 🟡 (2 zile)

- [ ] Testare end-to-end pentru contracte
- [ ] Testare end-to-end pentru liste de prețuri
- [ ] Testare end-to-end pentru asocieri
- [ ] Testare termene și condiții
- [ ] Testare generare documente
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 4.3 Implementare Modul Facturare (12 zile)

### 4.3.1 Implementare generare automată facturi (backend) 🔴 (3 zile)

- [ ] Creare DTO-uri pentru generare facturi
  - [ ] GenerareFacturiDto
  - [ ] RezultatGenerareFacturiDto
- [ ] Implementare service pentru generare facturi
  - [ ] Algoritm de generare facturi bazat pe contracte
  - [ ] Calculare cantități colectate pe perioadă
  - [ ] Aplicare prețuri conform listelor de prețuri active
  - [ ] Calculare TVA și total
  - [ ] Generare număr și serie factură
  - [ ] Setare date scadență
- [ ] Implementare job programat pentru generare automată
  - [ ] Configurare cron job
  - [ ] Parametrizare perioade de facturare
  - [ ] Logging și notificări
- [ ] Implementare controller pentru generare facturi
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.3.2 Implementare interfață generare facturi (frontend) 🔴 (3 zile)

- [ ] Creare serviciu API pentru generare facturi
  - [ ] Metode pentru generare manuală/automată
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru generare facturi
  - [ ] State management
  - [ ] Acțiuni pentru generare
- [ ] Implementare interfață pentru generare manuală
  - [ ] Selector client/contract
  - [ ] Selector perioadă
  - [ ] Preview cantități și sume
  - [ ] Opțiuni de configurare (grupare, discount, etc.)
  - [ ] Buton generare
- [ ] Implementare interfață pentru configurare generare automată
  - [ ] Configurare frecvență
  - [ ] Configurare dată generare
  - [ ] Configurare reguli de grupare
  - [ ] Configurare notificări
- [ ] Implementare vizualizare rezultate generare
  - [ ] Afișare facturi generate
  - [ ] Afișare erori/avertismente
  - [ ] Acțiuni post-generare (trimitere email, etc.)
- [ ] Implementare teste componente

### 4.3.3 Implementare CRUD pentru facturi (backend) 🟡 (2 zile)

- [ ] Creare DTO-uri pentru facturi
  - [ ] CreateFacturaDto
  - [ ] UpdateFacturaDto
  - [ ] FacturaResponseDto
- [ ] Creare DTO-uri pentru linii factură
  - [ ] CreateLinieFacturaDto
  - [ ] UpdateLinieFacturaDto
  - [ ] LinieFacturaResponseDto
- [ ] Implementare service pentru facturi
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu contracte, clienți
  - [ ] Gestionare status factură
- [ ] Implementare service pentru linii factură
  - [ ] Metode CRUD
  - [ ] Calculare valori
  - [ ] Validări
- [ ] Implementare controllere
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.3.4 Implementare CRUD pentru facturi (frontend) 🟡 (3 zile)

- [ ] Creare servicii API
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store-uri Zustand
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare facturi
  - [ ] Tabel cu facturi
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după client, contract, status, perioadă
- [ ] Implementare formular creare/editare factură
  - [ ] Validare formular
  - [ ] Selectoare pentru client, contract
  - [ ] Gestionare date factură
  - [ ] Gestionare linii factură
  - [ ] Calculare totale
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii factură
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, anulare, marcare plătită)
  - [ ] Afișare linii factură
  - [ ] Afișare plăți asociate
  - [ ] Afișare documente asociate
- [ ] Implementare vizualizare factură (print preview)
  - [ ] Template factură
  - [ ] Generare PDF
- [ ] Implementare teste componente

### 4.3.5 Implementare înregistrare plăți (backend) 🟡 (1 zi)

- [ ] Creare DTO-uri pentru plăți
  - [ ] CreatePlataDto
  - [ ] UpdatePlataDto
  - [ ] PlataResponseDto
- [ ] Implementare service pentru plăți
  - [ ] Metode CRUD (create, findAll, findOne, update, remove)
  - [ ] Validări și business logic
  - [ ] Relații cu facturi
  - [ ] Actualizare status factură
- [ ] Implementare controller pentru plăți
  - [ ] Endpoint-uri REST
  - [ ] Validare request-uri
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.3.6 Implementare înregistrare plăți (frontend) 🟡 (2 zile)

- [ ] Creare serviciu API pentru plăți
  - [ ] Metode pentru operațiuni CRUD
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru plăți
  - [ ] State management
  - [ ] Acțiuni pentru operațiuni CRUD
- [ ] Implementare pagină listare plăți
  - [ ] Tabel cu plăți
  - [ ] Filtrare și sortare
  - [ ] Paginare
  - [ ] Filtrare după factură, client, perioadă
- [ ] Implementare formular înregistrare plată
  - [ ] Validare formular
  - [ ] Selector factură
  - [ ] Gestionare date plată
  - [ ] Gestionare submit
- [ ] Implementare pagină detalii plată
  - [ ] Afișare informații
  - [ ] Acțiuni (editare, anulare)
  - [ ] Afișare documente asociate
- [ ] Implementare teste componente

### 4.3.7 Implementare rapoarte de facturare 🟡 (2 zile)

- [ ] Implementare raport facturi emise
  - [ ] Filtrare după perioadă, client, status
  - [ ] Grupare după client, contract
  - [ ] Calculare totale și subtotale
- [ ] Implementare raport plăți încasate
  - [ ] Filtrare după perioadă, client, metodă plată
  - [ ] Grupare după client, factură
  - [ ] Calculare totale și subtotale
- [ ] Implementare raport sold clienți
  - [ ] Calculare sold pentru fiecare client
  - [ ] Filtrare după perioadă, status
  - [ ] Evidențiere clienți cu întârzieri
- [ ] Implementare raport previziune încasări
  - [ ] Calculare încasări previzionate pe baza facturilor scadente
  - [ ] Grupare după perioadă, client
- [ ] Implementare export rapoarte (PDF, Excel)
- [ ] Implementare teste

### 4.3.8 Implementare notificări scadențe 🟡 (2 zile)

- [ ] Implementare service pentru notificări
  - [ ] Identificare facturi scadente
  - [ ] Generare notificări
  - [ ] Configurare reguli de notificare
- [ ] Implementare job programat pentru verificare scadențe
  - [ ] Configurare cron job
  - [ ] Parametrizare perioade de verificare
- [ ] Implementare trimitere notificări
  - [ ] Template-uri email pentru notificări
  - [ ] Trimitere email automat
  - [ ] Logging trimiteri
- [ ] Implementare interfață pentru configurare notificări
  - [ ] Configurare reguli (zile înainte de scadență, frecvență)
  - [ ] Configurare template-uri
  - [ ] Activare/dezactivare notificări
- [ ] Implementare dashboard notificări
  - [ ] Afișare facturi scadente
  - [ ] Afișare istoric notificări
- [ ] Implementare teste

### 4.3.9 Implementare export facturi în format PDF 🟡 (2 zile)

- [ ] Implementare service pentru generare PDF
  - [ ] Creare template factură
  - [ ] Populare date factură
  - [ ] Generare PDF
- [ ] Implementare controller pentru export PDF
  - [ ] Endpoint pentru descărcare PDF
- [ ] Implementare interfață pentru configurare template factură
  - [ ] Configurare header/footer
  - [ ] Configurare câmpuri
  - [ ] Configurare stil
- [ ] Implementare preview factură
  - [ ] Afișare preview înainte de generare
  - [ ] Opțiuni de configurare
- [ ] Implementare funcționalitate trimitere factură pe email
  - [ ] Atașare PDF
  - [ ] Configurare mesaj email
  - [ ] Logging trimiteri
- [ ] Implementare teste

### 4.3.10 Testare și validare modul facturare 🟡 (2 zile)

- [ ] Testare end-to-end pentru generare facturi
- [ ] Testare end-to-end pentru CRUD facturi
- [ ] Testare end-to-end pentru plăți
- [ ] Testare rapoarte
- [ ] Testare notificări
- [ ] Testare export PDF
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 4.4 Implementare Modul Rapoarte (12 zile)

### 4.4.1 Implementare rapoarte operaționale (backend) 🟡 (2 zile)

- [ ] Implementare service pentru rapoarte operaționale
  - [ ] Raport colectări pe perioadă
  - [ ] Raport cantități pe categorii deșeuri
  - [ ] Raport eficiență autospeciale
  - [ ] Raport activitate șoferi
- [ ] Implementare agregare și procesare date
  - [ ] Calculare indicatori
  - [ ] Grupare și filtrare
- [ ] Implementare controller pentru rapoarte
  - [ ] Endpoint-uri REST
  - [ ] Parametri de filtrare
  - [ ] Documentare Swagger
- [ ] Implementare cache pentru rapoarte
  - [ ] Configurare TTL
  - [ ] Invalidare cache
- [ ] Implementare teste unitare și de integrare

### 4.4.2 Implementare rapoarte operaționale (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru rapoarte operaționale
  - [ ] Metode pentru obținere rapoarte
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru rapoarte
  - [ ] State management
  - [ ] Acțiuni pentru obținere rapoarte
- [ ] Implementare pagină rapoarte operaționale
  - [ ] Selector tip raport
  - [ ] Filtre (perioadă, categorie deșeu, autospecială, șofer)
  - [ ] Opțiuni de grupare
- [ ] Implementare vizualizări rapoarte
  - [ ] Tabele cu date
  - [ ] Grafice (bar chart, line chart, pie chart)
  - [ ] Hărți pentru distribuție geografică
- [ ] Implementare export rapoarte
  - [ ] Export PDF
  - [ ] Export Excel
  - [ ] Export imagine grafice
- [ ] Implementare teste componente

### 4.4.3 Implementare rapoarte de conformitate (backend) 🟡 (2 zile)

- [ ] Implementare service pentru rapoarte de conformitate
  - [ ] Raport cantități colectate vs. obligații legale
  - [ ] Raport documente și autorizații
  - [ ] Raport incidente și neconformități
- [ ] Implementare agregare și procesare date
  - [ ] Calculare indicatori de conformitate
  - [ ] Identificare neconformități
- [ ] Implementare controller pentru rapoarte
  - [ ] Endpoint-uri REST
  - [ ] Parametri de filtrare
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.4.4 Implementare rapoarte de conformitate (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru rapoarte de conformitate
  - [ ] Metode pentru obținere rapoarte
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru rapoarte
  - [ ] State management
  - [ ] Acțiuni pentru obținere rapoarte
- [ ] Implementare pagină rapoarte de conformitate
  - [ ] Selector tip raport
  - [ ] Filtre (perioadă, categorie deșeu, UAT)
- [ ] Implementare vizualizări rapoarte
  - [ ] Tabele cu date
  - [ ] Indicatori de conformitate (semafoare, gauge-uri)
  - [ ] Grafice comparative
- [ ] Implementare alertare pentru neconformități
  - [ ] Evidențiere vizuală
  - [ ] Sistem de notificări
- [ ] Implementare export rapoarte
  - [ ] Export PDF
  - [ ] Export Excel
- [ ] Implementare teste componente

### 4.4.5 Implementare rapoarte financiare (backend) 🟡 (2 zile)

- [ ] Implementare service pentru rapoarte financiare
  - [ ] Raport venituri pe perioadă
  - [ ] Raport venituri pe client/contract
  - [ ] Raport venituri pe categorie deșeu
  - [ ] Raport profitabilitate
- [ ] Implementare agregare și procesare date
  - [ ] Calculare indicatori financiari
  - [ ] Grupare și filtrare
- [ ] Implementare controller pentru rapoarte
  - [ ] Endpoint-uri REST
  - [ ] Parametri de filtrare
  - [ ] Documentare Swagger
- [ ] Implementare teste unitare și de integrare

### 4.4.6 Implementare rapoarte financiare (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru rapoarte financiare
  - [ ] Metode pentru obținere rapoarte
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru rapoarte
  - [ ] State management
  - [ ] Acțiuni pentru obținere rapoarte
- [ ] Implementare pagină rapoarte financiare
  - [ ] Selector tip raport
  - [ ] Filtre (perioadă, client, contract, categorie deșeu)
  - [ ] Opțiuni de grupare
- [ ] Implementare vizualizări rapoarte
  - [ ] Tabele cu date
  - [ ] Grafice (bar chart, line chart, pie chart)
  - [ ] Indicatori financiari
- [ ] Implementare comparații
  - [ ] Comparație cu perioade anterioare
  - [ ] Comparație cu bugete/previziuni
- [ ] Implementare export rapoarte
  - [ ] Export PDF
  - [ ] Export Excel
- [ ] Implementare teste componente

### 4.4.7 Implementare export date (PDF, Excel) 🟡 (2 zile)

- [ ] Implementare service pentru export PDF
  - [ ] Configurare template-uri pentru diferite rapoarte
  - [ ] Generare PDF cu tabele și grafice
- [ ] Implementare service pentru export Excel
  - [ ] Configurare template-uri pentru diferite rapoarte
  - [ ] Generare Excel cu formule și formatare
- [ ] Implementare controller pentru export
  - [ ] Endpoint-uri pentru descărcare
  - [ ] Parametri de configurare
- [ ] Implementare interfață pentru configurare export
  - [ ] Selectare coloane
  - [ ] Configurare formatare
  - [ ] Opțiuni de grupare
- [ ] Implementare job-uri programate pentru export automat
  - [ ] Configurare cron job
  - [ ] Trimitere automată pe email
- [ ] Implementare teste

### 4.4.8 Implementare import date 🟡 (2 zile)

- [ ] Implementare service pentru import date
  - [ ] Parser pentru fișiere Excel/CSV
  - [ ] Validare date importate
  - [ ] Mapare la entități
  - [ ] Procesare batch
- [ ] Implementare controller pentru import
  - [ ] Endpoint pentru upload fișiere
  - [ ] Validare fișiere
- [ ] Implementare interfață pentru import
  - [ ] Upload fișier
  - [ ] Configurare mapare coloane
  - [ ] Preview date
  - [ ] Validare și corectare erori
  - [ ] Confirmare import
- [ ] Implementare template-uri pentru import
  - [ ] Generare template-uri pentru diferite entități
  - [ ] Documentație pentru utilizare
- [ ] Implementare logging și raportare erori
  - [ ] Logging detaliat pentru fiecare import
  - [ ] Raport de erori
- [ ] Implementare teste

### 4.4.9 Testare și validare modul rapoarte 🟡 (2 zile)

- [ ] Testare end-to-end pentru rapoarte operaționale
- [ ] Testare end-to-end pentru rapoarte de conformitate
- [ ] Testare end-to-end pentru rapoarte financiare
- [ ] Testare export date
- [ ] Testare import date
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări

## 4.5 Implementare Dashboard și Statistici (11 zile)

### 4.5.1 Implementare dashboard operațional (backend) 🟡 (2 zile)

- [ ] Implementare service pentru dashboard operațional
  - [ ] Agregare date colectări recente
  - [ ] Calculare indicatori operaționali
  - [ ] Identificare tendințe
  - [ ] Generare alerte
- [ ] Implementare cache pentru dashboard
  - [ ] Configurare TTL
  - [ ] Invalidare cache
- [ ] Implementare controller pentru dashboard
  - [ ] Endpoint-uri REST
  - [ ] Parametri de filtrare
  - [ ] Documentare Swagger
- [ ] Implementare job programat pentru actualizare date
  - [ ] Configurare cron job
  - [ ] Precalculare indicatori
- [ ] Implementare teste unitare și de integrare

### 4.5.2 Implementare dashboard operațional (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru dashboard
  - [ ] Metode pentru obținere date
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru dashboard
  - [ ] State management
  - [ ] Acțiuni pentru obținere date
- [ ] Implementare layout dashboard
  - [ ] Grid layout pentru widgeturi
  - [ ] Configurare layout personalizabil
- [ ] Implementare widgeturi
  - [ ] Widget colectări recente
  - [ ] Widget cantități pe categorii
  - [ ] Widget eficiență autospeciale
  - [ ] Widget activitate șoferi
  - [ ] Widget harta colectări
- [ ] Implementare interactivitate
  - [ ] Filtrare date
  - [ ] Drill-down pentru detalii
  - [ ] Actualizare automată date
- [ ] Implementare teste componente

### 4.5.3 Implementare dashboard financiar (backend) 🟡 (2 zile)

- [ ] Implementare service pentru dashboard financiar
  - [ ] Agregare date financiare
  - [ ] Calculare indicatori financiari
  - [ ] Identificare tendințe
  - [ ] Generare alerte
- [ ] Implementare cache pentru dashboard
  - [ ] Configurare TTL
  - [ ] Invalidare cache
- [ ] Implementare controller pentru dashboard
  - [ ] Endpoint-uri REST
  - [ ] Parametri de filtrare
  - [ ] Documentare Swagger
- [ ] Implementare job programat pentru actualizare date
  - [ ] Configurare cron job
  - [ ] Precalculare indicatori
- [ ] Implementare teste unitare și de integrare

### 4.5.4 Implementare dashboard financiar (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru dashboard
  - [ ] Metode pentru obținere date
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru dashboard
  - [ ] State management
  - [ ] Acțiuni pentru obținere date
- [ ] Implementare layout dashboard
  - [ ] Grid layout pentru widgeturi
  - [ ] Configurare layout personalizabil
- [ ] Implementare widgeturi
  - [ ] Widget facturi recente
  - [ ] Widget venituri pe perioadă
  - [ ] Widget sold clienți
  - [ ] Widget previziuni încasări
  - [ ] Widget profitabilitate
- [ ] Implementare interactivitate
  - [ ] Filtrare date
  - [ ] Drill-down pentru detalii
  - [ ] Actualizare automată date
- [ ] Implementare teste componente

### 4.5.5 Implementare dashboard management (backend) 🟡 (2 zile)

- [ ] Implementare service pentru dashboard management
  - [ ] Agregare date operaționale și financiare
  - [ ] Calculare KPI-uri
  - [ ] Identificare tendințe
  - [ ] Generare alerte
- [ ] Implementare cache pentru dashboard
  - [ ] Configurare TTL
  - [ ] Invalidare cache
- [ ] Implementare controller pentru dashboard
  - [ ] Endpoint-uri REST
  - [ ] Parametri de filtrare
  - [ ] Documentare Swagger
- [ ] Implementare job programat pentru actualizare date
  - [ ] Configurare cron job
  - [ ] Precalculare indicatori
- [ ] Implementare teste unitare și de integrare

### 4.5.6 Implementare dashboard management (frontend) 🟡 (3 zile)

- [ ] Creare serviciu API pentru dashboard
  - [ ] Metode pentru obținere date
  - [ ] Gestionare erori
- [ ] Creare store Zustand pentru dashboard
  - [ ] State management
  - [ ] Acțiuni pentru obținere date
- [ ] Implementare layout dashboard
  - [ ] Grid layout pentru widgeturi
  - [ ] Configurare layout personalizabil
- [ ] Implementare widgeturi
  - [ ] Widget KPI-uri principale
  - [ ] Widget tendințe
  - [ ] Widget comparație cu perioade anterioare
  - [ ] Widget alerte și notificări
  - [ ] Widget previziuni
- [ ] Implementare interactivitate
  - [ ] Filtrare date
  - [ ] Drill-down pentru detalii
  - [ ] Actualizare automată date
- [ ] Implementare teste componente

### 4.5.7 Implementare vizualizări interactive 🔴 (3 zile)

- [ ] Implementare grafice avansate
  - [ ] Grafice multi-series
  - [ ] Grafice combinate (bar + line)
  - [ ] Grafice cu axe multiple
  - [ ] Heatmaps
- [ ] Implementare hărți interactive
  - [ ] Hărți cu clustere
  - [ ] Hărți cu heat zones
  - [ ] Hărți cu rute
  - [ ] Filtrare și zoom
- [ ] Implementare vizualizări 3D (opțional)
  - [ ] Grafice 3D
  - [ ] Vizualizări volumetrice
- [ ] Implementare animații și tranziții
  - [ ] Animații la schimbare date
  - [ ] Tranziții între vizualizări
- [ ] Implementare interactivitate avansată
  - [ ] Drag & drop pentru reorganizare
  - [ ] Resize widgeturi
  - [ ] Configurare vizualizări
- [ ] Implementare teste

### 4.5.8 Implementare filtre și segmentare date 🟡 (2 zile)

- [ ] Implementare sistem de filtrare global
  - [ ] Filtre pentru perioadă
  - [ ] Filtre pentru client/contract
  - [ ] Filtre pentru categorie deșeu
  - [ ] Filtre pentru zonă geografică
- [ ] Implementare segmentare date
  - [ ] Segmentare după client
  - [ ] Segmentare după categorie deșeu
  - [ ] Segmentare după zonă geografică
- [ ] Implementare salvare filtre favorite
  - [ ] Salvare configurație filtre
  - [ ] Încărcare configurație salvată
- [ ] Implementare aplicare filtre în timp real
  - [ ] Actualizare vizualizări la schimbare filtre
  - [ ] Optimizare performanță
- [ ] Implementare teste

### 4.5.9 Testare și validare dashboard și statistici 🟡 (2 zile)

- [ ] Testare end-to-end pentru dashboard operațional
- [ ] Testare end-to-end pentru dashboard financiar
- [ ] Testare end-to-end pentru dashboard management
- [ ] Testare vizualizări interactive
- [ ] Testare filtre și segmentare
- [ ] Testare performanță
- [ ] Rezolvare bug-uri și optimizări
