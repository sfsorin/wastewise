# Arhitectura WasteWise

Acest document descrie arhitectura sistemului WasteWise, incluzând componentele principale, interacțiunile dintre ele și deciziile de design.

## Arhitectura Generală

WasteWise este construit pe o arhitectură modernă, modulară și scalabilă, bazată pe microservicii. Sistemul este compus din următoarele componente principale:

1. **Frontend** - Interfața utilizator construită cu React
2. **Backend API** - Serviciu principal construit cu NestJS
3. **ML Service** - Microserviciu pentru machine learning construit cu Python/FastAPI
4. **Bază de Date** - PostgreSQL pentru stocarea datelor relaționale
5. **Document Storage** - MinIO/S3 pentru stocarea documentelor
6. **Cache** - Redis pentru caching și sesiuni
7. **Message Queue** - RabbitMQ pentru comunicare asincronă între servicii

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│   Frontend  │◄────►│  Backend API│◄────►│  ML Service │
│   (React)   │      │   (NestJS)  │      │  (FastAPI)  │
│             │      │             │      │             │
└─────────────┘      └──────┬──────┘      └──────┬──────┘
                            │                    │
                            ▼                    ▼
                     ┌──────────────┐    ┌──────────────┐
                     │              │    │              │
                     │  PostgreSQL  │    │    MinIO     │
                     │              │    │              │
                     └──────────────┘    └──────────────┘
                            ▲                    ▲
                            │                    │
                     ┌──────┴──────┐    ┌───────┴───────┐
                     │             │    │               │
                     │    Redis    │    │   RabbitMQ    │
                     │             │    │               │
                     └─────────────┘    └───────────────┘
```

## Componente Principale

### Frontend (React)

Frontend-ul este construit folosind React și urmează o arhitectură bazată pe componente. Principalele caracteristici includ:

- **State Management** - Zustand pentru gestionarea stării aplicației
- **Routing** - React Router pentru navigare
- **UI Components** - Componente personalizate construite cu Tailwind CSS
- **API Integration** - Axios pentru comunicarea cu backend-ul
- **Forms** - React Hook Form pentru gestionarea formularelor
- **Validation** - Zod pentru validarea datelor
- **Visualization** - Recharts și Leaflet pentru grafice și hărți

Arhitectura frontend-ului urmează principiul de separare a preocupărilor:

```
┌─────────────────────────────────────────────────────┐
│                      Components                     │
├─────────────┬─────────────┬─────────────┬──────────┤
│    Pages    │    Layout   │    Forms    │  Common  │
└─────────────┴─────────────┴─────────────┴──────────┘
                           ▲
                           │
┌─────────────────────────┼─────────────────────────┐
│                         │                         │
│          Hooks          │         Stores          │
│                         │                         │
└─────────────────────────┼─────────────────────────┘
                           ▲
                           │
┌─────────────────────────┼─────────────────────────┐
│                         │                         │
│        Services         │         Utils           │
│                         │                         │
└─────────────────────────┴─────────────────────────┘
```

### Backend API (NestJS)

Backend-ul este construit folosind NestJS și urmează o arhitectură modulară. Principalele caracteristici includ:

- **Modules** - Organizare pe module funcționale
- **Controllers** - Gestionarea request-urilor HTTP
- **Services** - Logica de business
- **Repositories** - Acces la baza de date
- **DTOs** - Obiecte pentru transfer date
- **Entities** - Modele de date
- **Guards** - Protecție endpoint-uri
- **Interceptors** - Procesare request/response
- **Pipes** - Validare și transformare date

Arhitectura backend-ului urmează principiile SOLID și Clean Architecture:

```
┌─────────────────────────────────────────────────────┐
│                     Controllers                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                      Services                       │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                    Repositories                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                      Entities                       │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                    Database                         │
└─────────────────────────────────────────────────────┘
```

### ML Service (Python/FastAPI)

Serviciul de Machine Learning este construit folosind Python și FastAPI. Principalele caracteristici includ:

- **API Endpoints** - Expunere funcționalități ML prin API REST
- **Models** - Modele de machine learning pentru predicții
- **Training** - Logică pentru antrenarea modelelor
- **Data Processing** - Preprocesare și transformare date
- **Evaluation** - Evaluare performanță modele

Arhitectura ML Service urmează principiile de separare a preocupărilor:

```
┌─────────────────────────────────────────────────────┐
│                    API Endpoints                    │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                      Services                       │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                       Models                        │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                  Data Processing                    │
└─────────────────────────────────────────────────────┘
```

## Schema Bazei de Date

Schema bazei de date este organizată pe module funcționale:

### Module Geografice

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│     Judet     │       │   Localitate  │       │      UAT      │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ nume          │◄──────┤ judet_id      │◄──────┤ judet_id      │
│ cod           │       │ nume          │       │ localitate_id │
│ ...           │       │ tip           │       │ nume          │
└───────────────┘       │ cod_postal    │       │ cod_siruta    │
                        │ ...           │       │ populatie     │
                        └───────────────┘       │ ...           │
                                                └───────────────┘
```

