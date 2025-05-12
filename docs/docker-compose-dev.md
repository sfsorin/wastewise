# Docker Compose pentru Dezvoltare

Acest document descrie configurarea Docker Compose pentru mediul de dezvoltare al aplicației WasteWise.

## Structură

Configurarea Docker Compose pentru dezvoltare include următoarele servicii:

1. **postgres** - Baza de date PostgreSQL
2. **backend** - API-ul backend (NestJS)
3. **frontend** - Aplicația frontend (React)
4. **adminer** - Interfață pentru administrarea bazei de date
5. **redis** - Cache și sesiuni (opțional)
6. **minio** - Stocare documente (opțional)

## Utilizare

### Pregătire

Înainte de a porni containerele, asigurați-vă că aveți fișierele `.env` configurate:

```bash
# Pentru backend
cp backend/.env.example backend/.env

# Pentru frontend
cp frontend/.env.example frontend/.env
```

### Pornire

Pentru a construi și porni toate serviciile:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Pentru a porni serviciile în fundal:

```bash
docker compose -f docker-compose.dev.yml up -d
```

### Oprire

Pentru a opri toate serviciile:

```bash
docker compose -f docker-compose.dev.yml down
```

Pentru a opri serviciile și a șterge volumele (atenție, se vor pierde datele):

```bash
docker compose -f docker-compose.dev.yml down -v
```

## Accesare Servicii

După pornirea containerelor, puteți accesa serviciile la următoarele adrese:

- **Backend API**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **Swagger API Docs**: http://localhost:3000/api/docs
- **Adminer**: http://localhost:8081
  - Server: postgres
  - Utilizator: postgres
  - Parolă: postgres
  - Bază de date: wastewise
- **MinIO Console**: http://localhost:9091
  - Utilizator: minioadmin
  - Parolă: minioadmin
- **MinIO API**: http://localhost:9090

## Volume

Configurarea folosește următoarele volume pentru persistența datelor:

- **pgdata-dev**: Date PostgreSQL
- **backend-node-modules**: Dependențe Node.js pentru backend
- **frontend-node-modules**: Dependențe Node.js pentru frontend
- **redis-data-dev**: Date Redis
- **minio-data-dev**: Date MinIO

## Rețele

Toate serviciile sunt conectate la rețeaua `wastewise-network-dev`.

## Variabile de Mediu

### Backend

Variabilele de mediu pentru backend sunt preluate din fișierul `backend/.env`, cu excepția:

- `DB_HOST=postgres` - Setat pentru a conecta la containerul PostgreSQL
- `NODE_ENV=development` - Setat pentru mediul de dezvoltare

### Frontend

Variabilele de mediu pentru frontend sunt preluate din fișierul `frontend/.env`, cu excepția:

- `VITE_API_BASE_URL=http://localhost:3000/api/v1` - URL-ul API-ului backend
- `VITE_NODE_ENV=development` - Setat pentru mediul de dezvoltare

## Hot Reloading

Configurarea include suport pentru hot reloading:

- **Backend**: Codul sursă este montat ca volum, iar nodemon va reporni serverul la modificări
- **Frontend**: Codul sursă este montat ca volum, iar Vite va actualiza aplicația la modificări

## Note

- Volumele `backend-node-modules` și `frontend-node-modules` sunt folosite pentru a evita conflictele între dependențele instalate în container și cele de pe sistemul gazdă
- Serviciile Redis și MinIO sunt opționale și pot fi comentate dacă nu sunt necesare
- Adminer este inclus pentru a facilita administrarea bazei de date în timpul dezvoltării
