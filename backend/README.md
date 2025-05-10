# WasteWise Backend

Backend pentru aplicația WasteWise, implementat cu NestJS, TypeScript și TypeORM.

## Structură

Structura proiectului urmează arhitectura modulară NestJS:

```
backend/
├── src/
│   ├── app.module.ts      # Modulul principal al aplicației
│   ├── main.ts            # Punctul de intrare al aplicației
│   ├── modules/           # Module funcționale
│   │   ├── auth/          # Modul autentificare
│   │   ├── users/         # Modul utilizatori
│   │   ├── geographic/    # Module geografice
│   │   ├── entities/      # Module entități
│   │   └── ...
│   ├── common/            # Cod comun
│   │   ├── decorators/    # Decoratori personalizați
│   │   ├── filters/       # Filtre de excepții
│   │   ├── guards/        # Guards pentru autorizare
│   │   ├── interceptors/  # Interceptori
│   │   ├── pipes/         # Pipes pentru validare
│   │   └── utils/         # Utilități
│   └── config/            # Configurații
├── test/                  # Teste
├── .env.example           # Exemplu variabile de mediu
├── nest-cli.json          # Configurație Nest CLI
├── package.json           # Dependențe și script-uri
└── tsconfig.json          # Configurație TypeScript
```

## Instalare

```bash
# Instalare dependențe
npm install

# Copiere fișier .env
cp .env.example .env
```

## Rulare

```bash
# Dezvoltare
npm run start:dev

# Producție
npm run build
npm run start:prod
```

## Teste

```bash
# Teste unitare
npm run test

# Teste e2e
npm run test:e2e

# Acoperire cod
npm run test:cov
```