### Module Entități

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│   TipClient   │       │     Client    │       │PunctColectare │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ nume          │◄──────┤ tip_client_id │       │ client_id     │
│ descriere     │       │ nume          │◄──────┤ nume          │
│ ...           │       │ cui/cnp       │       │ adresa        │
└───────────────┘       │ adresa        │       │ judet_id      │
                        │ judet_id      │       │ localitate_id │
                        │ localitate_id │       │ coordonate    │
                        │ ...           │       │ ...           │
                        └───────────────┘       └───────────────┘
```

### Module Operaționale

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│CategorieDeseu │       │    Serviciu   │       │   Colectare   │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ nume          │◄──────┤ categorie_id  │       │ data          │
│ cod           │       │ nume          │       │ punct_col_id  │
│ descriere     │       │ descriere     │       │ categorie_id  │
│ ...           │       │ ...           │       │ cantitate     │
└───────────────┘       └───────────────┘       │ ...           │
                                                └───────────────┘
```

### Module Autospeciale

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│ Autospeciala  │       │     Sofer     │       │  Programare   │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ nr_inmatr     │       │ nume          │       │ data          │
│ model         │       │ prenume       │       │ autospec_id   │
│ capacitate    │       │ cnp           │       │ sofer_id      │
│ operator_id   │       │ operator_id   │       │ ruta          │
│ ...           │       │ ...           │       │ ...           │
└───────────────┘       └───────────────┘       └───────────────┘
```

### Module Contracte și Prețuri

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│   Contract    │       │  ListaPret    │       │     Pret      │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ client_id     │       │ nume          │       │ lista_pret_id │
│ operator_id   │       │ data_start    │       │ categorie_id  │
│ data_start    │       │ data_sfarsit  │◄──────┤ serviciu_id   │
│ data_sfarsit  │       │ ...           │       │ valoare       │
│ ...           │       └───────────────┘       │ ...           │
└───────────────┘                               └───────────────┘
```

### Module Facturare

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│    Factura    │       │ LinieFactura  │       │     Plata     │
├───────────────┤       ├───────────────┤       ├───────────────┤
│ id            │       │ id            │       │ id            │
│ numar         │       │ factura_id    │       │ factura_id    │
│ data          │◄──────┤ descriere     │       │ data          │
│ client_id     │       │ cantitate     │       │ suma          │
│ contract_id   │       │ pret_unitar   │       │ metoda        │
│ total         │       │ valoare       │       │ ...           │
│ ...           │       │ ...           │       └───────────────┘
└───────────────┘       └───────────────┘
```

## Fluxuri de Date

### Flux Autentificare

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ Frontend│────►│ Backend │────►│ Database│     │  Redis  │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
    ▲               │                               ▲
    │               │                               │
    └───────────────┴───────────────────────────────┘
```

1. Frontend-ul trimite credențialele utilizatorului către backend
2. Backend-ul verifică credențialele în baza de date
3. Backend-ul generează un token JWT și îl stochează în Redis
4. Backend-ul returnează token-ul către frontend
5. Frontend-ul stochează token-ul și îl folosește pentru autentificare

