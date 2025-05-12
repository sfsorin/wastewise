# Documentație Docker pentru Backend

Acest document descrie configurația Docker pentru backend-ul aplicației WasteWise.

## Fișiere disponibile

- `Dockerfile` - Fișierul principal folosit pentru build-ul containerului în producție
- `Dockerfile.dev` - Fișier pentru mediul de dezvoltare
- `Dockerfile.prod` - Fișier pentru mediul de producție (identic cu Dockerfile principal)
- `.dockerignore` - Fișier pentru excluderea fișierelor care nu sunt necesare în container

## Dockerfile principal

Dockerfile-ul principal folosește o abordare multi-stage pentru a optimiza dimensiunea imaginii finale:

1. **Etapa de build**:
   - Folosește Node.js 22 Alpine ca imagine de bază
   - Instalează toate dependențele (inclusiv cele de dezvoltare)
   - Compilează aplicația

2. **Etapa de producție**:
   - Folosește Node.js 22 Alpine ca imagine de bază
   - Instalează doar dependențele de producție
   - Copiază codul compilat din etapa de build
   - Expune portul 3000
   - Rulează aplicația cu `node dist/main`

## Dockerfile.dev

Dockerfile-ul pentru dezvoltare:
- Folosește Node.js 22 Alpine ca imagine de bază
- Instalează Nest CLI global
- Instalează toate dependențele
- Copiază tot codul sursă
- Rulează aplicația în modul de dezvoltare cu `npm run start:dev`

## Dockerfile.prod

Identic cu Dockerfile-ul principal, optimizat pentru producție.

## .dockerignore

Exclude fișierele care nu sunt necesare în container, cum ar fi:
- Directorul `node_modules`
- Fișierele de build (`dist`, `build`, `coverage`)
- Fișierele de dezvoltare (`.git`, `.vscode`, etc.)
- Fișierele de configurare locale (`.env`)

## Construirea și rularea containerului

### Dezvoltare

```bash
# Construire imagine pentru dezvoltare
docker build -t wastewise-backend-dev -f Dockerfile.dev .

# Rulare container pentru dezvoltare
docker run -p 3000:3000 -v $(pwd):/app wastewise-backend-dev
```

### Producție

```bash
# Construire imagine pentru producție
docker build -t wastewise-backend -f Dockerfile .

# Rulare container pentru producție
docker run -p 3000:3000 wastewise-backend
```

## Variabile de mediu

Containerul folosește variabilele de mediu definite în fișierul `.env`. Pentru producție, este recomandat să se folosească variabile de mediu injectate direct în container, în loc de fișierul `.env`.

Exemplu de variabile de mediu importante:
- `PORT` - Portul pe care rulează aplicația (implicit 3000)
- `NODE_ENV` - Mediul de rulare (development, production)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` - Configurare bază de date
- `JWT_SECRET`, `JWT_EXPIRATION` - Configurare JWT

## Note importante

- În producție, asigurați-vă că aveți un fișier `.env` configurat corect sau injectați variabilele de mediu direct în container
- Pentru dezvoltare, este recomandat să montați directorul curent ca volum pentru a permite hot-reloading
- Asigurați-vă că portul 3000 este expus și mapat corect când rulați containerul
