# Module Backend WasteWise

Acest document descrie modulele backend ale aplicației WasteWise, inclusiv modulele suplimentare care nu sunt menționate explicit în documentația inițială.

## Structura Generală a Modulelor

Modulele backend sunt organizate în directorul `backend/src/modules/` și urmează o structură consistentă:

```
module-name/
├── controllers/       # Controllere pentru API endpoints
├── dto/               # Data Transfer Objects pentru validare input/output
├── entities/          # Entități TypeORM pentru baza de date
├── services/          # Servicii pentru logica de business
├── tests/             # Teste unitare și de integrare
└── module-name.module.ts  # Definirea modulului NestJS
```

## Module de Bază

### Auth Module (`auth/`)

Modul pentru autentificare și autorizare.

- **Entități**: User, Role, Permission, RefreshToken
- **Funcționalități**: Înregistrare, autentificare, refresh token, recuperare parolă, RBAC

### Users Module (`users/`)

Modul pentru gestionarea utilizatorilor.

- **Entități**: User
- **Funcționalități**: CRUD utilizatori, gestionare roluri și permisiuni

### Geographic Module (`geographic/`)

Modul pentru entități geografice.

- **Entități**: Judet, Localitate, UAT, ZonaADI, ZonaIridex
- **Funcționalități**: CRUD pentru entități geografice, relații între entități

### Entities Module (`entities/`)

Modul pentru entități principale ale aplicației.

- **Entități**: Client, TipClient, PunctColectare
- **Funcționalități**: CRUD pentru clienți și puncte de colectare

### Operational Module (`operational/`)

Modul pentru operațiuni de bază.

- **Entități**: CategorieDeseu, Serviciu, Colectare
- **Funcționalități**: CRUD pentru categorii deșeuri, servicii și colectări

## Module Suplimentare

### Contracts Module (`contracts/`)

Modul pentru gestionarea contractelor și serviciilor contractate.

- **Entități**:
  - `Contract`: Reprezintă contractele încheiate cu clienții
  - `Serviciu`: Definește serviciile disponibile pentru contractare
  - `ServiciuContractat`: Reprezintă serviciile incluse într-un contract specific

- **Funcționalități**:
  - Gestionare contracte (creare, actualizare, ștergere)
  - Gestionare servicii disponibile
  - Asociere servicii la contracte cu prețuri și cantități specifice
  - Generare documente contract
  - Gestionare stare contract (activ, expirat, reziliat)

- **Relații**:
  - Contract -> Client (many-to-one)
  - ServiciuContractat -> Contract (many-to-one)
  - ServiciuContractat -> Serviciu (many-to-one)

- **Controllere**:
  - `ContractController`: Endpoints pentru CRUD contracte
  - `ServiciuController`: Endpoints pentru CRUD servicii
  - `ServiciuContractatController`: Endpoints pentru gestionarea serviciilor contractate

### ML Module (`ml/`)

Modul pentru integrarea cu serviciul de Machine Learning și gestionarea predicțiilor.

- **Entități**:
  - `DateIstorice`: Stochează date istorice pentru antrenarea modelelor ML
  - `PredictiiCantitati`: Stochează predicții generate de modelele ML

- **Funcționalități**:
  - Colectare și procesare date istorice
  - Generare predicții pentru cantități de deșeuri
  - Integrare cu serviciul ML extern
  - Vizualizare și export predicții

- **Relații**:
  - DateIstorice -> Client (many-to-one)
  - DateIstorice -> CategorieDeseu (many-to-one)
  - PredictiiCantitati -> Client (many-to-one)
  - PredictiiCantitati -> CategorieDeseu (many-to-one)

- **Controllere**:
  - `DateIstoriceController`: Endpoints pentru gestionarea datelor istorice
  - `PredictiiCantitatiController`: Endpoints pentru gestionarea predicțiilor

### Profiles Module (`profiles/`)

Modul pentru gestionarea profilurilor utilizatorilor.

- **Entități**:
  - `Profile`: Stochează informații suplimentare despre utilizatori

- **Funcționalități**:
  - Gestionare informații profil utilizator
  - Preferințe utilizator
  - Setări personalizate

- **Relații**:
  - Profile -> User (one-to-one)

## Integrarea Modulelor

Modulele sunt integrate în aplicație prin importarea lor în modulul principal `app.module.ts`. Fiecare modul poate depinde de alte module, creând o structură modulară și flexibilă.

Exemplu de integrare a modulului Contracts:

```typescript
// În contracts.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Contract, Serviciu, ServiciuContractat]),
    EntitiesModule,  // Dependență de modulul Entities pentru accesul la Client
    OperationalModule,  // Dependență de modulul Operational
  ],
  controllers: [ServiciuController, ContractController, ServiciuContractatController],
  providers: [ServiciuService, ContractService, ServiciuContractatService],
  exports: [TypeOrmModule, ServiciuService, ContractService, ServiciuContractatService],
})
export class ContractsModule {}

// În app.module.ts
@Module({
  imports: [
    // Alte module...
    AuthModule,
    UsersModule,
    GeographicModule,
    EntitiesModule,
    OperationalModule,
    ContractsModule,  // Importare modul Contracts
    MLModule,         // Importare modul ML
    ProfilesModule,   // Importare modul Profiles
  ],
})
export class AppModule {}
```

## Extinderea Modulelor

Pentru a adăuga funcționalități noi la modulele existente sau pentru a crea module noi, urmați aceeași structură și convenții:

1. Creați un director pentru noul modul în `backend/src/modules/`
2. Definiți entitățile, DTO-urile, serviciile și controllerele necesare
3. Creați modulul NestJS și configurați dependențele
4. Importați modulul în `app.module.ts`

## Best Practices

- Păstrați o separare clară a responsabilităților între module
- Utilizați DTO-uri pentru validarea input/output
- Implementați logica de business în servicii, nu în controllere
- Scrieți teste pentru fiecare componentă
- Documentați API-urile folosind Swagger
- Utilizați injecția de dependențe pentru a facilita testarea