### Flux Colectare Deșeuri

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ Frontend│────►│ Backend │────►│ Database│
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
                    │
                    ▼
               ┌─────────┐
               │         │
               │RabbitMQ │
               │         │
               └─────────┘
                    │
                    ▼
               ┌─────────┐     ┌─────────┐
               │         │     │         │
               │ML Service│────►│ML Models│
               │         │     │         │
               └─────────┘     └─────────┘
```

1. Frontend-ul înregistrează o colectare de deșeuri
2. Backend-ul salvează datele în baza de date
3. Backend-ul trimite un mesaj către RabbitMQ
4. ML Service primește mesajul și procesează datele
5. ML Service actualizează modelele de predicție

### Flux Generare Facturi

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ Frontend│────►│ Backend │────►│ Database│
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
                    │
                    ▼
               ┌─────────┐
               │         │
               │ML Service│
               │         │
               └─────────┘
                    │
                    ▼
               ┌─────────┐     ┌─────────┐
               │         │     │         │
               │ MinIO   │────►│ Email   │
               │         │     │ Service │
               └─────────┘     └─────────┘
```

1. Frontend-ul inițiază generarea facturilor
2. Backend-ul colectează datele necesare din baza de date
3. Backend-ul solicită predicții de la ML Service (opțional)
4. Backend-ul generează facturile și le salvează în baza de date
5. Backend-ul generează PDF-uri și le stochează în MinIO
6. Backend-ul trimite notificări prin email (opțional)

## Decizii de Design

### Arhitectură Modulară

Am ales o arhitectură modulară pentru a permite:
- Dezvoltare independentă a modulelor
- Testare izolată a componentelor
- Scalare diferențiată a serviciilor
- Flexibilitate în implementare și extindere

### Separarea Frontend-Backend

Am separat frontend-ul de backend pentru a permite:
- Dezvoltare paralelă a echipelor
- Flexibilitate în alegerea tehnologiilor
- Scalare independentă a componentelor
- Posibilitatea de a dezvolta multiple interfețe (web, mobile)

### Microserviciu pentru Machine Learning

Am izolat funcționalitățile de ML într-un microserviciu separat pentru a permite:
- Utilizarea tehnologiilor specifice ML (Python, scikit-learn, TensorFlow)
- Scalare independentă a resurselor pentru ML
- Dezvoltare și deployment independent
- Posibilitatea de a rula pe hardware specializat (GPU)

### Utilizarea Docker și Kubernetes

Am containerizat aplicația pentru a permite:
- Consistență între mediile de dezvoltare, testare și producție
- Deployment simplu și reproductibil
- Scalare orizontală a serviciilor
- Orchestrare eficientă a resurselor

## Considerații de Securitate

- **Autentificare și Autorizare** - JWT pentru autentificare, RBAC pentru autorizare
- **Criptare** - HTTPS pentru comunicare, criptare pentru date sensibile
- **Validare Input** - Validare strictă a tuturor input-urilor pentru prevenirea injecțiilor
- **Rate Limiting** - Limitarea numărului de request-uri pentru prevenirea atacurilor DoS
- **Logging și Monitorizare** - Logging detaliat și monitorizare pentru detectarea activităților suspecte
- **Securitate Docker** - Imagini minimale, utilizatori non-root, scanare vulnerabilități

## Considerații de Scalabilitate

- **Scalare Orizontală** - Adăugare de instanțe pentru serviciile cu încărcare mare
- **Caching** - Utilizare Redis pentru caching și reducerea încărcării bazei de date
- **Load Balancing** - Distribuirea traficului între multiple instanțe
- **Database Sharding** - Partitionare date pentru performanță îmbunătățită
- **Asynchronous Processing** - Utilizare RabbitMQ pentru procesare asincronă a task-urilor intensive

## Considerații de Performanță

- **Indexare** - Indexare optimizată a bazei de date
- **Query Optimization** - Optimizare interogări pentru performanță
- **Lazy Loading** - Încărcare lazy a datelor în frontend
- **Code Splitting** - Împărțirea bundle-ului frontend pentru încărcare mai rapidă
- **Compression** - Compresie pentru reducerea dimensiunii datelor transferate
- **CDN** - Utilizare CDN pentru servirea asset-urilor statice
